"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

interface VoiceRecognitionProps {
  mode: "login" | "register";
  onSuccess: (email: string, password: string) => void;
  onFailed: () => void;
  isProcessing: boolean;
}

export function VoiceRecognition({
  mode,
  onSuccess,
  onFailed,
  isProcessing,
}: VoiceRecognitionProps) {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");

  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setStatus("Speech recognition not supported in your browser");
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    setIsListening(true);
    setStatus("Listening... Say your email and password");
    setTranscript("");

    recognition.start();

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        const words = finalTranscript.toLowerCase().split(" ");
        let email = "";
        let password = "";

        // Simple email extraction (looking for @ symbol in speech)
        const emailMatch = finalTranscript.match(
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        );
        if (emailMatch) {
          email = emailMatch[0];
        }

        // Simple password extraction (assuming it's said after "password is" or similar)
        const passwordIndex = words.findIndex(
          (word) =>
            word.includes("password") || word.includes("pass") || word === "is"
        );
        if (passwordIndex !== -1 && passwordIndex < words.length - 1) {
          password = words.slice(passwordIndex + 1).join("");
        }

        if (email && password) {
          setStatus("✓ Credentials recognized! Logging in...");
          recognition.stop();
          setIsListening(false);
          setTimeout(() => {
            onSuccess(email, password);
          }, 500);
        }
      }
    };

    recognition.onerror = () => {
      setStatus("Failed to recognize voice. Switching to manual login...");
      setIsListening(false);
      setTimeout(() => {
        onFailed();
      }, 2000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleManualFallback = () => {
    onFailed();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-8 border-2 border-gray-200 shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {mode === "login" ? "Voice Auth" : "Voice Registration"}
        </h1>
        <p className="text-gray-500">
          {mode === "login"
            ? "Say your credentials to login"
            : "Create your account with voice"}
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={startListening}
          disabled={isListening || isProcessing}
          className={`p-6 rounded-full transition-all ${
            isListening
              ? "bg-red-500 animate-pulse"
              : isProcessing
              ? "bg-green-500 opacity-50 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <Mic className="w-8 h-8 text-white" />
        </button>
      </div>

      <div className="bg-gray-50 rounded p-4 mb-6 min-h-20 flex items-center border border-gray-200">
        <p className="text-gray-600 text-sm text-center w-full">
          {status || "Click the microphone to start voice authentication"}
        </p>
      </div>

      {transcript && (
        <div className="bg-gray-50 rounded p-3 mb-6 border border-gray-200">
          <p className="text-gray-500 text-xs mb-1">Transcript:</p>
          <p className="text-gray-800 text-sm">{transcript}</p>
        </div>
      )}

      <button
        onClick={handleManualFallback}
        className="w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-6"
      >
        Use manual {mode} instead
      </button>

      {mode === "login" && (
        <button
          onClick={() => router.push("/register")}
          className="w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-6"
        >
          Don't have an account? Register
        </button>
      )}
    </div>
  );
}

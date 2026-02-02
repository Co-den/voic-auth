"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

interface VoiceRegistrationProps {
  onSuccess: (data: { name: string; email: string; password: string }) => void;
  onFailed: () => void;
  isProcessing: boolean;
}

export function VoiceRegistration({
  onSuccess,
  onFailed,
  isProcessing,
}: VoiceRegistrationProps) {
  const router = useRouter();
  const [step, setStep] = useState<"welcome" | "name" | "email" | "password">(
    "welcome"
  );
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");

  const [collectedData, setCollectedData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const startWelcome = () => {
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

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    setIsListening(true);
    setStatus("Listening... Do you want to get started?");
    setTranscript("");

    recognition.start();

    recognition.onresult = (event: any) => {
      let result = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript.toLowerCase();
      }
      setTranscript(result);

      if (
        result.includes("yes") ||
        result.includes("yeah") ||
        result.includes("sure")
      ) {
        setStatus("Great! Let's get your details...");
        setStep("name");
        setIsListening(false);
        setTimeout(() => {
          collectName();
        }, 1000);
      } else {
        setStatus("Come back when you're ready!");
        setIsListening(false);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    };

    recognition.onerror = () => {
      setStatus("Failed to recognize voice. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const collectName = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setStatus("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    setIsListening(true);
    setStatus("Listening... Please say your full name");
    setTranscript("");

    recognition.start();

    recognition.onresult = (event: any) => {
      let result = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
      }
      setTranscript(result);

      const name = result.trim();

      if (name.length > 1) {
        setCollectedData((prev) => ({ ...prev, name }));
        setStatus("✓ Got your name! Now let's get your email.");
        setIsListening(false);
        setTimeout(() => {
          setStep("email");
          collectEmail(name);
        }, 1500);
      } else {
        setStatus("Could not capture your name clearly. Please try again.");
        setIsListening(false);
        setTimeout(() => {
          collectName();
        }, 2000);
      }
    };

    recognition.onerror = () => {
      setStatus("Failed to recognize voice. Please try again.");
      setIsListening(false);
      setTimeout(() => {
        collectName();
      }, 2000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const collectEmail = (name: string) => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setStatus("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    setIsListening(true);
    setStatus("Listening... Please say your email address");
    setTranscript("");

    recognition.start();

    recognition.onresult = (event: any) => {
      let result = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
      }
      setTranscript(result);

      const emailMatch = result.match(
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
      );
      const email = emailMatch ? emailMatch[0] : "";

      if (email) {
        setCollectedData((prev) => ({ ...prev, email }));
        setStatus("✓ Got your email! Now let's get your password.");
        setIsListening(false);
        setTimeout(() => {
          setStep("password");
          collectPassword(name, email);
        }, 1500);
      } else {
        setStatus(
          "Could not capture a valid email. Please try again and say your full email address."
        );
        setIsListening(false);
        setTimeout(() => {
          collectEmail(name);
        }, 2000);
      }
    };

    recognition.onerror = () => {
      setStatus("Failed to recognize voice. Please try again.");
      setIsListening(false);
      setTimeout(() => {
        collectEmail(name);
      }, 2000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const collectPassword = (name: string, email: string) => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setStatus("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    setIsListening(true);
    setStatus("Listening... Please say your password (at least 6 characters)");
    setTranscript("");

    recognition.start();

    recognition.onresult = (event: any) => {
      let result = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
      }
      setTranscript(result);

      const password = result.trim();

      if (password.length >= 6) {
        setCollectedData((prev) => ({ ...prev, password }));
        setStatus("✓ Registration in progress...");
        setIsListening(false);
        setTimeout(() => {
          onSuccess({
            name,
            email,
            password,
          });
        }, 500);
      } else {
        setStatus("Password must be at least 6 characters. Please try again.");
        setIsListening(false);
        setTimeout(() => {
          collectPassword(name, email);
        }, 2000);
      }
    };

    recognition.onerror = () => {
      setStatus(
        "Failed to recognize voice. Switching to manual registration..."
      );
      setIsListening(false);
      setTimeout(() => {
        onFailed();
      }, 2000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const getFieldLabel = () => {
    switch (step) {
      case "name":
        return "Collecting Name";
      case "email":
        return "Collecting Email";
      case "password":
        return "Collecting Password";
      default:
        return "Join Us";
    }
  };

  const getProgressIndicator = () => {
    const steps = ["welcome", "name", "email", "password"];
    const currentIndex = steps.indexOf(step);
    return `${Math.max(currentIndex, 0)} of 3 fields`;
  };

  const handleManualFallback = () => {
    onFailed();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-8 border-2 border-gray-200 shadow-xl">
      {step === "welcome" ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Us</h1>
            <p className="text-gray-500">Create your account with voice</p>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={startWelcome}
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
              {status || "Click the microphone to start voice registration"}
            </p>
          </div>

          {transcript && (
            <div className="bg-gray-50 rounded p-3 mb-6 border border-gray-200">
              <p className="text-gray-500 text-xs mb-1">Transcript:</p>
              <p className="text-gray-800 text-sm">{transcript}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {getFieldLabel()}
            </h1>
            <p className="text-gray-500">{getProgressIndicator()}</p>
          </div>

          <div className="flex justify-center mb-8">
            <button
              disabled
              className="p-6 rounded-full bg-green-500 opacity-50 cursor-not-allowed"
            >
              <Mic className="w-8 h-8 text-white animate-bounce" />
            </button>
          </div>

          <div className="bg-gray-50 rounded p-4 mb-6 min-h-20 flex items-center border border-gray-200">
            <p className="text-gray-600 text-sm text-center w-full">
              {status || "Listening..."}
            </p>
          </div>

          {transcript && (
            <div className="bg-gray-50 rounded p-3 mb-6 border border-gray-200">
              <p className="text-gray-500 text-xs mb-1">Transcript:</p>
              <p className="text-gray-800 text-sm">{transcript}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded p-3 mb-6 border border-gray-200">
            <p className="text-gray-500 text-xs mb-2">Collected Data:</p>
            <div className="text-sm text-gray-700 space-y-1">
              {collectedData.name && <p>Name: {collectedData.name}</p>}
              {collectedData.email && <p>Email: {collectedData.email}</p>}
              {collectedData.password && (
                <p>Password: {"•".repeat(collectedData.password.length)}</p>
              )}
            </div>
          </div>
        </>
      )}
      <button
        onClick={handleManualFallback}
        className="w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-6"
      >
        Use manual Register instead
      </button>
      <button
        onClick={() => router.push("/login")}
        className="w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-6"
      >
        Already have an account? Login
      </button>
    </div>
  );
}

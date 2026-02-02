"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VoiceRecognition } from "@/components/voice-recognition";
import { LoginModal } from "@/components/login-modal";

export default function LoginPage() {
  const router = useRouter();
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceSuccess = (email: string, password: string) => {
    setIsProcessing(true);
    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, authenticated: true })
      );
      router.push("/home");
    }, 500);
  };

  const handleVoiceFailed = () => {
    setShowManualLogin(true);
  };

  const handleManualLogin = (email: string, password: string) => {
    setIsProcessing(true);
    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, authenticated: true })
      );
      router.push("/home");
    }, 500);
  };

  const handleModalClose = () => {
    setShowManualLogin(false);
    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <VoiceRecognition
        mode="login"
        onSuccess={handleVoiceSuccess}
        onFailed={handleVoiceFailed}
        isProcessing={isProcessing}
      />

      <LoginModal
        isOpen={showManualLogin}
        onSuccess={handleManualLogin}
        onBack={handleModalClose}
        isProcessing={isProcessing}
      />
    </main>
  );
}

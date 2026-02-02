"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VoiceRegistration } from "@/components/voice-registration";
import { RegistrationModal } from "@/components/registration-modal";

export default function RegisterPage() {
  const router = useRouter();
  const [showManualRegister, setShowManualRegister] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceSuccess = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsProcessing(true);
    // Simulate registration
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, authenticated: true })
      );
      router.push("/home");
    }, 500);
  };

  const handleVoiceFailed = () => {
    setShowManualRegister(true);
  };

  const handleManualRegister = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsProcessing(true);
    // Simulate registration
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, authenticated: true })
      );
      router.push("/home");
    }, 500);
  };

  const handleModalClose = () => {
    setShowManualRegister(false);
    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <VoiceRegistration
        onSuccess={handleVoiceSuccess}
        onFailed={handleVoiceFailed}
        isProcessing={isProcessing}
      />

      <RegistrationModal
        isOpen={showManualRegister}
        onSuccess={handleManualRegister}
        onBack={handleModalClose}
        isProcessing={isProcessing}
      />
    </main>
  );
}

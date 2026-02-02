"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Lock, Mail, X } from "lucide-react";

interface RegistrationModalProps {
  onSuccess: (data: { name: string; email: string; password: string }) => void;
  onBack: () => void;
  isProcessing: boolean;
  isOpen: boolean;
}

export function RegistrationModal({
  onSuccess,
  onBack,
  isProcessing,
  isOpen,
}: RegistrationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    onSuccess({ name, email, password });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isProcessing) {
      onBack();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Close button */}
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          <ShoppingCart className="w-12 h-12 text-green-600 mb-8 stroke-1" />

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProcessing}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                placeholder="NAME"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProcessing}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                placeholder="EMAIL"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isProcessing}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                placeholder="PASSWORD"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isProcessing}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                placeholder="CONFIRM PASSWORD"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-6"
            >
              {isProcessing ? "REGISTERING..." : "REGISTER"}
            </Button>
          </form>

          <button
            onClick={onBack}
            disabled={isProcessing}
            className="w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-6 disabled:opacity-50"
          >
            Back to Voice Registration
          </button>
        </div>
      </div>
    </div>
  );
}

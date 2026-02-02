"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Lock, X } from "lucide-react";

interface LoginModalProps {
  onSuccess: (email: string, password: string) => void;
  onBack: () => void;
  isProcessing: boolean;
  isOpen: boolean;
}

export function LoginModal({
  onSuccess,
  onBack,
  isProcessing,
  isOpen,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    onSuccess(email, password);
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
          <ShoppingCart className="w-12 h-12 text-green-600 mb-8 stroke-[1]" />

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProcessing}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                placeholder="USERNAME"
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

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-6"
            >
              {isProcessing ? "LOGGING IN..." : "LOGIN"}
            </Button>
          </form>

          <button
            className="text-gray-500 hover:text-gray-700 text-sm mt-4 disabled:opacity-50"
            disabled={isProcessing}
          >
            Forgot password?
          </button>

          <button
            onClick={onBack}
            disabled={isProcessing}
            className="w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-6 disabled:opacity-50"
          >
            Back to Voice Login
          </button>
        </div>
      </div>
    </div>
  );
}

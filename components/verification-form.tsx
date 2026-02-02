"use client";

import type React from "react";

import { useState } from "react";
import { X, Lock } from "lucide-react";

export default function VerificationForm() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      if (code.length === 6) {
        setIsLoading(false);
      } else {
        setError("Please enter a valid 6-digit code");
        setIsLoading(false);
      }
    }, 500);
  };

  const handleResend = () => {
    setCode("");
    setError("");
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Lock Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-green-50 rounded-full p-4">
            <Lock size={40} className="text-green-500" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Verify Your Identity
        </h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          We've sent a 6-digit code to your email. Enter it below to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Verification Code Input */}
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setCode(value);
              }}
              placeholder="000000"
              maxLength={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-center text-2xl font-bold tracking-widest placeholder-gray-400 transition-colors"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors duration-200"
          >
            {isLoading ? "Verifying..." : "VERIFY"}
          </button>
        </form>

        {/* Links */}
        <div className="space-y-3 mt-6 text-center">
          <button
            onClick={handleResend}
            className="block w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Didn't receive the code?
          </button>
          <a
            href="/login"
            className="block text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

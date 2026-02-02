"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface User {
  name?: string
  email: string
  authenticated: boolean
}

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(storedUser))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Welcome</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Welcome Card */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {user.name ? `Hi, ${user.name}!` : "Welcome back!"}
          </h2>
          <p className="text-slate-300 mb-2">
            Email: <span className="text-white font-medium">{user.email}</span>
          </p>
          <p className="text-slate-400 text-sm mt-4">
            You have successfully authenticated using voice recognition. Your session is secure and you can enjoy all
            the features of the app.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">🎤 Voice Authentication</h3>
            <p className="text-slate-400">Your voice is your password. Secure and convenient authentication.</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">🔒 Secure Sessions</h3>
            <p className="text-slate-400">Your data is protected with secure session management.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

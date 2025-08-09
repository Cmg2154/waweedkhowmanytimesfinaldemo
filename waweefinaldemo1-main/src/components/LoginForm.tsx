import React, { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn, Waves, Wallet } from 'lucide-react'
import GlassCard from './GlassCard'
import Button from './Button'
import Input from './Input'

declare global {
  interface Window {
    google: any
  }
}

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
  onSwitchToSignup: () => void
  onSwitchToForgot: () => void
  onSwitchToWeb3: () => void
  onGoogleLogin: (credential: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSwitchToSignup,
  onSwitchToForgot,
  onSwitchToWeb3,
  onGoogleLogin,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const googleButtonDiv = useRef<HTMLDivElement>(null)
  const googleInitialized = useRef(false)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE'

  // Load Google Sign-In SDK
  useEffect(() => {
    if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
      console.error('Please set VITE_GOOGLE_CLIENT_ID in your environment variables')
      return
    }

    // Check if Google SDK is already loaded
    if (window.google && window.google.accounts) {
      setGoogleLoaded(true)
      return
    }

    // Load Google SDK script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      console.log('Google SDK loaded successfully')
      setGoogleLoaded(true)
    }
    script.onerror = () => {
      console.error('Failed to load Google SDK')
    }

    // Avoid loading the script multiple times
    if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      document.head.appendChild(script)
    }

    return () => {
      // Clean up if component unmounts during loading
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [clientId])

  // Initialize Google Sign-In button when SDK is loaded
  useEffect(() => {
    if (!googleLoaded || !window.google || !window.google.accounts) {
      return
    }

    if (googleButtonDiv.current && !googleInitialized.current) {
      console.log('Initializing Google Sign-In button')

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) => {
            console.log('Google credential received:', response.credential)
            onGoogleLogin(response.credential)
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        })

        window.google.accounts.id.renderButton(googleButtonDiv.current, {
          theme: 'outline',
          size: 'large',
          width: 240,
          type: 'standard',
          shape: 'rectangular',
          logo_alignment: 'left',
        })

        googleInitialized.current = true
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error)
      }
    }
  }, [googleLoaded, clientId, onGoogleLogin])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    onLogin(email, password)
    setIsLoading(false)
  }

  return (
    <GlassCard>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20">
            <Waves className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your Wawee account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          required
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          icon={<LogIn className="w-5 h-5" />}
          className="w-full"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white/50 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 items-center">
        <button
          onClick={onSwitchToWeb3}
          className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 group"
          type="button"
        >
          <Wallet className="w-5 h-5 text-purple-600" />
        </button>

        <div className="col-span-2 flex justify-center items-center min-h-[50px]">
          <div
            ref={googleButtonDiv}
            className="flex justify-center"
            style={{ width: 240, height: 50 }}
          >
            {!googleLoaded && (
              <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50">
                <span className="text-gray-400 text-sm">Loading Google...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default LoginForm
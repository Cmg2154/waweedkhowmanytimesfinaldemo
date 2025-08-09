import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Waves, Wallet } from 'lucide-react'
import GlassCard from './GlassCard'
import Button from './Button'
import Input from './Input'

interface SignupFormProps {
  onSignup: (email: string, password: string, name: string) => void
  onSwitchToLogin: () => void
  onSwitchToWeb3: () => void
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onSwitchToLogin, onSwitchToWeb3 }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onSignup(email, password, name)
    setIsLoading(false)
  }

  return (
    <GlassCard>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20">
            <Waves className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
        <p className="text-gray-600">Join Wawee today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<User className="w-5 h-5 text-gray-400" />}
          required
        />

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          required
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          icon={<UserPlus className="w-5 h-5" />}
          className="w-full"
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign in
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

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={onSwitchToWeb3}
          className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 group"
        >
          <Wallet className="w-5 h-5 text-purple-600" />
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 group">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 group">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </button>
      </div>
    </GlassCard>
  )
}

export default SignupForm

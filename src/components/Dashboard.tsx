import React, { useState } from 'react'
import { LogOut, User, Settings, Bell, Activity, TrendingUp, Users, Calendar, Waves, Wallet, ArrowLeftRight } from 'lucide-react'
import GlassCard from './GlassCard'
import Button from './Button'
import WalletDashboard from './WalletDashboard'
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: { email?: string; name: string; address?: string; balance?: string; chainId?: string }
  onLogout: () => void
  formatAddress?: (address: string) => string
  getChainName?: (chainId: string) => string
}
const connectWallet = async () => {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed. Please install it to continue.');
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const selectedAccount = accounts[0];

    // Optionally log or set state
    console.log('Connected MetaMask account:', selectedAccount);

    // If you have a way to update user state, do it here
    // Example: setUser({ ...user, address: selectedAccount })

  } catch (error) {
    console.error('MetaMask connection failed:', error);
    alert('Failed to connect to MetaMask.');
  }
};
const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, formatAddress, getChainName }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'wallet'>('dashboard')
  const isWeb3User = Boolean(user.address)

  const stats = [
    { label: 'Total Users', value: '12,345', icon: Users, color: 'from-blue-500/20 to-purple-500/20', iconColor: 'text-blue-600' },
    { label: 'Active Sessions', value: '1,234', icon: Activity, color: 'from-green-500/20 to-blue-500/20', iconColor: 'text-green-600' },
    { label: 'Growth Rate', value: '+23%', icon: TrendingUp, color: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-600' },
    { label: 'Events Today', value: '45', icon: Calendar, color: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-600' },
  ]

  const recentActivities = [
    { action: 'User registration', user: 'john.doe@example.com', time: '2 minutes ago' },
    { action: 'Password reset', user: 'jane.smith@example.com', time: '5 minutes ago' },
    { action: 'Profile updated', user: 'mike.wilson@example.com', time: '10 minutes ago' },
    { action: 'New login', user: 'sarah.johnson@example.com', time: '15 minutes ago' },
  ]

  const defaultGetChainName = (chainId: string) => {
    const chains: { [key: string]: string } = {
      '0x1': 'Ethereum Mainnet',
      '0x5': 'Goerli Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Polygon Mumbai',
      '0xa': 'Optimism',
      '0xa4b1': 'Arbitrum One'
    }
    return chains[chainId] || `Chain ${chainId}`
  }

  const defaultFormatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Show wallet dashboard for Web3 users when wallet view is active
  if (activeView === 'wallet' && isWeb3User && user.address && user.balance && user.chainId) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Navigation Header */}
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <Activity className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveView('wallet')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20 shadow-sm"
              >
                <Wallet className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-800">Wallet</span>
              </button>
            </div>
            <Button
              onClick={onLogout}
              icon={<LogOut className="w-4 h-4" />}
              variant="secondary"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </GlassCard>

        <WalletDashboard
          user={{
            address: user.address,
            balance: user.balance,
            chainId: user.chainId,
            name: user.name
          }}
          getChainName={getChainName || defaultGetChainName}
          formatAddress={formatAddress || defaultFormatAddress}
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gradient-to-r ${isWeb3User ? 'from-purple-500/20 to-pink-500/20' : 'from-blue-500/20 to-purple-500/20'} backdrop-blur-sm border border-white/20`}>
              {isWeb3User ? (
                <Wallet className="w-8 h-8 text-purple-600" />
              ) : (
                <Waves className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
              {isWeb3User ? (
                <div className="space-y-1">
                  <p className="text-gray-600 font-mono text-sm">{user.address}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{user.balance ? `${parseFloat(user.balance).toFixed(4)} ETH` : '0 ETH'}</span>
                    <span>{user.chainId ? (getChainName || defaultGetChainName)(user.chainId) : 'Unknown Chain'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">{user.email}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isWeb3User && (
              <button
                onClick={() => setActiveView('wallet')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <ArrowLeftRight className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-800">Wallet</span>
              </button>
            )}
            <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <Button
              onClick={onLogout}
              icon={<LogOut className="w-4 h-4" />}
              variant="secondary"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Web3 Status Card */}
      {isWeb3User && (
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-800">Web3 Connected</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Secure wallet authentication</span>
              <div className="flex items-center space-x-1">
                <Wallet className="w-4 h-4" />
                <span>MetaMask</span>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <GlassCard key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} backdrop-blur-sm border border-white/20`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-left">
              <User className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-gray-800">Manage Users</p>
              <p className="text-xs text-gray-600">View and edit user accounts</p>
            </button>
            <button className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-left">
              <Settings className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-gray-800">System Settings</p>
              <p className="text-xs text-gray-600">Configure application settings</p>
            </button>
            <button className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-left">
              <Activity className="w-6 h-6 text-orange-600 mb-2" />
              <p className="text-sm font-medium text-gray-800">Analytics</p>
              <p className="text-xs text-gray-600">View detailed reports</p>
            </button>
            <button
              onClick={connectWallet}
              className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet w-6 h-6 text-purple-600 mb-2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
              <p className="text-sm font-medium text-gray-800">Web3 Wallet</p>
              <p className="text-xs text-gray-600">Connect MetaMask & authenticate</p>
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Welcome Message */}
      <GlassCard>
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop"
              alt="Welcome"
              className="w-32 h-24 object-cover rounded-lg opacity-80"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">You're all set!</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Your Wawee account is ready to use. {isWeb3User ? 'Enjoy the power of Web3 authentication and explore decentralized features including sending transactions.' : 'Explore the dashboard and discover all the features available to you.'}
          </p>
        </div>
      </GlassCard>
    </div>
  )
}

export default Dashboard

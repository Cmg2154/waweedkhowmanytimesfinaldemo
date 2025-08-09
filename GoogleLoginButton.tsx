import React, { useEffect } from 'react'

declare global {
  interface Window {
    google: any
  }
}

interface GoogleLoginButtonProps {
  onGoogleLogin: (credential: string) => void
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onGoogleLogin }) => {
  useEffect(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: '802343095994-pdbn9lmvr12nhmepgqigmh6qe0tr6edk.apps.googleusercontent.com',
        callback: (response: any) => {
          onGoogleLogin(response.credential)
        },
      })
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button')!,
        { theme: 'outline', size: 'large' }
      )
      window.google.accounts.id.prompt()
    }
  }, [onGoogleLogin])

  return <div id="google-signin-button"></div>
}

export default GoogleLoginButton
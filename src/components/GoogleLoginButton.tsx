
import React from "react";

type GoogleLoginButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      background: "#4285F4",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: disabled ? "not-allowed" : "pointer",
      fontSize: "16px",
      fontWeight: 500,
      gap: "10px",
    }}
  >
    <svg width="20" height="20" viewBox="0 0 48 48">
      <g>
        <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
        <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.3 4.1-16.7 10.7z"/>
        <path fill="#FBBC05" d="M24 44c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.7 36 25.6 38 24 38c-5.7 0-10.5-3.9-12.2-9.1l-7 5.4C10.7 39.9 16.8 44 24 44z"/>
        <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 6.5-11.7 6.5-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.3 4.1-16.7 10.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.3 4.1-16.7 10.7z"/>
      </g>
    </svg>
    Sign in with Google
  </button>
);

export default GoogleLoginButton;

"use client"
import { useState } from 'react'

export default function GoogleLoginButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/google/login')
            const data = await response.json()
            
            // Redirect to Google's OAuth page
            window.location.href = data.redirect_url
        } catch (error) {
            console.error('Google login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            
            {isLoading ? 'Loading...' : 'Sign in with Google'}
        </button>
    )
}  
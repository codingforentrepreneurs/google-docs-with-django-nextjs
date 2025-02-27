"use server"
import { setRefreshToken, setToken } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { urlJoin } from '@/lib/urlJoin'

const DJANGO_API_URL = process.env.DJANGO_API_URL;

export async function POST(request) {
    const requestData = await request.json()
    const url = urlJoin(DJANGO_API_URL, "signup")
    const jsonData = JSON.stringify(requestData)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }
    const response = await fetch(url, requestOptions)
    const responseData = await response.json()
    if (response.ok) {
        const accessToken = responseData.access_token  || responseData.token
        const refreshToken = responseData.refresh_token || responseData.refresh
        if (!accessToken || !refreshToken) {
            return NextResponse.json({"detail": "Invalid response from server. Please try again."}, {status: 400})
        }
        await setToken(accessToken)
        await setRefreshToken(refreshToken)
        return NextResponse.json({"loggedIn": true, "username": responseData.username}, {status: 200})
    }
    return NextResponse.json({"loggedIn": false, ...responseData}, {status: 400})
}   
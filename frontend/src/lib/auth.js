
const { cookies } = require("next/headers")
const { urlJoin } = require('./urlJoin')

const DJANGO_API_URL = process.env.DJANGO_API_URL;
const TOKEN_AGE = 3600
const TOKEN_NAME = "auth-token"
const TOKEN_REFRESH_NAME = "auth-refresh-token"

export async function getToken(){
    // api requests
    const cookieStore = await cookies()
    const myAuthToken = cookieStore.get(TOKEN_NAME)
    return myAuthToken?.value
}


export async function getRefreshToken(){
    // api requests
    const cookieStore = await cookies()
    const myAuthToken = cookieStore.get(TOKEN_REFRESH_NAME)
    return myAuthToken?.value
}

export async function setToken(authToken){
    // login
    const cookieStore = await cookies()
    const result = cookieStore.set({
        name: TOKEN_NAME,
        value: authToken,
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    })
    return result
}

export async function setRefreshToken(authRefreshToken){
    // login
    const cookieStore = await cookies()
    const result = cookieStore.set({
        name: TOKEN_REFRESH_NAME,
        value: authRefreshToken,
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    })
    return result
}

export async function  deleteTokens() {
    // logout
    const cookieStore = await cookies()
    cookieStore.delete(TOKEN_REFRESH_NAME)
    cookieStore.delete(TOKEN_NAME)
}


export async function performTokenRefresh() {
    try {
      const refreshToken = await getRefreshToken();
      const response = await fetch(urlJoin(DJANGO_API_URL, '/token/refresh/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken
        }),
      });
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      const data = await response.json();
      const newAccessToken = data.access
      const newRefreshToken = data.refresh
      await setToken(newAccessToken)
      await setRefreshToken(newRefreshToken)
      return newAccessToken
    } catch (error) {
      throw new Error('Failed to refresh token: ' + error.message);
    }
  }
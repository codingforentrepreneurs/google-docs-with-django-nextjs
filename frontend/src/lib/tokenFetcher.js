import { getToken } from '@/lib/auth';

export class TokenFetch {
  static async fetch(url, options = {}) {
    // Ensure headers exist
    options.headers = options.headers || {};
    
    // First attempt with current token
    let token = await getToken();
    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(url, options);
    

    if (token && response.status === 401) {
        console.log('attempt token refresh')
    }

    return response
  }
}
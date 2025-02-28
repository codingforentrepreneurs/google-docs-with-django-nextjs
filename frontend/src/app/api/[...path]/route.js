import { NextResponse } from 'next/server';
import {urlJoin} from '@/lib/urlJoin';
import { TokenFetch } from '@/lib/tokenFetcher';

const DJANGO_API_URL = process.env.DJANGO_API_URL;

export async function GET(request, { params }) {
  const path = (await params).path;
  const url = urlJoin(DJANGO_API_URL, path) + request.nextUrl.search;
  try {
    const response = await TokenFetch.fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch from backend' },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const path = (await params).path;
  const url = urlJoin(DJANGO_API_URL, path)  + request.nextUrl.search;
  try {
    const body = await request.json();
    const response = await TokenFetch.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward other headers as needed
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to post to backend' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

// You can configure this to point to your backend
const CKEDITOR_LICENSE_KEY = process.env.CKEDITOR_LICENSE_KEY;

export async function GET(request) {
    return NextResponse.json({"license": CKEDITOR_LICENSE_KEY});
}

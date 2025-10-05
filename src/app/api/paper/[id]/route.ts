import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Fetching paper details for ID:', id);
    console.log('Using API base URL:', API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/api/external/paper/${id}`);
    console.log('Backend response status:', response.status);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'API request failed' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Paper Detail API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

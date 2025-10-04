import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  // Mock search results - replace with your actual search API
  const results = [
    {
      title: `Result 1 for "${query}"`,
      description: 'This is a sample search result description.',
    },
    {
      title: `Result 2 for "${query}"`,
      description: 'Another sample search result with relevant information.',
    },
    {
      title: `Result 3 for "${query}"`,
      description: 'Third search result showing matching content.',
    },
  ];

  return NextResponse.json({ results });
}

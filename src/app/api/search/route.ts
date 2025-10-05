import { NextRequest, NextResponse } from "next/server";
import type { SearchResponse } from "@/types/paper";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "0");
    const sizeParam = parseInt(searchParams.get("size") || "10");

    // Validate and limit size to max 100
    const size = Math.min(Math.max(1, sizeParam), 100);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    const params = new URLSearchParams({
      ...(query && { q: query }),
      page: page.toString(),
      size: size.toString()
    });

    const response = await fetch(
      `${apiUrl}/api/external/papers?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data: SearchResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching papers:", error);
    return NextResponse.json(
      { error: "Failed to search papers" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import type { Paper } from "@/types/paper";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  errorDetail?: {
    code: string;
    message: string;
  };
  pageMeta?: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const response = await fetch(`${apiUrl}/api/external/graph`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const apiResponse: ApiResponse<Paper[]> = await response.json();

    if (!apiResponse.success) {
      throw new Error(apiResponse.errorDetail?.message || "API request failed");
    }

    // Filter papers that have keywords
    const papers = apiResponse.data.filter(
      (paper) => paper.keywords && paper.keywords.length > 0
    );

    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error fetching papers from backend:", error);
    return NextResponse.json(
      { error: "Failed to load papers" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Paper } from "@/types/paper";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "dummy-paper.json"); // TODO api call
    const fileContents = await readFile(filePath, "utf8");
    const allPapers: Paper[] = JSON.parse(fileContents);

    // Filter papers that have keywords
    const papers = allPapers.filter(
      (paper) => paper.keywords && paper.keywords.length > 0
    );

    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error reading papers:", error);
    return NextResponse.json(
      { error: "Failed to load papers" },
      { status: 500 }
    );
  }
}

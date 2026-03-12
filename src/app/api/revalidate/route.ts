import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const results: string[] = [];

    if (body.path) {
      revalidatePath(body.path, body.type);
      results.push(`Revalidated path: ${body.path}${body.type ? ` (type: ${body.type})` : ""}`);
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: "Provide 'path' in request body. Optionally include 'type' ('page' | 'layout')." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      revalidated: true,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "POST /api/revalidate",
    description: "On-demand revalidation endpoint for ISR pages",
    usage: {
      revalidate_path: { path: "/missions" },
      revalidate_page: { path: "/missions/voyager-1", type: "page" },
      revalidate_layout: { path: "/missions", type: "layout" },
    },
    timestamp: new Date().toISOString(),
  });
}

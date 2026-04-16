import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { readFileFromStorage } from "@/lib/storage";
import path from "path";

export async function GET(req: NextRequest, { params }: { params: { fileName: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const filePath = path.join(process.env.UPLOAD_DIR || "/var/talentproof/uploads", params.fileName);
  try {
    const buffer = await readFileFromStorage(filePath);
    const ext = path.extname(params.fileName).toLowerCase();
    const contentType = ext === ".pdf" ? "application/pdf" : "image/jpeg";
    return new NextResponse(buffer, {
      headers: { "Content-Type": contentType, "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
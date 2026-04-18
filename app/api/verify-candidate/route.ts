// app/api/verify-candidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import OCRService from '@/services/ocr.services';

const ocrService = new OCRService();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No resume file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `resume-${Date.now()}-${file.name}`;
    const tempFilePath = path.join(process.cwd(), 'uploads', filename);

    // Ensure uploads folder exists
    const uploadDir = path.join(process.cwd(), 'uploads');
    await writeFile(tempFilePath, buffer);   // This will create the file

    const result = await ocrService.processResume(tempFilePath);

    // Cleanup
    await unlink(tempFilePath).catch(() => {});

    return NextResponse.json({
      success: true,
      candidate: result,
      filename: file.name
    });

  } catch (error: any) {
    console.error('Verify Candidate Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to process resume' 
    }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import OCRService from '@/services/ocr.service';

const ocrService = new OCRService();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No resume file provided' }, { status: 400 });
    }

    // Save uploaded file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = Date.now() + '-' + file.name;
    const tempFilePath = path.join(process.cwd(), 'uploads', filename);

    await writeFile(tempFilePath, buffer);

    // Process the resume
    const result = await ocrService.processResume(tempFilePath);

    // Cleanup
    await unlink(tempFilePath).catch(() => {});

    return NextResponse.json({
      success: true,
      candidate: result,
      filename: file.name
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}
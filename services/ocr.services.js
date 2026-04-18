// services/ocr.services.js
const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const pdfPoppler = require('pdf-poppler');
const { Ollama } = require('ollama');
const fs = require('fs');
const path = require('path');

const ollama = new Ollama({
  host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
});

class OCRService {
  async processResume(filePath) {
    let extractedText = '';

    try {
      if (filePath.toLowerCase().endsWith('.pdf')) {
        extractedText = await this.extractFromPDF(filePath);
      } else {
        extractedText = await this.extractFromImage(filePath);
      }
    } catch (error) {
      console.error('OCR Error:', error);
      extractedText = 'Failed to extract text from document.';
    }

    const structuredData = await this.parseWithOllama(extractedText);

    return {
      ...structuredData,
      rawText: extractedText.length > 1500 
        ? extractedText.substring(0, 1500) + '...' 
        : extractedText,
      confidence: 0.80,
      processedAt: new Date().toISOString()
    };
  }

  async extractFromPDF(pdfPath) {
    const outputDir = path.dirname(pdfPath);
    const baseName = path.basename(pdfPath, '.pdf');

    const options = {
      format: 'png',
      out_dir: outputDir,
      out_prefix: baseName,
      page: null
    };

    await pdfPoppler.convert(pdfPath, options);

    const pngFiles = fs.readdirSync(outputDir)
      .filter(f => f.startsWith(baseName) && f.endsWith('.png'));

    let fullText = '';
    for (const file of pngFiles) {
      const imagePath = path.join(outputDir, file);
      const text = await this.extractFromImage(imagePath);
      fullText += text + '\n\n';
      fs.unlinkSync(imagePath); // cleanup
    }

    return fullText.trim();
  }

  async extractFromImage(imagePath) {
    const processed = await sharp(imagePath)
      .grayscale()
      .normalize()
      .toBuffer();

    const { data: { text } } = await Tesseract.recognize(processed, 'eng');
    return text.trim();
  }

  async parseWithOllama(text) {
    const prompt = `You are an expert HR recruiter. Extract structured information from this resume.

Return **only** valid JSON (no extra text):

{
  "name": "Full Name",
  "email": "email@example.com or null",
  "phone": "phone number or null",
  "skills": ["skill1", "skill2", ...],
  "experience": [{"company": "", "role": "", "duration": ""}],
  "education": [{"degree": "", "institution": "", "year": ""}],
  "summary": "Short professional summary"
}

Resume text:
${text}`;

    try {
      const response = await ollama.chat({
        model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
        messages: [{ role: 'user', content: prompt }],
        format: 'json'
      });

      return JSON.parse(response.message.content);
    } catch (e) {
      console.error('Ollama JSON parse failed');
      return {
        name: "Parsing failed",
        email: null,
        phone: null,
        skills: [],
        experience: [],
        education: [],
        summary: "Could not parse resume"
      };
    }
  }
}

module.exports = OCRService;
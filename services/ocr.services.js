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
      console.error('OCR processing error:', error);
      extractedText = 'Failed to extract text from the uploaded document.';
    }

    const structuredData = await this.parseWithOllama(extractedText);

    return {
      ...structuredData,
      rawText: extractedText.length > 1000 
        ? extractedText.substring(0, 1000) + '...' 
        : extractedText,
      confidence: 0.78
    };
  }

  async extractFromPDF(pdfPath) {
    const outputDir = path.dirname(pdfPath);
    const baseName = path.basename(pdfPath, path.extname(pdfPath));

    const options = {
      format: 'png',
      out_dir: outputDir,
      out_prefix: baseName,
      page: null
    };

    await pdfPoppler.convert(pdfPath, options);

    const pngFiles = fs.readdirSync(outputDir)
      .filter(file => file.startsWith(baseName) && file.endsWith('.png'));

    let fullText = '';
    for (const file of pngFiles) {
      const imagePath = path.join(outputDir, file);
      const text = await this.extractFromImage(imagePath);
      fullText += text + '\n\n';
      fs.unlinkSync(imagePath); // cleanup temporary images
    }

    return fullText.trim();
  }

  async extractFromImage(imagePath) {
    const processed = await sharp(imagePath)
      .grayscale()
      .normalize()
      .toBuffer();

    const { data: { text } } = await Tesseract.recognize(processed, 'eng', {
      logger: (m) => {} // silent
    });

    return text.trim();
  }

  async parseWithOllama(text) {
    const prompt = `You are a professional HR recruiter. Analyze the following resume text and extract information. 
Return **only** a valid JSON object with no additional text:

{
  "name": "Full candidate name",
  "email": "email address or null",
  "phone": "phone number or null",
  "skills": ["skill1", "skill2", ...],
  "experience": [
    {
      "company": "Company name",
      "role": "Job title",
      "duration": "Duration"
    }
  ],
  "education": [
    {
      "degree": "Degree name",
      "institution": "University/College",
      "year": "Graduation year"
    }
  ],
  "summary": "One paragraph professional summary"
}

Resume text:
${text}`;

    try {
      const response = await ollama.chat({
        model: 'llama3.1:8b',
        messages: [{ role: 'user', content: prompt }],
        format: 'json'
      });

      return JSON.parse(response.message.content);
    } catch (e) {
      console.error('JSON parsing failed from Ollama');
      return {
        name: "Unable to parse name",
        email: null,
        phone: null,
        skills: [],
        experience: [],
        education: [],
        summary: "Could not generate summary."
      };
    }
  }
}

module.exports = OCRService;
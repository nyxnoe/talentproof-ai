const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const OCRService = require('./services/ocr.service');

dotenv.config();

const app = express();
const upload = multer({ 
  dest: process.env.UPLOAD_DIR || 'C:/talentproof/uploads',
  limits: { fileSize: 15 * 1024 * 1024 }
});

app.use(cors());
app.use(express.json());

const ocrService = new OCRService();

app.post('/api/verify-candidate', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    console.log(`Processing: ${req.file.originalname}`);

    const result = await ocrService.processResume(req.file.path);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      candidate: result,
      filename: req.file.originalname
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ TalentProof AI is running on http://localhost:${PORT}`);
  console.log(`Upload endpoint: POST /api/verify-candidate`);
});
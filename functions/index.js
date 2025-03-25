import { onRequest } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';
import axios from 'axios';
import FormData from 'form-data';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const app = express();

// Enable CORS
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
  });
  next();
});

// Parse multipart/form-data
app.use(upload.single('file'));

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Unhandled error in Express:', {
    message: err.message,
    stack: err.stack,
  });
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    // Remove stack in production for security
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

app.post('/parseResume', async (req, res) => {
  try {
    // Log request details
    console.log('parseResume request details:', {
      file: req.file ? {
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      } : 'No file uploaded',
    });

    // Validate file presence
    if (!req.file || !req.file.buffer) {
      console.log('Validation failed: No file or file buffer missing');
      return res.status(400).json({ error: 'No file uploaded or invalid file' });
    }

    // Validate API key
    const apiKey = process.env.AFFINDA_APIKEY;
    if (!apiKey) {
      console.error('Configuration error: AFFINDA_APIKEY is not set');
      return res.status(500).json({ error: 'Server configuration error: API key missing' });
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    console.log('FormData prepared for file:', req.file.originalname);

    // Call Affinda API
    console.log('Calling Affinda API with key:', apiKey.substring(0, 5) + '...');
    const response = await axios.post(
      'https://api.affinda.com/v1/resume/parse',
      formData,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          ...formData.getHeaders(),
        },
        timeout: 30000, // 30-second timeout to prevent hanging
      }
    );

    console.log('Affinda API response received successfully');
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in parseResume:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : 'No response from Affinda',
    });
    return res.status(500).json({
      error: 'Failed to parse resume',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

app.get('/helloWorld', (req, res) => {
  console.log('helloWorld request received');
  res.send('Hello from Firebase!');
});

admin.initializeApp();

export const api = onRequest(app);
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { app } from './index';

describe('POST /pdf-to-html', () => {
  it('should convert PDF to HTML and include "Dummy PDF file"', async () => {
    const pdfPath = path.join(__dirname, 'dummy.pdf');

    const response = await request(app)
      .post('/pdf-to-html')
      .attach('file', fs.readFileSync(pdfPath), {
        filename: 'dummy.pdf',
        contentType: 'application/pdf',
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Dummy PDF file');
    expect(response.text.toLowerCase()).toContain('<!doctype html>');
  });

  it('should convert PDF to text', async () => {
    const pdfPath = path.join(__dirname, 'dummy.pdf');

    const response = await request(app)
      .post('/pdf-to-text')
      .attach('file', fs.readFileSync(pdfPath), {
        filename: 'dummy.pdf',
        contentType: 'application/pdf',
      });

    expect(response.status).toBe(200);
    console.log(response.text);
    expect(response.text).toContain('Dummy PDF file');
  });
});

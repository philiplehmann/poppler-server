import { spawn } from 'child_process';
import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const PORT = process.env.PORT || '5000';

const app = express();

app.post('/pdf-to-text', async (req, res) => {
  const pdfToText = spawn('pdftotext', ['-', '-']);
  req.pipe(pdfToText.stdin);
  pdfToText.stdout.pipe(res);
});

app.post('/pdf-to-html', async (req, res) => {
  const tempPdfPath = path.join(__dirname, `${uuidv4()}.pdf`);
  const tempHtmlPath = path.join(__dirname, `${uuidv4()}.html`);

  const writeStream = fs.createWriteStream(tempPdfPath);
  req.pipe(writeStream);

  writeStream.on('finish', () => {
    const pdfToHtml = spawn('pdftohtml', [
      '-noframes',
      tempPdfPath,
      tempHtmlPath,
    ]);

    pdfToHtml.on('exit', () => {
      const readStream = fs.createReadStream(tempHtmlPath);
      readStream.pipe(res);

      readStream.on('end', () => {
        fs.unlink(tempPdfPath, (err) => {
          if (err) console.error(`Error deleting temp PDF file: ${err}`);
        });
        fs.unlink(tempHtmlPath, (err) => {
          if (err) console.error(`Error deleting temp HTML file: ${err}`);
        });
      });
    });
  });
});

app.listen(Number(PORT), () => {
  console.log('start poppler server on ', PORT);
});

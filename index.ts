import { spawn } from 'node:child_process';
import { finished } from 'node:stream/promises';
import http from 'node:http';

const PORT = process.env.PORT || '5000';

const server = http
  .createServer((req, res) => {
    if (req.method !== 'POST') {
      res.writeHead(Number(http.STATUS_CODES.METHOD_NOT_ALLOWED));
      return res.end();
    }

    if (req.url === '/pdf-to-text') {
      const pdfToText = spawn('pdftotext', ['-', '-']);
      req.pipe(pdfToText.stdin);
      return pdfToText.stdout.pipe(res);
    }

    if (req.url === '/pdf-to-html') {
      const pdfToHtml = spawn('pdftohtml', ['-stdout', '-noframes', '-', '-']);
      req.pipe(pdfToHtml.stdin);
      return pdfToHtml.stdout.pipe(res);
    }
  })
  .listen(PORT, () => {
    console.log('start poppler server on ', PORT);
  });

process.on('exit', () => {
  server.close();
});

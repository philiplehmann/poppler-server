import fs from 'node:fs';
import http from 'node:http';
import { readableToBuffer } from './readable_to_buffer';

export const request = ({
  file,
  ...requestParams
}: http.RequestOptions & { file: string }): Promise<[http.IncomingMessage, string]> => {
  const readStream = fs.createReadStream(file);
  return new Promise((resolve, reject) => {
    const req = http.request(requestParams, async (response) => {
      try {
        const text = (await readableToBuffer(response)).toString();
        resolve([response, text]);
      } catch (e) {
        reject(e);
      }
    });
    readStream.pipe(req, { end: true });
  });
};

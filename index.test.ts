import { GenericContainer, StartedTestContainer } from 'testcontainers';
import path from 'node:path';
import { request } from './test/request';

const containerPort = 3000;

jest.setTimeout(60_000);

describe('POST /pdf-to-html', () => {
  let container: StartedTestContainer;
  let port: number;

  beforeAll(async () => {
    container = await new GenericContainer('philiplehmann/poppler-server:latest')
      .withEnvironment({ PORT: String(containerPort) })
      .withExposedPorts(containerPort)
      .start();

    port = container.getMappedPort(containerPort);
  });

  afterAll(async () => {
    await container.stop();
  });

  it('should convert PDF to text', async () => {
    const file = path.resolve('dummy.pdf');
    const [response, text] = await request({
      method: 'POST',
      host: 'localhost',
      port,
      path: '/pdf-to-text',
      headers: { 'Content-Type': 'application/pdf' },
      file,
    });

    expect(response.statusCode).toBe(200);
    expect(text).toContain('Dummy PDF file');
  });

  it('should convert PDF to HTML and include "Dummy PDF file"', async () => {
    // await new Promise(() => {});
    const file = path.resolve('dummy.pdf');
    const [response, text] = await request({
      method: 'POST',
      host: 'localhost',
      port,
      path: '/pdf-to-html',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      file,
    });

    expect(response.statusCode).toBe(200);
    expect(text).toContain('Dummy PDF file');
    expect(text.toLowerCase()).toContain('<!doctype html>');
  });
});

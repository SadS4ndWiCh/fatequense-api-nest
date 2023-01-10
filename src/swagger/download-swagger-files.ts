import { createWriteStream } from 'node:fs';
import { get } from 'node:http';

const downloadFile = (url: string, filename: string): void => {
  get(url, (res) => {
    res
      .pipe(
        createWriteStream(`src/swagger/static/${filename}`, { flags: 'w+' }),
      )
      .once('close', () =>
        console.log(
          `[SWAGGER]: Swagger UI file written to: '/static/${filename}'`,
        ),
      );
  });
};

export const downloadSwaggerFiles = (port: string, path: string): void => {
  const baseUrl = `http://localhost:${port}/${path}`;

  const swaggerFilesToDownload = [
    'swagger-ui-bundle.js',
    'swagger-ui-init.js',
    'swagger-ui-standalone-preset.js',
    'swagger-ui.css',
  ];

  for (const filename of swaggerFilesToDownload) {
    downloadFile(`${baseUrl}/${filename}`, filename);
  }
};

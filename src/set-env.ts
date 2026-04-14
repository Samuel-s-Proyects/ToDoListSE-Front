import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProd = process.argv.includes('--production');
const envFile = isProd ? '.env.production' : '.env';

config({ path: resolve(__dirname, '..', envFile) });

const apiKey = process.env['API_KEY'] || '';
const apiBaseUrl = process.env['API_BASE_URL'] || '';

const envFileContent = `export const environment = {
  production: ${isProd},
  apiBaseUrl: "${apiBaseUrl}",
  apiKey: "${apiKey}",
};
`;

const targetPath = isProd
  ? resolve(__dirname, 'environments', 'environment.prod.ts')
  : resolve(__dirname, 'environments', 'environment.ts');

writeFileSync(targetPath, envFileContent, { encoding: 'utf-8' });

const label = isProd ? 'environment.prod.ts' : 'environment.ts';
console.log(`Generated ${label} from ${envFile}`);

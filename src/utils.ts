import { dirname, resolve } from 'path';

const __filename = resolve(process.cwd(), process.argv[1]);
const __dirname = dirname(__filename);

export default __dirname;

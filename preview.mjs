import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
const root = fileURLToPath(new URL('./public/', import.meta.url));
const args = process.argv.slice(2);
const argument = (key, fallback) => { const i = args.indexOf(key); return i >= 0 ? (args[i + 1] || fallback) : fallback; };
const port = Number(argument('--port', process.env.PORT || '3000'));
const host = argument('--host', '127.0.0.1');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webp':'image/webp', '.png':'image/png', '.txt':'text/plain; charset=utf-8' };
createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const path = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!path.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); return res.end('Forbidden'); }
    if (!(await stat(path)).isFile()) { res.writeHead(404); return res.end('Not found'); }
    const body = await readFile(path);
    res.writeHead(200, {'Content-Type':types[extname(path)] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, host, () => console.log(`Preview: http://localhost:${port}`));

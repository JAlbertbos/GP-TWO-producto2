const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Petición ${req.method} ${req.url}`);

  // Obtener la ruta del archivo solicitado
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = 'Producto2/Dashboard.html';
  }

  // Obtener la extensión del archivo solicitado
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }

  // Leer el archivo solicitado
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Archivo no encontrado
        res.writeHead(404);
        res.end('Archivo no encontrado');
      } else {
        // Otro error
        res.writeHead(500);
        res.end(`Error interno del servidor: ${err.code}`);
      }
    } else {
      // Archivo encontrado
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });

});

server.listen(port, hostname, () => {
  console.log(`Servidor web iniciado en http://${hostname}:${port}/`);
});
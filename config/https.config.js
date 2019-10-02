const path = require('path');
const fs = require('fs');

function getHttpsCerts() {
  const dir = path.join(__dirname, '/httpsCerts');

  const keyPath = path.join(dir, 'localhost-key.pem');
  const certPath = path.join(dir, 'localhost.pem');

  const key = fs.readFileSync(keyPath, 'utf8');
  const cert = fs.readFileSync(certPath, 'utf8');

  return {
    key,
    cert
  };
}

module.exports = getHttpsCerts;

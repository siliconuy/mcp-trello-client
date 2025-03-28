#!/usr/bin/env node

const apiKey = process.env.TRELLO_API_KEY;

if (!apiKey) {
  console.error('Error: TRELLO_API_KEY es requerida');
  console.error('Ejecuta el script así: TRELLO_API_KEY=tu-api-key node get-token.js');
  process.exit(1);
}

const authUrl = `https://trello.com/1/authorize?expiration=never&name=MCP%20Trello%20Client&scope=read,write&response_type=token&key=${apiKey}`;

console.log('Abriendo navegador para autorización...');
console.log('\nPor favor:');
console.log('1. Inicia sesión en Trello si es necesario');
console.log('2. Haz clic en "Permitir" para autorizar la aplicación');
console.log('3. Copia el token que se muestra en la página\n');

const openCommand = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
const { exec } = require('child_process');
exec(`${openCommand} "${authUrl}"`);
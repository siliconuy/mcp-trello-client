# MCP Trello Client

Cliente MCP para interactuar con Trello como usuario PM. Este servidor proporciona herramientas para gestionar tableros, listas, tarjetas y más a través de la API de Trello.

## Características

- Gestión de tableros
- Manejo de listas y tarjetas
- Asignación de miembros
- Gestión de etiquetas
- Movimiento de tarjetas entre listas
- Comentarios y adjuntos

## Instalación

```bash
npm install
npm run build
```

## Configuración de Credenciales

Para usar este servidor MCP, necesitas obtener dos credenciales de Trello:
1. API Key (Clave API)
2. Token

### Obtener la API Key

1. Ve a [https://trello.com/app-key](https://trello.com/app-key)
2. Inicia sesión en tu cuenta de Trello si no lo has hecho
3. En la sección "Developer API Keys", encontrarás tu API Key personal

### Obtener el Token

1. Una vez que tengas tu API Key, haz clic en el enlace "Token" en la misma página
2. Autoriza a la aplicación para acceder a tu cuenta de Trello
3. Se te mostrará el token que puedes usar con esta aplicación

### Configurar el Servidor MCP

Las credenciales se deben configurar en el archivo de configuración MCP:

```json
{
  "mcpServers": {
    "trello": {
      "command": "node",
      "args": ["path/to/build/index.js"],
      "env": {
        "TRELLO_API_KEY": "tu-api-key",
        "TRELLO_TOKEN": "tu-token"
      }
    }
  }
}
```

## Herramientas Disponibles

### `list_boards`
Lista todos los tableros a los que tiene acceso el usuario.

Ejemplo:
```javascript
{
  "name": "list_boards"
}
```

### `get_board_details`
Obtiene los detalles de un tablero específico, incluyendo listas, miembros y etiquetas.

Ejemplo:
```javascript
{
  "name": "get_board_details",
  "arguments": {
    "boardId": "5e1234567890abcd"
  }
}
```

### `get_list_cards`
Lista todas las tarjetas en una lista específica.

Ejemplo:
```javascript
{
  "name": "get_list_cards",
  "arguments": {
    "listId": "5e1234567890abcd"
  }
}
```

### `move_card`
Mueve una tarjeta a una lista diferente.

Ejemplo:
```javascript
{
  "name": "move_card",
  "arguments": {
    "cardId": "5e1234567890abcd",
    "listId": "5e1234567890efgh"
  }
}
```

### `add_comment`
Agrega un comentario a una tarjeta.

Ejemplo:
```javascript
{
  "name": "add_comment",
  "arguments": {
    "cardId": "5e1234567890abcd",
    "text": "Este es un comentario de prueba"
  }
}
```

### `assign_member`
Asigna un miembro a una tarjeta.

Ejemplo:
```javascript
{
  "name": "assign_member",
  "arguments": {
    "cardId": "5e1234567890abcd",
    "memberId": "5e1234567890ijkl"
  }
}
```

## Desarrollo

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

## Pruebas

Para ejecutar las pruebas:

```bash
npm test
```

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: Agrega una nueva característica'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request
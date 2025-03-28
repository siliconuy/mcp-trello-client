# MCP Trello Client

Cliente MCP para interactuar con Trello a través de la API de Atlassian Cloud. Este servidor proporciona herramientas para gestionar tableros, listas, tarjetas y más.

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

## Configuración

### Obtener un Token de API de Atlassian

1. Ve a [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Haz clic en "Create API token"
3. Nombra tu token (por ejemplo: "MCP Trello Client")
4. Copia el token generado

### Configurar el Servidor MCP

El token de API de Atlassian se debe configurar en el archivo de configuración MCP:

```json
{
  "mcpServers": {
    "trello": {
      "command": "node",
      "args": ["path/to/build/index.js"],
      "env": {
        "TRELLO_TOKEN": "tu-token-de-api-de-atlassian"
      }
    }
  }
}
```

## Herramientas Disponibles

### `list_boards`
Lista todos los tableros a los que tienes acceso.

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
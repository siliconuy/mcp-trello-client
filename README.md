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

## Configuración

El servidor requiere un token de API de Trello y una clave de API. Estos se pueden obtener en:
https://trello.com/app-key

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

## Herramientas disponibles

### `list_boards`
Lista todos los tableros a los que tiene acceso el usuario.

### `get_board`
Obtiene los detalles de un tablero específico.

### `list_cards`
Lista todas las tarjetas en una lista o tablero.

### `move_card`
Mueve una tarjeta a una lista diferente.

### `add_comment`
Agrega un comentario a una tarjeta.

### `assign_member`
Asigna un miembro a una tarjeta.

## Desarrollo

```bash
npm run dev
```

## Pruebas

```bash
npm test
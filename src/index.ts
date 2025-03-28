#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { TrelloAPI } from './trello/api.js';

const API_KEY = process.env.TRELLO_API_KEY;
const TOKEN = process.env.TRELLO_TOKEN;

if (!API_KEY) {
  throw new Error('TRELLO_API_KEY es requerida');
}

class TrelloServer {
  private server: Server;
  private trello: TrelloAPI;
  private readonly readOnly: boolean;

  constructor() {
    this.readOnly = !TOKEN;
    this.trello = new TrelloAPI(API_KEY!, TOKEN);
    
    const modeText = this.readOnly ? ' (Modo Solo Lectura)' : '';
    this.server = new Server(
      {
        name: 'trello-client',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });

    if (this.readOnly) {
      console.error('Iniciando en modo solo lectura - algunas operaciones no estarán disponibles');
      console.error('Para acceso completo, proporciona TRELLO_TOKEN en la configuración');
    }
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'list_boards',
          description: 'Lista los tableros accesibles' + (this.readOnly ? ' (públicos)' : ''),
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'get_board_details',
          description: 'Obtiene detalles de un tablero específico',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID del tablero',
              },
            },
            required: ['boardId'],
          },
        },
        {
          name: 'get_list_cards',
          description: 'Obtiene las tarjetas de una lista',
          inputSchema: {
            type: 'object',
            properties: {
              listId: {
                type: 'string',
                description: 'ID de la lista',
              },
            },
            required: ['listId'],
          },
        },
        ...(!this.readOnly ? [
          {
            name: 'move_card',
            description: 'Mueve una tarjeta a otra lista',
            inputSchema: {
              type: 'object',
              properties: {
                cardId: {
                  type: 'string',
                  description: 'ID de la tarjeta',
                },
                listId: {
                  type: 'string',
                  description: 'ID de la lista destino',
                },
              },
              required: ['cardId', 'listId'],
            },
          },
          {
            name: 'add_comment',
            description: 'Agrega un comentario a una tarjeta',
            inputSchema: {
              type: 'object',
              properties: {
                cardId: {
                  type: 'string',
                  description: 'ID de la tarjeta',
                },
                text: {
                  type: 'string',
                  description: 'Texto del comentario',
                },
              },
              required: ['cardId', 'text'],
            },
          },
          {
            name: 'assign_member',
            description: 'Asigna un miembro a una tarjeta',
            inputSchema: {
              type: 'object',
              properties: {
                cardId: {
                  type: 'string',
                  description: 'ID de la tarjeta',
                },
                memberId: {
                  type: 'string',
                  description: 'ID del miembro',
                },
              },
              required: ['cardId', 'memberId'],
            },
          },
        ] : []),
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        switch (request.params.name) {
          case 'list_boards': {
            const boards = await this.trello.getBoards();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(boards, null, 2),
                },
              ],
            };
          }

          case 'get_board_details': {
            const { boardId } = request.params.arguments as { boardId: string };
            const board = await this.trello.getBoard(boardId);
            const lists = await this.trello.getBoardLists(boardId);
            const members = await this.trello.getBoardMembers(boardId);
            const labels = await this.trello.getBoardLabels(boardId);

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      board,
                      lists,
                      members,
                      labels,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          case 'get_list_cards': {
            const { listId } = request.params.arguments as { listId: string };
            const cards = await this.trello.getListCards(listId);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(cards, null, 2),
                },
              ],
            };
          }

          case 'move_card': {
            if (this.readOnly) {
              throw new McpError(
                ErrorCode.InvalidRequest,
                'Operación no disponible en modo solo lectura'
              );
            }

            const { cardId, listId } = request.params.arguments as {
              cardId: string;
              listId: string;
            };
            const updatedCard = await this.trello.moveCard(cardId, listId);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(updatedCard, null, 2),
                },
              ],
            };
          }

          case 'add_comment': {
            if (this.readOnly) {
              throw new McpError(
                ErrorCode.InvalidRequest,
                'Operación no disponible en modo solo lectura'
              );
            }

            const { cardId, text } = request.params.arguments as {
              cardId: string;
              text: string;
            };
            const comment = await this.trello.addComment(cardId, text);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(comment, null, 2),
                },
              ],
            };
          }

          case 'assign_member': {
            if (this.readOnly) {
              throw new McpError(
                ErrorCode.InvalidRequest,
                'Operación no disponible en modo solo lectura'
              );
            }

            const { cardId, memberId } = request.params.arguments as {
              cardId: string;
              memberId: string;
            };
            await this.trello.assignMember(cardId, memberId);
            return {
              content: [
                {
                  type: 'text',
                  text: 'Miembro asignado exitosamente',
                },
              ],
            };
          }

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Herramienta desconocida: ${request.params.name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) throw error;
        throw new McpError(
          ErrorCode.InternalError,
          `Error de Trello: ${(error as Error).message}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Servidor MCP Trello ejecutándose en stdio');
  }
}

const server = new TrelloServer();
server.run().catch(console.error);
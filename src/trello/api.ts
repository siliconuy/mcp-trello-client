import axios, { AxiosInstance } from 'axios';
import {
  TrelloBoard,
  TrelloList,
  TrelloCard,
  TrelloMember,
  TrelloLabel,
  TrelloComment,
  TrelloAttachment,
} from './types.js';

export class TrelloAPI {
  private client: AxiosInstance;

  constructor(apiKey: string, token: string) {
    this.client = axios.create({
      baseURL: 'https://api.trello.com/1',
      params: {
        key: apiKey,
        token: token,
      },
    });
  }

  // Boards
  async getBoards(): Promise<TrelloBoard[]> {
    const response = await this.client.get('/members/me/boards');
    return response.data;
  }

  async getBoard(boardId: string): Promise<TrelloBoard> {
    const response = await this.client.get(`/boards/${boardId}`);
    return response.data;
  }

  // Lists
  async getBoardLists(boardId: string): Promise<TrelloList[]> {
    const response = await this.client.get(`/boards/${boardId}/lists`);
    return response.data;
  }

  // Cards
  async getListCards(listId: string): Promise<TrelloCard[]> {
    const response = await this.client.get(`/lists/${listId}/cards`);
    return response.data;
  }

  async getBoardCards(boardId: string): Promise<TrelloCard[]> {
    const response = await this.client.get(`/boards/${boardId}/cards`);
    return response.data;
  }

  async moveCard(cardId: string, listId: string): Promise<TrelloCard> {
    const response = await this.client.put(`/cards/${cardId}`, {
      idList: listId,
    });
    return response.data;
  }

  // Comments
  async addComment(cardId: string, text: string): Promise<TrelloComment> {
    const response = await this.client.post(`/cards/${cardId}/actions/comments`, {
      text,
    });
    return response.data;
  }

  async getCardComments(cardId: string): Promise<TrelloComment[]> {
    const response = await this.client.get(`/cards/${cardId}/actions`, {
      params: {
        filter: 'commentCard',
      },
    });
    return response.data;
  }

  // Members
  async assignMember(cardId: string, memberId: string): Promise<void> {
    await this.client.post(`/cards/${cardId}/idMembers`, {
      value: memberId,
    });
  }

  async removeMember(cardId: string, memberId: string): Promise<void> {
    await this.client.delete(`/cards/${cardId}/idMembers/${memberId}`);
  }

  async getBoardMembers(boardId: string): Promise<TrelloMember[]> {
    const response = await this.client.get(`/boards/${boardId}/members`);
    return response.data;
  }

  // Labels
  async getBoardLabels(boardId: string): Promise<TrelloLabel[]> {
    const response = await this.client.get(`/boards/${boardId}/labels`);
    return response.data;
  }

  async addLabelToCard(cardId: string, labelId: string): Promise<void> {
    await this.client.post(`/cards/${cardId}/idLabels`, {
      value: labelId,
    });
  }

  async removeLabelFromCard(cardId: string, labelId: string): Promise<void> {
    await this.client.delete(`/cards/${cardId}/idLabels/${labelId}`);
  }

  // Attachments
  async getCardAttachments(cardId: string): Promise<TrelloAttachment[]> {
    const response = await this.client.get(`/cards/${cardId}/attachments`);
    return response.data;
  }

  async addAttachment(cardId: string, url: string, name?: string): Promise<TrelloAttachment> {
    const response = await this.client.post(`/cards/${cardId}/attachments`, {
      url,
      name,
    });
    return response.data;
  }
}
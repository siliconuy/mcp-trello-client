import axios from 'axios';
export class TrelloAPI {
    constructor(apiKey, token) {
        this.client = axios.create({
            baseURL: 'https://api.trello.com/1',
            params: {
                key: apiKey,
                token: token,
            },
        });
    }
    // Boards
    async getBoards() {
        const response = await this.client.get('/members/me/boards');
        return response.data;
    }
    async getBoard(boardId) {
        const response = await this.client.get(`/boards/${boardId}`);
        return response.data;
    }
    // Lists
    async getBoardLists(boardId) {
        const response = await this.client.get(`/boards/${boardId}/lists`);
        return response.data;
    }
    // Cards
    async getListCards(listId) {
        const response = await this.client.get(`/lists/${listId}/cards`);
        return response.data;
    }
    async getBoardCards(boardId) {
        const response = await this.client.get(`/boards/${boardId}/cards`);
        return response.data;
    }
    async moveCard(cardId, listId) {
        const response = await this.client.put(`/cards/${cardId}`, {
            idList: listId,
        });
        return response.data;
    }
    // Comments
    async addComment(cardId, text) {
        const response = await this.client.post(`/cards/${cardId}/actions/comments`, {
            text,
        });
        return response.data;
    }
    async getCardComments(cardId) {
        const response = await this.client.get(`/cards/${cardId}/actions`, {
            params: {
                filter: 'commentCard',
            },
        });
        return response.data;
    }
    // Members
    async assignMember(cardId, memberId) {
        await this.client.post(`/cards/${cardId}/idMembers`, {
            value: memberId,
        });
    }
    async removeMember(cardId, memberId) {
        await this.client.delete(`/cards/${cardId}/idMembers/${memberId}`);
    }
    async getBoardMembers(boardId) {
        const response = await this.client.get(`/boards/${boardId}/members`);
        return response.data;
    }
    // Labels
    async getBoardLabels(boardId) {
        const response = await this.client.get(`/boards/${boardId}/labels`);
        return response.data;
    }
    async addLabelToCard(cardId, labelId) {
        await this.client.post(`/cards/${cardId}/idLabels`, {
            value: labelId,
        });
    }
    async removeLabelFromCard(cardId, labelId) {
        await this.client.delete(`/cards/${cardId}/idLabels/${labelId}`);
    }
    // Attachments
    async getCardAttachments(cardId) {
        const response = await this.client.get(`/cards/${cardId}/attachments`);
        return response.data;
    }
    async addAttachment(cardId, url, name) {
        const response = await this.client.post(`/cards/${cardId}/attachments`, {
            url,
            name,
        });
        return response.data;
    }
}

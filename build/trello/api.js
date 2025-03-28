import axios from 'axios';
export class TrelloAPI {
    constructor(apiKey, token) {
        this.readOnly = !token;
        this.client = axios.create({
            baseURL: 'https://api.trello.com/1',
            params: {
                key: apiKey,
                ...(token ? { token } : {}),
            },
        });
    }
    checkWriteAccess() {
        if (this.readOnly) {
            throw new Error('Esta operación requiere un token de acceso. Actualmente el cliente está en modo solo lectura.');
        }
    }
    // Boards - Operaciones de Lectura
    async getBoards() {
        if (this.readOnly) {
            // En modo solo lectura, obtener tableros públicos
            const response = await this.client.get('/members/public/boards');
            return response.data;
        }
        const response = await this.client.get('/members/me/boards');
        return response.data;
    }
    async getBoard(boardId) {
        const response = await this.client.get(`/boards/${boardId}`);
        return response.data;
    }
    // Lists - Operaciones de Lectura
    async getBoardLists(boardId) {
        const response = await this.client.get(`/boards/${boardId}/lists`);
        return response.data;
    }
    // Cards - Operaciones de Lectura
    async getListCards(listId) {
        const response = await this.client.get(`/lists/${listId}/cards`);
        return response.data;
    }
    async getBoardCards(boardId) {
        const response = await this.client.get(`/boards/${boardId}/cards`);
        return response.data;
    }
    // Cards - Operaciones de Escritura
    async moveCard(cardId, listId) {
        this.checkWriteAccess();
        const response = await this.client.put(`/cards/${cardId}`, {
            idList: listId,
        });
        return response.data;
    }
    // Comments - Requieren Token
    async addComment(cardId, text) {
        this.checkWriteAccess();
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
    // Members - Operaciones Mixtas
    async assignMember(cardId, memberId) {
        this.checkWriteAccess();
        await this.client.post(`/cards/${cardId}/idMembers`, {
            value: memberId,
        });
    }
    async removeMember(cardId, memberId) {
        this.checkWriteAccess();
        await this.client.delete(`/cards/${cardId}/idMembers/${memberId}`);
    }
    async getBoardMembers(boardId) {
        const response = await this.client.get(`/boards/${boardId}/members`);
        return response.data;
    }
    // Labels - Operaciones Mixtas
    async getBoardLabels(boardId) {
        const response = await this.client.get(`/boards/${boardId}/labels`);
        return response.data;
    }
    async addLabelToCard(cardId, labelId) {
        this.checkWriteAccess();
        await this.client.post(`/cards/${cardId}/idLabels`, {
            value: labelId,
        });
    }
    async removeLabelFromCard(cardId, labelId) {
        this.checkWriteAccess();
        await this.client.delete(`/cards/${cardId}/idLabels/${labelId}`);
    }
    // Attachments - Operaciones de Escritura
    async getCardAttachments(cardId) {
        const response = await this.client.get(`/cards/${cardId}/attachments`);
        return response.data;
    }
    async addAttachment(cardId, url, name) {
        this.checkWriteAccess();
        const response = await this.client.post(`/cards/${cardId}/attachments`, {
            url,
            name,
        });
        return response.data;
    }
}

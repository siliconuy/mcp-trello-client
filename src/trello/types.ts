export interface TrelloBoard {
  id: string;
  name: string;
  desc: string;
  closed: boolean;
  idOrganization: string;
  url: string;
}

export interface TrelloList {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  closed: boolean;
  idBoard: string;
  idList: string;
  pos: number;
  due: string | null;
  dueComplete: boolean;
  idMembers: string[];
  idLabels: string[];
}

export interface TrelloMember {
  id: string;
  fullName: string;
  username: string;
}

export interface TrelloLabel {
  id: string;
  name: string;
  color: string;
  idBoard: string;
}

export interface TrelloComment {
  id: string;
  idCard: string;
  text: string;
  memberCreator: {
    id: string;
    fullName: string;
    username: string;
  };
}

export interface TrelloAttachment {
  id: string;
  name: string;
  url: string;
  fileName: string;
  mimeType: string;
}
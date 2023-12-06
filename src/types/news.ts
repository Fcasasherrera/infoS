export enum IdNewsType {
  Recordatorio = 1,
  Aviso = 2,
  ComunicadoGeneral = 3,
  Urgente = 4,
  DatoCurioso = 5,
}

export enum NameNewsType {
  Recordatorio = 'Recordatorio',
  Aviso = 'Aviso',
  ComunicadoGeneral = 'Comunicado general',
  Urgente = 'Urgente',
  DatoCurioso = 'Dato Curioso',
}
export interface NewsType {
  id?: IdNewsType;
  type?: NameNewsType;
  enable?: number;
}
export type NewsTypes = Array<NewsType>;

export type File = {
  object?: string;
  type?: string;
  filename?: string;
  created?: string;
  updated?: string;
  hash?: string;
  enable?: number;
};

/** Endpoint types */
export interface NewsRequest {
  type: IdNewsType | null;
  title: string;
  body: string;
  idFile?: number | null;
  idThumbnail?: number | null;
  startdate?: any;
  enddate?: string;
}

export interface NewUserData {
  residence: string;
  phone: string;
}

export interface NewsForm extends NewsRequest {
  newsType: NameNewsType;
  file?: string;
}
/** */
export interface NewsFile {
  id?: number;
  object?: string;
  size?: number;
  type?: string;
  name?: string;
  created?: string;
  updated?: string;
  hash?: string;
  isthumbnail?: number;
  enabled?: number;
  base64?: string;
}
export default interface News {
  id?: number;
  idClient?: number;
  idUser?: number;
  idFile?: number | null;
  idFileThumbnail?: number | null;
  idThumbnail?: number | null;
  idType?: IdNewsType;
  title?: string;
  body?: string;
  created?: string;
  updated?: string;
  startdate?: string;
  enddate?: string;
  enable?: number;
  type?: any;
  // extras
  thumbnailData?: NewsFile;
  fileData?: NewsFile;
}

// Actions types
export const SET_SELECTED_NEWS = '@NEWS/SET_SELECTED_NEWS';

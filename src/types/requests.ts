export type TypeStatusType =
  | 'Pending'
  | 'Aproved'
  | 'Rejected'
  | 'Cancelled'
  | 'Resolved';
export interface StatusType {
  id?: number;
  status?: TypeStatusType;
  enable?: number;
}
export type StatusTypes = Array<StatusType>;

export enum EnumStatus {
  pending = 1,
  approved = 2,
  rejected = 3,
  cancelled = 4,
  resolved = 5,
}

export enum IdRequestType {
  Holiday = 1,
  Disability = 2,
  Other = 3,
}

export enum NameRequestType {
  Vacaciones = 'Vacaciones',
  Incapacidad = 'Incapacidad',
}
export interface RequestType {
  id?: IdRequestType;
  type?: NameRequestType;
  accountables?: string;
  informed?: string | null;
  responsibles?: string | null;
  approvalQuorum?: number;
  enable?: number;
}
export type RequestsTypes = Array<RequestType>;

export interface ListRequestsTypes {
  id: IdRequestType;
  key: string;
  type: NameRequestType;
  icon: string;
  widthIcon: number;
  heightIcon: number;
}

// POST TYPES REQUEST
export interface BodyNewRequest {
  id?: number;
  type: IdRequestType | null;
  comments: string;
  additional_info: {
    days?: any;
    startdate?: string;
    enddate?: string;
    idClient: number;
    idFile?: number | null;
    idThumbnail?: number | null;
  };
}

export enum RequestsStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
  Cancelled = 4,
}

interface AditionalInfoType {
  id: number;
  idRequest: number;
  days: number;
  startdate: string;
  enddate: string;
  idFile?: number;
  idThumbnail?: number;
}

interface Person {
  birthday: string | null;
  created: string;
  enable: boolean;
  firstname: string;
  gender: string;
  id: number;
  idClient: number;
  lastname: string;
  nickname: string;
  updated: string;
}

interface Employee {
  admissiondate: string;
  cellphone: string;
  created: string;
  email: string;
  enable: number;
  id: number;
  idClient: number;
  idPerson: number;
  idPosition: number;
  idUser: number;
  person: Person;
  phone: string;
  totalholidays: number;
  updated: string;
  usedholidays: number;
  workingyear: string;
}

export interface RejectedCommentsTypes {
  person_name: string;
  comment: string;
}

export interface RejectedCommentsTypes {
  person_name: string;
  comment: string;
}

export interface UserRequest {
  id: number;
  idClient?: number;
  idEmployee?: number;
  idRequestType: number;
  idRequestStatus: number;
  comments: string;
  responsibles?: string | null;
  created: Date;
  updated: Date;
  employee: Employee;
  rejected_comments?: Array<RejectedCommentsTypes>;
  'additional info': AditionalInfoType;
}

export interface ApproveRequestData {
  id?: number;
  idRequestStatus?: number;
  status_comments: string;
}

export interface ResolveRequestData {
  id?: number;
  idRequestStatus?: number;
  status_comments: string;
}

export interface UpdateRequestData {
  id?: number;
  idRequestStatus?: number;
  status_comments: string;
}

export type Requests = Array<UserRequest>;

// Actions types
export const SET_SELECTED_REQUESTS = 'SET_REQUESTS';
export const ADD_REQUEST = 'ADD_REQUEST';

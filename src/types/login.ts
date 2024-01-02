export interface SessionData {
  NoNomina: string;
  baseDatosPermisos?: string;
  user_description: string;
  user_display_name: string;
  user_groups?: Array<any>;
  user_key: string;
  user_last_logon: number;
  user_name: string;
}
export interface IsLoggedData {
  NoNomina: string;
  NombreCompleto: string;
  Ingreso: string;
  Antiguedad: string;
  FechaInicio: string;
  FechaFinal: string;
  Saldo_Vacacional: string;
}
export interface UserLoginInterface {
  created?: string;
  employee?: any;
  enable?: 0 | 1;
  id?: number;
  idClient?: number;
  idPerson?: number;
  idRole?: number;
  otp?: any;
  otptime?: string;
  passwordrecovery?: number;
  person?: any;
  role?: any;
  updated?: string;
  username?: string;
}

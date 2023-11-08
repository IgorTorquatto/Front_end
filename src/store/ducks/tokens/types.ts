/**
 * Action types
 */
export enum TokensTypes {
  LOAD_SESSION = '@user/LOAD_SESSION',
  LOAD_LOGOUT = '@user/LOAD_LOGOUT',
  LOAD_SESSIONSUCCCES = '@user/LOAD_SESSIONSUCCCES',
  LOAD_SESSIONFAILURE = '@user/LOAD_SESSIONFAILURE',
}

/**
 * Data types
 */
export interface User {
  id: string,
  id_pessoa: string,
  crm: string,
  email: string,
  senha: string,
  especialidade: string,
  pessoa: {
    id: string,
    cpf: string,
    data_nascimento: string,
    nome: string,
    telefone: string,
    cargo: string
  }
}

export interface TokenData {
  user: User,
  crm: string,
  logged: boolean,
}

/**
 * State type
 */
export interface TokenState {
  readonly data: TokenData
  readonly loading: boolean
  readonly error: boolean
}

export interface TokenStateFromback {
  readonly data: TokenData
}


export interface IntLogin {
  email: string,
  password: string,
  role: string
}

export interface IntRegister {
  email: string;
  password: string;
  username: string;
  role: string;
}
export interface Auth {
  token: null,
  userId: null,
}

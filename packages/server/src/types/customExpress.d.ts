declare namespace Express {
  interface User {
    id: string;
    [x: string]: any;
  }

  export interface Request {
    user: User;
  }
  export interface Response {
    user: User;
  }
}

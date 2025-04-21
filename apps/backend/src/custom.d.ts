type User = {
    id: string;
    role: string;
    email: string;
  };
  
  declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }
  
  export {}; // ini penting supaya dianggap sebagai module
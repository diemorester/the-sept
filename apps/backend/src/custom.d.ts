type User = {
  id: string;
  role: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      file?: {
        filename: string;
        path?: string;
        mimetype?: string;
      };
      user?: User;
    }
  }
}

export { }; // ini penting supaya dianggap sebagai module
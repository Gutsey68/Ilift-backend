declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        pseudo: string;
        email?: string;
        roleId?: string;
        iat?: number;
        exp?: number;
      };
      refreshPayload?: {
        id: string;
        pseudo: string;
        email?: string;
        roleId?: string;
        iat?: number;
        exp?: number;
      };
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}

export {};

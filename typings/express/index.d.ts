// typings/express.d.ts

interface ResponseBody {
   success: boolean; 
   message?: string;
   [key: string]: string;
}

declare module Express {
   export interface Request {
      user: import("../../models/mongo/UserModel").UserDocument | import("../../models/mongo/EmployerModel").EmployerDocument | import("../../models/mongo/EmployeeModel").EmployeeModel,
      files: {[key: string]: {
         data: Buffer,
         name: string,
         size: number
      }},
   }
}
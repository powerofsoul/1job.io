// typings/express.d.ts

declare module Express {
   interface Request {
      user: import("../../models/UserModel").User,
      files: {[key: string]: {
         data: Buffer,
         name: string,
         size: number
      }}
   }
}

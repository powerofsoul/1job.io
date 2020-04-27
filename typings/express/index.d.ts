// typings/express.d.ts

declare module Express {
   interface Request {
      user: import("../models/UserModel").User
   }
}

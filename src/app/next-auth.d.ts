// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

// Extending the default User type
interface IUser extends DefaultUser {
  role?: string;
}

declare module 'next-auth' {
  interface Session {
    user?: IUser;
  }
  
  interface User extends IUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

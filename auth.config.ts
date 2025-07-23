import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// 一時的なユーザーデータベース（本番環境では実際のDBを使用）
const users: Array<{
  id: string;
  email: string;
  password?: string;
  name: string;
  image?: string;
  provider: 'google' | 'credentials';
  createdAt: Date;
}> = [];

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // ユーザーを検索
        const user = users.find(u => u.email === email && u.provider === 'credentials');
        
        if (user && user.password) {
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (isValidPassword) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            };
          }
        }

        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        // Googleログインの場合、ユーザーが存在しなければ作成
        const existingUser = users.find(u => u.email === user.email);
        if (!existingUser) {
          users.push({
            id: user.id || `google_${Date.now()}`,
            email: user.email!,
            name: user.name || 'Unknown User',
            image: user.image,
            provider: 'google',
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const user = users.find(u => u.email === session.user.email);
        if (user) {
          session.user.id = user.id;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
} satisfies NextAuthConfig;

// ユーザー登録関数をエクスポート
export async function registerUser(email: string, password: string, name: string) {
  // ユーザーが既に存在するかチェック
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 12);

  // ユーザーを作成
  const newUser = {
    id: `cred_${Date.now()}`,
    email,
    password: hashedPassword,
    name,
    provider: 'credentials' as const,
    createdAt: new Date(),
  };

  users.push(newUser);
  return newUser;
}
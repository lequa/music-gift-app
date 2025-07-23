'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  fallback, 
  requireAuth = true 
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEFCF7] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6B800] mx-auto mb-4"></div>
          <p className="text-[#4A5568]">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !session) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEFCF7] to-white py-12 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
            <div className="text-6xl mb-6">🎵</div>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#2D3748] mb-4">
              ログインが必要です
            </h1>
            <p className="text-lg text-[#4A5568] mb-8">
              音楽制作機能をご利用いただくには、アカウントの作成またはログインが必要です。
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/auth/signup"
                className="block w-full px-8 py-4 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white font-medium rounded-full hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                新規会員登録
              </Link>
              
              <Link 
                href="/auth/signin"
                className="block w-full px-8 py-4 border-2 border-[#E6B800] text-[#E6B800] font-medium rounded-full hover:bg-[#E6B800] hover:text-white transition-all"
              >
                ログイン
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-[#4A5568] mb-4">
                すでに会員の方はこちら
              </p>
              <Link 
                href="/"
                className="text-[#E6B800] hover:text-[#D4A017] font-medium text-sm"
              >
                ← ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
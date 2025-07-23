'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Header() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#E6B800] to-[#FFD700] rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={faMusic} className="text-white text-lg" />
          </div>
          <span className="text-xl font-semibold text-[#2D3748]">MusicCraft Studio</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/create" className="text-[#4A5568] hover:text-[#E6B800] transition-colors">
            音楽を作成
          </Link>
          <Link href="/examples" className="text-[#4A5568] hover:text-[#E6B800] transition-colors">
            制作実例
          </Link>
          <Link href="/about" className="text-[#4A5568] hover:text-[#E6B800] transition-colors">
            サービスについて
          </Link>
          <Link href="/contact" className="text-[#4A5568] hover:text-[#E6B800] transition-colors">
            お問い合わせ
          </Link>
          
          {/* 認証状態に応じて表示切り替え */}
          {status === 'loading' ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-[#F7FAFC] transition-colors"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'ユーザー'}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-[#E6B800] to-[#FFD700] rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                  </div>
                )}
                <span className="text-[#2D3748] font-medium max-w-24 truncate">
                  {session.user?.name}
                </span>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-[#4A5568] hover:bg-[#F7FAFC] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    プロフィール
                  </Link>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-[#4A5568] hover:bg-[#F7FAFC] transition-colors"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    ログアウト
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="text-[#4A5568] hover:text-[#E6B800] transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white rounded-full font-medium hover:shadow-lg transition-all"
              >
                新規登録
              </Link>
            </div>
          )}
        </div>
        
        {/* モバイルメニューボタン */}
        <button className="md:hidden p-2">
          <svg className="w-6 h-6 text-[#4A5568]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      
      {/* ドロップダウンが開いている時のオーバーレイ */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </header>
  );
}
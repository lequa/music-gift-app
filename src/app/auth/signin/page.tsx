'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('メールアドレスまたはパスワードが正しくありません');
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('ログインに失敗しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      setError('Googleログインに失敗しました');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFCF7] to-white py-12 px-4 md:px-8">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#E6B800] hover:text-[#D4A000]">
            MusicCraft Studio
          </Link>
          <h1 className="text-3xl font-semibold text-[#2D3748] mt-6 mb-2">
            ログイン
          </h1>
          <p className="text-[#4A5568]">
            アカウントにログインして音楽制作を始めましょう
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-8">
          {/* Googleログインボタン */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-xl text-[#4A5568] font-medium hover:bg-[#F7FAFC] hover:border-gray-300 transition-all flex items-center justify-center mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-3 text-red-500" />
            Googleでログイン
          </button>

          {/* 区切り線 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#4A5568]">または</span>
            </div>
          </div>

          {/* メール/パスワードフォーム */}
          <form onSubmit={handleEmailSignIn} className="space-y-6">
            {/* エラーメッセージ */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* メールアドレス */}
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-2">
                メールアドレス
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4A5568]" 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E6B800] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* パスワード */}
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-2">
                パスワード
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4A5568]" 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E6B800] focus:outline-none transition-colors"
                  placeholder="パスワードを入力"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4A5568] hover:text-[#2D3748]"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* ログインボタン */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white rounded-xl font-medium hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ログイン中...
                </span>
              ) : (
                'ログイン'
              )}
            </button>
          </form>

          {/* 新規登録リンク */}
          <div className="mt-6 text-center">
            <p className="text-[#4A5568]">
              アカウントをお持ちでない方は{' '}
              <Link 
                href="/auth/signup" 
                className="text-[#E6B800] hover:text-[#D4A000] font-medium underline underline-offset-4"
              >
                新規会員登録
              </Link>
            </p>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-[#4A5568] hover:text-[#2D3748] underline underline-offset-4"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
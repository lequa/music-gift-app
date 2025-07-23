'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // バリデーション
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上である必要があります');
      setIsLoading(false);
      return;
    }

    try {
      // ユーザー登録API呼び出し
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'ユーザー登録に失敗しました');
        return;
      }

      // 登録成功、自動ログイン
      setSuccess(true);
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('登録は成功しましたが、ログインに失敗しました。手動でログインしてください。');
      } else {
        router.push('/');
      }
    } catch {
      setError('サーバーエラーが発生しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch {
      setError('Googleアカウントでの登録に失敗しました');
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
            新規会員登録
          </h1>
          <p className="text-[#4A5568]">
            無料アカウントを作成して音楽制作を始めましょう
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-8">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm mb-6">
              アカウント作成が完了しました！自動ログイン中...
            </div>
          )}

          {/* Googleログインボタン */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-xl text-[#4A5568] font-medium hover:bg-[#F7FAFC] hover:border-gray-300 transition-all flex items-center justify-center mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-3 text-red-500" />
            Googleで登録
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

          {/* 登録フォーム */}
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* エラーメッセージ */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* 名前 */}
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-2">
                お名前
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4A5568]" 
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E6B800] focus:outline-none transition-colors"
                  placeholder="田中太郎"
                  required
                />
              </div>
            </div>

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
                  placeholder="6文字以上のパスワード"
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

            {/* パスワード確認 */}
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-2">
                パスワード確認
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4A5568]" 
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E6B800] focus:outline-none transition-colors"
                  placeholder="パスワードを再入力"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4A5568] hover:text-[#2D3748]"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* 利用規約同意 */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-5 h-5 text-[#E6B800] border-2 border-gray-200 rounded focus:ring-[#E6B800] focus:ring-2"
              />
              <label htmlFor="terms" className="text-sm text-[#4A5568]">
                <Link href="/terms" className="text-[#E6B800] hover:text-[#D4A000] underline">
                  利用規約
                </Link>
                および
                <Link href="/privacy" className="text-[#E6B800] hover:text-[#D4A000] underline">
                  プライバシーポリシー
                </Link>
                に同意します
              </label>
            </div>

            {/* 登録ボタン */}
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
                  アカウント作成中...
                </span>
              ) : (
                '無料アカウントを作成'
              )}
            </button>
          </form>

          {/* ログインリンク */}
          <div className="mt-6 text-center">
            <p className="text-[#4A5568]">
              既にアカウントをお持ちの方は{' '}
              <Link 
                href="/auth/signin" 
                className="text-[#E6B800] hover:text-[#D4A000] font-medium underline underline-offset-4"
              >
                ログイン
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
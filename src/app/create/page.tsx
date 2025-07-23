'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

type Genre = 'pop' | 'classical' | 'rock' | 'jazz' | 'electronic' | 'ambient';
type Emotion = 'happy' | 'emotional' | 'energetic' | 'calm' | 'romantic' | 'nostalgic';

export default function CreatePage() {
  const [genre, setGenre] = useState<Genre>('pop');
  const [emotion, setEmotion] = useState<Emotion>('happy');
  const [lyrics, setLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const genres: { value: Genre; label: string; icon: string }[] = [
    { value: 'pop', label: 'ポップ', icon: '🎤' },
    { value: 'classical', label: 'クラシック', icon: '🎻' },
    { value: 'rock', label: 'ロック', icon: '🎸' },
    { value: 'jazz', label: 'ジャズ', icon: '🎷' },
    { value: 'electronic', label: 'エレクトロニック', icon: '🎹' },
    { value: 'ambient', label: 'アンビエント', icon: '🌊' },
  ];

  const emotions: { value: Emotion; label: string; icon: string }[] = [
    { value: 'happy', label: '喜び', icon: '😊' },
    { value: 'emotional', label: '感動', icon: '🥺' },
    { value: 'energetic', label: '元気', icon: '⚡' },
    { value: 'calm', label: '穏やか', icon: '😌' },
    { value: 'romantic', label: 'ロマンチック', icon: '💕' },
    { value: 'nostalgic', label: '懐かしい', icon: '🌅' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // AI音楽生成のシミュレーション
    setTimeout(() => {
      setIsGenerating(false);
      // 次のステップへ
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFCF7] to-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-[#4A5568]">
            <li><Link href="/" className="hover:text-[#E6B800]">ホーム</Link></li>
            <li>/</li>
            <li className="text-[#2D3748] font-medium">音楽を作成</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#2D3748] mb-4">
            音楽を作成する
          </h1>
          <p className="text-lg text-[#4A5568] mb-12">
            あなたの想いを音楽に込めて、世界に一つだけの楽曲を生成しましょう
          </p>

          {/* ジャンル選択 */}
          <div className="mb-10">
            <h2 className="text-2xl font-medium text-[#2D3748] mb-6">ジャンルを選択</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {genres.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGenre(g.value)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    genre === g.value
                      ? 'border-[#E6B800] bg-gradient-to-br from-[#FFF3E0] to-[#FEFCF7]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-3xl mb-2 block">{g.icon}</span>
                  <span className={`font-medium ${
                    genre === g.value ? 'text-[#E6B800]' : 'text-[#4A5568]'
                  }`}>
                    {g.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 感情選択 */}
          <div className="mb-10">
            <h2 className="text-2xl font-medium text-[#2D3748] mb-6">感情を選択</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {emotions.map((e) => (
                <button
                  key={e.value}
                  onClick={() => setEmotion(e.value)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    emotion === e.value
                      ? 'border-[#E6B800] bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-3xl mb-2 block">{e.icon}</span>
                  <span className={`font-medium ${
                    emotion === e.value ? 'text-[#E6B800]' : 'text-[#4A5568]'
                  }`}>
                    {e.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 歌詞入力 */}
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-[#2D3748] mb-6">
              歌詞・メッセージ（任意）
            </h2>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="大切な人へのメッセージや、曲に込めたい想いを入力してください..."
              className="w-full h-40 p-4 rounded-2xl border-2 border-gray-200 focus:border-[#E6B800] focus:outline-none resize-none text-[#4A5568] placeholder-gray-400"
            />
            <p className="mt-2 text-sm text-[#4A5568]">
              入力された内容を元に、AIが歌詞を生成します
            </p>
          </div>

          {/* 生成ボタン */}
          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`px-12 py-5 rounded-full text-lg font-medium transition-all transform ${
                isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  音楽を生成中...
                </span>
              ) : (
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faMusic} className="mr-2" />
                  音楽を生成する
                </span>
              )}
            </button>
            <p className="mt-4 text-sm text-[#4A5568]">
              生成には約30秒〜1分かかります
            </p>
          </div>
        </div>

        {/* 進捗表示（生成中のみ表示） */}
        {isGenerating && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#4A5568]">生成進捗</span>
              <span className="text-[#E6B800] font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#E6B800] to-[#FFD700] rounded-full transition-all duration-500"
                style={{ width: '45%' }}
              />
            </div>
            <p className="mt-4 text-sm text-[#4A5568] text-center">
              メロディーを生成しています...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
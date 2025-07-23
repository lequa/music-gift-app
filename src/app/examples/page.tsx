'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPlay } from '@fortawesome/free-solid-svg-icons';

type Example = {
  id: number;
  title: string;
  genre: string;
  occasion: string;
  description: string;
  image: string;
  audioPreview?: string;
  customer: string;
  rating: number;
};

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const examples: Example[] = [
    {
      id: 1,
      title: '10周年記念の感謝の歌',
      genre: 'ポップ',
      occasion: '結婚記念日',
      description: '夫婦の10年間の思い出を込めた感動的なバラード。二人の出会いから現在までの軌跡を美しいメロディーで表現。',
      image: '/api/placeholder/400/300',
      customer: '田中美咲様',
      rating: 5,
    },
    {
      id: 2,
      title: '青春の輝き',
      genre: 'ロック',
      occasion: '成人式',
      description: '息子の成人を祝う力強いロックナンバー。未来への希望と応援のメッセージを込めて。',
      image: '/api/placeholder/400/300',
      customer: '佐藤健一様',
      rating: 5,
    },
    {
      id: 3,
      title: '新たな門出へ',
      genre: 'クラシック',
      occasion: '卒業祝い',
      description: '娘の大学卒業を祝う壮大なオーケストラ楽曲。希望に満ちた未来への第一歩を音楽で表現。',
      image: '/api/placeholder/400/300',
      customer: '鈴木花子様',
      rating: 5,
    },
    {
      id: 4,
      title: '感謝の調べ',
      genre: 'ジャズ',
      occasion: '企業周年',
      description: '創業50周年を記念した洗練されたジャズナンバー。従業員とお客様への感謝を込めて。',
      image: '/api/placeholder/400/300',
      customer: '株式会社ABC',
      rating: 5,
    },
    {
      id: 5,
      title: '永遠の愛',
      genre: 'バラード',
      occasion: 'プロポーズ',
      description: '彼女へのプロポーズのために作成した究極のラブソング。二人だけの特別な思い出を音楽に。',
      image: '/api/placeholder/400/300',
      customer: '山田太郎様',
      rating: 5,
    },
    {
      id: 6,
      title: '夢への飛翔',
      genre: 'エレクトロニック',
      occasion: '開業祝い',
      description: '新店舗オープンを祝う未来的なエレクトロニックミュージック。新たな挑戦への期待感を表現。',
      image: '/api/placeholder/400/300',
      customer: '高橋商店',
      rating: 5,
    },
  ];

  const categories = [
    { value: 'all', label: 'すべて' },
    { value: 'anniversary', label: '記念日' },
    { value: 'birthday', label: '誕生日' },
    { value: 'wedding', label: '結婚' },
    { value: 'corporate', label: '企業' },
    { value: 'graduation', label: '卒業・成人' },
  ];

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => {
        if (selectedCategory === 'anniversary') return ex.occasion.includes('記念');
        if (selectedCategory === 'birthday') return ex.occasion.includes('誕生');
        if (selectedCategory === 'wedding') return ex.occasion.includes('結婚') || ex.occasion.includes('プロポーズ');
        if (selectedCategory === 'corporate') return ex.occasion.includes('企業') || ex.occasion.includes('開業');
        if (selectedCategory === 'graduation') return ex.occasion.includes('卒業') || ex.occasion.includes('成人');
        return false;
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#FEFCF7] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-[#4A5568]">
            <li><Link href="/" className="hover:text-[#E6B800]">ホーム</Link></li>
            <li>/</li>
            <li className="text-[#2D3748] font-medium">制作実例</li>
          </ol>
        </nav>

        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#2D3748] mb-4">
            制作実例ギャラリー
          </h1>
          <p className="text-lg text-[#4A5568] max-w-3xl mx-auto">
            実際にMusicCraft Studioで作成された音楽とグッズの実例をご紹介します。
            あなたの特別なギフトのインスピレーションにしてください。
          </p>
        </div>

        {/* カテゴリーフィルター */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white shadow-gold'
                  : 'bg-white text-[#4A5568] hover:bg-[#F7FAFC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 実例グリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples.map((example) => (
            <div
              key={example.id}
              className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* 画像 */}
              <div className="relative h-48 bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FontAwesomeIcon icon={faMusic} className="text-6xl opacity-50 text-elegant-gold" />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-[#E6B800]">{example.genre}</span>
                </div>
              </div>
              
              {/* コンテンツ */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2D3748] mb-2">
                  {example.title}
                </h3>
                <p className="text-sm text-[#4A5568] mb-3">
                  {example.occasion} • {example.customer}
                </p>
                <p className="text-[#4A5568] mb-4 line-clamp-2">
                  {example.description}
                </p>
                
                {/* 評価 */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#E6B800]">★</span>
                  ))}
                  <span className="ml-2 text-sm text-[#4A5568]">5.0</span>
                </div>
                
                {/* アクション */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-[#FEFCF7] text-[#4A5568] rounded-xl hover:bg-[#FFF3E0] transition-colors">
                    <span className="text-sm font-medium">詳細を見る</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white rounded-xl hover:shadow-gold transition-all">
                    <span className="text-sm font-medium flex items-center">
                      <FontAwesomeIcon icon={faPlay} className="mr-1" />
                      試聴
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-[#FFF3E0] to-[#E3F2FD] rounded-3xl p-12">
          <h2 className="text-3xl font-semibold text-[#2D3748] mb-4">
            あなたも特別な音楽を作りませんか？
          </h2>
          <p className="text-lg text-[#4A5568] mb-8">
            世界に一つだけの音楽とグッズで、大切な人に想いを届けましょう
          </p>
          <Link
            href="/create"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white rounded-full text-lg font-medium hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            今すぐ音楽を作成する
          </Link>
        </div>
      </div>
    </div>
  );
}
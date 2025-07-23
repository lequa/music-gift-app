'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faGift, faHeart, faKey, faMugHot, faImage, faCircle } from '@fortawesome/free-solid-svg-icons';

type Genre = 'pop' | 'classical' | 'rock' | 'jazz' | 'electronic' | 'ambient';
type Emotion = 'happy' | 'emotional' | 'energetic' | 'calm' | 'romantic' | 'nostalgic';
type ProductCategory = 'keychain' | 'mug' | 'acrylic_stand' | 'button_badge';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  initialBottom: number;
}

const ParticleEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          size: Math.random() * 3 + 2, // 2-5px の小さな粒
          duration: Math.random() * 6 + 4, // 4-10秒で上昇
          delay: Math.random() * 10, // 0-10秒の遅延でバラつき
          initialBottom: Math.random() * -120, // 各粒子の初期位置をランダムに設定
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            bottom: `${particle.initialBottom}vh`, // 各粒子の固定された初期位置
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'rgba(230, 184, 0, 0.6)',
            animation: `particle-rise ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 4px rgba(230, 184, 0, 0.3)',
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>('pop');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('happy');
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory>('keychain');
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

  const productCategories: { value: ProductCategory; label: string; icon: typeof faKey; price: number }[] = [
    { value: 'keychain', label: 'キーホルダー', icon: faKey, price: 3500 },
    { value: 'mug', label: 'マグカップ', icon: faMugHot, price: 4500 },
    { value: 'acrylic_stand', label: 'アクリルスタンド', icon: faImage, price: 5500 },
    { value: 'button_badge', label: '缶バッジ', icon: faCircle, price: 2500 },
  ];

  const handleQuickGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF3E0] to-[#E3F2FD] py-20">
        <ParticleEffect />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-[#2D3748]">
            世界に一つだけの
            <span className="block mt-2 bg-gradient-to-r from-[#E6B800] to-[#FFD700] bg-clip-text text-transparent">
              音楽とグッズを
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#4A5568] mb-12 max-w-3xl mx-auto leading-relaxed">
            AI生成の音楽とオリジナルグッズで、
            大切な人へ唯一無二のギフトを贈りましょう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="px-8 py-4 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white rounded-full text-lg font-medium hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              音楽を作成する
            </Link>
            <Link
              href="/examples"
              className="px-8 py-4 bg-white text-[#4A5568] border-2 border-gray-200 rounded-full text-lg font-medium hover:bg-[#F7FAFC] transition-all duration-200"
            >
              制作実例を見る
            </Link>
          </div>
        </div>
        {/* 装飾的な要素 */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5] rounded-full opacity-30 blur-3xl z-0"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-[#FFF3E0] to-[#E8F5E8] rounded-full opacity-30 blur-3xl z-0"></div>
      </section>

      {/* 3つのメインサービス */}
      <section className="py-20 bg-[#FEFCF7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 text-[#2D3748]">
            3つのステップで特別なギフトを
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faMusic} className="text-4xl text-elegant-gold" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[#2D3748]">1. 音楽を生成</h3>
              <p className="text-[#4A5568] leading-relaxed">
                感情やテーマを入力するだけで、AIが世界に一つだけのオリジナル楽曲を生成します
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFF3E0] to-[#E8F5E8] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faGift} className="text-4xl text-elegant-gold" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[#2D3748]">2. グッズを選択</h3>
              <p className="text-[#4A5568] leading-relaxed">
                Tシャツ、マグカップ、ポスターなど、音楽に合わせたオリジナルグッズをデザイン
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F3E5F5] to-[#E3F2FD] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faHeart} className="text-4xl text-elegant-gold" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[#2D3748]">3. プレゼント</h3>
              <p className="text-[#4A5568] leading-relaxed">
                高品質なパッケージングで、特別な瞬間を演出する唯一無二のギフトをお届け
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 音楽制作体験フォーム */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-medium mb-4 text-[#2D3748]">
              今すぐ音楽を体験してみましょう
            </h2>
            <p className="text-lg text-[#4A5568]">
              簡単な設定で、AIがあなただけの音楽を生成します
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#FEFCF7] to-white rounded-3xl shadow-soft p-8 md:p-12">
            {/* ジャンル選択 */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-[#2D3748] mb-4">ジャンルを選択</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre.value}
                    onClick={() => setSelectedGenre(genre.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedGenre === genre.value
                        ? 'border-elegant-gold bg-gradient-to-br from-pastel-peach to-soft-cream shadow-gold'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{genre.icon}</span>
                    <span className={`text-sm font-medium ${
                      selectedGenre === genre.value ? 'text-elegant-gold' : 'text-warm-gray'
                    }`}>
                      {genre.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 感情選択 */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-[#2D3748] mb-4">感情を選択</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.value}
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedEmotion === emotion.value
                        ? 'border-elegant-gold bg-gradient-to-br from-light-blue to-soft-lavender shadow-gold'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{emotion.icon}</span>
                    <span className={`text-sm font-medium ${
                      selectedEmotion === emotion.value ? 'text-elegant-gold' : 'text-warm-gray'
                    }`}>
                      {emotion.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* メッセージ入力 */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-[#2D3748] mb-4">メッセージ（任意）</h3>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="大切な人へのメッセージや、曲に込めたい想いを入力してください..."
                className="w-full h-24 p-4 rounded-xl border-2 border-gray-200 focus:border-elegant-gold focus:outline-none resize-none text-warm-gray placeholder-gray-400 transition-colors"
              />
            </div>


            {/* 生成ボタン */}
            <div className="text-center">
              <button
                onClick={handleQuickGenerate}
                disabled={isGenerating}
                className={`px-8 py-4 rounded-full text-lg font-medium transition-all transform ${
                  isGenerating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-gold text-white hover:shadow-xl hover:-translate-y-0.5 shadow-gold'
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
              
              {!isGenerating && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-warm-gray">
                    選択中: {genres.find(g => g.value === selectedGenre)?.label} × {emotions.find(e => e.value === selectedEmotion)?.label}
                  </p>
                  <Link
                    href="/create"
                    className="text-elegant-gold hover:text-[#D4A000] font-medium underline underline-offset-4"
                  >
                    詳細な設定で作成する →
                  </Link>
                </div>
              )}
            </div>

            {/* 進捗表示 */}
            {isGenerating && (
              <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-warm-gray font-medium">生成進捗</span>
                  <span className="text-elegant-gold font-semibold">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                    style={{ width: '67%' }}
                  />
                </div>
                <p className="mt-3 text-sm text-warm-gray text-center">
                  🎼 あなたの想いを音楽に変換しています...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* グッズ選択セクション */}
      <section className="py-20 bg-gradient-to-br from-[#FEFCF7] to-[#F3E5F5]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-medium mb-4 text-[#2D3748]">
              オリジナルグッズを選択
            </h2>
            <p className="text-lg text-[#4A5568]">
              生成した音楽と組み合わせて、世界に一つだけのグッズを作成します
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((product) => (
              <div
                key={product.value}
                className={`bg-white rounded-2xl p-8 shadow-soft hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                  selectedProduct === product.value
                    ? 'ring-2 ring-elegant-gold shadow-gold'
                    : ''
                }`}
                onClick={() => setSelectedProduct(product.value)}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    selectedProduct === product.value
                      ? 'bg-gradient-to-br from-pastel-peach to-light-blue'
                      : 'bg-gradient-to-br from-[#F7FAFC] to-[#EDF2F7]'
                  }`}>
                    <FontAwesomeIcon 
                      icon={product.icon} 
                      className={`text-3xl ${
                        selectedProduct === product.value ? 'text-elegant-gold' : 'text-warm-gray'
                      }`} 
                    />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    selectedProduct === product.value ? 'text-elegant-gold' : 'text-[#2D3748]'
                  }`}>
                    {product.label}
                  </h3>
                  <p className={`text-2xl font-bold mb-4 ${
                    selectedProduct === product.value ? 'text-elegant-gold' : 'text-[#E6B800]'
                  }`}>
                    ¥{product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#4A5568] mb-6">
                    {product.value === 'keychain' && '持ち運びやすいコンパクトサイズ。日常使いに最適です。'}
                    {product.value === 'mug' && '毎日のコーヒータイムを特別に。高品質な陶器製です。'}
                    {product.value === 'acrylic_stand' && 'デスクに飾れる美しいアクリル製スタンドです。'}
                    {product.value === 'button_badge' && 'バッグや服に付けられる可愛い缶バッジです。'}
                  </p>
                  <div className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedProduct === product.value
                      ? 'bg-gradient-gold text-white'
                      : 'bg-[#F7FAFC] text-[#4A5568] hover:bg-[#EDF2F7]'
                  }`}>
                    {selectedProduct === product.value ? '選択中' : '選択する'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 選択されたグッズの詳細 */}
          {selectedProduct && (
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-soft">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-[#2D3748] mb-4">
                  {productCategories.find(p => p.value === selectedProduct)?.label}を選択しました
                </h3>
                <p className="text-[#4A5568] mb-6">
                  音楽の波形やテーマに合わせて、AIが自動でデザインを生成します。
                  完成したグッズは高品質な仕上がりでお届けします。
                </p>
                <Link
                  href="/package"
                  className="inline-block px-8 py-4 bg-gradient-gold text-white rounded-full text-lg font-medium hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  パッケージを選択して注文する
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 顧客の声 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 text-[#2D3748]">
            お客様の声
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#FEFCF7] rounded-2xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5] rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-[#2D3748]">田中 美咲</p>
                  <p className="text-sm text-[#4A5568]">結婚記念日のプレゼント</p>
                </div>
              </div>
              <p className="text-[#4A5568] leading-relaxed">
                夫への10周年記念プレゼントに利用しました。私たちの思い出を込めた音楽が形になって、とても感動的でした。
              </p>
            </div>
            <div className="bg-[#FEFCF7] rounded-2xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFF3E0] to-[#E8F5E8] rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-[#2D3748]">山田 太郎</p>
                  <p className="text-sm text-[#4A5568]">誕生日プレゼント</p>
                </div>
              </div>
              <p className="text-[#4A5568] leading-relaxed">
                娘の18歳の誕生日に贈りました。AIが作った音楽とは思えないクオリティで、娘も大喜びでした。
              </p>
            </div>
            <div className="bg-[#FEFCF7] rounded-2xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F3E5F5] to-[#E3F2FD] rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-[#2D3748]">株式会社ABC</p>
                  <p className="text-sm text-[#4A5568]">企業ノベルティ</p>
                </div>
              </div>
              <p className="text-[#4A5568] leading-relaxed">
                創業50周年記念のノベルティとして制作。社員やお客様に大変好評で、ブランド価値向上に貢献しました。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FFF3E0] to-[#E3F2FD]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium mb-8 text-[#2D3748]">
            今すぐ始めましょう
          </h2>
          <p className="text-xl text-[#4A5568] mb-12">
            大切な人への想いを、世界に一つだけの音楽とグッズで表現してみませんか？
          </p>
          <Link
            href="/create"
            className="inline-block px-10 py-5 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white rounded-full text-xl font-medium hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            無料で音楽を作成
          </Link>
          <p className="mt-6 text-sm text-[#4A5568]">
            ※楽曲生成は無料。グッズ制作は5万円〜
          </p>
        </div>
      </section>
    </div>
  );
}

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment, PresentationControls } from '@react-three/drei';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt, faMugHot, faImage } from '@fortawesome/free-solid-svg-icons';

// 3Dモデルコンポーネント（仮のボックスで表現）
function TShirtModel() {
  return (
    <mesh>
      <boxGeometry args={[3, 4, 0.2]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

function MugModel() {
  return (
    <mesh>
      <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

function PosterModel() {
  return (
    <mesh>
      <planeGeometry args={[4, 5]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  model: JSX.Element;
};

export default function GoodsPage() {
  const [selectedProduct, setSelectedProduct] = useState<string>('tshirt');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');

  const products: Product[] = [
    {
      id: 'tshirt',
      name: 'オリジナルTシャツ',
      description: '音楽の波形やアートワークをプリントした高品質Tシャツ',
      basePrice: 8000,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'ホワイト', hex: '#ffffff' },
        { name: 'ブラック', hex: '#000000' },
        { name: 'ネイビー', hex: '#1a365d' },
        { name: 'グレー', hex: '#718096' },
      ],
      model: <TShirtModel />,
    },
    {
      id: 'mug',
      name: 'オリジナルマグカップ',
      description: '毎日使える音楽デザインの陶器製マグカップ',
      basePrice: 5000,
      colors: [
        { name: 'ホワイト', hex: '#ffffff' },
        { name: 'ブラック', hex: '#000000' },
      ],
      model: <MugModel />,
    },
    {
      id: 'poster',
      name: 'アートポスター',
      description: '音楽を視覚化した美しいアートポスター',
      basePrice: 12000,
      sizes: ['A3', 'A2', 'A1'],
      model: <PosterModel />,
    },
  ];

  const currentProduct = products.find(p => p.id === selectedProduct)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFCF7] to-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-[#4A5568]">
            <li><Link href="/" className="hover:text-[#E6B800]">ホーム</Link></li>
            <li>/</li>
            <li><Link href="/create" className="hover:text-[#E6B800]">音楽を作成</Link></li>
            <li>/</li>
            <li className="text-[#2D3748] font-medium">グッズを選択</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-soft p-8">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#2D3748] mb-4">
            グッズを選択
          </h1>
          <p className="text-lg text-[#4A5568] mb-12">
            生成した音楽に合わせて、オリジナルグッズをデザインしましょう
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 3Dプレビューエリア */}
            <div className="bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5] rounded-2xl p-8 relative">
              <div className="absolute top-4 right-4 z-10">
                <button className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium text-[#4A5568] hover:bg-white transition-colors">
                  360°回転可能
                </button>
              </div>
              <div className="h-[400px]">
                <Canvas>
                  <Suspense fallback={null}>
                    <PresentationControls
                      global
                      rotation={[0, 0, 0]}
                      polar={[-Math.PI / 3, Math.PI / 3]}
                      azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                    >
                      <Center>
                        {currentProduct.model}
                      </Center>
                    </PresentationControls>
                    <OrbitControls enablePan={false} enableZoom={false} />
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                  </Suspense>
                </Canvas>
              </div>
              <p className="text-center text-sm text-[#4A5568] mt-4">
                マウスでドラッグして360°回転できます
              </p>
            </div>

            {/* 商品選択・カスタマイズエリア */}
            <div>
              {/* 商品タイプ選択 */}
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-[#2D3748] mb-4">商品タイプ</h2>
                <div className="grid grid-cols-3 gap-4">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedProduct === product.id
                          ? 'border-[#E6B800] bg-gradient-to-br from-[#FFF3E0] to-[#FEFCF7]'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="text-3xl mb-2">
                        {product.id === 'tshirt' && <FontAwesomeIcon icon={faTshirt} className="text-elegant-gold" />}
                        {product.id === 'mug' && <FontAwesomeIcon icon={faMugHot} className="text-elegant-gold" />}
                        {product.id === 'poster' && <FontAwesomeIcon icon={faImage} className="text-elegant-gold" />}
                      </div>
                      <p className={`text-sm font-medium ${
                        selectedProduct === product.id ? 'text-[#E6B800]' : 'text-[#4A5568]'
                      }`}>
                        {product.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 商品詳細 */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-[#2D3748] mb-2">
                  {currentProduct.name}
                </h3>
                <p className="text-[#4A5568] mb-4">{currentProduct.description}</p>
                <p className="text-2xl font-semibold text-[#E6B800]">
                  ¥{currentProduct.basePrice.toLocaleString()}〜
                </p>
              </div>

              {/* サイズ選択 */}
              {currentProduct.sizes && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-[#2D3748] mb-3">サイズ</h3>
                  <div className="flex gap-3">
                    {currentProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 rounded-xl border-2 font-medium transition-all ${
                          selectedSize === size
                            ? 'border-[#E6B800] bg-[#FFF3E0] text-[#E6B800]'
                            : 'border-gray-200 hover:border-gray-300 text-[#4A5568]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* カラー選択 */}
              {currentProduct.colors && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-[#2D3748] mb-3">カラー</h3>
                  <div className="flex gap-3">
                    {currentProduct.colors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color.hex)}
                        className={`relative w-12 h-12 rounded-full border-4 transition-all ${
                          selectedColor === color.hex
                            ? 'border-[#E6B800] scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.hex && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xl">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* デザインカスタマイズボタン */}
              <button
                className="w-full py-4 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white rounded-xl font-medium hover:shadow-xl transform hover:-translate-y-0.5 transition-all mb-4"
              >
                デザインをカスタマイズ
              </button>

              {/* 次のステップ */}
              <Link
                href="/package"
                className="block w-full py-4 bg-white border-2 border-[#E6B800] text-[#E6B800] rounded-xl font-medium hover:bg-[#FFF3E0] transition-colors text-center"
              >
                パッケージ選択へ進む
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
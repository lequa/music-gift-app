import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import SessionProvider from '@/components/SessionProvider';
import Header from '@/components/Header';

const notoSansJP = Noto_Sans_JP({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MusicCraft Studio - 世界に一つだけの音楽とグッズを",
  description: "AI生成の音楽とオリジナルグッズで、大切な人へ唯一無二のギフトを贈りましょう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${poppins.variable} antialiased font-sans`}>
        <SessionProvider>
          <Header />
          {children}
        <footer className="bg-[#FEFCF7] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-[#2D3748] mb-4">MusicCraft Studio</h3>
                <p className="text-sm text-[#4A5568]">
                  世界に一つだけの音楽とグッズで、
                  特別なギフトを創造します
                </p>
              </div>
              <div>
                <h4 className="font-medium text-[#2D3748] mb-4">サービス</h4>
                <ul className="space-y-2">
                  <li><Link href="/create" className="text-sm text-[#4A5568] hover:text-[#E6B800]">音楽作成</Link></li>
                  <li><Link href="/goods" className="text-sm text-[#4A5568] hover:text-[#E6B800]">グッズ制作</Link></li>
                  <li><Link href="/examples" className="text-sm text-[#4A5568] hover:text-[#E6B800]">制作実例</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[#2D3748] mb-4">サポート</h4>
                <ul className="space-y-2">
                  <li><Link href="/faq" className="text-sm text-[#4A5568] hover:text-[#E6B800]">FAQ</Link></li>
                  <li><Link href="/contact" className="text-sm text-[#4A5568] hover:text-[#E6B800]">お問い合わせ</Link></li>
                  <li><Link href="/guide" className="text-sm text-[#4A5568] hover:text-[#E6B800]">利用ガイド</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[#2D3748] mb-4">企業情報</h4>
                <ul className="space-y-2">
                  <li><Link href="/company" className="text-sm text-[#4A5568] hover:text-[#E6B800]">会社概要</Link></li>
                  <li><Link href="/privacy" className="text-sm text-[#4A5568] hover:text-[#E6B800]">プライバシーポリシー</Link></li>
                  <li><Link href="/terms" className="text-sm text-[#4A5568] hover:text-[#E6B800]">利用規約</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-[#4A5568]">&copy; 2024 MusicCraft Studio. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  title = "ログインが必要です",
  message = "音楽生成機能をご利用いただくには、アカウントの作成またはログインが必要です。"
}: AuthModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all">
                {/* ヘッダー */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">🎵</div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
                  </button>
                </div>

                {/* コンテンツ */}
                <div className="mb-8">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold text-[#2D3748] mb-4"
                  >
                    {title}
                  </Dialog.Title>
                  <p className="text-[#4A5568] leading-relaxed">
                    {message}
                  </p>
                </div>

                {/* ボタン */}
                <div className="space-y-3">
                  <Link 
                    href="/auth/signup"
                    onClick={onClose}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-[#E6B800] to-[#FFD700] text-white font-medium rounded-full text-center hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    新規会員登録（無料）
                  </Link>
                  
                  <Link 
                    href="/auth/signin"
                    onClick={onClose}
                    className="block w-full px-6 py-3 border-2 border-[#E6B800] text-[#E6B800] font-medium rounded-full text-center hover:bg-[#E6B800] hover:text-white transition-all"
                  >
                    ログイン
                  </Link>
                </div>
                
                {/* フッター */}
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <button
                    onClick={onClose}
                    className="text-sm text-[#4A5568] hover:text-[#E6B800] transition-colors"
                  >
                    後で登録する
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
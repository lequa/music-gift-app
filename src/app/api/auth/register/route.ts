import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../../../../auth.config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // バリデーション
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'メールアドレス、パスワード、名前は必須です' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'パスワードは6文字以上である必要があります' },
        { status: 400 }
      );
    }

    // ユーザー登録
    const user = await registerUser(email, password, name);

    return NextResponse.json({
      message: 'ユーザー登録が成功しました',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });

  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User already exists') {
      return NextResponse.json(
        { error: '既に登録されているメールアドレスです' },
        { status: 409 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
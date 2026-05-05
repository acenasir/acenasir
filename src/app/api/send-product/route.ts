import { NextRequest, NextResponse } from 'next/server';
import { sendProductDeliveryEmail, products } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, productId } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const isBundle = productId === 'complete-bundle';
    if (!isBundle && !products[productId]) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://promptpro.vercel.app';

    const result = await sendProductDeliveryEmail(
      email,
      name || 'Valued Customer',
      productId,
      baseUrl
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Product delivery email sent to ${email}`,
    });
  } catch (error) {
    console.error('Send product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

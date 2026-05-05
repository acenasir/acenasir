import { NextRequest, NextResponse } from 'next/server';
import { sendProductDeliveryEmail, products } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, adminKey } = body;

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://promptpro.vercel.app';
    const results: { productId: string; success: boolean; error?: string }[] = [];

    const allProductIds = [...Object.keys(products), 'complete-bundle'];

    for (const productId of allProductIds) {
      console.log(`Sending test email for ${productId} to ${email}...`);

      const result = await sendProductDeliveryEmail(
        email,
        'Test Customer',
        productId,
        baseUrl
      );

      results.push({
        productId,
        success: result.success,
        error: result.error,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      message: `Test emails sent: ${successCount} succeeded, ${failedCount} failed`,
      results,
    });
  } catch (error) {
    console.error('Test emails error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test emails endpoint',
    usage: 'POST with { email: "test@example.com", adminKey: "your-admin-key" }',
    products: [...Object.keys(products), 'complete-bundle'],
  });
}

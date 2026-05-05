import { NextRequest, NextResponse } from 'next/server';
import { sendProductDeliveryEmail } from '@/lib/email';
import crypto from 'crypto';

function verifySquareSignature(
  body: string,
  signature: string,
  signatureKey: string,
  notificationUrl: string
): boolean {
  const payload = notificationUrl + body;
  const hmac = crypto.createHmac('sha256', signatureKey);
  hmac.update(payload);
  const expectedSignature = 'sha256=' + hmac.digest('base64');
  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-square-hmacsha256-signature') || '';

    if (process.env.SQUARE_WEBHOOK_SIGNATURE_KEY) {
      const notificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/square`;
      const isValid = verifySquareSignature(
        body,
        signature,
        process.env.SQUARE_WEBHOOK_SIGNATURE_KEY,
        notificationUrl
      );

      if (!isValid) {
        console.error('Invalid Square webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    console.log('Square webhook event:', event.type);

    if (event.type === 'payment.completed') {
      const payment = event.data?.object?.payment;

      if (payment) {
        const note = payment.note || '';
        const productIdMatch = note.match(/product:(\S+)/);
        const productId = productIdMatch ? productIdMatch[1] : 'complete-bundle';

        const buyerEmail = payment.buyer_email_address;
        const receiptUrl = payment.receipt_url;

        if (buyerEmail) {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://promptpro.vercel.app';

          const result = await sendProductDeliveryEmail(
            buyerEmail,
            'Valued Customer',
            productId,
            baseUrl
          );

          if (result.success) {
            console.log(`Product delivery email sent to ${buyerEmail} for ${productId}`);
          } else {
            console.error(`Failed to send email to ${buyerEmail}:`, result.error);
          }
        } else {
          console.log('No buyer email found in payment, skipping email delivery');
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Square webhook endpoint',
    events: ['payment.completed'],
  });
}

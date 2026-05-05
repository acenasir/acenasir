import { Resend } from 'resend';

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured - email delivery disabled');
    return null;
  }
  return new Resend(apiKey);
}

export interface ProductInfo {
  id: string;
  name: string;
  mdFile: string;
  csvFile: string;
}

export const products: Record<string, ProductInfo> = {
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate Agent Pack',
    mdFile: '/prompts/real-estate-prompts.md',
    csvFile: '/prompts/real-estate-prompts.csv',
  },
  'fitness': {
    id: 'fitness',
    name: 'Fitness Trainer Pack',
    mdFile: '/prompts/fitness-prompts.md',
    csvFile: '/prompts/fitness-prompts.csv',
  },
  'consultant': {
    id: 'consultant',
    name: 'Business Consultant Pack',
    mdFile: '/prompts/business-consultant-prompts.md',
    csvFile: '/prompts/business-consultant-prompts.csv',
  },
  'beauty': {
    id: 'beauty',
    name: 'Beauty Professional Pack',
    mdFile: '/prompts/beauty-prompts.md',
    csvFile: '/prompts/beauty-prompts.csv',
  },
  'trades': {
    id: 'trades',
    name: 'Home Services Pack',
    mdFile: '/prompts/home-services-prompts.md',
    csvFile: '/prompts/home-services-prompts.csv',
  },
};

export async function sendProductDeliveryEmail(
  customerEmail: string,
  customerName: string,
  productId: string,
  baseUrl: string
): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient();

  if (!resend) {
    return { success: false, error: 'Email service not configured (missing RESEND_API_KEY)' };
  }

  const isBundle = productId === 'complete-bundle';
  const productList = isBundle
    ? Object.values(products)
    : [products[productId]].filter(Boolean);

  if (productList.length === 0) {
    return { success: false, error: 'Invalid product ID' };
  }

  const downloadUrl = `${baseUrl}/download/${productId}`;

  const productListHtml = productList.map(p => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">
        <strong>${p.name}</strong><br>
        <span style="color: #666; font-size: 14px;">55 ready-to-use AI prompts</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">
        <a href="${baseUrl}${p.mdFile}" style="color: #10b981; text-decoration: none; margin-right: 12px;">📄 Markdown</a>
        <a href="${baseUrl}${p.csvFile}" style="color: #10b981; text-decoration: none;">📊 Spreadsheet</a>
      </td>
    </tr>
  `).join('');

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1e293b; margin: 0;">Prompt<span style="color: #10b981;">Pro</span></h1>
      </div>

      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
        <h2 style="margin: 0 0 10px 0; font-size: 24px;">🎉 Your Purchase is Complete!</h2>
        <p style="margin: 0; opacity: 0.9;">Thank you for your order, ${customerName || 'valued customer'}!</p>
      </div>

      <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 16px 0; color: #1e293b;">Your Downloads</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${productListHtml}
        </table>
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <a href="${downloadUrl}" style="display: inline-block; background: #10b981; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
          📥 Access Your Downloads
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 12px;">
          Bookmark this page — you have lifetime access!
        </p>
      </div>

      <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 16px 0; color: #1e293b;">Quick Start Guide</h3>
        <ol style="margin: 0; padding-left: 20px; color: #555;">
          <li style="margin-bottom: 8px;">Download your prompt pack (Markdown or Spreadsheet format)</li>
          <li style="margin-bottom: 8px;">Open ChatGPT, Claude, or your preferred AI tool</li>
          <li style="margin-bottom: 8px;">Copy a prompt and replace [BRACKETS] with your info</li>
          <li style="margin-bottom: 8px;">Review, personalize, and use the AI-generated content!</li>
        </ol>
      </div>

      <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px;">
        <p style="margin: 0 0 8px 0;">Questions? Reply to this email — we're here to help!</p>
        <p style="margin: 0;">© 2026 PromptPro by Aced I.T. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  const emailText = `
Your PromptPro Purchase is Complete!

Thank you for your order, ${customerName || 'valued customer'}!

Your Downloads:
${productList.map(p => `- ${p.name}: ${baseUrl}${p.mdFile}`).join('\n')}

Access all your downloads here: ${downloadUrl}

Quick Start Guide:
1. Download your prompt pack (Markdown or Spreadsheet format)
2. Open ChatGPT, Claude, or your preferred AI tool
3. Copy a prompt and replace [BRACKETS] with your info
4. Review, personalize, and use the AI-generated content!

Questions? Reply to this email — we're here to help!

© 2026 PromptPro by Aced I.T. All rights reserved.
  `;

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
      from: `PromptPro <${fromEmail}>`,
      to: customerEmail,
      subject: `Your ${isBundle ? 'Complete Bundle' : productList[0].name} is Ready! 🎉`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

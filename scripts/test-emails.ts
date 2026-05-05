import 'dotenv/config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const ADMIN_KEY = process.env.ADMIN_KEY || 'test-admin-key';

async function sendTestEmails(email: string) {
  console.log(`\nSending test emails to: ${email}`);
  console.log(`Using base URL: ${BASE_URL}`);
  console.log('='.repeat(50));

  try {
    const response = await fetch(`${BASE_URL}/api/test-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        adminKey: ADMIN_KEY,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return;
    }

    console.log('\n' + data.message);
    console.log('\nResults:');

    for (const result of data.results) {
      const status = result.success ? '✅' : '❌';
      const error = result.error ? ` - ${result.error}` : '';
      console.log(`  ${status} ${result.productId}${error}`);
    }

  } catch (error) {
    console.error('Failed to send test emails:', error);
  }
}

const email = process.argv[2] || 'acenasir25@gmail.com';
sendTestEmails(email);

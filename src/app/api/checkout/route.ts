import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { v4 as uuidv4 } from "uuid";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, productName, amount } = body;

    if (!productId || !productName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://promptpro.vercel.app";

    const response = await client.checkout.paymentLinks.create({
      idempotencyKey: uuidv4(),
      quickPay: {
        name: productName,
        priceMoney: {
          amount: BigInt(amount),
          currency: "CAD",
        },
        locationId: process.env.SQUARE_LOCATION_ID!,
      },
      checkoutOptions: {
        redirectUrl: `${baseUrl}/success?product=${productId}`,
        askForShippingAddress: false,
      },
    });

    if (response.paymentLink?.url) {
      return NextResponse.json({
        checkoutUrl: response.paymentLink.url,
      });
    }

    return NextResponse.json(
      { error: "Failed to create payment link" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

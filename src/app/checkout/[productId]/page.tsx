"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const products: Record<string, { name: string; price: number; description: string }> = {
  "real-estate": {
    name: "Real Estate Agent Pack",
    price: 29,
    description: "50+ prompts for listings, client communication, market analysis, and social media.",
  },
  fitness: {
    name: "Fitness Trainer Pack",
    price: 29,
    description: "50+ prompts for workout plans, nutrition guides, client motivation, and marketing.",
  },
  consultant: {
    name: "Business Consultant Pack",
    price: 39,
    description: "50+ prompts for proposals, reports, client presentations, and thought leadership.",
  },
  beauty: {
    name: "Beauty Professional Pack",
    price: 29,
    description: "50+ prompts for appointment reminders, aftercare instructions, reviews, and promotions.",
  },
  trades: {
    name: "Home Services Pack",
    price: 29,
    description: "50+ prompts for quotes, follow-ups, reviews, and local marketing.",
  },
  "complete-bundle": {
    name: "Complete Bundle (All 5 Packs)",
    price: 97,
    description: "250+ prompts across all industries. Save 37% compared to buying separately.",
  },
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
  const product = products[productId];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Product not found</h1>
          <Link href="/" className="text-emerald-400 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          productName: product.name,
          amount: product.price * 100,
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.error || "Failed to create checkout. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-white">
            Prompt<span className="text-emerald-400">Pro</span>
          </Link>
        </div>
      </header>

      <main className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h1 className="text-2xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-slate-400 mb-8">Complete your purchase</p>

            {/* Order Summary */}
            <div className="bg-slate-900 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-white mb-2">
                {product.name}
              </h2>
              <p className="text-slate-400 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center border-t border-slate-700 pt-4">
                <span className="text-slate-300">Total</span>
                <span className="text-2xl font-bold text-emerald-400">
                  ${product.price} <span className="text-sm text-slate-400">CAD</span>
                </span>
              </div>
            </div>

            {/* What you get */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-300 mb-3">
                What&apos;s included:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Instant PDF download
                </li>
                <li className="text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Spreadsheet format included
                </li>
                <li className="text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Lifetime access
                </li>
                <li className="text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Free future updates
                </li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg p-3 mb-4 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>Pay with Square</>
              )}
            </button>

            <p className="text-slate-500 text-xs text-center mt-4">
              Secure payment powered by Square. Your data is encrypted.
            </p>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-slate-400 hover:text-white text-sm transition">
              ← Back to products
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

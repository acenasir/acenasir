'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product') || 'complete-bundle';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-slate-300 mb-8">
          Thank you for your purchase! Your AI prompt pack is ready to download.
        </p>

        <Link
          href={`/download/${productId}`}
          className="inline-block w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-lg transition mb-6"
        >
          📥 Download Your Prompts Now
        </Link>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Start Guide</h2>
          <ul className="space-y-3 text-left">
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">1.</span>
              Download your prompt pack using the button above
            </li>
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">2.</span>
              Open ChatGPT, Claude, or your preferred AI tool
            </li>
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">3.</span>
              Copy a prompt and replace [BRACKETS] with your info
            </li>
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">4.</span>
              Save 10+ hours every week on content creation!
            </li>
          </ul>
        </div>

        <p className="text-slate-400 text-sm mb-4">
          Bookmark your download page — you have lifetime access!
        </p>

        <Link
          href="/"
          className="text-emerald-400 hover:text-emerald-300 transition"
        >
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

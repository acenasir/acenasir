'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const productFiles: Record<string, { name: string; mdFile: string; csvFile: string; description: string }> = {
  'real-estate': {
    name: 'Real Estate Agent Pack',
    mdFile: '/prompts/real-estate-prompts.md',
    csvFile: '/prompts/real-estate-prompts.csv',
    description: '55 prompts for listings, client communication, market analysis, social media, and negotiations.',
  },
  'fitness': {
    name: 'Fitness Trainer Pack',
    mdFile: '/prompts/fitness-prompts.md',
    csvFile: '/prompts/fitness-prompts.csv',
    description: '55 prompts for workout programming, nutrition guidance, client communication, and marketing.',
  },
  'consultant': {
    name: 'Business Consultant Pack',
    mdFile: '/prompts/business-consultant-prompts.md',
    csvFile: '/prompts/business-consultant-prompts.csv',
    description: '55 prompts for proposals, client deliverables, thought leadership, and business development.',
  },
  'beauty': {
    name: 'Beauty Professional Pack',
    mdFile: '/prompts/beauty-prompts.md',
    csvFile: '/prompts/beauty-prompts.csv',
    description: '55 prompts for appointments, aftercare, reviews, marketing, and client communication.',
  },
  'trades': {
    name: 'Home Services Pack',
    mdFile: '/prompts/home-services-prompts.md',
    csvFile: '/prompts/home-services-prompts.csv',
    description: '55 prompts for quotes, client communication, reviews, marketing, and local SEO.',
  },
};

const allProducts = ['real-estate', 'fitness', 'consultant', 'beauty', 'trades'];

export default function DownloadPage() {
  const params = useParams();
  const productId = params.productId as string;
  const isBundle = productId === 'complete-bundle';

  const productsToShow = isBundle ? allProducts : [productId];
  const validProducts = productsToShow.filter(id => productFiles[id]);

  if (validProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/" className="text-emerald-400 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Prompt<span className="text-emerald-400">Pro</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📥</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Your Downloads Are Ready
          </h1>
          <p className="text-slate-400">
            {isBundle
              ? "You've purchased the Complete Bundle! Download all 5 prompt packs below."
              : `Download your ${productFiles[productId]?.name || 'Prompt Pack'} below.`
            }
          </p>
        </div>

        <div className="space-y-4">
          {validProducts.map((id) => {
            const product = productFiles[id];
            return (
              <div
                key={id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {product.name}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 shrink-0">
                    <a
                      href={product.mdFile}
                      download
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Markdown
                    </a>
                    <a
                      href={product.csvFile}
                      download
                      className="px-5 py-2.5 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Spreadsheet
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">How to Use Your Prompts</h3>
          <ol className="space-y-3 text-slate-300">
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">1.</span>
              <div>
                <strong>Markdown format</strong> — Best for reading and copying prompts. Open in any text editor, Notion, or Obsidian.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">2.</span>
              <div>
                <strong>Spreadsheet format</strong> — Best for filtering and organizing. Open in Excel, Google Sheets, or Numbers.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">3.</span>
              Find a prompt that fits your needs and copy it into ChatGPT, Claude, or any AI tool.
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">4.</span>
              Replace the [BRACKETS] with your specific information.
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">5.</span>
              Review, personalize, and use the AI-generated content!
            </li>
          </ol>
        </div>

        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <p className="text-emerald-400 text-sm text-center">
            💡 <strong>Pro Tip:</strong> Bookmark this page — you have lifetime access to your downloads and any future updates!
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 mb-4">
            Questions? Need help? Contact us at support@promptpro.ai
          </p>
          <Link
            href="/"
            className="text-emerald-400 hover:text-emerald-300 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-700 py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          © 2026 PromptPro by Aced I.T. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

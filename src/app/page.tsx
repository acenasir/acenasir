import Link from "next/link";

const products = [
  {
    id: "real-estate",
    name: "Real Estate Agent Pack",
    description: "50+ prompts for listings, client communication, market analysis, and social media content.",
    price: 29,
    icon: "🏠",
    features: ["Property descriptions", "Client emails", "Market reports", "Social posts"],
  },
  {
    id: "fitness",
    name: "Fitness Trainer Pack",
    description: "50+ prompts for workout plans, nutrition guides, client motivation, and marketing.",
    price: 29,
    icon: "💪",
    features: ["Workout programs", "Meal plans", "Client check-ins", "Promo content"],
  },
  {
    id: "consultant",
    name: "Business Consultant Pack",
    description: "50+ prompts for proposals, reports, client presentations, and thought leadership.",
    price: 39,
    icon: "📊",
    features: ["Proposals", "Analysis reports", "Presentations", "LinkedIn posts"],
  },
  {
    id: "beauty",
    name: "Beauty Professional Pack",
    description: "50+ prompts for appointment reminders, aftercare instructions, reviews, and promotions.",
    price: 29,
    icon: "💄",
    features: ["Booking messages", "Aftercare guides", "Review requests", "Instagram captions"],
  },
  {
    id: "trades",
    name: "Home Services Pack",
    description: "50+ prompts for quotes, follow-ups, reviews, and local marketing for plumbers, electricians, HVAC.",
    price: 29,
    icon: "🔧",
    features: ["Quote templates", "Follow-up emails", "Review requests", "Local SEO"],
  },
];

const bundle = {
  id: "complete-bundle",
  name: "Complete Bundle",
  description: "Get ALL 5 prompt packs at 37% off. 250+ prompts to transform your business.",
  originalPrice: 155,
  price: 97,
  icon: "🚀",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Prompt<span className="text-emerald-400">Pro</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#products" className="text-slate-300 hover:text-white transition">
              Products
            </Link>
            <Link href="#bundle" className="text-slate-300 hover:text-white transition">
              Bundle Deal
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            Save 10+ hours every week with AI
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI Prompts Built for{" "}
            <span className="text-emerald-400">Your Industry</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Stop wasting time writing generic prompts. Get 50+ proven, copy-paste prompts
            designed specifically for service business owners like you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#products"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
            >
              Browse Prompt Packs
            </Link>
            <Link
              href="#bundle"
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
            >
              Get the Bundle (Save 37%)
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-700 bg-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-400">250+</div>
            <div className="text-slate-400">Total Prompts</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">5</div>
            <div className="text-slate-400">Industries</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">10+</div>
            <div className="text-slate-400">Hours Saved/Week</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">$29</div>
            <div className="text-slate-400">Starting Price</div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Choose Your Industry
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Each pack contains 50+ prompts tailored to your specific business needs.
            Instant download after purchase.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition group"
              >
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-center gap-2">
                      <span className="text-emerald-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    ${product.price} <span className="text-sm text-slate-400 font-normal">CAD</span>
                  </span>
                  <Link
                    href={`/checkout/${product.id}`}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section id="bundle" className="py-20 px-4 bg-gradient-to-r from-emerald-900/30 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-emerald-500/30">
            <div className="text-center">
              <div className="text-5xl mb-4">{bundle.icon}</div>
              <div className="inline-block px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full mb-4">
                BEST VALUE - SAVE 37%
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {bundle.name}
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                {bundle.description}
              </p>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-slate-500 line-through text-xl">
                  ${bundle.originalPrice}
                </span>
                <span className="text-4xl font-bold text-emerald-400">
                  ${bundle.price} <span className="text-lg text-slate-400">CAD</span>
                </span>
              </div>
              <Link
                href={`/checkout/${bundle.id}`}
                className="inline-block px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-lg transition"
              >
                Get All 5 Packs Now
              </Link>
              <p className="text-slate-500 text-sm mt-4">
                Instant download • Lifetime access • All future updates included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What AI tools do these work with?
              </h3>
              <p className="text-slate-400">
                Our prompts work with ChatGPT, Claude, Gemini, and any other AI assistant.
                They&apos;re designed to be versatile and get great results on any platform.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How do I access my prompts after purchase?
              </h3>
              <p className="text-slate-400">
                You&apos;ll receive an instant download link via email. The prompts come in
                a PDF and spreadsheet format for easy copy-paste.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do I need any AI experience?
              </h3>
              <p className="text-slate-400">
                Not at all! Each prompt is ready to use — just copy, paste, and customize
                with your specific details. We include instructions for beginners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold text-white">
            Prompt<span className="text-emerald-400">Pro</span>
          </div>
          <div className="text-slate-400 text-sm">
            © 2026 PromptPro by Aced I.T. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

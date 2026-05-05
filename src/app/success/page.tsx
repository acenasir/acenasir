import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-slate-300 mb-8">
          Thank you for your purchase! Check your email for the download link to your
          AI prompt pack. If you don&apos;t see it within 5 minutes, check your spam folder.
        </p>
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">What&apos;s Next?</h2>
          <ul className="space-y-3 text-left">
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">1.</span>
              Download your prompt pack from the email
            </li>
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">2.</span>
              Open ChatGPT, Claude, or your preferred AI tool
            </li>
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">3.</span>
              Copy a prompt and customize it for your business
            </li>
            <li className="text-slate-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-1">4.</span>
              Save hours every week on content creation!
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

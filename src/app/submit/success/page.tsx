import Link from 'next/link'

export const metadata = {
  title: 'Submission Received | NextGen Preservation Directory',
}

export default function SubmitSuccessPage() {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-50 font-heading mb-4">
          Submission Received!
        </h1>
        <p className="text-slate-400 mb-8">
          Thank you for submitting your listing. An admin will review your
          submission and it will appear in the directory once approved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="rounded-md bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 transition-colors"
          >
            Browse Directory
          </Link>
          <Link
            href="/submit"
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 transition-colors"
          >
            Submit Another
          </Link>
        </div>
      </div>
    </div>
  )
}

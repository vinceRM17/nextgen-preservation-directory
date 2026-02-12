import { SubmissionForm } from './form'

export const metadata = {
  title: 'Submit a Listing | NextGen Preservation Directory',
  description: 'Submit your organization or business for listing in the Louisville historic preservation directory.',
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-50 font-heading mb-2">
          Submit a Listing
        </h1>
        <p className="text-slate-400 mb-8">
          Add your organization to the Louisville Historic Preservation Directory.
          All submissions are reviewed by an admin before being published.
        </p>
        <SubmissionForm />
      </div>
    </div>
  )
}

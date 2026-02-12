'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'
import { submitListing, type SubmitState } from './actions'
import { submissionSchema, type SubmissionFormData, categoryValues } from '@/lib/validation/submission'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const SPECIALTIES = [
  'Historic Renovation', 'Masonry Restoration', 'Woodwork', 'Metalwork',
  'Plaster & Stucco', 'Window Restoration', 'Roofing (Historic)',
  'Electrical (Historic)', 'Plumbing (Historic)', 'HVAC (Historic)',
  'Tax Credit Projects', 'Community Development', 'Zoning & Compliance',
  'Architectural Design', 'Structural Assessment', 'Property Management',
  'Grant Writing', 'Historic Research', 'Education & Training',
  'Sustainability', 'ADA Compliance', 'Lead & Asbestos Remediation',
] as const

export function SubmissionForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState<SubmitState, FormData>(submitListing, {})

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
    setError,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: '',
      organization: '',
      email: '',
      phone: '',
      role: undefined,
      specialties: [],
      website: '',
      description: '',
      address: '',
    },
  })

  const selectedSpecialties = watch('specialties') ?? []

  // Handle server action response
  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      router.push('/submit/success')
    } else if (state.message && state.errors) {
      toast.error(state.message)
      // Map server errors to form fields
      for (const [field, messages] of Object.entries(state.errors)) {
        if (messages && messages.length > 0) {
          setError(field as keyof SubmissionFormData, {
            type: 'server',
            message: messages[0],
          })
        }
      }
    } else if (state.message && !state.success) {
      toast.error(state.message)
    }
  }, [state, router, setError])

  function handleSpecialtyToggle(specialty: string) {
    const current = selectedSpecialties
    const updated = current.includes(specialty)
      ? current.filter(s => s !== specialty)
      : [...current, specialty]
    setValue('specialties', updated, { shouldValidate: true })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Run client-side validation first
    const isValid = await trigger()
    if (!isValid) {
      toast.error('Please fix the errors below.')
      return
    }

    // Submit via server action
    const formData = new FormData(e.currentTarget)

    // Ensure specialties are included (checkboxes may not serialize correctly)
    formData.delete('specialties')
    for (const s of selectedSpecialties) {
      formData.append('specialties', s)
    }

    formAction(formData)
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#f1f5f9',
          },
        }}
      />

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information Section */}
        <section className="rounded-lg bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-slate-50 mb-1">Contact Information</h2>
          <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-slate-800">
            How people will reach you in the directory.
          </p>

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Full name or business name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                placeholder="Company or organization (optional)"
                {...register('organization')}
              />
              {errors.organization && (
                <p className="text-sm text-red-500">{errors.organization.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(502) 555-0123 (optional)"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Professional Details Section */}
        <section className="rounded-lg bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-slate-50 mb-1">Professional Details</h2>
          <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-slate-800">
            Describe your role and areas of expertise.
          </p>

          <div className="space-y-4">
            {/* Category / Role */}
            <div className="space-y-2">
              <Label htmlFor="role">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select id="role" {...register('role')}>
                <option value="">Select a category...</option>
                {categoryValues.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Specialties */}
            <div className="space-y-2">
              <Label>
                Specialties <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-slate-400">Select all that apply.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {SPECIALTIES.map(specialty => (
                  <label
                    key={specialty}
                    className="flex items-center gap-2 cursor-pointer text-sm text-slate-200 hover:text-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="specialties"
                      value={specialty}
                      checked={selectedSpecialties.includes(specialty)}
                      onChange={() => handleSpecialtyToggle(specialty)}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-slate-50 focus:ring-2 focus:ring-slate-400 cursor-pointer"
                    />
                    {specialty}
                  </label>
                ))}
              </div>
              {errors.specialties && (
                <p className="text-sm text-red-500">{errors.specialties.message}</p>
              )}
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com (optional)"
                {...register('website')}
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your work or services (optional, max 1000 characters)"
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="rounded-lg bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-slate-50 mb-1">Location</h2>
          <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-slate-800">
            Your address will be geocoded and must be within the Louisville Metro area.
          </p>

          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="123 Main St, Louisville, KY 40202"
              {...register('address')}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>
        </section>

        {/* Duplicate Warning */}
        {state.duplicates && state.duplicates.length > 0 && (
          <div className="rounded-lg border border-yellow-700/50 bg-yellow-900/20 p-4">
            <h3 className="text-sm font-medium text-yellow-400 mb-2">
              Similar listings found
            </h3>
            <p className="text-sm text-slate-400 mb-3">
              Your submission was saved, but we found similar existing listings:
            </p>
            <ul className="space-y-1">
              {state.duplicates.map(dup => (
                <li key={dup.id} className="text-sm text-slate-300">
                  <span className="font-medium">{dup.name}</span>
                  <span className="text-slate-500 ml-2">
                    ({dup.role} - {Math.round(dup.similarity * 100)}% match)
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-400 mt-2">
              An admin will review and determine if this is a duplicate.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="min-w-[200px]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Listing'
            )}
          </Button>
        </div>
      </form>
    </>
  )
}

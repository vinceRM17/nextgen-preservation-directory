'use client'

import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminListingSchema, type AdminListingData, categoryValues } from '@/lib/validation/submission'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { ActionState } from '@/app/(admin)/listings/actions'

const SPECIALTIES = [
  'Historic Renovation', 'Masonry Restoration', 'Woodwork', 'Metalwork',
  'Plaster & Stucco', 'Window Restoration', 'Roofing (Historic)',
  'Electrical (Historic)', 'Plumbing (Historic)', 'HVAC (Historic)',
  'Tax Credit Projects', 'Community Development', 'Zoning & Compliance',
  'Architectural Design', 'Structural Assessment', 'Property Management',
  'Grant Writing', 'Historic Research', 'Education & Training',
  'Sustainability', 'ADA Compliance', 'Lead & Asbestos Remediation',
] as const

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
] as const

type ListingFormProps = {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
  defaultValues?: Partial<AdminListingData>
  submitLabel: string
}

export function ListingForm({ action, defaultValues, submitLabel }: ListingFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, {})

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AdminListingData>({
    resolver: zodResolver(adminListingSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      role: defaultValues?.role ?? undefined,
      specialties: defaultValues?.specialties ?? [],
      address: defaultValues?.address ?? '',
      phone: defaultValues?.phone ?? '',
      email: defaultValues?.email ?? '',
      website: defaultValues?.website ?? '',
      imageUrl: defaultValues?.imageUrl ?? '',
      status: defaultValues?.status ?? 'approved',
    },
  })

  const selectedSpecialties = watch('specialties') || []

  function handleSpecialtyToggle(specialty: string) {
    const current = selectedSpecialties
    if (current.includes(specialty)) {
      setValue('specialties', current.filter(s => s !== specialty))
    } else {
      setValue('specialties', [...current, specialty])
    }
  }

  // Merge client-side and server-side errors
  function fieldError(field: keyof AdminListingData): string | undefined {
    if (errors[field]?.message) return errors[field].message as string
    if (state.errors?.[field]?.[0]) return state.errors[field][0]
    return undefined
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.message && (
        <div className="rounded-md border border-red-800 bg-red-900/50 p-4 text-sm text-red-200">
          {state.message}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" error={!!fieldError('name')}>Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Professional or organization name"
        />
        {fieldError('name') && (
          <p className="text-sm text-red-400">{fieldError('name')}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Brief description of services and expertise"
          rows={4}
        />
        {fieldError('description') && (
          <p className="text-sm text-red-400">{fieldError('description')}</p>
        )}
      </div>

      {/* Category (Role) */}
      <div className="space-y-2">
        <Label htmlFor="role" error={!!fieldError('role')}>Category *</Label>
        <Select id="role" {...register('role')}>
          <option value="">Select a category</option>
          {categoryValues.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Select>
        {fieldError('role') && (
          <p className="text-sm text-red-400">{fieldError('role')}</p>
        )}
      </div>

      {/* Specialties */}
      <div className="space-y-2">
        <Label error={!!fieldError('specialties')}>Specialties *</Label>
        <div className="grid grid-cols-2 gap-2">
          {SPECIALTIES.map(specialty => (
            <label key={specialty} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="specialties"
                value={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyToggle(specialty)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-slate-400 focus:ring-slate-400 focus:ring-offset-slate-900"
              />
              <span className="text-sm text-slate-300">{specialty}</span>
            </label>
          ))}
        </div>
        {fieldError('specialties') && (
          <p className="text-sm text-red-400">{fieldError('specialties')}</p>
        )}
      </div>

      {/* Contact Info Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="contact@example.com"
          />
          {fieldError('email') && (
            <p className="text-sm text-red-400">{fieldError('email')}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(502) 555-0123"
          />
          {fieldError('phone') && (
            <p className="text-sm text-red-400">{fieldError('phone')}</p>
          )}
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          {...register('website')}
          placeholder="https://example.com"
        />
        {fieldError('website') && (
          <p className="text-sm text-red-400">{fieldError('website')}</p>
        )}
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          {...register('imageUrl')}
          placeholder="https://example.com/photo.jpg"
        />
        {fieldError('imageUrl') && (
          <p className="text-sm text-red-400">{fieldError('imageUrl')}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="123 Main St, Louisville, KY 40202"
        />
        {fieldError('address') && (
          <p className="text-sm text-red-400">{fieldError('address')}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select id="status" {...register('status')}>
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
        {fieldError('status') && (
          <p className="text-sm text-red-400">{fieldError('status')}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

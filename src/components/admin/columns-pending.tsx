'use client'

// Plain serializable type for submissions passed from server to client
export type PendingSubmission = {
  id: string
  name: string
  email: string
  role: string
  address: string
  submittedAt: string // ISO string (serializable)
  duplicateOf: string | null
  similarityScore: string | null
}

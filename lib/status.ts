export function formatVerifiedDate(iso: string | null) {
  if (!iso) return 'unknown'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatEventDateBadge(dateInput: string | null | undefined) {
  if (!dateInput) {
    return { day: '-', month: '', monthShort: '' }
  }

  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) {
    return { day: '-', month: '', monthShort: '' }
  }

  return {
    day: String(date.getDate()),
    month: date.toLocaleString('en-US', { month: 'long' }),
    monthShort: date.toLocaleString('en-US', { month: 'short' }),
  }
}

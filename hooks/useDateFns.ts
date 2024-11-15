import { formatDistanceToNow, parseISO, isWithinInterval, subWeeks, format } from 'date-fns'

export default function useDateFns(date?: string): string {
  let formattedDate: string
  if (date) {
    const parsedDate: Date = parseISO(date)
    if (isWithinInterval(parsedDate, { start: subWeeks(new Date(), 1), end: new Date() })) {
      formattedDate = formatDistanceToNow(parsedDate, { addSuffix: true })
    } else {
      formattedDate = format(parsedDate, 'dd/MM/yyyy')
    }
  } else {
    formattedDate = ''
  }
  return formattedDate
}
import dayjs from 'dayjs'

export function formatDate(startDate, endDate) {
  const formatDateYear = date =>
    dayjs(date).format(
      `MMM DD${
        dayjs(date).format('YYYY') !== dayjs().format('YYYY') ? ', YYYY' : ''
      }`
    )

  return dayjs(startDate).format('DD/MM/YYYY') ===
    dayjs(endDate).format('DD/MM/YYYY')
    ? formatDateYear(startDate)
    : `${formatDateYear(startDate)} - ${formatDateYear(endDate)}`
}

export function relativeDateString(date) {
  const now = dayjs()
  date = dayjs(date)

  const diffDays = date.diff(now, 'days')
  const diffWeeks = date.diff(now, 'weeks')
  const diffMonths = date.diff(now, 'months')
  const diffYears = date.diff(now, 'years')

  if (diffDays === 0) return 'Today'
  if (diffDays > 0) {
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays < 7) return `This ${date.format('dddd')}`
    if (diffWeeks === 1) return 'Next week'
    if (diffDays < 31) return `In about ${diffWeeks} weeks`
    if (diffMonths === 1) return 'Next month'
    if (diffMonths < 12) return `In about ${diffMonths} months`
    if (diffYears === 1) return 'Next year'
    return `In about ${diffYears} years`
  } else {
    if (diffDays === -1) return 'Yesterday'
    if (diffDays > -7) return `Last ${date.format('dddd')}`
    if (diffWeeks === -1) return 'Last week'
    if (diffDays > -30) return `About ${-diffWeeks} weeks ago`
    if (diffMonths === -1) return 'Last Month'
    if (diffMonths > -12) return `About ${-diffMonths} months ago`
    if (diffYears === -1) return 'Last year'
    return `About ${diffYears} years ago`
  }
}

export function generateMapsLink(lat, lng) {
  if (
    /* if we're on iOS, open in Apple Maps */
    navigator.platform.indexOf('iPhone') != -1 ||
    navigator.platform.indexOf('iPad') != -1 ||
    navigator.platform.indexOf('iPod') != -1
  ) {
    return `maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`
  } else {
    /* else use Google */
    return `https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`
  }
}

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

export function parseDate(date: string) {
	if (!date) return null
	const [day, month, year,] = date.split("/")
	return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

export function formatDate(date: string) {
	if (!date) return date
	const [year, month, day,] = date.split("-")
	return `${day}/${month}/${year}`
}

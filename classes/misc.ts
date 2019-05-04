export const sleep = async (milliseconds: number) => new Promise((resolve, reject) => {
	setTimeout(() => { resolve(true) }, milliseconds)
})

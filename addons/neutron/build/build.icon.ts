import IconGenerator from "~addons/icon-generator"

let _resolve
let resolvePromise = new Promise(resolve => _resolve = resolve)

const generate = async () => {
	const iGenerator = new IconGenerator(
		IconGenerator.resolve("static/logo.png"),
		IconGenerator.resolve("static/icons")
	)

	iGenerator.sizes([256,])
	iGenerator.clean()
	await iGenerator.generatePNG()
	await iGenerator.generateICO()
	_resolve()
}

generate()
export default {
	complete: resolvePromise
}
import IconGenerator from "~addons/icon-generator"

let generator = new IconGenerator(
	IconGenerator.resolve("static/logo.png"),
	IconGenerator.resolve("static/icons")
)
generator.sizes([16, 24, 32, 48, 64, 128, 256, 512, 1024,])

generator.clean()
generator.generate()

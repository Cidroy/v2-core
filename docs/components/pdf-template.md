## pdf-template ##

This Plugin helps in the creation of PDF Document using twig templates.

The Project is located in `addons/pdf-template`

The binary is then packaged into `electron-core-output/resources/templates`
by the electron build process

***
### **Usage**

To Use the generator in project
```ts
// Import ElectronPDF directly
import ElectronPDF from "~/addons/pdf-template/electron-pdf"

// or import from app
import ElectronPDF from "@electron/printer"
```

```ts
// Create a new Generator
let pdfGen = new ElectronPDF(namespace, template)

// To save the file at default reports location
let pdf = await pdfGen.save(null, renderData)

// To Save at specific location
let pdf = await pdfGen.save(fullPath, renderData)

// To Open a saved PDF
const { shell } = require("electron")
let open = shell.openItem(pdf)
```

You can configure the namespaces and assets available using the `config/addons.pdf-template.ts`
```ts
export const config = {
	templates: {
		Namespace: resolve("path/to/twig folder")
	},
	assets: [
		resolve("path/to/asset/file"),
	]
}
```

**Build**

To Collect all assets and template into a file
```ts
import PrinterTemplateBuilder from "~/addons/pdf-template"

// Create an object
let printerTemplateBuilder = new PrinterTemplateBuilder(destination, os)

// add template
printerTemplateBuilder.addTemplates({
	Namepsace: resolve("path/to/twig/templates"),
	...
})

// or use config
await printerTemplateBuilder.useConfig()

// build
await printerTemplateBuilder.build()
```

***
### **CLI**
The application comes with a CLI helper for development

***Dev Server :***
This provides live reload for the template you are testing.

When the Command is executed this will open a JSON5 data file that will be used for the twig template,
and the localhost server will auto open in default browser.
```bash
# Start dev server
# where namespace is the plugin namespace
# and template is the file to test
$ npm run pdf-template dev [namespace] [template]

# to ask manually
$ npm run pdf-template dev

# to select namespace
$ npm run pdf-template dev core

# to select namespace and file
$ npm run pdf-template dev core test
```

***New Template :***
Create a new template in the namespace
```bash
# create template
$ npm run pdf-template new [namespace]

# ask for namespace and file
$ npm run pdf-template new

# select namespace
$ npm run pdf-template new core
```
***

**Template**

The basic structure of a template is as follows

You can learn more about twig from [here](https://twig.symfony.com/doc/2.x/templates.html). We Support Twig 2.X only using [twigjs](https://github.com/twigjs/twig.js).
```html
<!DOCTYPE html>
<html>
	...
	<body class="A4">
		<section class="sheet padding-10mm">
			<!-- YOUR CONTENT HERE -->
			...
		</section>
		<script lang="json5">
			// default json5 data
			{
				example: true
			}
		</script>
	</body>
</html>
```
***
**Testing :**
```bash
$ npm run test:pdf-template
```

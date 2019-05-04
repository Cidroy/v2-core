## Project Structure

### **`addons`** - Other components.
Currently it stores all the necessary project modules which is not part of the UI or is not needed to be packaged with the electron app.asar file

All the components can be accessed using the `~module/**` relative path through out the application.

**`icon-generator`**
* This is used to generate icons for multiple application from a png file.
	Usage is as follows:
	```ts
	import IconGenerator from "~addons/icon-generator"
	...
	let source = resolve("logo.png") // must be an icon png file
	let destination = resolve("logo")// must be a folder destination
	let generator = new IconGenerator(source, destination)

	generator.sizes([32, 64, ...]) // Array of sizes to generate icons

	// To generate in all sizes and in PNG, ICO and ICNS format
	generator.generate() // async function

	// To Generate only PNGs
	generator.generatePNG() // async function

	// To Generate only ICOs
	generator.generateICO() // async function

	// To Generate only ICNSs
	generator.generateICNS() // async function
	```

**`positron`**

* The Positron source code is housed here. Please read the positron documentation by running

	```bash
	npm run docs:positron
	```

**`webpack`**

Contains unpublished webpack plugins. Currently it only contains the following
* `vue-import-script` - this is to merge seperated typescript or javascript into the main `.vue` file.

	If the `.vue` file does not have a `<script ...>...</script>` tag then this loader will look for a `.vue.ts` or `.vue.js` file in respective order and import the script into the vue file.


### **`bin`** - The output for binaries.

* All the binaries for deployment are stored here.

### **`build`** - All the build scripts.

* All the build scripts are here and are as follows

**`electron`**
* `build.ts` - This is where the main build process is done and all other submodules are attached

	To attach any function to the the build just add the function like this
	```ts
	import { ElectronBuilder } from "~build/electron/ElectronBuilder"
	let applicationBuilder = new ElectronBuilder(...)

	const buildAddons = async (buildPath, electronVersion, platform, arch) { ... }

	applicationBuilder.onBuild(buildAddons)
	```
* `dev.ts` - to start development server with electron
* `ElectronBuilder.ts` - A generic class that can be used for building the application
	Usage is as follows
	```ts
	import { ElectronBuilder } from "~build/electron/ElectronBuilder"
	let applicationBuilder = new ElectronBuilder({
		main,				// Respective webpack configurations
		renderer,
		splashscreen,
	},
	buildConfig)	// electronPackager.Options

	applicationBuilder.build() // to build the application for production
	```
* `webpack.*.ts` - Webpack configurations file
	- `webpack.dev.ts` - for dev mode
	- `webpack.main.ts` - to compile `src/electron`
	- `webpack.renderer.ts` - to compile `src/app`
	- `webpack.splashscreen.ts` - to compile `src/splashscreen`

**`web`**
* `build.ts` - this is used to build the web version of the application. The generated output is at `dist/web`
* `dev.ts` - This is used to run the dev server for web implementation
* `WebBuilder.ts` - A generic class that can be used for building web application. Note that the config is preset to use `src/app` folder in this case. Usage is as follows :
	```ts
	import { WebBuilder } from "~build/web/WebBuilder"

	let builder = new WebBuilder(
		webpackConfig, 				// webpack configuration
		config.build.assetsRoot 	// output assets root file
	)
	builder.build() // build the web application
	```

### **`classes`**

Stores all the Classes, Interfaces and Types that are common between the main electron Project and its components.

### **`config`**

Stores all the configuration required for the main build.

### **`dist`**
more like a middle ground for production. Store all webpack builds here.

### **`src`** - stores the code for the electron UI.
* The Source folder is divided into multiple parts for easier understanding and separation between web and desktop codes.

* #### `app` - The GUI Components

	This is common between the Web Application and Electron Application. It is required to note that precautions must be taken to avoid web build failures as they might attempt to access os level modules.

	The Application source code is further divided into the following segments
	- **`assets`** - Static components for web builds
	- **`classes`**- UI specific classes and interfaces
	- **`components`** - Vue components. Here there are multiple types of sub-component, mainly those that are auto imported and those that are not.

	The Application will auto detect the run state of the application and auto import any component that has the naming

	`install-*.vue` if the code is inside install segment and

	`app-*.vue` if the app is in general segment.

	Any Component not having the names in the above format needs to be imported manually by using the following syntax
	```ts
	import componentName from "@/components/component-name"
	```
	- **`i18n`** - This is very important for application translation.

	All the translations are stored in `lang/*.ts` files and must be initialized in the
	`@@/config/utils.ts` file or the application will generate errors at multiple locations.

	The translations file must implement all the translations from `en-US`. The simplest way to implement any new language is as follows
	```ts
	import { ITranslations } from "@/i18n/ITranslations"
	const Language: ITranslations = { ... }
	export default Language
	```
	- **`layouts`** - Same as components but this stores UI layouts.

	All the install mode layouts must be named as `install-layoutName-layout.vue`

	and the rest of the application layouts as `app-layoutName-layout.vue`

	if you want to use auto import feature. Otherwise you can import as follows
	```ts
	import layoutName from "@/layouts/layout-name"
	```
	- **`pages`** - All the UI pages that application will transition through are stored here.

	Note that all the install pages are stored in the `install` subfolder
	- **`routes`** - All the application and install routes are stored in this directory.

	To add a route to install mode use `install.routes.ts`

	To add a route to the normal application use `routes.ts`

	An example of a route is as follows
	```ts
	{
		path: "/",
		name: "home",
		component: () => lazyLoadView("/home"), // where home is relative to `pages` folder
		props: true,
		// other routes logic here
	}
	```

	- **`state`** - Stores all the dynamic vuex stores here.
	It is advised to place all the install vuex stores in `install-module` subfolder
	while the rest directly into the folder.

	- **`utils`** - All the non essential utility based scripts are placed here.

* #### `config` - The Common config for all

	This folder stores multiple files that are common between `electron` and the `app` folder and are like configurations for them both.

* #### `electron` - The main process

	This folder houses the main process required to boot up the application

* #### `typescript` - electron related typescript shims

### **`static`**
Static files related to the project and components.

### **`typescript`**
Typescript shims.
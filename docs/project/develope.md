## Development
```bash
# for web server
$ npm run dev:web

# for electron live server
$ npm run dev
```

### Development Helpers

* `webpack-preprocessor-loader` to provide the functionality of preprocessor directive like in C++.
	```ts
	// #!if debug
	console.log("DEBUG", "some debug data")
	// #!else
	console.log("IN PRODUCTION MODE")
	// #!endif
	```

	is converted to this in `production` environment
	```js
	console.log("IN PRODUCTION MODE")
	```
	and this in `development` environment
	```js
	console.log("DEBUG", "some debug data")
	```

	The variables need to be set in webpack config. [Read More.](https://www.npmjs.com/package/webpack-preprocessor-loader)

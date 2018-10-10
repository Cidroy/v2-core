module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"parser": "babel-eslint",
	"plugins": [ "html" ],
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module",
		"allowImportExportEverywhere": true
	},
	"settings": {
		"import/resolver": {
			"webpack": {
				"config": "build/webpack.base.js"
			}
		}
	},
	"rules": {
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		"quotes": ["error", "double"],
		"semi": ["error", "never"],
		"no-irregular-whitespace": ["error", {
			"skipComments": true,
			"skipRegExps": true,
			"skipTemplates": true,
		}],
		"accessor-pairs": ["error", { "getWithoutSet": true }],
		"array-bracket-newline": ["error", { "multiline": true }],
		"array-bracket-spacing": ["error", "always"],
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
		"comma-dangle": ["error", { "functions": "never" }, "always-multiline"],
		"comma-spacing": ["error", { "before": false, "after": true }],
		"no-invalid-this": "error",
		"no-undefined": "error",
		"no-fallthrough": "error",
		"class-methods-use-this": 0,
		"block-scoped-var": "error",
		"block-spacing": "error",
		"no-undef-init": "error",
		"eol-last": 0,
		"linebreak-style": 0,
		"comma-dangle": ["error", {
			"arrays": "always",
			"objects": "only-multiline",
			"imports": "never",
			"exports": "never",
			"functions": "ignore"
		}]
	}
};
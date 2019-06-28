const common = require("../../../jest.config")

const electronOnly = [
	"**/test/electron-pdf.spec.ts",
]

module.exports = {
	...common,
	projects: [
		{
			...common,
			runner: "@jest-runner/electron",
			testEnvironment: "@jest-runner/electron/environment",
			testMatch: [
				...electronOnly,
			],
		},
		{
			...common,
			testMatch: [
				"**/test/**.spec.ts",
				...electronOnly.map(glob => "!"+glob),
			],
		},
	]
}

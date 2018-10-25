// This file is only used in development mode

// Set environment for development
if (!process.env.NODE_ENV)
	process.env.NODE_ENV = "development"

require("./index")
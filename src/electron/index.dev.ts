/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */
import loadDevtools from "./load-devtools"
// Set environment for development
if(!process.env.NODE_ENV)
process.env.NODE_ENV = "development"

loadDevtools()
// Require `main` process to boot app
require("./index")

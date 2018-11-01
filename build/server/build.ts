process.env.NODE_ENV = "production"

import config from "~config/index"
import webpackConfig from "~build/server/webpack.prod"

import { ServerBuilder } from "~build/server/ServerBuilder"

let builder = new ServerBuilder(webpackConfig, config.build.assetsRoot)
builder.build()
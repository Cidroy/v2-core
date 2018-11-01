process.env.NODE_ENV = "production"

import config from "~config/index"
import webpackConfig from "~build/webpack.prod"
import { WebBuilder } from "~build/web/WebBuilder"

let builder = new WebBuilder(webpackConfig, config.build.assetsRoot)
builder.build()
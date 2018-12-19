process.env.NODE_ENV = "production"

import config from "~config/index"
import webpackConfig from "~positron/build/webpack.prod"

import { ServerBuilder } from "~positron/build/ServerBuilder"

let builder = new ServerBuilder(webpackConfig, config.build.assetsRoot)
builder.build()
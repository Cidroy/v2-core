process.env.NODE_ENV = "production"

import config from "~config/index"
import webpackConfig from "~neutron/build/webpack.prod"

import { ServerBuilder } from "~neutron/build/ServerBuilder"

let builder = new ServerBuilder(webpackConfig, config.build.assetsRoot)
builder.build()

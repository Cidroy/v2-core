## Positron ##

This is a local server that is meant to help multi-thread the project by removing all the logic into a separate binary.

The Project is located in `addons/positron`

The binary is then packaged into `electron-core-output/resources/positron`
by the electron build process

```bash
# for docs
$ npm run docs:positron

# To do a live testing of the server
$ npm run dev:positron

# to build a javascript output
# output files are located in `dist/positron`
$ npm run build:positron
```
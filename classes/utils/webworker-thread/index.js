import os from "os"

var WebWorkerThreads
if(os.platform()==="win32") WebWorkerThreads = require("./WebWorkerThreads-win32.node")
if(os.platform()==="linux") WebWorkerThreads = require("./WebWorkerThreads-win32.node")


export default WebWorkerThreads

import fs from "fs-extra"
// #!if web
import { Buffer } from "buffer"
// #!endif

export async function encode_base64(filePath: string){
	let data = await fs.readFile(filePath)
	let buffer = Buffer.from(data)
	let base64 = buffer.toString("base64")
	return base64
}

export async function decode_base64(base64: string , filePath: string){
	let buffer = Buffer.from(base64,"base64")
	await fs.writeFile(filePath, buffer)
	return true
}

import { TAutoThread } from "@classes/types/application"
import BirthdayThread from "./birthday"

const Threads: TAutoThread[] = [
	{
		fn: BirthdayThread,
		args: null,
		once: false,
		parallel: false,
		repeat: 1000 * 60 * 60 * 24,
		instant: true,
	},
]
export default Threads

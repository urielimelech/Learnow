import { spawn } from 'child_process'

import { server } from './connectionServer.js'
import { learnowUrl } from "./options.js"

export const startLearnow = async () => {
    const cmd = spawn('cmd.exe', ['/c', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', '/new-window', `${learnowUrl}`])
    const serverIP = server
}
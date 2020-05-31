import { createConnection } from 'net'

import { connectionOptions } from './options/ConnectionsOptions.js'
import { recordingCommands } from './options/RecordingCommands.js'

export const createSocketToNeuroskyHeadset = () => {
    const neuroskySocket = createConnection(connectionOptions, () => {
        neuroskySocket.write(JSON.stringify(recordingCommands.get_as_json))
        neuroskySocket.write(JSON.stringify(recordingCommands.authorization))
        neuroskySocket.write(JSON.stringify(recordingCommands.get_app_names))
        neuroskySocket.write(JSON.stringify(recordingCommands.start_recording))
    })
    return neuroskySocket
}
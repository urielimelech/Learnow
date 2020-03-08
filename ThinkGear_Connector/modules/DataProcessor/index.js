import { connectionOptions } from './options/ConnectionsOptions.js'
import { recordingCommands } from './options/RecordingCommands.js'

import { createConnection } from 'net'

export const createSocketToNeuroskyHeadset = createConnection(connectionOptions, () => {
    createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.get_as_json))
    createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.authorization))
    createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.get_app_names))
    createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.start_recording))
})
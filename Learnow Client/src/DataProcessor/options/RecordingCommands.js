export const recordingCommands = 
{
    "get_as_json": {
      "enableRawOutput": false,
      "format": "Json"
    },
    "start_recording": {
      "startRecording": {
        "rawEeg": false,
        "poorSignalLevel": true,
        "eSense": true,
        "eegPower": false,
        "blinkStrength": false
      },
      "applicationName": "learnow"
    },
    "stop_recording": {
      "stopRecording": "learnow"
    },
    "recordingStopped": {
      "status": "recordingStopped"
    },
    "cancel_recording": {
      "cancelRecording": "learnow"
    },
    "question": {
      "eventType": "question",
      "eventData": {
        "question": "question",
        "answer": "answer",
        "userAnswer": "userAnswer",
        "result": true
      },
      "applicationName": "learnow"
    },
    "get_session_id": {
      "getSessionIds": "learnow"
    },
    "get_app_names": {
      "getAppNames": null
    },
    "authorization": {
      "appName": "learnow",
      "appKey": "0f44a7099e1a49600a109c1527497c5761085001"
    },
    "isAuthorized": {
      "isAuthorized": true
    }
  }
  
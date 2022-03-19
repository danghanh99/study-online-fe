
declare let JitsiMeetExternalAPI: any;

export const JitsiApi = {
    closeMeeting: () => {
        const jitsiNode = document.querySelector('#jitsi-container');
        if (jitsiNode) {
            jitsiNode.innerHTML = '';
        }
    },
    startMeeting: async (userName: string, roomName: string) => {
        const options = {
            roomName,
            height: '100%',
            width: '100%',
            parentNode: document.querySelector('#jitsi-container'),
            userInfo: {
                displayName: userName
            },
            configOverwrite: {
                doNotStoreRoom: true,
                disableDeepLinking: true,
                enableWelcomePage: false,
                prejoinPageEnabled: false,
                disableRemoteMute: false,
                remoteVideoMenu: {
                    disableKick: true
                },
            },
            interfaceConfigOverwrite: {
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                DISABLE_FOCUS_INDICATOR: true,
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
            }
        };
        return new JitsiMeetExternalAPI('meet.jit.si', options);
    },
    readyToClose: (apiObj: any) => {
        apiObj.executeCommand('hangup');
        const iframe = apiObj.getIFrame();
        iframe.remove();
    },
    startRecording: (apiObj: any, streamkey: any) => {
        apiObj.executeCommand('startRecording', {
            mode: 'stream',
            rtmpStreamKey: streamkey,
            youtubeStreamKey: streamkey,
        });
        return streamkey;
    },
    stopRecording: (apiObj: any) => {
        apiObj.executeCommand('stopRecording', 'stream');
    },
    screenSharingStatusChanged: (apiObj: any) => {
        apiObj.executeCommand('toggleShareScreen');
    },
    videoMuteStatusChanged: (apiObj: any) => {
        apiObj.executeCommand('toggleVideo');
    },
    audioMuteStatusChanged: (apiObj: any) => {
        apiObj.executeCommand('toggleAudio');
    },
    muteEveryone: (apiObj: any) => {
        apiObj.executeCommand('muteEveryone');
    },
};

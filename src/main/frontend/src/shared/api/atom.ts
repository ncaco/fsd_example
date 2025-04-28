import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'recoil-persist', // localStorage key
	storage: localStorage,
});

// 세션 상태를 위한 atom
export const sessionState = atom({
	key: "sessionState",  // 유니크한 키
	default: {			// 초기값
		A_SN: null,
		A_NM: null,
		A_EML: null
	},
});

// 권한 상태를 위한 atom
export const authState = atom({
	key: "authState",
	default: {
		admin: false
	}
});

export const recordingState = atom({
    key: 'recordingState',
    default: {
        isRecording: false,
        isPaused: false,
        recordingTime: 0,
        timeString: "00:00",
        recordingStartTime: null,
        recordingEndTime: null,
        memos: [],
        currentMemo: '',
        memoStartTime: null,
        audioBlob: null,
        audioChunks: [],
        showSaveButton: false,
        showMiniPlayer: true,
        miniPlayerExpanded: false,
        miniPlayerPosition: 'bottom', // 'bottom', 'top', 'left', 'right'
        miniPlayerMode: 'mini', // 'mini', 'large', 'full'
        selectedMicrophoneId: null,
        microphoneList: [],
        audioContext: null,
        mediaRecorder: null,
        stream: null,
        analyser: null,
        timerInterval: null,
        animationFrame: null,
        mimeType: null,
        isInRecordingPage: false // 녹음화면에 있는지 여부
    },
    effects_UNSTABLE: [persistAtom]
});
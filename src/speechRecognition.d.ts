// speechRecognition.d.ts
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition?: any;
    }
}

export { };
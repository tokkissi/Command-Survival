import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: "en-US", continuous: true });
    }
  };

  const resetScript = () => {
    resetTranscript();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return { transcript, listening, toggleListening, resetScript, stopListening };
};

export default useSpeechToText;

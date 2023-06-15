import { PulseLoader } from "react-spinners";
import AIAvatar from "./AIAvatar";

type Props = {
  text: string;
  isLoding: boolean;
};

export default function AITextBubble({ text, isLoding = true }: Props) {
  return (
    <div className="flex items-start">
      <div>
        <AIAvatar />
      </div>
      {isLoding ? (
        <span className="speech-bubble-ai">
          <PulseLoader color="#785466" />
        </span>
      ) : (
        <span className="speech-bubble-ai">{text}</span>
      )}
    </div>
  );
}

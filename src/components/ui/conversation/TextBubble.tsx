import { TextBubbleProps } from "@/model/gameData";
import useUIStore from "@/stores/useUIStore";
import { type } from "os";
import AIAvatar from "./AIAvatar";
import { PulseLoader } from "react-spinners";

export default function TextBubble({
  role,
  isLoading = false,
  text,
}: TextBubbleProps) {
  const { isMobile } = useUIStore();
  const flexibleMargin = isMobile ? "" : "ml-6";

  if (role === "user") {
    return (
      <div className="flex">
        <div className="w-1/6"></div>
        <span className="speech-bubble-user">{text}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start ${role === "assistant" && flexibleMargin}`}
    >
      {isLoading && role === "assistant" && (
        <>
          {!isMobile && (
            <div>
              <AIAvatar />
            </div>
          )}
          <span className="speech-bubble-ai flex">
            답변 중
            <PulseLoader
              color="#785466"
              size={6}
              cssOverride={{ margin: "0.4rem 0 0 0.3rem" }}
            />
          </span>
        </>
      )}
      {!isLoading && text && (
        <>
          {role === "assistant" && !isMobile && (
            <div>
              <AIAvatar />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className={`speech-bubble-ai ${
              role === "assistant" ? flexibleMargin : ""
            }`}
          />
        </>
      )}
    </div>
  );
}

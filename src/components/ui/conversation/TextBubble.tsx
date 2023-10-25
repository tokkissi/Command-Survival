import { TextBubbleProps } from "@/model/gameData";
import useUIStore from "@/stores/useUIStore";
import AIAvatar from "./AIAvatar";
import { PulseLoader } from "react-spinners";
import { forwardRef } from "react";

const TextBubble = forwardRef<HTMLDivElement, TextBubbleProps>(
  ({ role, isLoading = false, text, onClick, isSpecial }, ref) => {
    const { isMobile } = useUIStore();
    const flexibleMargin = isMobile ? "" : "ml-6";
    const textColor = isSpecial ? "font-bold text-amber-500" : "text-black";

    if (role === "user") {
      return (
        <div className="flex" ref={ref}>
          <div className="w-1/6"></div>
          <span className="speech-bubble-user">{text}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
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
              } ${textColor}`}
              onClick={onClick}
            />
          </>
        )}
      </div>
    );
  }
);

TextBubble.displayName = "TextBubble";

export default TextBubble;

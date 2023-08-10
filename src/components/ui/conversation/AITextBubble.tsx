import { PulseLoader } from "react-spinners";
import AIAvatar from "./AIAvatar";
import useUIStore from "@/stores/useUIStore";

type Props = {
  text: string | undefined;
  isLoding: boolean;
};

export default function AITextBubble({ text, isLoding = false }: Props) {
  const { isMobile } = useUIStore();
  const flexibleMargin = isMobile ? "" : "ml-6";

  return (
    <div className="flex items-start">
      {isLoding && (
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

      {!isLoding && text && (
        <>
          {!isMobile && (
            <div>
              <AIAvatar />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className={`speech-bubble-ai ${flexibleMargin}`}
          />
        </>
      )}
    </div>
  );
}

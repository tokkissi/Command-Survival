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
      {!isMobile && text ? (
        <div>
          <AIAvatar />
        </div>
      ) : (
        <></>
      )}

      {isLoding ? (
        <>
          <div>
            <AIAvatar />
          </div>
          <span className="speech-bubble-ai flex">
            답변 중
            <PulseLoader
              color="#785466"
              size={6}
              cssOverride={{ margin: "0.4rem 0 0 0.3rem" }}
            />
          </span>
        </>
      ) : (
        <></>
      )}

      {!isLoding && text ? (
        <span className={`speech-bubble-ai ${flexibleMargin}`}>{text}</span>
      ) : (
        <></>
      )}
    </div>
  );
}

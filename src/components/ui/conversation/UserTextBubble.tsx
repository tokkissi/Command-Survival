type Props = {
  text: string;
};

export default function UserTextBubble({ text }: Props) {
  return (
    <div className="flex">
      <div className="w-1/6"></div>
      <span className="speech-bubble-user">{text}</span>
    </div>
  );
}

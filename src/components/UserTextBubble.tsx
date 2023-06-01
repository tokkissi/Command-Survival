type Props = {
  text: string;
};

export default function UserTextBubble({ text }: Props) {
  return (
    <div className="flex">
      <div>
        <div className="w-40"></div>
      </div>
      <span className="speech-bubble-user">{text}</span>
    </div>
  );
}

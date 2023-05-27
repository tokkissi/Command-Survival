import Image from "next/image";

type Props = {
  userImage?: string | null;
};

export default function Avatar({ userImage }: Props) {
  return (
    <div className="w-[40px] h-[40px] p-[1.1px] rounded-full flex items-center justify-center bg-gradient-to-bl from-teal-400 via-yellow-200 to-violet-500">
      <Image
        className="rounded-full bg-white"
        src={userImage ?? "/images/default-user.png"}
        alt="user image"
        referrerPolicy="no-referrer"
        width={50}
        height={50}
      />
    </div>
  );
}

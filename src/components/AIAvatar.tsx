import Image from "next/image";

export default function AIAvatar() {
  return (
    <div className="w-10 h-10 p-[1.1px] rounded-full flex items-center justify-center bg-gradient-to-bl from-teal-400 via-yellow-200 to-violet-500">
      <Image
        className="rounded-full bg-white"
        src={"/images/default-user.png"}
        alt="AI image"
        referrerPolicy="no-referrer"
        width={50}
        height={50}
      />
    </div>
  );
}

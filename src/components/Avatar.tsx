import Image from "next/image";

type Props = {
  userImage?: string | null;
  isMobile: boolean;
};

export default function Avatar({ userImage, isMobile = false }: Props) {
  const mobileClassName =
    "w-[24px] h-[24px] p-[0.8px] rounded-full flex items-center justify-center bg-gradient-to-bl from-teal-400 via-yellow-200 to-violet-500";
  const pcClassName =
    "w-[40px] h-[40px] p-[1.1px] rounded-full flex items-center justify-center bg-gradient-to-bl from-teal-400 via-yellow-200 to-violet-500";
  return (
    <div className={isMobile ? mobileClassName : pcClassName}>
      <Image
        className="rounded-full bg-white"
        src={userImage ?? "/images/default-user.png"}
        alt="user image"
        referrerPolicy="no-referrer"
        width={isMobile ? 30 : 50}
        height={isMobile ? 30 : 50}
      />
    </div>
  );
}

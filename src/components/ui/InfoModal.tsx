import Image from "next/image";
import CloseIcon from "./icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function InfoModal({ children, onClose }: Props) {
  return (
    <section
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-4 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="relative flex justify-center items-center">
        <Image
          className="w-[400px] h-[300px]"
          src="/images/parchment.png"
          alt="parchment background"
          width={440}
          height={580}
        />
        <div className="absolute w-full h-full flex flex-col justify-center items-center gap-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl font-bold">
          {children}
        </div>
      </div>
    </section>
  );
}

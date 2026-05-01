import Image from "next/image";

interface NotFoundProps {
  text?: string;
}
const NotFound = ({ text }: NotFoundProps) => {
  return (
    <div className="bg-gradient-to-b relative h-screen w-screen from-black via-midnightpurple/30 to-black p-4 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full">
        <h1 className="text-7xl text-center w-full">
          {text || "Page Not Found"}
        </h1>
      </div>
      <div className="h-10 w-full left-0 bg-gradient-to-b from-transparent to-black absolute bottom-20 z-20" />
      <Image
        src="/hero5.png"
        className="h-96 w-auto bottom-20 absolute left-1/2 -translate-x-1/2 z-10"
        alt="Page Not Found Hero"
        width={500}
        height={384}
      />
    </div>
  );
};

export default NotFound;

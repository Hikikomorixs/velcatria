import Image from "next/image";

const BackgroundBranches = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-45 mix-blend-screen">
      <Image
        src="/sakura-branch.png"
        alt=""
        width={900}
        height={1260}
        priority
        className="absolute -right-32 -top-24 w-[min(58vw,48rem)] rotate-[14deg] opacity-45 blur-[0.2px]"
      />
      <Image
        src="/sakura-branch.png"
        alt=""
        width={900}
        height={1260}
        priority
        className="absolute -bottom-44 -left-36 w-[min(70vw,58rem)] -rotate-[164deg] opacity-34 blur-[0.25px]"
      />
    </div>
  );
};

export default BackgroundBranches;

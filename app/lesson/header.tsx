
import Image from "next/image";

import { Progress } from "@/components/ui/progress";


type HeaderProps = {
  hearts: number;
  percentage: number;
  
};

export const Header = ({
  hearts,
  percentage,
  
}: HeaderProps) => {

  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px]">
     

      <Progress value={percentage} />

      <div className="flex items-center font-bold text-rose-500">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hearts}
      </div>
    </header>
  );
};

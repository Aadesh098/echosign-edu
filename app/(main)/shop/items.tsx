"use client";

import { useTransition } from "react";

import Image from "next/image";
import { toast } from "sonner";

import { refillHearts , buyHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";

type ItemsProps = {
  hearts: number;
  points: number;
};

export const Items = ({
  hearts,
  points,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();
  const onRefillHearts = () => {
    if (pending || hearts === MAX_HEARTS || points < 10) return;

    startTransition(() => {
      buyHearts().catch(() => toast.error("Something went wrong."));
    });
  };
  const onPolicyBought = () => {
    if (points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong."));
    });
  };

  

  return (
    <ul className="w-full">
       <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Refill hearts
          </p>
        </div>

        <Button
          onClick={onRefillHearts}
          disabled={
            pending || hearts === MAX_HEARTS || points < 10
          }
          aria-disabled={
            pending || hearts === MAX_HEARTS || points < 10
          }
        >
          {hearts === MAX_HEARTS ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />

              <p>{10}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/Policybazaar_Logo.gif" alt="Heart" height={60} width={60} />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Policy Bazaar
          </p>
        </div>

        <Button
          onClick={onPolicyBought}
          disabled={
             points < POINTS_TO_REFILL
          }
          aria-disabled={
             points < POINTS_TO_REFILL
          }
        >
          
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />

              <p>{POINTS_TO_REFILL}</p>
            </div>
          
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/acko.svg" alt="Heart" height={60} width={60} />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            ACKO
          </p>
        </div>

        <Button
          onClick={onPolicyBought}
          disabled={
             points < POINTS_TO_REFILL
          }
          aria-disabled={
             points < POINTS_TO_REFILL
          }
        >
          
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />

              <p>{POINTS_TO_REFILL}</p>
            </div>
          
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/bjfin.svg" alt="Heart" height={60} width={60} />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Bajaj Finserv
          </p>
        </div>

        <Button
          onClick={onPolicyBought}
          disabled={
             points < POINTS_TO_REFILL
          }
          aria-disabled={
             points < POINTS_TO_REFILL
          }
        >
          
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />

              <p>{POINTS_TO_REFILL}</p>
            </div>
          
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/lic.svg" alt="Heart" height={60} width={60} />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            LIC Insurance
          </p>
        </div>

        <Button
          onClick={onPolicyBought}
          disabled={
             points < POINTS_TO_REFILL
          }
          aria-disabled={
             points < POINTS_TO_REFILL
          }
        >
          
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />

              <p>{POINTS_TO_REFILL}</p>
            </div>
          
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/starh.svg" alt="Heart" height={60} width={60} />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            STAR Health
          </p>
        </div>

        <Button
          onClick={onPolicyBought}
          disabled={
             points < POINTS_TO_REFILL
          }
          aria-disabled={
             points < POINTS_TO_REFILL
          }
        >
          
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />

              <p>{POINTS_TO_REFILL}</p>
            </div>
          
        </Button>
      </div>

      
        
      
    </ul>
  );
};

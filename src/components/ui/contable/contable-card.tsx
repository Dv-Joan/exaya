import { Card, Skeleton, Typography } from "antd";
import React from "react";
import Image from "next/image";
type Card = {
  cardTitle: string;
  cardIcon: string;
  cardConcept: string;
  cardValue: number | undefined;
  isLoading: boolean;
};
export function ContableCard({
  cardTitle,
  cardIcon,
  cardConcept,
  cardValue,
  isLoading,
}: Card) {
  return (
    <Card className=" w-full min-w-[240px]  shadow-md duration-200 hover:shadow-lg">
      <h4 className="text-sm text-slate-400 ">{cardTitle}</h4>
      {isLoading ? (
        <Skeleton.Avatar active size={60} />
      ) : (
        <Typography.Title level={3} className="text-slate-800">
          {cardValue?.toLocaleString("es-PE", {
            style: "currency",
            currency: "PEN",
          })}
        </Typography.Title>
      )}

      <Typography.Text className="font-Roboto flex items-center gap-1 pt-5 text-slate-400">
        <Image src={cardIcon} alt="icon" width={20} height={20} />
        {cardConcept}
      </Typography.Text>
    </Card>
  );
}

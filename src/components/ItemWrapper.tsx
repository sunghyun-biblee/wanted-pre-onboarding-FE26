import React from "react";
import { twMerge } from "tailwind-merge";

const ItemWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col gap-2 ", className)}>{children}</div>
  );
};

export default ItemWrapper;

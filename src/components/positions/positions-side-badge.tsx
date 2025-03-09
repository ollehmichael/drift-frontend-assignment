"use client";

import { PositionSideEnum } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "../ui/badge";

export function PositionsSideBadge({ side }: { side: `${PositionSideEnum}` }) {
  const label = () => {
    switch (side) {
      case PositionSideEnum.LONG:
        return "Long";
      case PositionSideEnum.SHORT:
        return "Short";
      default:
        return side.charAt(0).toUpperCase() + side.slice(1);
    }
  };

  const icon = () => {
    switch (side) {
      case PositionSideEnum.LONG:
        return <ArrowUp className="mr-1 h-3 w-3" />;
      case PositionSideEnum.SHORT:
        return <ArrowDown className="mr-1 h-3 w-3" />;
    }
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        side === PositionSideEnum.LONG ? "buy" : "sell",
        "mr-2 w-20 justify-center"
      )}
    >
      {icon()}
      {label()}
    </Badge>
  );
}

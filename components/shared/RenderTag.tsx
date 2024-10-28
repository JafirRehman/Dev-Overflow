import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  isTruncated?: boolean;
}

const RenderTag = ({
  _id,
  name,
  totalQuestions,
  showCount,
  isTruncated,
}: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex items-center justify-between gap-2"
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-lg border-none px-4 py-2 uppercase">
        <p className={`${isTruncated && "line-clamp-1"}`}>{name}</p>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;

import { cn } from "../lib/cn";

type Props = {
  title: string;
  strColor: string;
  bgColor: string;
};

const TagBar = ({ strColor, bgColor, title }: Props) => {
  return (
    <div
      className={cn(
        "w-20 rounded-xl px-[3px] py-[3px] items-center flex justify-center",
        bgColor,
      )}
    >
      <p className={cn("font-inter text-white text-xs", strColor)}>
        {title.toUpperCase()}
      </p>
    </div>
  );
};

export default TagBar;

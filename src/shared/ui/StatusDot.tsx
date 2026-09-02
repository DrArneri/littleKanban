import { cn } from "../lib/cn";

type Props = {
  solid: string;
  shadow: string;
};

const StatusDot = ({ solid, shadow }: Props) => {
  return <div className={cn("size-3 rounded-full", solid, shadow)} />;
};

export default StatusDot;

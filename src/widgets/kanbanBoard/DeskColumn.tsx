import StatusDot from "../../shared/ui/StatusDot";
import { statusColors } from "../../entities/task/model/statusColors";
import type { Status } from "../../entities/task/model/Task";
import TaskCard from "../../entities/task/ui/TaskCard";
import { useTaskStore } from "../../entities/task/model/store";
import { useDroppable } from "@dnd-kit/react";
type Props = {
  status: Status;
  id: string;
};

const DeskColumn = ({ status, id }: Props) => {
  const { draft } = useTaskStore();

  const { isDropTarget, ref } = useDroppable({ id, accept: "task" });
  const data = draft.filter((task) => task.status === status);

  return (
    <div
      ref={ref}
      className={`bg-deskcolumn w-1/3 min-h-100 px-[1rem] py-[1rem] rounded-[20px] border-[1.5px] border-dashed flex flex-col transition-all duration-200 ease-in-out ${isDropTarget ? "border-[rgba(0,0,0,0.3)]" : "border-[rgba(0,0,0,0.08)]"} `}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <StatusDot
            solid={statusColors[status].solid}
            shadow={statusColors[status].shadow}
          />
          <p className="uppercase font-geistmono text-l text-statusgray">
            {status}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-[1rem]">
        {data.map((item) => {
          return <TaskCard key={item.id} id={item.id} task={item} />;
        })}
      </div>
    </div>
  );
};

export default DeskColumn;

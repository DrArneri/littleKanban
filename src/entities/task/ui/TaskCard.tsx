import StatusDot from "../../../shared/ui/StatusDot";
import TagBar from "../../../shared/ui/TagBar";
import { statusColors } from "../model/statusColors";
import type { Task } from "../model/Task";
import { tagColors } from "../model/tagColors";
import { useDraggable } from "@dnd-kit/react";
import DeleteTaskButton from "../../../shared/ui/DeleteTaskButton";
import { useTaskStore } from "../model/store";
type Props = {
  task: Task;
  id: string;
};

const TaskCard = ({ task, id }: Props) => {
  const { removeTask } = useTaskStore();

  const handleDelete = () => {
    removeTask(task.id);
  };

  const { ref } = useDraggable({ id, type: "task" });

  return (
    <div
      ref={ref}
      className="w-full min-h-30 bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex flex-col px-[1.5rem] py-[1rem] flex flex-col justify-between hover: cursor-grab transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-inter">{task.title}</p>
          <StatusDot
            solid={statusColors[task.status].solid}
            shadow={statusColors[task.status].shadow}
          />
        </div>
        <div className="font-interlight text-statusgray text-sm">
          <p>{task.description}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <TagBar
          title={task.tag}
          strColor={tagColors[task.tag].str}
          bgColor={tagColors[task.tag].bg}
        />
        <DeleteTaskButton
          className="border-none opacity-[0.5] transition-all duration-300 ease-in-out hover:opacity-[1] cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default TaskCard;

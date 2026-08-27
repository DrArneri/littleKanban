import StatusDot from "../../../shared/ui/StatusDot"
import TagBar from "../../../shared/ui/TagBar"
import { statusColors } from "../model/statusColors"
import type { Task } from "../model/Task"
import { tagColors } from "../model/tagColors"
import { useDraggable } from "@dnd-kit/react"
type Props = {
  task: Task
  id: string
}

const TaskCard = ({task, id}:Props) => {

  const {ref} = useDraggable({id, type: 'task'})
  
  return (
    <div ref={ref} className="w-full min-h-30 bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex flex-col px-[1.5rem] py-[1rem] flex flex-col justify-between hover: cursor-grab">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-inter">{task.title}</p>
          <StatusDot solid={statusColors[task.status].solid} shadow={statusColors[task.status].shadow}/>
        </div>
        <div className="font-interlight text-statusgray text-sm">
          <p>{task.description}</p>
        </div>
      </div>
      <TagBar title={task.tag} strColor={tagColors[task.tag].str} bgColor={tagColors[task.tag].bg}/>
      </div>
  )
}

export default TaskCard
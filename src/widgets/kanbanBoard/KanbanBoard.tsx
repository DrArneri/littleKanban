import DeskColumn from "./DeskColumn"
import { DragDropProvider } from "@dnd-kit/react"
import { useTaskDraft } from "../../entities/task/model/store"
import type { Status } from "../../entities/task/model/Task"
const KanbanBoard = () => {

  const {moveTask} = useTaskDraft()

  return (
    <DragDropProvider
    onDragEnd={
      (e) => {
        if(e.canceled) return;

        const {target, source} = e.operation
        
        if (!target || !source) return;

        const taskId = source.id as string
        const newStatus = target.id as Status 
        
        moveTask(taskId, newStatus)
      }
    }
    >
      <div className="flex gap-20">
            <DeskColumn status={'todo'} id={'todo'} />
            <DeskColumn status={'in progress'} id={'in progress'} />
            <DeskColumn status={'done'} id={'done'}/>
      </div>
    </DragDropProvider>
  )
}

export default KanbanBoard
import DeskColumn from "./DeskColumn"
const KanbanBoard = () => {
  return (
    <div className="flex gap-20">
            <DeskColumn status={'todo'}/>
            <DeskColumn status={'in progress'}/>
            <DeskColumn status={'done'}/>
    </div>
  )
}

export default KanbanBoard
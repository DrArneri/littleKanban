import { AddTaskButton } from "../features/addTask/ui/AddTaskButton"
import AddTaskModal from "../features/addTask/ui/AddTaskModal"
import { useTaskStore } from "../entities/task/model/store"
const Header = () => {

  const {draft} = useTaskStore()

  return (
    <header className="w-full h-20 bg-headercolor flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <img src="/logo.svg" alt="LittleKanban logo.svg" className="size-10"/>
        <p className="text-xl font-inter font-semibold">littleKanban</p>
      </div>
      <div className="flex gap-4 items-center">
        {draft.length > 1 || draft.length === 0
        ? <p className="text-l font-geistmono text-textgray">
          {draft.length} tasks
        </p>
        : <p className="text-l font-geistmono text-textgray">
          {draft.length} task</p>}
        <AddTaskButton/>
      </div>
      <AddTaskModal/>
    </header>
  )
}

export default Header
import Button from "../shared/ui/Button"
const App = () => {
  return (
    <header className="w-full h-20 bg-headercolor flex justify-between px-[4rem] items-center">
      <div className="flex gap-4 items-center">
        <img src="/logo.svg" alt="LittleKanban logo.svg" className="size-10"/>
        <p className="text-xl font-inter font-semibold">littleKanban</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-l font-geistmono text-textgray">0 tasks</p>
        <Button variant={'addTask'}>+ Add task</Button>
      </div>
    </header>
  )
}

export default App
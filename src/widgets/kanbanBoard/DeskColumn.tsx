import StatusDot from "../../shared/ui/StatusDot"
import { statusColors } from "../../entities/task/model/statusColors"
import type { Status } from "../../entities/task/model/Task"
type Props = {
  status: Status
}

const DeskColumn = ({status}: Props) => {
  return (
    <div className="bg-deskcolumn w-1/3 h-100 px-[1rem] py-[1rem] rounded-[20px] border-[1.5px] border-dashed border-[rgba(0,0,0,0.08)] flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <StatusDot solid={statusColors[status].solid} shadow={statusColors[status].shadow} />
          <p className="uppercase font-geistmono text-l text-statusgray">{status}</p>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default DeskColumn
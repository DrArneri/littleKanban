type Props = {
  title: string
}

const DeskColumn = ({title}: Props) => {
  return (
    <div className="bg-deskcolumn w-1/3 h-100 px-[0.5rem] rounded-[20px] border-[1.5px] border-dashed border-[rgba(0,0,0,0.08)]">
      <div></div>
    </div>
  )
}

export default DeskColumn
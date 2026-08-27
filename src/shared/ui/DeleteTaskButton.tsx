import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const DeleteTaskButton = ({...rest}: Props) => {
  return (
    <button className="size-5 border-2 border-black-200 rounded-ml cursor-pointer">
        <img src="/deleteIcon.svg" alt="Delete task." className=""/>
    </button>
  )
}

export default DeleteTaskButton
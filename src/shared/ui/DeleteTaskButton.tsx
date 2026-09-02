import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const DeleteTaskButton = ({...rest}: Props) => {
  return (
    <button type="button" className="size-1" {...rest}>
        <img src="/deleteIcon.svg" alt="Delete task." className="size-7"/>
    </button>
  )
}

export default DeleteTaskButton
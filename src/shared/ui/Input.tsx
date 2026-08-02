import type { InputHTMLAttributes } from "react"
import { cn } from "../lib/cn"

type Props = {
    placeholder: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({placeholder, className}:Props) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={cn('w-full bg-white text-black px-3 py-[9px] rounded-xl border border-[rgba(0,0,0,0.1)] outline-none transition-colors duration-200 focus:border-[rgb(74,222,128)]', className)}
    />
  )
}

export default Input
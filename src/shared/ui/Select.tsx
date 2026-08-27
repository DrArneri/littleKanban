import type { SelectHTMLAttributes } from "react"

type Props = {
    options: string[] 
} & SelectHTMLAttributes<HTMLSelectElement>

const Select = ({options, ...rest}:Props) => {
  return (
    <select className="w-full bg-white text-black px-2 py-2 rounded-xl border border-[rgba(0,0,0,0.1)] outline-none transition-colors duration-200" {...rest}>
        {options.map((option) => {
            return (
                <option key={option} className='text-black' value={option}>{option}</option>
            )
        })}
    </select>
  )
}

export default Select
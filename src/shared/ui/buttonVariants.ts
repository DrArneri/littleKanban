import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  'flex justify-center items-center bg-neutralbg border-solid disabled:opacity-50 disabled:pointer-events-none hover: duration-300',
  {
    variants: {
      variant: {
        neutral: 'size-20',
        addTask: 'font-inter font-semibold rounded-[10px] bg-gradient-to-br from-[rgb(74,222,128)] to-[rgb(34,197,94)] text-l px-5 py-2 shadow-[0_2px_8px_rgba(34,197,94,0.35)] cursor-pointer transition-all duration-200 ease-in-out active:translate-y-[1px] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(34,197,94,0.45)]',
        deleteTask: 'bg-[linear-gradient(135deg,rgb(216, 18, 11),transparent)]'
      }
    },
    defaultVariants: { variant: 'neutral' },
  }
);
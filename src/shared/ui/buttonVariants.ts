import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  'flex justify-center cursor-pointer items-center bg-neutralbg border-solid disabled:opacity-50 disabled:pointer-events-none hover: duration-300',
  {
    variants: {
      variant: {
        modalCancel: 'w-full font-inter text-statusgray text-sm rounded-lg py-3 border border-[rgba(0,0,0,0.1)]',
        addTask: 'font-inter font-semibold rounded-[10px] bg-gradient-to-br from-[rgb(74,222,128)] to-[rgb(34,197,94)] text-l px-5 py-2 shadow-[0_2px_8px_rgba(34,197,94,0.35)] cursor-pointer transition-all duration-200 ease-in-out active:translate-y-[1px] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(34,197,94,0.45)]',
        modalAddTask: 'w-full font-inter text-statusfray text-sm py-3 bg-gradient-to-br from-[rgb(74,222,128)] to-[rgb(34,197,94)] shadow-[0_2px_8px_rgba(34,197,94,0.35)] transition-all duration-300 ease-in-out active:translate-y-[1px] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(34,197,94,0.45)]'
      }
    },
    defaultVariants: { variant: 'modalCancel' },
  }
);
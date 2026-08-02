import { createPortal } from "react-dom"

type Props = {
    onClose: () => void
    children: React.ReactNode
    isOpen: boolean
}

const Modal = ({onClose, children, isOpen}:Props) => {
  
  if (!isOpen) return null
  
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
        <div className="size-110 bg-white px-[2rem] py-[2rem] rounded-[20px]">
            <div className="flex justify-between items-center pb-[1rem]">
                <p className="text-l font-inter font-semibold">Add task</p>
            </div>
            <div>
                {children}
            </div>
        </div> 
    </div>,
    document.body
  )
}

export default Modal
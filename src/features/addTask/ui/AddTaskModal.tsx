import Input from "../../../shared/ui/Input"
import Modal from "../../../shared/ui/Modal"
import Select from "../../../shared/ui/Select"
import { useModalStore } from "../model/ModalStore"
import { tagOptions, statusOptions } from "../model/selectOptions"
import Button from "../../../shared/ui/Button"
import { useState, type SubmitEvent} from "react"
import { useTaskDraft } from "../model/TaskStore"
import type { Status, Tag } from "../../../entities/task/model/Task"
import { nanoid } from "nanoid"
const AddTaskModal = () => {

    const defaultStatus:Status = 'todo' 
    const defaultTag: Tag = 'Backend'

    const {close, isOpen} = useModalStore()

    const {draft, addTask} = useTaskDraft()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState<Status>(defaultStatus)
    const [tag, setTag] = useState<Tag>(defaultTag)

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        addTask({
            id: nanoid(),
            title: title,
            description: description,
            status: status,
            tag: tag
        })
        setTimeout(close, 0)
    }

    const handleClose = () => { 
        close()
    }

    return (
        <Modal onClose={close} isOpen={isOpen}>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <fieldset className="flex flex-col gap-1">
                    <label className="font-geistmono tracking-wider text-xs text-statusgray">TITLE</label>
                    <Input placeholder="What needs to be done?" onChange={(e) => setTitle(e.target.value)}/>
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    <label className="font-geistmono text-xs tracking-wider text-statusgray">DESCRIPTION</label>
                    <textarea placeholder="Optional details..." className="bg-white text-black px-3 py-2 pb-[2rem] rounded-xl border border-[rgba(0,0,0,0.1)] resize-none outline-none transition-colors duration-200 focus:border-[rgb(74,222,128)]" onChange={(e) => setDescription(e.target.value)}></textarea>
                </fieldset>
                <fieldset className="flex gap-1">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-geistmono tracking-wider text-xs text-statusgray">TAG</label>
                        <Select options={tagOptions} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setTag(e.target.value as Tag)}/>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-geistmono tracking-wider text-xs text-statusgray">STATUS</label>
                        <Select options={statusOptions} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as Status)}/>
                    </div>
                </fieldset>
                <div className="flex gap-4">
                    <Button variant={"modalCancel"} className="w-3/5" onClick={handleClose} type="button">Cancel</Button>
                    <Button variant={"modalCancel"} type="submit">AddTask</Button>
                </div>
            </form> 
        </Modal>
    )
}

export default AddTaskModal
import Input from "../../../shared/ui/Input"
import Modal from "../../../shared/ui/Modal"
import Select from "../../../shared/ui/Select"
import { useModalStore } from "../model/ModalStore"
import {tagOptions } from "../model/SelectOptions"
import { statusOptions } from "../model/SelectOptions"
import Button from "../../../shared/ui/Button"
const AddTaskModal = () => {
    const {close, isOpen} = useModalStore()

    return (
        <Modal onClose={close} isOpen={isOpen}>
            <form className="flex flex-col gap-5">
                <fieldset className="flex flex-col gap-1">
                    <label className="font-geistmono tracking-wider text-xs text-statusgray">TITLE</label>
                    <Input placeholder="What needs to be done?"/>
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    <label className="font-geistmono text-xs tracking-wider text-statusgray">DESCRIPTION</label>
                    <textarea placeholder="Optional details..." className="bg-white text-black px-3 py-2 pb-[2rem] rounded-xl border border-[rgba(0,0,0,0.1)] resize-none outline-none transition-colors duration-200 focus:border-[rgb(74,222,128)]"></textarea>
                </fieldset>
                <fieldset className="flex gap-1">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-geistmono tracking-wider text-xs text-statusgray">TAG</label>
                        <Select options={tagOptions}/>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-geistmono tracking-wider text-xs text-statusgray">STATUS</label>
                        <Select options={statusOptions}/>
                    </div>
                </fieldset>
                <div className="flex gap-4">
                    <Button variant={"modalCancel"} className="w-3/5" onClick={close}>Cancel</Button>
                    <Button variant={"modalCancel"}>AddTask</Button>
                </div>
            </form> 
        </Modal>
    )
}

export default AddTaskModal
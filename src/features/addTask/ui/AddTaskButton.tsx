import Button from "../../../shared/ui/Button";
import { useModalStore } from "../model/ModalStore";

export const AddTaskButton = () => {
  const { open } = useModalStore();

  return (
    <Button variant={"addTask"} onClick={open}>
      + Add task
    </Button>
  );
};

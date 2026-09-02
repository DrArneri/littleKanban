export type Status = "todo" | "in progress" | "done";
export type Tag =
  "Design" | "Bug" | "Docs" | "Backend" | "Feature" | "DevOps" | "Research";
export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  tag: Tag;
};

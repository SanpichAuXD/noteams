import { ColumnId } from "@/components/kanban/KanbanBoard";
import { TeamRequest } from "./team";

export type getAllTaskResponse = {
    task_id: string;
    task_name: string;
    task_desc: string;
    task_status: ColumnId
    task_deadline: string;
    // username: string;
    user_id: string;
}
export type taskRequestPost = TeamRequest & {
    formData : FormData;
}

export type updateStatusTaskRequest = {
    task_id: string;
    status: ColumnId;
}
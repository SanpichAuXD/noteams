import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ColumnId } from "./KanbanBoard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Kanbanform } from "./Kanbanform";
import { TaskDetail } from "./TaskDetail";
import { TeamRequest } from "@/type/team";

export type Task =  {
  task_id: UniqueIdentifier;
  task_status: ColumnId;
  task_name:string;
  task_desc?: string;
  user_id : string;
  task_deadline?: string;
  username? : string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay, token, team_id }: TaskCardProps & TeamRequest) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.task_id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Sheet >
					<SheetTrigger className="ring-0 focuserd:ring-0" asChild>
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Badge variant={"outline"} className="ml-auto font-semibold">
          Task 
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.task_name}
      </CardContent>
    </Card>
					</SheetTrigger>
					<SheetContent className="w-[500px] md:max-w-[500px]" side={"right"}>
						<SheetHeader>
							<SheetTitle>Update Task</SheetTitle>
							<TaskDetail task={task} team_id={team_id} token={token} />
						</SheetHeader>
					</SheetContent>
				</Sheet>
  );
}
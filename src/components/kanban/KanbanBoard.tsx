"use client"
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BoardColumn, BoardContainer } from "./BoardColumn";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { type Task, TaskCard } from "./TaskCard";
import type { Column } from "./BoardColumn";
import { hasDraggableData } from "@/lib/utils";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { Button } from "../ui/button";
import { useTaskStore } from "@/store/TaskStore";
import { useGetAllTask } from "@/store/TaskState";
import { createTask, updateStatusTask } from "@/api-caller/task";
import { IFormattedErrorResponse } from "@/type/type";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TeamRequest } from "@/type/team";
import { updateStatusTaskRequest } from "@/type/task";

const defaultCols = [
  {
    id: "TODO" as const,
    title: "Todo",
  },
  {
    id: "DOING" as const,
    title: "Doing",
  },
  {
    id: "DONE" as const,
    title: "Done",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

export type kanbanPropType = {
  token : string;
  team_id : string;
}
export function KanbanBoard({token, team_id} : kanbanPropType) {
  // const { tasks, addTask, setTasks} = useTaskStore()
  const {data, isPending} = useGetAllTask(token, team_id)
  const queryClient = useQueryClient()
  const mutation = useMutation<any,AxiosError<IFormattedErrorResponse>,updateStatusTaskRequest>({
    mutationFn : async ({task_id , status} : updateStatusTaskRequest) => {
      const {data} = await updateStatusTask({task_id , status, team_id, token});
      return data;
  },
  onSuccess : () => {
    console.log('success')
    queryClient.invalidateQueries({queryKey : ['tasks']})
},
onError : (error) => {
console.log(error.response?.data.message)
}
  })
  // console.log(data)
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
//   const [tasks, setTasks] = useState<Task[]>(initialTasks);
 

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = data?.filter((task) => task.task_status === columnId)!;
    const taskPosition = tasksInColumn.findIndex((task) => task.task_id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      // if (active.data.current?.type === "Column") {
      //   const startColumnIdx = columnsId.findIndex((id) => id === active.id);
      //   const startColumn = columns[startColumnIdx];
      //   return `Picked up Column ${startColumn?.title} at position: ${
      //     startColumnIdx + 1
      //   } of ${columnsId.length}`;
      // } 
      else if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.task_status;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        );
        return `Picked up Task ${
          active.data.current.task.task_desc
        } at position: ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      } 
      else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.task_status
        );
        if (over.data.current.task.task_status !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.task_desc
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      }
      else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.task_status
        );
        //call api here maybe
        
        if (over.data.current.task.task_status !== pickedUpTaskColumn.current) {

          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        console.log("change pos")
        
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <DndContext
    id={"kanban-board"}
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {data&& columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={data.filter((task) => task.task_status === col.id)}
              // addTask={}
              token={token}
              team_id={team_id}
            />
          ))}
         
        </SortableContext>
      </BoardContainer>

      {typeof window !== 'undefined' &&"document" in window &&
        createPortal(
          <DragOverlay>
            {data && activeColumn && (
                <>
              <BoardColumn
                isOverlay
                column={activeColumn}
                // addTask={addTask}
                token={token}
                team_id={team_id}
                tasks={data.filter(
                    (task) => task.task_status === activeColumn.id
                    )}
                    />
             
                    </>
            )}
            {activeTask && <TaskCard task={activeTask} token={token} team_id={team_id} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = activeData?.type === "Task";

    if (!isActiveATask) return;

    function changePrior(task : Task[]) {
        const activeIndex = task.findIndex((t) => t.task_id === activeId);
        const overIndex = task.findIndex((t) => t.task_id === overId);
        const activeTask = task[activeIndex];
        const overTask = task[overIndex];
        if (
          activeTask &&
          overTask &&
          activeTask.task_status !== overTask.task_status
        ) {
          activeTask.task_status = overTask.task_status;
          return arrayMove(task, activeIndex, overIndex - 1);
        }
        return arrayMove(task, activeIndex, overIndex);
    }
    // Im dropping a Task over another Task
    //call api here
    if (isActiveATask && isOverATask) {
      console.log('araiwa')
      changePrior(data!)
      // console.log(tasks)
        // setTasks(changePrior(tasks))
    //  setTasks((tasks : Task[]) => {
    //     const activeIndex = tasks.findIndex((t) => t.id === activeId);
    //     const overIndex = tasks.findIndex((t) => t.id === overId);
    //     const activeTask = tasks[activeIndex];
    //     const overTask = tasks[overIndex];
    //     if (
    //       activeTask &&
    //       overTask &&
    //       activeTask.columnId !== overTask.columnId
    //     ) {
    //       activeTask.columnId = overTask.columnId;
    //       return arrayMove(tasks, activeIndex, overIndex - 1);
    //     }

    //     return arrayMove(tasks, activeIndex, overIndex);
    //   });
    }

    const isOverAColumn = overData?.type === "Column";
    function changeColumn(task : Task[]) {
        const activeIndex = task.findIndex((t) => t.task_id === activeId);
        const activeTask = task[activeIndex];
        if (activeTask) {
          activeTask.task_status = overId as ColumnId;
          console.log(activeTask.task_status, activeTask.task_id)
          mutation.mutate({task_id : activeTask.task_id as string, status : activeTask.task_status})
          return arrayMove(task, activeIndex, activeIndex);
        }
        return task;
    }
    //call api here
    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      
      changeColumn(data!)
        // setTasks(changeColumn(tasks))
    }
  }
}
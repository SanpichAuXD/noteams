import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Active, DataRef, Over } from "@dnd-kit/core";
import { ColumnDragData } from "@/components/kanban/BoardColumn";
import { TaskDragData } from "@/components/kanban/TaskCard";
import { IFormattedErrorResponse } from "@/type/type";
import { AxiosError, isAxiosError } from "axios";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DraggableData = ColumnDragData | TaskDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Task") {
    return true;
  }

  return false;
}

export function formattedError(
  error: AxiosError<IFormattedErrorResponse> | unknown
): IFormattedErrorResponse {
  if (isAxiosError(error)) {
    const response = error.response;
    if (response) {
      const { message, info, errors } = response.data;
      const infoMessage = errors ?? "";
      return {
        message,
        infoMessage,
        status: response.status,
        statusText: response.statusText,
      };
    }
  }
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  return {
    message: "error",
  };
}
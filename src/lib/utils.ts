import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Active, DataRef, Over } from "@dnd-kit/core";
import { ColumnDragData } from "@/components/kanban/BoardColumn";
import { TaskDragData } from "@/components/kanban/TaskCard";
import { IFormattedErrorResponse} from "@/type/type";
import { AxiosError, isAxiosError } from "axios";
import { SignupRequest } from "@/type/user";



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
      status: 500,
    };
  }
  return {
    message: "error",
    status: 500,
  };
}

export function isResponseError<T>(respone: T | IFormattedErrorResponse): respone is IFormattedErrorResponse {
  return !!(respone as IFormattedErrorResponse).message
}


export function formatCookie(cookie : string): string {
  return decodeURIComponent(cookie.split(";")[0].split("=")[1]);
}


/// only use this function in client side
export function getUserCookie() : string { 
  return document.cookie.split(";")[0].split("=")[1].replaceAll('%22','"').replaceAll('%7B','{').replaceAll('%7D','}').replaceAll('%3A',':').replaceAll('%2C', ',');
}
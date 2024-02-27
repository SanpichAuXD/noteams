import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { Task, TaskCard } from "./TaskCard";
import { cva } from "class-variance-authority";
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, GripVertical, Plus, PlusCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnId } from "./KanbanBoard";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Kanbanform } from './Kanbanform';

export interface Column {
	id: UniqueIdentifier;
	title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
	type: ColumnType;
	column: Column;
}

interface BoardColumnProps {
	column: Column;
	tasks: Task[];
	isOverlay?: boolean;
	addTask: (task: Task) => void;
}

export function BoardColumn({
	column,
	tasks,
	isOverlay,
	addTask,
}: BoardColumnProps) {
	const tasksIds = useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		} satisfies ColumnDragData,
		attributes: {
			roleDescription: `Column: ${column.title}`,
		},
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva(
		"h-[500px] max-h-[500px] space-y-4  w-[350px] max-w-full  flex flex-col flex-shrink-0 snap-center",
		{
			variants: {
				dragging: {
					default: "border-2 border-transparent",
					over: "ring-2 opacity-30",
					overlay: "ring-2 ring-primary",
				},
			},
		}
	);

	return (
		<Card
			ref={setNodeRef}
			style={style}
			className={variants({
				dragging: isOverlay
					? "overlay"
					: isDragging
					? "over"
					: undefined,
			})}
		>
			<CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
				<Button
					variant={"ghost"}
					{...attributes}
					{...listeners}
					className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
				>
					<span className="sr-only">{`Move column: ${column.title}`}</span>
					<GripVertical />
				</Button>
				<span className="ml-auto"> {column.title}</span>
			</CardHeader>
			<ScrollArea>
				<CardContent className="flex flex-grow flex-col gap-2 p-2">
					<SortableContext items={tasksIds}>
						{tasks.map((task) => (
							<TaskCard key={task.id} task={task} />
						))}
					</SortableContext>
				</CardContent>
			</ScrollArea>
			<CardFooter>
				<Sheet >
					<SheetTrigger className="flex h-10 space-x-2 items-center justify-center w-full bg-black text-white rounded-lg hover:opacity-80">
						<PlusCircle size={24} />
						<span>Add Task</span>
					</SheetTrigger>
					<SheetContent className="w-[500px] md:max-w-[500px]" side={"right"}>
						<SheetHeader>
							<SheetTitle>Add Task</SheetTitle>
							<Kanbanform  />
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</CardFooter>
		</Card>
	);
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
	const dndContext = useDndContext();

	const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
		variants: {
			dragging: {
				default: "snap-x snap-mandatory",
				active: "snap-none",
			},
		},
	});

	return (
		<ScrollArea
			className={variations({
				dragging: dndContext.active ? "active" : "default",
			})}
		>
			<div className="flex gap-4 items-center flex-row justify-center">
				{children}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}

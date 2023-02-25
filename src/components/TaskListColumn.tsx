import React from "react";
import { ColumnProps } from "../types/KanbanData";
import ColumnItemsList from "./TaskList";
import { Draggable } from "react-beautiful-dnd";

const TaskListColumn: React.FC<ColumnProps> = ({ column, index }) => {
  return (
    // draggable column
    <Draggable draggableId={column.id} index={index} key={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`w-72 h-max border-2 rounded transition-colors ease-in duration-300 ${
            snapshot.isDragging ? "border-purple-500" : "border-purple-300"
          }`}
        >
          {/* column draggable handle is the title */}
          <h1
            {...provided.dragHandleProps}
            className={`text-lg font-medium text-center py-2 border-b-2 hover:bg-slate-300 transition-colors ease-in duration-300 ${
              snapshot.isDragging
                ? "border-b-purple-500 bg-slate-400"
                : "border-b-purple-300 bg-slate-100"
            }`}
          >
            {column.title}
          </h1>
          <ColumnItemsList items={column.children} colId={column.id} />
        </div>
      )}
    </Draggable>
  );
};
export default TaskListColumn;
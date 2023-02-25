import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnItemsListProps } from "../types/Column";
import TaskCard from "./TaskCard";

const TaskList: React.FC<ColumnItemsListProps> = ({ items, colId }) => {
  return (
    // droppable for type item
    <Droppable droppableId={colId} key={colId} type="item">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex flex-col items-center gap-6 py-4 mx-4 transition-colors ease-in duration-300 ${
            snapshot.isDraggingOver ? "bg-purple-200" : "bg-white"
          }`}
        >
          {items.map((item, index) => (
            <TaskCard key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
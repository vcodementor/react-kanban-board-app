import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ColumnItemProps } from "../types/Column";

const TaskCard : React.FC<ColumnItemProps> = ({ item, index }) => {
  return (
    // draggable item and draggable handle is the whole item itself
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`w-60 text-center py-6 border-2 border-fuchsia-300 rounded font-medium hover:bg-fuchsia-100 transition-colors ease-in duration-300 ${
            snapshot.isDragging ? "bg-fuchsia-300" : "bg-white "
          }`}
        >
          {item.title}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
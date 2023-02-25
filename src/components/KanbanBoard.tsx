import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TaskListColumn from "./TaskListColumn";
import { columns, columnsOrder } from "../data/KanbanData";
import { columnData } from "../types/Column";
import useLocalStorage from "../hooks/useLocalStorage";

const KanbanBoard = () => {
  const [columnsData, setColumnsData] = useLocalStorage<columnData[]>(
    "colsData",
    columns
  );

  const [colsOrder, setColsOrder] = useLocalStorage<string[]>(
    "colsOrder",
    columnsOrder
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    // if dropped outside the droppable, then destination is null
    if (!destination) {
      return;
    }

    // if the draggable is dropped in its own position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    /*------------REORDER  ITEM AND COLUMN AFTER DRAG AND DROP------------*/

    const copyOfColumnsData = [...columnsData];
    const copyOfColumnsOrder = [...colsOrder];

    // when item from the column is dragged and dropped
    if (type === "item") {
      // remove dragged item from the source column
      const draggedItem = copyOfColumnsData[
        copyOfColumnsOrder.indexOf(source.droppableId)
      ].children.splice(source.index, 1)[0];

      // add dragged item into the destination column
      copyOfColumnsData[
        copyOfColumnsOrder.indexOf(destination.droppableId)
      ].children.splice(destination.index, 0, draggedItem);

      // update state
      setColumnsData(copyOfColumnsData);
      return;
    }

    // when the column is dragged and dropped
    if (type === "column") {
      const draggedColumn = copyOfColumnsData.splice(source.index, 1)[0];
      const draggedColumnId = copyOfColumnsOrder.splice(source.index, 1)[0];

      copyOfColumnsData.splice(destination.index, 0, draggedColumn);
      copyOfColumnsOrder.splice(destination.index, 0, draggedColumnId);

      // update state
      setColumnsData(copyOfColumnsData);
      setColsOrder(copyOfColumnsOrder);
      return;
    }
  };

  return (
    // container is both drag-n-drop-context and droppable
    <DragDropContext onDragEnd={onDragEnd} key="drag-drop-context">
      <Droppable
        droppableId="container"
        key="container"
        direction="horizontal"
        type="column"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`w-full h-max flex justify-center gap-8 transition-colors ease-in duration-300 ${
              snapshot.isDraggingOver ? "bg-rose-100" : "bg-white"
            }`}
          >
            {columnsData.map((column, index) => (
              <TaskListColumn key={column.id} column={column} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
  
};

export default KanbanBoard;
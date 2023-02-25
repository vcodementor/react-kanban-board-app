export type columnItemData = {
    id: string;
    title: string;
  };
  
  export type columnData = {
    id: string;
    title: string;
    children: columnItemData[];
  };
  
  export type ColumnProps = {
    column: columnData;
    index: number;
  };
  
  export type ColumnItemsListProps = {
    items: columnItemData[];
    colId: string;
  };
  
  export type ColumnItemProps = {
    item: columnItemData;
    index: number;
  };
  
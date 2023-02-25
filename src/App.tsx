import {FC} from 'react';
import KanbanBoard from './components/KanbanBoard';

const App: FC = () =>  {
  return (
    <div className=" w-screen h-screen font-rubik flex flex-col items-center py-8 gap-8">
      <h1 className=" text-center text-3xl font-medium">
        Kanban Board
      </h1>
      <KanbanBoard />
    </div>
  );
};

export default App;
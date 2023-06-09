import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { Section, Task } from './InterfaceTask';
import { Label } from 'reactstrap';

export default function Board() {
    const [taskDetails, setTaskDetails] = useState<Task>(null);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
    const [labels, setLabels] = useState<Array<Label>>([]);
  return (
    <div className="tasks">
      <h1 className="text-black text-xl">Hello Kanban Board</h1>
      <DragDropContext>

      </DragDropContext>
    </div>
  )
}

import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { Dropdown, Modal } from 'react-bootstrap';
import { Section, Task, Label } from './InterfaceTask';
import AddSection from './AddSection';

function Board2() {
  const [userId, setUserId] = useState('');
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [labels, setLabels] = useState<Array<Label>>([]);
  const { projectId } = useParams();

  const onDragEnd = (result) => {
    // Drag and drop logic
  };

  return (
    <div className="tasks" onClick={() => setShowTaskDetails(true)}>
      <DragDropContext onDragEnd={onDragEnd}>
        Drag and Drop
      </DragDropContext>
      <AddSection
        dataTasks={{
          data: dataTasks,
          setData: setDataTasks,
        }}
        showModal={{
          status: showTaskDetails,
          setStatus: setShowTaskDetails,
        }}
        projectId={projectId}
        size={'xl'}
      />
    </div>
  );
}

export default Board2;

import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { Section, Task ,Label } from './InterfaceTask';
import { toast } from 'react-toastify';
import AddSection from './AddSection';

function Board2() {
  
   
  const [userId, setUserId] = useState('');
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [labels, setLabels] = useState<Array<Label>>([]);
  
  const onDragEnd = (result) => {
    // if (!result.destination) {
    //   return;
    // }
    // let taskId = result.draggableId;
    // let sectionFromId = result.source.droppableId;
    // let indexFrom = result.source.index;
    // let sectionToId = result.destination.droppableId;
    // let indexTo = result.destination.index;
    // if (sectionToId === sectionFromId) {
    //   let section = dataTasks.filter(
    //     (section) => section._id === sectionFromId,
    //   )[0];
    //   let task = section.tasks[indexFrom];
    //   section.tasks.splice(indexFrom, 1);
    //   let listTask1 = [...section.tasks];
    //   let listTask2 = [...section.tasks];
    //   section.tasks = [
    //     ...listTask1.splice(0, indexTo),
    //     task,
    //     ...listTask2.splice(indexTo),
    //   ];
    //   setDataTasks(dataTasks);
    // } else {
    //   let sectionFrom = dataTasks.filter(
    //     (section) => section._id === sectionFromId,
    //   )[0];
    //   let sectionTo = dataTasks.filter(
    //     (section) => section._id === sectionToId,
    //   )[0];
    //   let taskFrom = sectionFrom.tasks[indexFrom];
    //   sectionFrom.tasks.splice(indexFrom, 1);
    //   let listTask1 = [...sectionTo.tasks];
    //   let listTask2 = [...sectionTo.tasks];
    //   sectionTo.tasks = [
    //     ...listTask1.splice(0, indexTo),
    //     taskFrom,
    //     ...listTask2.splice(indexTo),
    //   ];
    // }
    // taskService
    //   .changeSection({
    //     projectId: projectId,
    //     taskId: taskId,
    //     sectionId1: sectionFromId,
    //     sectionId2: sectionToId,
    //     index: indexTo,
    //   })
    //   .then((res) => {
    //     setDataTasks(res.data.data.allTasks);
    //   })
    //   .catch((err) => {
    //     toast.error(
    //       err.response.data.error || "An unexpected error has occurred ",
    //     );
    //   });
  };


  return (
   <div className="tasks"
   onClick={() => {
    setShowTaskDetails(false);
   }}
   >
      <DragDropContext onDragEnd={onDragEnd}>
          Board2
      </DragDropContext>
       <AddSection/>
   </div>
  )
}

export default Board2

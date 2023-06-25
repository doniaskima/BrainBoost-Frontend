/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Section, Task } from './InterfaceTask';
import { toast } from 'react-toastify';
import { Label } from './InterfaceTask';
import { useParams } from 'react-router-dom';
import { taskService } from '../../services/task/api';
import { projectService } from '../../services/projects/api';
import { userService } from '../../services/user/api';
import { TaskDetails } from './TaskDetails';
import AddSection from './AddSection';
import SectionComponent from './SectionComponent';
import Loader from './TaskLoader'; // Import Loader component

const Board2: React.FC = () => {
  const { projectId } = useParams();

  const [userId, setUserId] = useState('');
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    taskService
      .getTasks(projectId)
      .then((res) => {
        setDataTasks(res.data.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        toast.error('An unexpected error occurred');
        setLoading(false); // Set loading to false on error
      });

    projectService
      .getLabels(projectId)
      .then((res) => {
        setLabels(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'An unexpected error occurred',
        );
      });
  }, []);

  useEffect(() => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Session expired');
      });
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let taskId = result.draggableId;
    let sectionFromId = result.source.droppableId;
    let indexFrom = result.source.index;
    let sectionToId = result.destination.droppableId;
    let indexTo = result.destination.index;

    if (sectionToId === sectionFromId) {
      let section = dataTasks.filter(
        (section) => section._id === sectionFromId,
      )[0];
      let task = section.tasks[indexFrom];
      section.tasks.splice(indexFrom, 1);
      let listTask1 = [...section.tasks];
      let listTask2 = [...section.tasks];
      section.tasks = [
        ...listTask1.splice(0, indexTo),
        task,
        ...listTask2.splice(indexTo),
      ];
      setDataTasks(dataTasks);
    } else {
      let sectionFrom = dataTasks.filter(
        (section) => section._id === sectionFromId,
      )[0];
      let sectionTo = dataTasks.filter(
        (section) => section._id === sectionToId,
      )[0];
      let taskFrom = sectionFrom.tasks[indexFrom];
      sectionFrom.tasks.splice(indexFrom, 1);
      let listTask1 = [...sectionTo.tasks];
      let listTask2 = [...sectionTo.tasks];
      sectionTo.tasks = [
        ...listTask1.splice(0, indexTo),
        taskFrom,
        ...listTask2.splice(indexTo),
      ];
    }

    taskService
      .changeSection({
        projectId: projectId,
        taskId: taskId,
        sectionId1: sectionFromId,
        sectionId2: sectionToId,
        index: indexTo,
      })
      .then((res) => {
        setDataTasks(res.data.data.allTasks);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'An unexpected error occurred',
        );
      });
  };

  return (
    <div
      className="tasks"
      onClick={() => {
        setShowTaskDetails(false);
      }}
    >
      {loading ? (
       <div className="loader-container">
          <Loader /> 
        </div> 
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {dataTasks.map((section, index) => {
            return (
              <SectionComponent
                userId={userId}
                dataTasks={{
                  data: dataTasks,
                  setData: setDataTasks,
                }}
                section={section}
                showTaskDetails={{
                  status: showTaskDetails,
                  setStatus: setShowTaskDetails,
                }}
                taskDetails={{
                  task: taskDetails,
                  setTask: setTaskDetails,
                }}
                labels={{
                  data: labels,
                  setData: (_labels) => {
                    setLabels(_labels);
                  },
                }}
                key={index}
              />
            );
          })}
        </DragDropContext>
      )}
      <AddSection
        dataTasks={{
          data: dataTasks,
          setData: setDataTasks,
        }}
        showModal={{
          status: showTaskDetails,
          setStatus: setShowTaskDetails,
        }}
        size={'xl'}
        projectId={projectId}
      />
      {taskDetails ? (
        <>
          <TaskDetails
            dataTasks={{
              data: dataTasks,
              setData: setDataTasks,
            }}
            task={{ task: taskDetails, setTask: setTaskDetails }}
            show={showTaskDetails}
            setShow={setShowTaskDetails}
            labels={{
              data: labels,
              setData: (_labels) => {
                setLabels(_labels);
              },
            }}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Board2;

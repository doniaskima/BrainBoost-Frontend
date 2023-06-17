/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Section, Task } from './InterfaceTask';
import { toast } from 'react-toastify';
import { Label } from './InterfaceTask';
import { useParams } from 'react-router';
import SectionComponent from './SectionComponent';
import AddSection from './AddSection';
import TaskDetails from './TaskDetails';
import { BASE_URL } from '../../utils/utils';
import axios from 'axios';

const Board2: React.FC = () => {
  const { projectId } = useParams();
  const [userId, setUserId] = useState('');
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [labels, setLabels] = useState<Array<Label>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await axios.get(`${BASE_URL}/api/tasks/getTasks?projectId=${projectId}`);
        setDataTasks(tasksResponse.data.data);

        const labelsResponse = await axios.get(`${BASE_URL}/api/project/getLabels?projectId=${projectId}`);
        setLabels(labelsResponse.data.data);
        console.log(labelsResponse);
      } catch (error) {
        toast.error('An unexpected error occurred');
      }
    };

    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/getUserId`);
        const userId = response.data?.id;
        console.log(userId);
        if (userId) {
          setUserId(userId);
        } else {
          toast.error('User ID is missing in the response');
        }
      } catch (error) {
        toast.error('Login session ended');
      }
    };

    fetchData();
    fetchUserId();
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
   
  };
  return (
    <div
      className="tasks"
      onClick={() => {
        setShowTaskDetails(false);
      }}>
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
            />
          );
        })}
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

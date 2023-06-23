/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Label, Section, Task } from './InterfaceTask';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import SectionComponent from './SectionComponent';
import axios from 'axios';
import { BASE_URL } from '../../utils/utils';
import { TaskDetails } from './TaskDetails';
import AddSection from './AddSection';



const Board2: React.FC = () => {
  const { projectId } = useParams();
  const [userId, setUserId] = useState('');
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true

      try {
        const tasksResponse = await axios.get(`${BASE_URL}/api/tasks/getTasks?projectId=${projectId}`);
        setDataTasks(tasksResponse.data.data);

        const labelsResponse = await axios.get(`${BASE_URL}/api/project/getLabels?projectId=${projectId}`);
        setLabels(labelsResponse.data.data);

        setIsLoading(false); // Set loading state to false
      } catch (error) {
        setIsLoading(false); // Set loading state to false
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
  }, [projectId]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    
    const taskId = result.draggableId;
    const sectionFromId = result.source.droppableId;
    const indexFrom = result.source.index;
    const sectionToId = result.destination.droppableId;
    const indexTo = result.destination.index;
    
    if (sectionToId === sectionFromId) {
      const section = dataTasks.filter((section) => section._id === sectionFromId)[0];
      const task = section.tasks[indexFrom];
      section.tasks.splice(indexFrom, 1);
      const listTask1 = [...section.tasks];
      const listTask2 = [...section.tasks];
      section.tasks = [
        ...listTask1.splice(0, indexTo),
        task,
        ...listTask2.splice(indexTo),
      ];
      setDataTasks(dataTasks);
    } else {
      const sectionFrom = dataTasks.filter((section) => section._id === sectionFromId)[0];
      const sectionTo = dataTasks.filter((section) => section._id === sectionToId)[0];
      const taskFrom = sectionFrom.tasks[indexFrom];
      sectionFrom.tasks.splice(indexFrom, 1);
      const listTask1 = [...sectionTo.tasks];
      const listTask2 = [...sectionTo.tasks];
      sectionTo.tasks = [
        ...listTask1.splice(0, indexTo),
        taskFrom,
        ...listTask2.splice(indexTo),
      ];
    }
    
    const changeSectionData = {
      projectId: projectId,
      taskId: taskId,
      sectionId1: sectionFromId,
      sectionId2: sectionToId,
      index: indexTo,
    };
    
    axios
      .post(`${BASE_URL}/changeSection`, changeSectionData)
      .then((res) => {
        setDataTasks(res.data.data.allTasks);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'An unexpected error has occurred'
        );
      });
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

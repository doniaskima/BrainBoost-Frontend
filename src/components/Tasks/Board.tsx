/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Section, Task } from './InterfaceTask';
import { toast } from 'react-toastify';
import { Label } from './InterfaceTask';
import { useParams } from 'react-router';
import SectionComponent from './SectionComponent';
import AddSection from './AddSection';
import { BASE_URL } from '../../utils/utils';
import axios from 'axios';


const Board2: React.FC = () => {
  const { params } = useParams();
  const { projectId } = params as any;
  const [userId, setUserId] = useState('');
  const [taskDetails, setTaskDetails] = useState<Task>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [labels, setLabels] = useState<Array<Label>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await axios.get(`${BASE_URL}/api/tasks/getTasks?projectId=${projectId}`);
        const labelsResponse = await axios.get(`${BASE_URL}/api/tasks/getLabels?projectId=${projectId}`);
        setDataTasks(tasksResponse.data.data);
        setLabels(labelsResponse.data.data);
      } catch (error) {
        toast.error(error.response?.data?.error || 'An unexpected error has occurred');
      }
    };

    fetchData();
  }, [projectId]);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await getUserId();
        setUserId(response.data.data.id);
      } catch (error) {
        toast.error('Login session ended');
      }
    };

    fetchUserId();
  }, []);

  const getUserId = async () => {
    return axios.get(`${BASE_URL}/user/getUserId`);
  };

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
    //       err.response.data.error || 'Một lỗi không mong muốn đã xảy ra',
    //     );
    //   });
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
      {/* {taskDetails ? (
        <>
          <taskDetails
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
      )} */}
    </div>
  );
};
export default Board2;

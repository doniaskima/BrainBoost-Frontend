/* eslint-disable react-hooks/exhaustive-deps */
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalEditTaskCalendar from './ModalEditTaskCalendar';
import ModalAddTaskCalendar from './ModalAddTaskCalendar';
import { useParams } from 'react-router';
import axios from 'axios';
import { Section, Task } from '../Tasks/InterfaceTask';


const Calendar: React.FC<any> = (props) => {
  const { projectId } = useParams();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [events, setEvents] = useState<Array<EventInput>>([]);
  const [taskCurrent, setTaskCurrent] = useState<Task>(null);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [dateSelect, setDateSelect] = useState<{
    from: string;
    to: string;
  }>({
    from: new Date().toJSON(),
    to: new Date().toJSON(),
  });
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/project/getLabels?projectId=${projectId}`);
        setLabels(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to fetch labels');
      }
    };
  
    fetchLabels();
  }, []);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tasks/getTasks?projectId=${projectId}`);
        setDataTasks(response.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.error || 'An unexpected error has occurred while fetching tasks'
        );
      }
    };
  
    fetchTasks();
  }, []);
  useEffect(() => {
    let _events = [];
    dataTasks.forEach((section: Section) => {
      section.tasks.forEach((task: Task) => {
        _events.push({
          id: task._id,
          title: task.name,
          start: task.dueDate.from.toString(),
          end: task.dueDate.to.toString(),
          dataTask: task,
        });
      });
    });
    setEvents(_events);
  }, [dataTasks]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // add Task
    let from = new Date(selectInfo.start);
    let to = new Date(selectInfo.end);
    to.setDate(to.getDate() - 1);
    to.setHours(23);
    setDateSelect({
      from: from.toJSON(),
      to: to.toJSON(),
    });
    setIsShowAdd(true);
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (clickInfo.event._def.extendedProps.dataTask) {
      setTaskCurrent(clickInfo.event._def.extendedProps.dataTask);
      setIsShow(true);
    } else {
      setDateSelect({
        from: new Date(clickInfo.event.start).toJSON(),
        to: new Date(clickInfo.event.end).toJSON(),
      });
      setTaskCurrent(null);
      setIsShowAdd(true);
    }
  };
  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };
  return (


      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'title',
            right: 'prev,next today,dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
        <ModalEditTaskCalendar
          projectId={projectId}
          show={{
            status: isShow,
            setStatus: (value) => {
              setIsShow(value);
              setTaskCurrent(null);
            },
          }}
          dataTasks={{
            data: dataTasks,
            setData: (data) => setDataTasks(data),
          }}
          labels={{
            data: labels,
            setData: (labels) => setLabels(labels),
          }}
          task={taskCurrent}
        />
        <ModalAddTaskCalendar
          dataTasks={{
            data: dataTasks,
            setData: (data) => {
              setDataTasks(data);
            },
          }}
          labels={{
            data: labels,
            setData: (labels) => setLabels(labels),
          }}
          projectId={projectId}
          show={{
            status: isShowAdd,
            setStatus: (status) => {
              setIsShowAdd(status);
            },
          }}
          dueDate={dateSelect}
        />
      </div>


  );
};
export default Calendar;

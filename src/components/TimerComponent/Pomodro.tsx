import React, { useEffect, useState } from 'react'
import TypeSelect from './TypeSelect';

interface PomodoroProps {
    types: { name: string; time: number }[];
  }
  

const Pomodoro: React.FC<PomodoroProps> = ({ types }: PomodoroProps) => {
    const [selectedType,setSelectedType] = useState(types[0]);
    const [time,setTime] = useState(types[0].time);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); 
    const [running, setRunning] = useState(false); 
    const [sound, setSound] = useState(
        JSON.parse(
          window.localStorage.getItem('pomodoro-react-sound') || 'true'
        )
      );
      const [taskStatus, setTaskStatus] = useState<boolean>(
        JSON.parse(
          window.localStorage.getItem('pomodoro-react-taskStatus') || 'false'
        )
      );
      const soundRef = React.useRef<HTMLAudioElement>(new Audio('bell.flac'));


      useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);
        Notification.requestPermission();
        return () => {
          document.removeEventListener('keyup', handleKeyUp);
        };
      }, []);
    
      const handleKeyUp = (event: KeyboardEvent) => {
        if ((event.target as HTMLElement).tagName === 'INPUT') return;
        if (event.key === ' ') {
          pauseTimer();
        } else if (event.key === 'Escape') {
          resetTimer();
        } else if (
          event.key >= '1' &&
          event.key <= String(types.length)
        ) {
          changeType(types[Number(event.key) - 1]);
        }
      };
    
      const changeType = (type: { name: string; time: number }) => {
        resetTimer();
        setSelectedType(type);
        setTime(type.time);
        setRunning(false);
      };
    
      const tick = () => {
        if (time <= 1) {
          stopInterval();
          setRunning(false);
          if (sound) soundRef.current.play();
          try {
            navigator.serviceWorker
              .register('service-worker.js')
              .then((sw) => {
                sw.showNotification(`${selectedType.name} finished!`);
              });
          } catch (e) {
            console.log('Notification error', e);
          }
        }
        setTime((prevTime) => prevTime - 1);
      };
    
      const stopInterval = () => {
        if (intervalId) clearInterval(intervalId);
        setIntervalId(null);
      };
    
      const startTimer = () => {
        setRunning(true);
        const newIntervalId = setInterval(tick, 1000);
        setIntervalId(newIntervalId);
        setTime((prevTime) => (prevTime > 0 ? prevTime : selectedType.time));
        soundRef.current.pause();
        soundRef.current.currentTime = 0;
      };
    
      const resetTimer = () => {
        stopInterval();
        setTime(selectedType.time);
        setRunning(false);
      };
    
      const pauseTimer = () => {
        intervalId ? stopInterval() : startTimer();
      };
    
      const getStatus = () => {
        if (time === 0) return 'Finished';
        if (running && !intervalId) return 'Paused';
        if (running) return 'Running';
      };
    
      const getProgress = () => {
        const current = time;
        const total = selectedType.time;
        return ((total - current) / total) * 100;
      };
    
      const handleToggleSound = () => {
        setSound((prevState) => {
          const newSound = !prevState;
          window.localStorage.setItem('pomodoro-react-sound', String(newSound));
          return newSound;
        });
      };
    
      const handleToggleTask = () => {
        setTaskStatus((prevState) => {
          const newTaskStatus = !prevState;
          window.localStorage.setItem(
            'pomodoro-react-taskStatus',
            String(newTaskStatus)
          );
          return newTaskStatus;
        });
      };
  return (
    <div className="content">
        <div className="pomodoro">
        <TypeSelect
          types={types}
          selected={selectedType}
          changeType={changeType}
        />
        </div>
    </div>
  )
}


export default Pomodoro;
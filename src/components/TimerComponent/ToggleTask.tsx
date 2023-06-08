import React, { memo } from 'react';


interface TaskToggleProps {
  task: boolean;
  toggleTask: () => void;
}

const TaskToggle: React.FC<TaskToggleProps> = ({ task, toggleTask }) => (
  <button
    className={`ToggleTask ${task ? 'active' : ''}`}
    onClick={toggleTask}
    title={task ? 'Disable Task' : 'Enable Task'}
  >
    <i className={'fa fa-tasks'} />
  </button>
);

export default memo(TaskToggle);

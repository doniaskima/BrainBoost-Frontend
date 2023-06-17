/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import Calendar from '../Calendar/Calendar';
import Board2 from './Board2';
import Timeline from './Timeline';
import axios from 'axios';
import { BASE_URL } from '../../utils/utils';
import WrapperProject from './WrapperProject';

export enum TypeView {
  board = 'board',
  timeline = 'timeline',
  calendar = 'calendar',
}

export const Task: React.FC = () => {
  const [userId, setUserId] = useState<string>(null);
  const { projectId } = useParams();
  console.log(projectId)
  const search = window.location.search;
  const paramsSearch = new URLSearchParams(search);
  const viewParams = paramsSearch.get('view');
  const navigate = useNavigate();
  const [view, setView] = useState<string>(TypeView.board);
  const listSelectView = [
    {
      typeView: TypeView.timeline,
      icon: 'fas fa-stream',
      name: 'Timeline',
    },
    {
      typeView: TypeView.calendar,
      icon: 'far fa-calendar',
      name: 'Calendar',
    },
    {
      typeView: TypeView.board,
      icon: 'fas fa-border-all',
      name: 'Board',
    },
  ];
  const renderSelect = (typeview: TypeView, icon, name) => {
    return (
      <div
        key={typeview}  
        className={
          'item-head-task ' + (view === typeview ? 'item-head-task-active' : '')
        }
        onClick={() => {
          navigate(`/tasks/task-project/${projectId}?view=${typeview}`);
          setView(typeview);
        }}
      >
        {name}
        <i className={`ml-2 ${icon}`}></i>
      </div>
    );
  };
  const renderView = () => {
    switch (view) {
      case TypeView.board:
        return <Board2 />;
      case TypeView.timeline:
        return <Timeline />;
      case TypeView.calendar:
        return <Calendar />;
    }
  };
  useEffect(() => {
   
  }, []);
  
  useEffect(() => {
    if (userId) {
      if (
        Object.values(TypeView).some((index) => TypeView[index] === viewParams)
      ) {
        navigate(`/task-project/${projectId}?view=${viewParams}`);
        setView(viewParams);
      } else {
        navigate(`/task-project/${projectId}?view=${TypeView.board}`);
        setView(TypeView.board);
      }
    }
  }, [userId]);

  return (
    <div className="task-project container-fluid w-100">
      <WrapperProject>
        <Container fluid>
          <div className="d-flex justify-content-start w-100 head-task flex-row-reverse">
            {listSelectView.map((element) => {
              return renderSelect(element.typeView, element.icon, element.name);
            })}
          </div>
          <div className="w-100">{renderView()}</div>
        </Container>
      </WrapperProject>
    </div>
  );
};

export default Task;

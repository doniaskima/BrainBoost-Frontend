/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container } from 'reactstrap';
import Calendar from '../Calendar/Calendar';
import Board2 from './Board';
import Timeline from './Timeline';
import {CiViewBoard} from "react-icons/ci"
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
      <button
        key={typeview}  
        className={
          'item-head-task-btn ' + (view === typeview ? 'item-head-task-active' : '')
        }
        onClick={() => {
          navigate(`/tasks/task-project/${projectId}?view=${typeview}`);
          setView(typeview);
        }}
      >
        {name}
        <i className={`ml-2 ${icon}`}></i>
      </button>
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
 <div className="container-fluid w-full">
      <WrapperProject>
        <Container fluid>
          <div className="d-flex justify-content-start w-100 head-task flex-row-reverse listSelectView">
            {listSelectView.map((element) =>
              renderSelect(element.typeView, element.icon, element.name)
            )}
          </div>
          <div className="w-100">{renderView()}</div>
        </Container>
      </WrapperProject>
    </div>
  );
};

export default Task;

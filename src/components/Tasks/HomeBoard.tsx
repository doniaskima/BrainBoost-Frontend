import React, { useEffect, useState } from "react";
import { Button, Container } from 'reactstrap';
import Spinner from "../Spinner";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import ModalCreate from "../../modals/ModalCreate";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router";
import { projectService } from "../../services/projects/api";
import { toast } from "react-toastify";
import socketioClient from "../../socketioClient";
import { userService } from "../../services/user/api";
import socket from "../../socketioClient";

interface Project {
  name: string;
  description: string;
}

const HomeBoard = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isShowCreate, setShowCreate] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [listJoin, setListJoin] = useState([]);

  const [fetchingProjects, setFetchingProjects] = useState(false); // New state for fetching projects
  const [data, setData] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState<boolean>();
  // eslint-disable-next-line
  const [myProjects, setMyProjects] = useState<any>([]);
  console.log(myProjects);

  const [user, setUser] = useState<{
    _id: string;
    username: string;
    avatar: string;
    role: Role;
  }>();

  useEffect(() => {
    userService
      .getUserInfo()
      .then((res) => {
        setUser({ ...res.data.data });
      })
      .catch((error) => {
        console.log(error.response?.data?.error);
      });
  }, []);

  const createProject = (name: string, description: string) => {
    projectService
      .addProject({ name: name, description: description })
      .then((res) => {
        let project = res.data.data.project;
        console.log("project", project);
        setMyProjects([...myProjects, project]);
        socket.emit('joinRoom', { roomId: project._id });
        toast.success('Project created successfully!');
        setShowCreate(false);
      })
      .catch((err) => {
        toast.error('Failed to create project');
      });
  };

  useEffect(() => {
    projectService
      .getProject()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error('Error: Could not get data!');
      });
  }, []);

  useEffect(() => {
    console.log("Updated projects length:", projects?.length);
  }, [projects]);

  return (
    <Container fluid>
      <div className="my-project mt-4">
        <div className="grid gap-0 grid-cols-1 md:grid-cols-2">
          <div className="_1wRFJUvIaoq-sR ml-8">
            <div className="_3lKk_kIqYLGIyx">
              <div className="_3qyYZ_ffqe5APT">
                <img
                  width="342"
                  height="256"
                  src="https://a.trellocdn.com/prgb/dist/images/organization/empty-board.d1f066971350650d3346.svg"
                  alt=""
                  role="presentation"
                />
                <div className="">
                  <img
                    className="_2RcUIa4UOzSlM6"
                    src="https://a.trellocdn.com/prgb/dist/images/organization/green-face.1a4590e4c12ebbbd161a.svg"
                    alt=""
                    role="presentation"
                  />
                  <img
                    className="_2AfucOdcPC0oXo"
                    src="https://a.trellocdn.com/prgb/dist/images/organization/red-face.38df5b8182a69e1e98c7.svg"
                    alt=""
                    role="presentation"
                  />
                  <img
                    className="_3mOaNaiDiY3qs_"
                    src="https://a.trellocdn.com/prgb/dist/images/organization/blue-face.3644a080c0c1fc8ab4b6.svg"
                    alt=""
                    role="presentation"
                  />
                  <img
                    className="_1ZDrdsuKzdWg_4"
                    src="https://a.trellocdn.com/prgb/dist/images/organization/purple-face.24f3616b6ae9196090b1.svg"
                    alt=""
                    role="presentation"
                  />
                </div>
              </div>
            </div>
          </div>
          <section>
            <div className='flex items-center justify-center md:flex-row flex-col'>
              <div className='rounded-full border-[3px] border-sh-blue relative scale-95 hover:scale-100 transition ease-in shadow-lg'></div>
              <div className='ml-0 md:ml-16'>
                <div className='relative group inline-block'>
                  <h2 className='text-3xl font-bold animate-up bg-gradient-to-r from-sh-blue to-sh-blue mb-5 tracking-widest inline-block cursor-pointer select-none'>
                    Hey Hello<span className='italic'>!</span>
                  </h2>
                </div>
                <div className='relative group inline-block'>
                  <h3 className='text-3xl font-bold animate-up mb-4 tracking-widest inline-block cursor-pointer'>
                    Welcome to{' '}
                    <span className='font-bold tracking-widest animate-up bg-gradient-to-r from-sh-purple to-sh-purple cursor-default select-none'>
                      {' '}
                      BrainBoost
                    </span>{' '}
                    Board!<span className='italic'>!</span>
                  </h3>
                </div>

                <h1 className='text-xl font-normal leading-10'>
                  <p className="block">
                    Welcome to HomeBoard, the ultimate task management platform designed to streamline your productivity. Organize your tasks, set priorities, and track your progress effortlessly. Experience the satisfaction of crossing off tasks and achieving your goals. Welcome to HomeBoard, where productivity meets simplicity.
                  </p>
                </h1>
                <Button
                  className="mt-4"
                  color="info"
                  style={{ width: '150px', height: '50px' }}
                  onClick={() => {
                    setShowCreate(true);
                    console.log(isShowCreate);
                  }}>
                  Create Project
                </Button>
                <section>
                  <h1 className="mt-5 mb-5 text-3xl tracking-wider text-sh-blue inline-block font-bold underline-offset-[15px]">
                    All projects
                  </h1>
                </section>
                {isShowCreate && (
                  <ModalCreate
                    createProject={createProject}
                    isShowCreate={isShowCreate}
                    setShowCreate={setShowCreate}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='space-y-4 mt-3 w-full'>
        {loading ? (
          <div className='flex justify-center'>
            <Spinner />
          </div>
        ) : myProjects?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {myProjects?.map((project) => (
              <ProjectCard
                key={project._id}
                name={project.name}
                projectId={project._id} // Pass the projectId to the ProjectCard component
                onClick={() => navigate(`/tasks/member-project/${project._id}`)} // Add an onClick handler to navigate to the tasks page
              />
            ))}
          </div>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </Container>
  );
};

export default HomeBoard;

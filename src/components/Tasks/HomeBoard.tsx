import React, { useEffect, useState } from "react";
import { Button, Container } from 'reactstrap';
import SVG from 'react-inlinesvg';
import axios from "axios";
import { toast } from 'react-toastify';
import {BASE_URL} from "../../utils/utils"

import { AuthProvider, useAuth } from "../../context/authProvider";
import ModalCreate from "../../modals/ModalCreate";
import projectService from "../../services/projects/api";
interface Project {
  _id: string;
  name: string;
  description: string;
}


const HomeBoard = () => {
  const { user, logout, token } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isShowCreate, setShowCreate] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState('');
  const [loading, setLoading] = useState(false);
 

  useEffect(()=>{
   const getProjects = async()=>{
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/project/getProject`
        );
        setProjects(data);
        console.log(projects)
      } catch (error) {
        setError("Failed to fetch members.");
      } finally {
        setLoading(false);
      }
    } ;
    getProjects(); 
  },[])
  const createProject = async (name:string, description:string) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/project/addProject`, {
        name: name,
        description: description,
      });

      if (!data.status) {
        setError(data.message);
        return;
      }
      console.log("project added")
      console.log(name);
      console.log(description);

    } catch (error) {
      setError("Failed to add project.");
    }
  };
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
                    Heyy Hello<span className='italic'>!</span>
                  </h2>
                </div>
                <div className='relative group inline-block'>
                  <h3 className='text-3xl font-bold animate-up mb-4 tracking-widest inline-block cursor-pointer'>
                    Welcome to 
                    <span className='font-bold tracking-widest animate-up bg-gradient-to-r from-sh-purple to-sh-purple cursor-default select-none'>
                    {' '} BrainBoost
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
                    console.log(isShowCreate)
                  }}>
                  Create Project
                </Button>
                {
                 isShowCreate && (
                  <ModalCreate
                  createProject={createProject}
                  isShowCreate={isShowCreate}
                  setShowCreate={setShowCreate}
                 />
                 )
                }

              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  
  );
};

export default HomeBoard;

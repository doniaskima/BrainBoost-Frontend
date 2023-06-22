import React, { useEffect, useState } from "react";
import WrapperProject from "../Tasks/WrapperProject";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { useParams } from "react-router";
import { Section } from "../Tasks/InterfaceTask";
import { toast } from "react-toastify";

const ProjectAnalysis = () => {

  const { projectId } = useParams();
  const [headerAnalysis, setHeaderAnalysis] = useState<{
    file: number;
    task: {
      total: number;
      completed: number;
      overDeadline: number;
    };
  }>();

  const [page, setPage] = useState(1);
  const [allUsers, setAllUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userCurrent, setUserCurrent] = useState(null);

  const [dataAnlysis, setDataAnlysis] = useState<{
    userAdmin: Array<string>;
    sections: Array<Section>;
    users: Array<{
      avatar: string;
      role: string;
      _id: string;
      email: string;
      name: string;
    }>;
    _id: string;
    name: string;
  }>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analysisResponse = await axios.post(`${BASE_URL}/api/project/analysis`, { projectId });
        setDataAnlysis(analysisResponse.data.data);
        setPage(1);
        const tasksResponse = await axios.get(`${BASE_URL}/api/tasks/getTasks`, { params: { projectId } });
        setAllUser(tasksResponse.data.data);
      } catch (err) {
        toast.error(err.response?.data?.error || 'Error getting data');
      }
    };
    fetchData();
    console.log("dataAnlysis",dataAnlysis)
    console.log("allUsers",allUsers);
    console.log("headerAnalysis",headerAnalysis)
  }, [projectId]);

  const getProgressColor = (value) => {
    if (value >= 80) {
      //80-100
      return '#01AD23';
    }
    if (value >= 60) {
      // 60-80
      return '#80C02B';
    }
    if (value >= 40) {
      //40-60
      return '#FFD334';
    }
    if (value >= 20) {
      //20-40
      return '#F08130';
    }
    return '#E22E2F'; //0-20
  };
  
  return (
    <WrapperProject>
      <div className="d-flex justify-content-between">
        <div className="card p-4">
          <div className="card-body flex">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              Files Upload
              <div className="h4 mb-0 font-weight-bold text-gray-800">
                {headerAnalysis?.file}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-file fa-2x text-gray-300 ml-5 icon-task"></i>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="card-body flex">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              Completed / Total tasks
            </div>
            <div className="h4 mb-0 font-weight-bold text-gray-800">
                    {headerAnalysis?.task?.completed} /{' '}
                    {headerAnalysis?.task?.total}
            </div>
            <div className="col-auto">
              <i className="fas fa-file fa-2x text-gray-300 ml-5 icon-task"></i>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="card-body flex">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              Over The Deadline
              <div className="h4 mb-0 font-weight-bold text-gray-800">
                  {headerAnalysis?.task?.overDeadline}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-file fa-2x text-gray-300 ml-5 icon-task"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="chart-pie pt-4 pb-2">

        </div>
      </div>
    </WrapperProject>
  );
};

export default ProjectAnalysis;

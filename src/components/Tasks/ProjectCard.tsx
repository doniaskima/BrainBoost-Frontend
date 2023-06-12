import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ name, description, projectId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(`/tasks/member-project/${projectId}`);
  };

  return (
    <div
      className={`max-w-sm rounded overflow-hidden cursor-pointer shadow-lg bg-white transition-transform duration-300 ease-in transform ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-gray-800 mb-2">{name}</div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

import { useState } from "react";

const ProjectCard = ({ name, description }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <div
        className={`max-w-sm rounded overflow-hidden cursor-pointer shadow-lg bg-white transition-transform duration-300 ease-in transform ${
          isHovered ? 'scale-105' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='px-6 py-4'>
          <div className='font-bold text-xl text-gray-800 mb-2'>{name}</div>
          <p className='text-gray-600 text-sm'>{description}</p>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;
  
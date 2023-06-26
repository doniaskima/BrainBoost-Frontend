/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps*/
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { Container } from 'reactstrap';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../../services/projects/api';
import WrapperProject from '../Tasks/WrapperProject';
import ModalCreateVideo from './ModalCreateVideo';
interface Blog {
  _id: string;
  security: string;
  comments: Array<any>;
  authorId: {
    username: string;
    _id: string;
    email: string;
    avatar: string;
    role: string;
  };
  title: string;
  describe: string;
  content: string;
  thumbnail: string;
  money: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Video {
  _id: string;
  security: string;
  authorId: {
    username: string;
    _id: string;
    email: string;
    avatar: string;
    role: string;
  };
  title: string;
  describe: string;
  thumbnail: string;
  money: string;
  projectId: string;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrainingList: React.FC = () => {
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const handleCreateVideo = () => {
    setShowModal(true);
  };
  const handleCreateBlog = () => {
    navigate(`editor/${projectId}`);
  };
  const [listBlogs, setListBlogs] = useState<Array<Blog>>([]);
  const [listVideos, setListVideos] = useState<Array<Video>>([]);

  useEffect(() => {
    projectService.getAllTraining(projectId).then((res) => {
      setListBlogs(res.data.data.blogArray);
      console.log("listBlogs",listBlogs)
      setListVideos(res.data.data.videoArray);
    });
  }, []);

  return (
    <div className="training-list">
      <WrapperProject>
        <div className="">
          <Container fluid>
            <div className="blog">
              <div>
                <div
                  className="title mb-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCreateBlog()}>
                  <SVG
                    src={'/svg/icon.svg'}
                    height={27}
                    width={27}
                    className="mr-3"
                  />
                   <button 
                onClick={() => handleCreateBlog()}
                className="add-video">
                  Add article
                </button>
              
                </div>
                <div className="list-templete">
                  <Carousel
                    responsive={responsive}
                    ssr
                    infinite={false}
                    containerClass="first-carousel-container container ">
                    {listBlogs.map((blog) => (
                      <Templete
                        name=""
                        type="blog"
                        id={blog.projectId}
                        title={blog.title}
                        background={blog.thumbnail}
                        blogId={blog._id}
                        authorId={blog.authorId}
                        createdAt={blog.createdAt}
                      />
                    ))}
                  </Carousel>
                 
                </div>
              </div>
            </div>
            <div className="video mt-4">
              <div
                className="title mb-4"
                style={{ cursor: 'pointer' }}
                >
                <SVG
                  src={'/svg/icon.svg'}
                  height={27}
                  width={27}
                  className="mr-3"
                />

                <button 
                onClick={() => handleCreateVideo()}
                className="add-video">
                  Add Video
                </button>
              </div>
              <div className="list-templete">
                <Carousel
                  responsive={responsive}
                  ssr
                  infinite={false}
                  containerClass="first-carousel-container container w-100">
                  {listVideos.map((video) => (
                    <Templete
                      name=""
                      type="video"
                      id={video.projectId}
                      title={video.title}
                      background={video.thumbnail}
                      authorId={video.authorId}
                      videoId={video.videoId}
                      createdAt={video.createdAt}
                    />
                  ))}
                </Carousel>
                 
              </div>
            </div>
          </Container>
        </div>
        <ModalCreateVideo
          showModal={showModal}
          setShowModal={(value) => setShowModal(value)}
          projectId={projectId}
        />
      </WrapperProject>
    </div>
  );
};
const Templete: React.FC<{
  background: string;
  name: string;
  id: string;
  title?: string;
  type?: string;
  videoId?: string;
  createdAt?: Date;
  blogId?: string;
  authorId?: {
    username: string;
    avatar: string;
  };
  minWidth?: string;
}> = ({
  background,
  name,
  id,
  title,
  type,
  videoId,
  blogId,
  authorId,
  createdAt,
  minWidth,
}) => {
  return (
    <div
      style={{
        width: minWidth ? minWidth : '100%',
        minWidth: minWidth ? minWidth : '100%',
      }}
      className="ml-2">
      <a
        className="templete-content"
        href={
          type === 'video'
            ? `/youtube/${id}/${videoId}`
            : type === 'blog'
            ? `/admin/blog/${blogId}`
            : '/'
        }
        style={{
          backgroundImage: 'url(' + background + ')',
        }}>
        <span className="wrap-templete"></span>
        <div className="content h-100">
          <div className="tag-templete" title="Templates">
            {type}
          </div>
          <div className="name-templete">
            <h1 className="name">{name}</h1>
          </div>
        </div>
      </a>
      <div className="info mt-2 ml-3">
        <h3>{title}</h3>
        {type === 'blog' && (
          <BlogTemplete
            user={authorId.username}
            avatar={authorId.avatar}
            time={moment(createdAt).fromNow()}></BlogTemplete>
        )}
        {type === 'video' && (
          <></>
      

        )}
      </div>
    </div>
  );
};
const BlogTemplete: React.FC<{
  user: string;
  time: string;
  avatar: string;
}> = ({ user, time, avatar }) => {
  return (
    <div className="blog-templete d-flex align-items-center">
      <a href="/">
        <img
          src={
            avatar
              ? avatar
              : 'https://cdn.fullstack.edu.vn/f8-learning/user_avatars/9143/616309bb2f85f.png'
          }
          alt={user}
        />
      </a>
      <a href="/" className="d-flex align-items-center justify-content-center">
        <strong>{user}</strong>
        <span className="ml-1" style={{ fontSize: '16px' }}>
          {time}
        </span>
      </a>
    </div>
  );
};
 
export default TrainingList;

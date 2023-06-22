/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps*/
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { Container } from 'reactstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import WrapperProject from '../Tasks/WrapperProject';
import { useNavigate, useParams } from 'react-router';
import ModalCreateVideo from './ModalCreateVideo';
import axios from 'axios';
interface Blog {
  _id: string;
  security: string;
  comments: Array<any>;
  authorId: {
    name: string;
    _id: string;
    email: string;
    avatar: string;
    role: string;
  };
  title: string;
  describe: string;
  content: string;
  thumbnail: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Video {
  _id: string;
  security: string;
  authorId: {
    name: string;
    _id: string;
    email: string;
    avatar: string;
    role: string;
  };
  title: string;
  describe: string;
  thumbnail: string;
 
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
    axios
      .get('http://localhost:8080/api/project/getAllTraining', {
        params: {
          projectId: projectId,
        },
      })
      .then((res) => {
        setListBlogs(res.data.data.blogArray);
        setListVideos(res.data.data.videoArray);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
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
                  <span>Featured Posts</span>
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
                onClick={() => handleCreateVideo()}>
                <SVG
                  src={'/svg/icon.svg'}
                  height={27}
                  width={27}
                  className="mr-3"
                />
                <span>Video nổi bật</span>
              </div>
              <div className="list-templete">
                <Carousel
                  responsive={responsive}
                  ssr
                  infinite={false}
                  containerClass="first-carousel-container container">
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
            <div className="course mt-4">
              <div className="title mb-4">
                <SVG
                  src={'/svg/icon.svg'}
                  height={27}
                  width={27}
                  className="mr-3"
                />
                <span>Khóa học nổi bật</span>
              </div>
              <div className="list-templete">
                <Templete
                  name=""
                  type="course"
                  id={projectId}
                  title="Angular - The Complete Guide"
                  minWidth="22.5%"
                  background="https://img-c.udemycdn.com/course/240x135/756150_c033_2.jpg"
                />
                <Templete
                  name=""
                  type="course"
                  id={projectId}
                  title="Python for Data Science"
                  minWidth="22.5%"
                  background="https://img-c.udemycdn.com/course/240x135/692188_9da7_26.jpg"
                />
                <Templete
                  name=""
                  type="course"
                  id={projectId}
                  title="Graphic Design Masterclass - Learn GREAT Design"
                  minWidth="22.5%"
                  background="https://img-c.udemycdn.com/course/240x135/1643044_e281.jpg"
                />
                <Templete
                  name=""
                  type="course"
                  id={projectId}
                  title="React JS - Mastering Redux"
                  minWidth="22.5%"
                  background="https://img-c.udemycdn.com/course/240x135/2195280_49b2_2.jpg"
                />
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
   name: string;
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
            user={authorId?.name}
            avatar={authorId?.avatar}
            time={moment(createdAt).fromNow()}></BlogTemplete>
        )}
        {type === 'video' && (
          <></>
          // <VideoTemplete
          //   view="161.935"
          //   like="4.435"
          //   comment="214"></VideoTemplete>
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
const VideoTemplete: React.FC<{
  view: string;
  like: string;
  comment: string;
}> = ({ view, like, comment }) => {
  return (
    <div className="video-templete">
      <div>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="eye"
          className="svg-inline--fa fa-eye fa-w-18 "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512">
          <path
            fill="currentColor"
            d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
          />
        </svg>
        <span>183.310</span>
      </div>
      <div>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="thumbs-up"
          className="svg-inline--fa fa-thumbs-up fa-w-16 "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
          />
        </svg>
        <span>4.169</span>
      </div>
      <div>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="comment"
          className="svg-inline--fa fa-comment fa-w-16 "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
          />
        </svg>
        <span>167</span>
      </div>
    </div>
  );
};
export default TrainingList;

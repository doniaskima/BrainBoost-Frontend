/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  InputGroup,
 
  InputGroupText,
  UncontrolledDropdown,
} from 'reactstrap';
import ModalEditPost from './ModalEditPost';
import { useParams } from 'react-router-dom';
import { postService } from '../../services/posts/api';
import socket from '../../socketioClient';
import { commentService } from '../../services/comments/api';
import ModalTrueFalse from '../Tasks/ModalTrueFalse';

function PostHeader({
  userId,
  author,
  date,
  postId,
  setShowDelete,
  setShowEdit,
  setDataUser,
  setDataDelete,
  setDataEdit,
}) {
  return (
    <>
      <div className="d-flex bd-highlight mb-3">
        <div className="p-2 bd-highlight">
          <div className="post-header">
            <img className="avatar" src={author?.avatar} alt="" />
            <div className="details">
              <span>{author?.username}</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
        <div className="ml-auto bd-highlight">
          <UncontrolledDropdown
            disabled={userId === author?._id ? false : true}>
            <DropdownToggle
              className="btn-icon-only text-light"
              role="button"
              size="sm"
              color=""
              onClick={(e) => e.preventDefault()}
              disabled={userId === author?._id ? false : true}>
              <i
                className={
                  userId === author?.authorId
                    ? 'fas fa-ellipsis-v text-info'
                    : 'fas fa-ellipsis-v '
                }
              />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem
                onClick={(e) => {
                  // e.preventDefault()
                  setShowEdit(true);
                  setDataUser(author);
                }}>
                <span style={{ fontWeight: 'bold' }} className="text-primary">
                  Edit post
                </span>
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  setDataDelete(postId);
                  setShowDelete(true);
                }}>
                <span style={{ fontWeight: 'bold' }} className="text-danger">
                  Delete post
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </>
  );
}

function PostComments({ comments }) {
  return (
    <div className="post-comments">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <img className="avatar" src={comment.authorId?.avatar} alt="" />
          <p>
            <span>{comment.authorId?.name}</span>
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

function PostItem({ authorId, date, content, comments, _id, userId }) {
  const { projectId } = useParams();
  const [showDelete, setShowDetele] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataDelete, setDataDelte] = useState();
  const [dataEdit, setDataEdit] = useState();
  const [dataUser, setDataUser] = useState({});
  const deletePost = async (postId) => {
    postService.deletePost({ postId: postId }).then((res) => {
      toast.success('Delete post successfully!');
      socket.emit('createdPost', {
        postList: res.data.data,
        roomId: projectId,
      });
    });
  };
  const editPost = async (postId, content) => {
    postService
      .updatePost({ postId: postId, content: content })
      .then((res) => {
        toast.success('Edit post successfully!');
        socket.emit('createdPost', {
          postList: res.data.data,
          roomId: projectId,
        });
      })
      .catch((err) => {
        toast.error('Error! Unable to edit post.');
      });
  };
  const AddComment = async (postId, comment) => {
    commentService
      .addComment({ postId: postId, content: comment })
      .then((res) => {
        socket.emit('createdPost', {
          postList: res.data.data,
          roomId: projectId,
        });
      })
      .catch((err) => {
        toast.error('Error! Unable to comment.');
      });
  };
  return (
    <>
      <ModalTrueFalse
        show={showDelete}
        data={{
          title: 'delete the post ',
          button_1: {
            title: 'Cancel',
          },
          button_2: {
            title: 'Delete',
          },
        }}
        setClose={() => {
          setShowDetele(false);
        }}
        funcButton_1={() => {}}
        funcButton_2={() => {
          deletePost(dataDelete);
        }}
        funcOnHide={() => {}}></ModalTrueFalse>

      <ModalEditPost
        data={{ content: content, postId: _id, author: { ...dataUser } }}
        show={showEdit}
        funcQuit={() => {
          setShowEdit(false);
        }}
        funcEdit={(postId, content) => {
          editPost(postId, content);
        }}></ModalEditPost>

      <div className="post">
        <PostHeader
          userId={userId}
          author={authorId}
          date={date}
          postId={_id}
          setShowDelete={setShowDetele}
          setShowEdit={setShowEdit}
          setDataUser={setDataUser}
          setDataDelete={setDataDelte}
          setDataEdit={setDataEdit}
        />
        <div className="post-content row justify-content-center">
          <div className="col-11">
            <p style={{ fontSize: '20px' }}>{content}</p>
          </div>
        </div>
        <div className="post-content-action">
          <div className="action">
            <div className="action-detail-action">
              <div className="action-detail-action-like">
                <img
                  src="https://res.cloudinary.com/vnu-uet/image/upload/v1606254615/react%20fb%20icon/like_yak6sm.png"
                  alt="like"
                />
                <img
                  className="mr-1"
                  src="https://res.cloudinary.com/vnu-uet/image/upload/v1606254611/react%20fb%20icon/wow_socetu.png"
                  alt="action"
                />
                <img
                  className="mr-3"
                  src="https://res.cloudinary.com/vnu-uet/image/upload/v1606254609/react%20fb%20icon/care_1_y1dxgw.png"
                  alt="action"
                />
                <span>You and 3 other people</span>
              </div>
              <div className="action-detail-action-comment">
                <span>{comments.length} Comment</span>
              </div>
            </div>
            <div className="action-btn">
              <div className="action-btn-like">
                <img
                  src="https://res.cloudinary.com/vnu-uet/image/upload/v1606254615/react%20fb%20icon/like_yak6sm.png"
                  alt="like"
                />
                <span className="color-gr-yellow ml-3">Like</span>
              </div>
              <div className="action-btn-comment">
                <img
                  src="https://res.cloudinary.com/vnu-uet/image/upload/v1606254779/react%20fb%20icon/btn-comment_kc8zvu.png"
                  alt="action comment "
                />
                <span className="ml-3">Comment</span>
              </div>
            </div>
          </div>
        </div>

        <PostComments comments={comments} />
        <FormGroup className="mb-3 ">
          <InputGroup className="input-group-alternative ">
            
            <Input
              id={_id}
              style={{ backgroundColor: '#f0f2f5' }}
              placeholder="Write a comment"
              type="email"
              autoComplete="new-email"
              className="pl-3"
              onChange={(event) => {
                event.target.onkeyup = (key) => {
                  let comment = document.getElementById(
                    _id,
                  ) as HTMLInputElement;
                  if (key.keyCode === 13) {
                    AddComment(_id, comment.value);
                    comment.value = '';
                  }
                };
              }}
            />
          </InputGroup>
        </FormGroup>
      </div>
    </>
  );
}

export default PostItem;

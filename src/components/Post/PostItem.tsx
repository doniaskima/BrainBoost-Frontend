/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  DropdownItem,
  DropdownMenu,
 
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
        <UncontrolledDropdown disabled={userId !== author?._id}>
 
  <div className="flex gap-3">
    <div onClick={() => {
      setShowEdit(true);
      setDataUser(author);
    }}>
 <button className="editPost">
  <p>Edit Post</p>
</button>
    </div>
    <div onClick={() => {
      setDataDelete(postId);
      setShowDelete(true);
    }}>
     <button className="delete-post">
     
  <svg viewBox="0 0 448 512"  className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
</button>
    </div>
  </div>
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
              <div className="ml-0">
                <span>{comments.length} Comment</span>
              </div>
            </div>
            <div className="action-btn  ">
              <div className="pt-3 pb-3">
                
                <span className="ml-0">Comment</span>
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

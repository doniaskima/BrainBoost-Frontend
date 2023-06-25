import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

// Assuming the Loader component is defined in '../Tasks/TaskLoader'
import Loader from '../Tasks/TaskLoader';

const CreatePost: React.FC<any> = (props: any) => {
  const user = props.author;
  const [value, setValue] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<any>(0);
  const [endTime, setEndTime] = useState<any>(0);
  const [summary, setSummary] = useState<string>('');
  const [otherLink, setOtherLink] = useState<string>('');
  const [error, setError] = useState<string>(null);
  const [hasCalendarEvent, setHasCalendarEvent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Added isLoading state
  const ref = useRef<any>();

  const classroom = {
    name: '',
    id: '',
  };
  
  const onSubmit = () => {
    setIsLoading(true); // Set isLoading to true before making the API call

    let link = otherLink;
    if (!link?.startsWith('https://')) {
      link = 'https://' + otherLink;
    }
    let data = {
      classroomId: classroom.id,
      content: value,
      calendarEvent: hasCalendarEvent
        ? {
            summary: summary,
            location: '',
            otherLink: link,
            start: moment(`${moment(date).format('YYYY-MM-DD')} ${startTime}`).format(),
            end: moment(`${moment(date).format('YYYY-MM-DD')} ${endTime}`).format(),
          }
        : null,
    };

    if (hasCalendarEvent && !(summary && startTime && endTime && otherLink)) {
      setError('Please complete all information');
      setIsLoading(false); // Set isLoading to false after handling the error
    } else {
      setError(null);
      props.funcCreatePost(data.content);
      setValue('');
      if (ref.current) {
        ref.current.style.height = '50px';
      }
      setIsLoading(false); // Set isLoading to false after successfully submitting the form
    }
  };

  const reset = () => {
    setValue('');
    setOtherLink('');
    setSummary('');
    setHasCalendarEvent(false);
    setIsSubmitting(false);
    setIsWriting(false);
    if (ref.current) {
      ref.current.style.height = '50px';
    }
  };

  const handleTextAreaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = '140px';
    setIsWriting(true);
  };

  const handleTextAreaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.scrollHeight < 141) {
      target.style.height = '';
      target.style.height = '140px';
      return;
    }
    target.style.height = '';
    target.style.height = target.scrollHeight + 'px';
  };

  return (
    <div className="create-post new-status-input card">
      <div className="d-flex">
        <div className="w-100">
          <textarea
            className="text-sm"
            ref={ref}
            id="content"
            value={value}
            placeholder="Post an article..."
            onChange={(e) => setValue(e.target.value)}
            onClick={handleTextAreaClick}
            onInput={handleTextAreaInput}
          />

          <Row className="post-buttons w-100">
            <Col className="col">
              <Button
                className={`w-100 ${value.trim().length || hasCalendarEvent ? 'post-able' : ''}`}
                disabled={isSubmitting || !value.trim().length || isLoading}
                onClick={onSubmit}
              >
                {isLoading ? <Loader /> : 'Post'}
              </Button>
            </Col>
            {(isWriting || hasCalendarEvent) && (
              <Col className="col" md={4}>
                <Button className="w-100" onClick={reset}>
                  Cancel
                </Button>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

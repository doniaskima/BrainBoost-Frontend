import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

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
  const ref = useRef<any>();

  const classroom = {
    name: '',
    id: '',
  };

  const defaultImage = () => {};

  const onSubmit = () => {
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
    } else {
      setError(null);
      props.funcCreatePost(data.content);
      setValue('');
      if (ref.current) {
        ref.current.style.height = '50px';
      }
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
        {/* <img
          className="user-avatar mt-2"
          src="https://s.saokhuee.com/localhost/avatars/08d998bc-67b2-4bf8-8aea-4bbc8370ea10?t=1635881919580"
          alt="avatar"
          width={50}
          height={50}
        /> */}
        <div className="w-100">
          <textarea
            className={value.length ? undefined : 'default'}
            ref={ref}
            id="content"
            value={value}
            placeholder="Post an article..."
            onChange={(e) => setValue(e.target.value)}
            onClick={handleTextAreaClick}
            onInput={handleTextAreaInput}
          />
          {hasCalendarEvent && (
            <div className="calendar-event">
              <div className="d-flex justify-content-between align-items-center">
                <b>More meetings</b>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="pointer-cursor"
                  onClick={() => setHasCalendarEvent(!hasCalendarEvent)}
                />
              </div>
              <Row>
                <Col md={12} className="mt-3 d-flex align-items-center">
                  <label className="label-required">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex align-items-center" md={5}>
                  <label className="label-required">Day</label>
                  <DatePicker
                    className="form-control ml-3"
                    selected={date}
                    onChange={setDate}
                  />
                </Col>
                <Col className="d-flex align-items-center" md={3}>
                  <input
                    className="form-control ml-3"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Col>
                <Col className="d-flex align-items-center" md={3}>
                  <label className="label-required">Next</label>
                  <input
                    className="form-control ml-3"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Col>
                <Col md={12} className="mt-3 d-flex align-items-center">
                  <label className="label-required">Link</label>
                  <input
                    type="text"
                    value={otherLink}
                    onChange={(e) => setOtherLink(e.target.value)}
                    className="form-control"
                    placeholder="Link to the classroom (Zoom, Microsoft Teams, Google Meet...)"
                  />
                </Col>
                {error && (
                  <div className="fv-plugins-message-container px-3 pt-2">
                    <div className="fv-help-block">{error}</div>
                  </div>
                )}
              </Row>
            </div>
          )}

          {/* --- Buttons --- */}

          <Row className="post-buttons w-100">
            <Col className="col">
              <Button
                className={`w-100 ${value.trim().length || hasCalendarEvent ? 'post-able' : ''}`}
                disabled={isSubmitting || !value.trim().length}
                onClick={onSubmit}
              >
                <img
                  className="mr-2 mb-1"
                  src={`/image/${value.trim().length || hasCalendarEvent ? 'post-white' : 'post'}.svg`}
                  alt=""
                />
                Post
              </Button>
            </Col>
            {!hasCalendarEvent && (
              <Col className="col">
                <Button className="w-100" onClick={() => setHasCalendarEvent(!hasCalendarEvent)}>
                  <img className="mr-2" src="/image/add-meeting.svg" alt="" />
                  More meetings
                </Button>
              </Col>
            )}
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

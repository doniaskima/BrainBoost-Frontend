import React, { useEffect } from 'react';
 import { confirmService } from '../../../services/mailer/api';
import { useParams } from 'react-router-dom';

const Confirm: React.FC = () => {
  const { confirmId } = useParams();
 
  useEffect(() => {
    confirmService
      .confirmMail({ confirmId: confirmId })
      .then((res) => {
        window.location.href = '/member-project/' + res.data.data.projectId;
      })
      .catch((err) => {
        switch (err.response.data.error) {
          case 'FailCheckComfirm':
            alert('Lỗi xác nhận!');
            window.location.href = '/admin/index';
            break;
          default:
            alert('Error!!!');
            window.location.href = '/admin/index';
        }
        // alert("Lỗi xác nhận!");
      });
  }, [confirmId]);
  return <> </>;
};

export default Confirm;

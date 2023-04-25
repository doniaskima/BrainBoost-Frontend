import { Navigate, useNavigate, useParams } from "react-router-dom";
import { attemptGetConfirmation } from "../../store/thunks/auth";
import { Error } from "../Error";
import { useAppDispatch } from "../../store/hooks";
import { useServerError } from "../../hooks/useServerError";

export default function RegisterConfirmationPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { serverError, handleServerError } = useServerError();

  const { token } = useParams<{ token: string }>();

  if (!token) {
    return <Navigate to='/home' replace />;
  }

  const handleSubmit = () => {
    dispatch(attemptGetConfirmation(token, navigate)).catch(handleServerError);
  };

  return (
    <>
    <header>
      <title>Click here to confirm your email</title>
    </header>
    <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
      <button onClick={handleSubmit}>Confirmation</button>
      {serverError && <Error>{serverError}</Error>}
    </div>
    </>
 
  );
}
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { attemptResetPassword } from "../store/thunks/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useServerError } from "../hooks/useServerError";
import {Error} from "../components/Error"

type ResetPasswordFormValues = {
  password: string;
};

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { token } = useParams<{ token: string }>();
  const { serverError, handleServerError } = useServerError();

  const initialValues: ResetPasswordFormValues = {
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  if (!token) {
    return <Navigate to='/home' replace />;
  }

  const onSubmit = (values: ResetPasswordFormValues) => {
    const password = values.password;
    attemptResetPassword(password, token, navigate).catch(handleServerError);
  };

  return (
    <>
        <header>
          <title>Forgot Password - BrainBoost</title>
        </header>
  
    <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
    <div className='max-w-sm w-full text-gray-600'>
    <div className='text-center'>
             
             <div className='mt-5 space-y-2'>
               <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
                 Reset your password
               </h1>
             </div>
           </div>
    <form  onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5'>
        <div className=''>
          <label  className='font-medium' htmlFor='password'>Password</label>
          <input {...register("password")}  className='w-full px-3 py-2 bg-white text-gray-500 outline-none border dark:border-gray-800 shadow-sm rounded-lg duration-150 w-full mt-3 focus:border-blue-600' id='password' type='password' placeholder='Password' />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>
        <button className='px-4 py-2.5 font-medium text-sm text-center duration-150 rounded-lg w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg' type='submit'>Reset password</button>
        {serverError && <Error>{serverError}</Error>}
      </form>
    </div>
    </div>
    </>
 
  );
}
import { useState } from "react";
import * as Yup from "yup";
import { Error } from "../Error";
import { attemptSendResetPasswordLink } from "../../store/thunks/auth";
import { useServerError } from "../../hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type ResetPasswordRequestFormValues = {
  email: string;
};

export default function ResetPasswordRequestPage() {
  const navigate = useNavigate();
  const { serverError, handleServerError } = useServerError();
  const [isSubmited, setIsSubmited] = useState(false);

  const initialValues: ResetPasswordRequestFormValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequestFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: ResetPasswordRequestFormValues) => {
    const email = values.email;
    attemptSendResetPasswordLink(email, navigate)
      .then(() => {
        setIsSubmited(true);
      })
      .catch(handleServerError);
  };

  return isSubmited ? (
    <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-600'>
        <div className='mt-5 space-y-2'>
               <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
               A reset link has been sent to your email. <b>You have 12 hours to reset your password.</b>
        It can take up to 15 min to receive our email.
               </h1>
             </div>
      
        </div>
   
    </div>
  ) : (
    <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
      <div className='max-w-sm w-full text-gray-600'>
      <div className='mt-5 space-y-2'>
               <p className='text-gray-800 text-2xl font-bold sm:text-3xl'>
               We will send you a reset link on the following email:
               </p>
             </div>
      <form  className='mt-8 space-y-5' onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
          <label  className='font-medium' htmlFor='email'>Email</label>
          <input className='w-full px-3 py-2 bg-white text-gray-500 outline-none border dark:border-gray-800 shadow-sm rounded-lg duration-150 w-full mt-3 focus:border-blue-600' {...register("email")} id='email' type='email' placeholder='Email' />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <button className='px-4 py-2.5 font-medium text-sm text-center duration-150 rounded-lg w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg' type='submit'>Send reset link</button>
        {serverError && <Error>{serverError}</Error>}
      </form>
      </div>
    </div>
  );
}
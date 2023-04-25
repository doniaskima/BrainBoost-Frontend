import React from "react";
import Button from "../subComponents/Button/Button";
import Input from "../subComponents/Input/Input";
import Brand from "../subComponents/Brand";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Error } from "../Error";
import { attemptResetPassword } from "../../store/thunks/auth";
import { useServerError } from "../../hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type ResetPasswordFormValues = {
  password: string;
};


export default function index() {
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
    return <Navigate to='/login' replace />;
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
                <p>
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
              </div>
            </div>
            <form  onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5'>
              <div>
                <label className='font-medium'>Email</label>
                <input  {...register("password")}   className='w-full mt-3 focus:border-blue-600' id='password' type='password' placeholder='Password' />
                {errors.password && <Error>{errors.password.message}</Error>}
              </div>
              <Button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg'>
                Reset your password
              </Button>
              {serverError && <Error>{serverError}</Error>}
            </form>
          </div>
        </div>
      </>
    );
  }
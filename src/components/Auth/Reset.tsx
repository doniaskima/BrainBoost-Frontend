import React from "react";
import Button from "../subComponents/Button/Button";
import Input from "../subComponents/Input/Input";
import Brand from "../subComponents/Brand";

export default function index() {
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
            <form onSubmit={(e) => e.preventDefault()} className='mt-8 space-y-5'>
              <div>
                <label className='font-medium'>Email</label>
                <Input
                  type='email'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <Button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg'>
                Reset your password
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }
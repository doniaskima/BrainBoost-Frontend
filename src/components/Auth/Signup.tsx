import Brand from "../subComponents/Brand";
import Button from "../subComponents/Button/Button";
import Input from "../subComponents/Input/Input";
import BrainBoost from "../../assets/BrainBoost.png"
import { useNavigate } from "react-router-dom";
 

export default function Login() {
    const navigate = useNavigate();
  return (
    <>
      <header>
        <title>Login - BrainBoost</title>
      </header>
      <main className='bg-gray-50 dark:bg-gray-900 w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-600 dark:text-gray-300'>
          <div className='text-center'>
          <div className="w-[2rem] flex justify-center align-items">
         </div>
            <div className='mt-5 space-y-2'>
              <h3 className='text-gray-800 dark:text-white text-2xl font-bold sm:text-3xl '>
                Join us
              </h3>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className='mt-8 space-y-5'>
            <div>
              <label className='font-medium'>Name</label>
              <Input
                type='name'
                required
                className='w-full mt-2 bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-300 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>University</label>
              <Input
                type='text'
                required
                className='w-full mt-2 bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-300 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Email</label>
              <Input
                type='email'
                required
                className='w-full mt-2 bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-300 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Password</label>
              <Input
                type='password'
                required
                className='w-full mt-2 bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-300 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Confirm Password</label>
              <Input
                type='password'
                required
                className='w-full mt-2 bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-300 focus:border-gray-800'
              />
            </div>
            <Button className='w-full text-white bg-gray-800 dark:bg-sky-500 hover:bg-gray-700 dark:hover:bg-sky-600 ring-offset-2 ring-gray-800 dark:ring-sky-500 focus:ring shadow rounded-lg'>
              Sign up
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
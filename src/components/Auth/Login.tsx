import Brand from "../subComponents/Brand";
import Button from "../subComponents/Button/Button";
import Input from "../subComponents/Input/Input";
import BrainBoost from "../../assets/BrainBoost.png"
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { DarkTheme } from '../Themes/Theme'
import ParticlesComponent from "../ParticlesComponent";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Error } from "../Error";
import { useServerError } from "../../hooks/useServerError";
import { useAuth } from "../../context/authProvider";
 

export type Credentials = {
  username: string;
  password: string;
};

type LoginFormValues = Credentials;

 

const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }
`


const Box = styled.div`
background-color: ${props => props.theme.body};
width: 100vw;
height:100vh;
position: relative;
overflow: hidden;
`

const Main = styled.div`
  color: ${(props) => props.theme.text};
  backdrop-filter: blur(1px);
  
`
export default function Login() {
 

  const { serverError, handleServerError } = useServerError();
 
  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
 
  const { loginWithUserCredentials, emailValidate } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (emailValidate(email)) {
      const { user, message } = await loginWithUserCredentials(email, password);
      if (user === null) {
        setError(message);
        setLoading(false);
        return;
      }
      navigate("/home");
      return;
    }
    setError("Enter Valid Email");
    setLoading(false);
  };

  
  return (
    <>
    <ThemeProvider theme={DarkTheme}>
       <Box>
       <ParticlesComponent theme='dark' />
       <Main>
       <header>
        <title>Login - BrainBoost</title>
      </header>
      <main className=' dark:bg-gray-900 w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-600 dark:text-gray-300'>
          <div className='text-center'>
          <div className="w-[2rem] flex justify-center align-items">
          <img src={BrainBoost} alt="brain-boost logo" className="w-[12px] h-[22px] rounded-full " />
         </div>
            <div className='mt-5 space-y-2'>
              <h3 className='text-white dark:text-white text-2xl font-bold sm:text-3xl '>
                Log in to your account
              </h3>
              <p className=''>
                Don't have an account?{" "}
                <a
                  href='/signup'
                  className='font-medium text-blue-600 dark:text-sky-500 hover:text-blue-400 dark:hover:text-sky-600 duration-150'>
                  Get access
                </a>
              </p>
            </div>
          </div>
          <form onSubmit={loginHandler} className='mt-4 space-y-5'>
            <div>
              <label className='font-medium'>Email</label>
              <Input
                required
                id='email' type='text' placeholder='Email'
                value={email}
                onChange={
                  (e) =>setEmail(e.target.value)
                }
                className='w-full mt-2 bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-300 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Password</label>
              <Input
                required
                id='password' type='password' placeholder='Password'
                value={password}
                onChange={
                  (e) =>setPassword(e.target.value)
                }
                className='w-full mt-2 bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-300 focus:border-gray-800'
              />
            </div>
            <button  type='submit' className='w-full text-white bg-gray-800 dark:bg-sky-500 hover:bg-gray-700 pt-2 pb-2 dark:hover:bg-sky-600 ring-offset-2 ring-gray-800 dark:ring-sky-500 focus:ring shadow rounded-lg'>
            { loading ? "Logging In..." : "Login"}
            </button>
            {serverError && <Error>{serverError}</Error>}
            <div className='text-center'>
              <a
                href='/login/forgot'
                className='hover:text-blue-600 dark:hover:text-sky-500 duration-150 text-white'>
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </main>
       </Main>
 
       </Box>
    </ThemeProvider>
 
    </>
  );
}
import BrainBoost from "../../assets/BrainBoost.png" ;
import * as Yup from "yup";
import { Error } from "../Error";
import { Navigate, useNavigate } from "react-router-dom";
import { useServerError } from "../../hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../context/authProvider";

export type User = {
  name: string;
  email: string;
  password: string;
};


type RegisterFormValues = User;

enum RegisterFormStep {
  Register,
  Resend,
  Reset,
}

const google = () => {
    window.open("http://localhost:3900/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:3900/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:3900/auth/facebook", "_self");
  };


export default () => {
  const navigate = useNavigate();
  const { signupWithUserCredentials, emailValidate } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const matchPassword = confirmPassword === password && confirmPassword !== "";
  const isEmptyFields =
    !email.trim().length || !password.trim().length || !name.trim().length;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  const signupHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailValidate(email)) {
      if (isPasswordValid) {
          setLoading(true);
          const { user, message } = await signupWithUserCredentials(
            name,
            email,
            password
          );
          console.log(user);
          if (user !== null) {
            navigate("/home");
            return;
          }
          setError(message);
          return;

        setError("Both passwords must be the same");
        return;
      }
      setError(
        "Password must be 8 characters long, have one upper and lower case character, and one number."
      );
      return;
    }
    setError("Enter a valid email");
  };
  
   const { serverError, handleServerError } = useServerError();

    const [registerStep, setRegisterStep] = useState<RegisterFormStep>(RegisterFormStep.Register);
  
    const initialValues: RegisterFormValues = {
      email: "",
      name: "",
      password: "",
    };
  
    const validationSchema = Yup.object({
      email: Yup.string().min(5).max(255).email().required("Required"),
      name: Yup.string().min(3).max(50).required("Required"),
      password: Yup.string().min(5).max(255).required("Required"),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormValues>({
      defaultValues: initialValues,
      resolver: yupResolver(validationSchema),
    });
  
     
 
  
    function renderSwitch() {
        switch (registerStep) {
          case RegisterFormStep.Register:
            return (
                <main className="w-full flex">
                <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
                    <div className="relative z-10 w-full max-w-md">
                        <img src={BrainBoost} width={120} className="rounded-full" />
                        <div className=" mt-16 space-y-3">
                            <h3 className="text-white text-3xl font-bold">Start growing your business quickly</h3>
                            <p className="text-gray-300">
                                Create an account and get access to all features for 30-days, No credit card required.
                            </p>
                            <div className="flex items-center -space-x-2 overflow-hidden">
                                <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" className="w-10 h-10 rounded-full border-2 border-white" />
                                <p className="text-sm text-gray-400 font-medium translate-x-5">
                                    Join  users
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-0 my-auto h-[500px]"
                        style={{
                            background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                        }}
                    >
    
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center h-screen">
                    <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                        <div className="">
                            <div className="mt-5 space-y-2">
                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                                <p className="">Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a></p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-x-3">
                            <button onClick={google} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_17_40)">
                                        <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                        <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                        <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                        <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_17_40">
                                            <rect width="48" height="48" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button onClick={facebook} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"/></svg>
                            </button>
                            <button onClick={github} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_910_21)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z" fill="#191717" />
                                        <path d="M9.08887 35.264C9.03721 35.3826 8.84645 35.4181 8.69146 35.3351C8.53646 35.2522 8.42122 35.098 8.47686 34.9755C8.5325 34.853 8.71928 34.8214 8.87428 34.9044C9.02927 34.9874 9.14848 35.1455 9.08887 35.264Z" fill="#191717" />
                                        <path d="M10.0626 36.3428C9.98028 36.384 9.88612 36.3955 9.79622 36.3753C9.70632 36.3551 9.62629 36.3045 9.56979 36.2321C9.41479 36.0662 9.38298 35.837 9.50221 35.7342C9.62143 35.6315 9.83606 35.6789 9.99105 35.8449C10.146 36.0108 10.1818 36.24 10.0626 36.3428Z" fill="#191717" />
                                        <path d="M11.0085 37.714C10.8614 37.8167 10.6111 37.714 10.472 37.5085C10.4335 37.4716 10.4029 37.4274 10.382 37.3785C10.3611 37.3297 10.3503 37.2771 10.3503 37.224C10.3503 37.1709 10.3611 37.1183 10.382 37.0694C10.4029 37.0205 10.4335 36.9763 10.472 36.9395C10.619 36.8407 10.8694 36.9395 11.0085 37.141C11.1476 37.3425 11.1516 37.6112 11.0085 37.714Z" fill="#191717" />
                                        <path d="M12.2921 39.0417C12.161 39.1879 11.8947 39.1484 11.6761 38.9508C11.4575 38.7532 11.4059 38.4845 11.537 38.3423C11.6682 38.2 11.9344 38.2395 12.161 38.4331C12.3875 38.6268 12.4312 38.8994 12.2921 39.0417Z" fill="#191717" />
                                        <path d="M14.0923 39.8162C14.0327 40.0019 13.7625 40.0849 13.4922 40.0059C13.222 39.9268 13.0432 39.7055 13.0948 39.5159C13.1465 39.3262 13.4207 39.2393 13.6949 39.3262C13.9691 39.4131 14.144 39.6226 14.0923 39.8162Z" fill="#191717" />
                                        <path d="M16.0557 39.9505C16.0557 40.1442 15.8331 40.3101 15.547 40.3141C15.2608 40.318 15.0264 40.16 15.0264 39.9663C15.0264 39.7727 15.2489 39.6067 15.535 39.6028C15.8212 39.5988 16.0557 39.753 16.0557 39.9505Z" fill="#191717" />
                                        <path d="M17.8838 39.6463C17.9196 39.8399 17.7208 40.0414 17.4347 40.0888C17.1486 40.1363 16.8982 40.0217 16.8624 39.832C16.8267 39.6423 17.0333 39.4368 17.3115 39.3855C17.5897 39.3341 17.848 39.4526 17.8838 39.6463Z" fill="#191717" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_910_21">
                                            <rect width="48" height="48" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        <div className="relative">
                            <span className="block w-full h-px bg-gray-300"></span>
                            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
                        </div>
                        <form
                           onSubmit={signupHandler}
                            className="space-y-5"
                        >
                            <div>
                            <label className="font-medium" htmlFor='name'>Username</label>
                           <input
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                              id='name' type='text' placeholder='Username'
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              />
                            {errors.name && <Error>{errors.name.message}</Error>}
                            </div>
                            <div>
                               
                            </div>
                            <div>
                            <label htmlFor='email' className="font-medium">Email</label>
                             <input
                               className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                               value={email}
                               onChange={
                                 (e) =>setEmail(e.target.value)
                                 
                               } id='email' type='email' placeholder='Email' />
                            {errors.email && <Error>{errors.email.message}</Error>}
                            </div>
                            <div>
                            <label htmlFor='password' className="font-medium">Password</label>
                            <input
                                value={password}
                                onChange={
                                  (e) =>   setPassword(e.target.value)
                            }
                             id='password'
                             type='password'
                             placeholder='Password'
                             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                           />
                           {errors.password && <Error>{errors.password.message}</Error>}
                            </div>
                   
                            <button 
                              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            type='submit'>   {loading ? "creating ..." : "Create account"}</button>
                            {serverError && <Error>{serverError}</Error>}
                            
                        </form>
                    </div>
                </div>
            </main>
 
            );
    
          case RegisterFormStep.Resend:
            return (
              <div className='container'>
                <p>A verification email has been sent.</p>
                <p>Check you mailbox : {email}.</p>
                <p>
                  You have 12 hours to activate your account. It can take up to 15 min to receive our
                  email.
                </p>
    
                {/* <button onClick={handleResendEmail}>
                  Did not receive the email? Click here to send again.
                </button> */}
                {serverError && <Error>{serverError}</Error>}
              </div>
            );
    
          case RegisterFormStep.Reset:
            return (
              <div className='container'>
                <p>Still not received an email? </p>
                <p>Try to register again. You may have given the wrong email. </p>
                <p>If you want to be able to use the same name, reset the registration :</p>
    
                {/* <button onClick={handleResetRegister}>Click here to reset the registration</button> */}
                {serverError && <Error>{serverError}</Error>}
              </div>
            );
          default:
            return <Navigate to='/'  />;
        }
      }
    
      return <>{renderSwitch()}</>;
    }
    
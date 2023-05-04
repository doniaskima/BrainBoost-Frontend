 
import { useEffect, useState } from "react"
 
import heroThumbnail from "../../assets/hero-thumbnail.png"
import GradientWrapper from "./GradientWrapper"
import NavLink from "../subComponents/NavLink/NavLink"
import HeroIntroVideo from "../subComponents/HeroIntroVideo"
 

const Hero = () => {

    const [isVideoPoppedUp, setVideoPopUp] = useState(false)
    const [isAnimated1, setIsAnimated1] = useState(true);
    const [isAnimated2, setIsAnimated2] = useState(false);
    const [isAnimated3, setIsAnimated3] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated2(!isAnimated2); // Set
            setTimeout(() => { setIsAnimated1(!isAnimated1); }, 2000); // Remove (2000 + 2000 = 4 sec animation)
            setTimeout(() => {
                setIsAnimated3(!isAnimated3); // Set
                setTimeout(() => { setIsAnimated2(!isAnimated2); }, 2000); // Remove
                setTimeout(() => {
                    setIsAnimated1(!isAnimated1); // Set
                    setTimeout(() => { setIsAnimated3(!isAnimated3); }, 2000); // Remove
                }, 1000);
            }, 2000);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [isAnimated1, isAnimated2, isAnimated3]);

    const commonClasses = 'inline-block subpixel-antialiased';
    const commonBigTextClasses = 'text-5xl md:text-7xl lg:text-8xl';
    const tailwindClassName = `text-1xl md:text-2xl lg:text-3xl font-bold ${commonClasses} ${isAnimated1 && 'name-gradient'}`;
    const tailwindClassWeb = `${commonBigTextClasses} ${commonClasses} ${isAnimated2 && 'first-word-gradient'}`;
    const tailwindClassDeveloper = `pb-4 ${commonBigTextClasses} ${commonClasses} ${isAnimated3 && 'second-word-gradient'}`;

    return (
       
      <section>
          <div className="custom-screen items-center gap-12 text-gray-600 flex flex-col sm:justify-center sm:text-center xl:flex-row xl:text-left">
              <div className='flex-none space-y-5 max-w-4xl xl:max-w-2xl'>
                  <h1 className="text-4xl text-gray-600 font-extrabold sm:text-6xl">
                      Mastering computer science fundamentals
                  </h1>
                  <p className="text-gray-800 max-w-xl sm:mx-auto xl:mx-0">
                      Brainboost is an online learning platform that provides interactive courses and projects in Computer Science to high schoolers and adults of all backgrounds.
                  </p>
                  <div className="items-center gap-x-3 font-medium text-sm sm:flex sm:justify-center xl:justify-start">
                      <NavLink
                          href="/login"
                          className="block  text-gray-800 bg-sky-900 hover:bg-sky-900 active:bg-sky-800"
                          scroll={false}
                      >
                          Get started
                      </NavLink>
                      <NavLink
                          href="#cta"
                          className="block text-gray-100 bg-gray-700 hover:bg-gray-800 mt-3 sm:mt-0"
                          scroll={false}
                      >
                          Learn more
                      </NavLink>
                  </div>
              </div>
              <div className="flex-1 w-full sm:max-w-2xl xl:max-w-xl">
                  <div className="relative">
                      <img src={heroThumbnail} className="rounded-lg w-full" alt="IO Academy" />
                      <button aria-label="Video player button" className="absolute w-14 h-10 rounded-lg inset-0 m-auto duration-150 bg-gray-800 hover:bg-gray-700 ring-offset-2 focus:ring text-white"
                          onClick={() => setVideoPopUp(true)}
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 m-auto">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
          {
              isVideoPoppedUp ? (
                  <HeroIntroVideo onClose={() => setVideoPopUp(false)} />
              ) : ""
          }
      </section>
   
    )
}

export default Hero
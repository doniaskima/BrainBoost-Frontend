
import { PlayList } from "../../components/subComponents/PlayList";
import VideoPlayer from "../../components/subComponents/VideoPlayer/VideoPlayer";
import { useState } from "react";
import lessons from "../../Lessons/lessons.json"
import content  from "../../Lessons/lesson"


type LessonProps = {
  getLesson: {
    title: string;
    lesson: string;
    thumbnail: string;
  };
  content: string;
};

const Heading = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    {...props}
    className={`${className || ""} text-3xl text-gray-800 dark:text-white font-semibold lg:text-4xl`}
  >
    {children}
  </h1>
);

const Lesson = ({ getLesson, content }: LessonProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="mt-16 lg:mt-20">
        <div className="mx-auto lg:max-w-screen-xl lg:px-8">
          <VideoPlayer
            src={getLesson?.lesson}
            type="video/mp4"
            poster={getLesson?.thumbnail}
          />
        </div>
        <div className="mx-auto mt-12 gap-8 justify-between lg:flex lg:max-w-screen-xl lg:px-8">
          <div className="h-full lg:border-r lg:dark:border-gray-800 lg:pr-8">
            <Heading className="px-4 md:px-8 lg:px-0">
              {getLesson?.title}
            </Heading>
            <PlayList
              items={lessons}
              className="sticky -top-1 px-4 mt-6 bg-white dark:bg-gray-900 flex-none md:px-8 lg:hidden lg:px-0"
              isOpen={isOpen}
              setOpen={setOpen}
            />
            <article
              className="px-4 mt-6 max-w-3xl prose dark:prose-invert md:px-8 lg:px-0"
              dangerouslySetInnerHTML={{ __html: content }}
            ></article>
          </div>
          <div className="flex-none hidden lg:block">
            <PlayList
              items={lessons}
              className="w-full sticky top-3"
              isOpen={isOpen}
              setOpen={setOpen}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 1024px) {
            .plyr {
                border-radius: 0px;
            }
          }
        
        `}
      </style>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;
  // Get the lesson based on the slug and pass the data to props
  const getLesson = lessons.find((item) => item.slug == slug);
  const content = ""; // replace with actual content
  return {
    props: {
      getLesson,
      content,
    },
  };
}

export default Lesson;

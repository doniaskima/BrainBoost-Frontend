import React from "react";
import Duration from "./Duration";
import { SubTitle } from "./SubTitle";
import { Title } from "./Title";


interface LessonCardProps {
    idx:number,
    item:{
        thumbnail: string;
        title: string;
        description: string;
        duration: string;
        slug: string;
    }
}
 
export const LessonCardGrid: React.FC<LessonCardProps> = ({ idx, item: { thumbnail, title, description, duration, slug } }) => {
    return (
      <div className="space-y-2 sm:max-w-sm">
        <a href={`/tutorials/cs50/${slug}`}>
          <img src={thumbnail} className="rounded-lg w-full" alt={title} />
        </a>
        <div className="pt-2 text-sm flex items-center justify-between">
          <SubTitle>Lesson {idx + 1}</SubTitle>
          <Duration>{duration}</Duration>
        </div>
        <Title>
          <a href={`/tutorials/cs50/${slug}`}>{title}</a>
        </Title>
        <p>{description}</p>
      </div>
    );
  };
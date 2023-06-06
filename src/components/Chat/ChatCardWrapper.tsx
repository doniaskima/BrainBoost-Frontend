import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ChatCardWrapper = ({ children }: Props) => {
  return (
    <div className="sidebar__chat">
      {children}
    </div>
  );
};

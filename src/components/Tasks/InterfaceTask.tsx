
export interface Task {
  _id: string;
  sectionId: string | Section;
  name: string;
  dueDate: {
    // one day: from: null, to: Date
    from: Date; // null || Date
    to: Date; // null || Date
  };
  files: Array<string>;
  dependenciesTask: Task;
  labels: Array<Label>;
  isDone: boolean;
  description: string;
  subTask: Array<Task>;
  authorId: {
    _id: string;
    email: string;
    username: string;
    avatar: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Label {
  _id: string;
  name: string;
  color: string;
  description: string;
  authorId: {
    _id: string;
    email: string;
    username: string;
    avatar: string;
  };
}
export interface Section {
  _id: string;
  name: string;
  authorId: {
    avatar: string;
    projectId: string;
    createdAt: Date;
  };
  tasks: Array<Task>;
  projectId: string;
}

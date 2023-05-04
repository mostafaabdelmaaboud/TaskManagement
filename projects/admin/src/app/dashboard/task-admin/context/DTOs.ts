
export interface AddTaskModel {
  title: string,
  userId: string,
  image: object,
  description: string,
  deadline: string
}
export interface ListUsersModel {
  title: string,
  deadline: string,
  status: string,
  user: string,
}
export interface UsersModel {
  createdAt: Date;
  deadline: string;
  description: string;
  image: string;
  status: string;
  title: string;
  updatedAt: Date;
  loading: boolean;
  userId: UserID;
  _id: string;
}

export interface UserID {
  assignedTasks: number;
  createdAt: Date;
  email: string;
  password: string;
  role: string;
  status: string;
  updatedAt: Date;
  username: string;
  _id: string;
}

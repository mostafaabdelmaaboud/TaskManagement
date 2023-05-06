export interface ListUsersModel {
  title: string,
  deadline: string,
  status: string,
  user: string,
}

export interface UsersModel {
  _id: string;
  username: string;
  email: string;
  assignedTasks: number;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  loading: boolean;
  __v: number;
}
export interface UpdateUserByIdModel {
  id: string;
  status: string
}

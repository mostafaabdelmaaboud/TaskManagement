
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
<<<<<<< HEAD

export interface Filteration {
  keyword?: string;
  userId?: string;
  status?: string;
  fromDate?: string | null;
  toDate?: string | null;
  page?: number,
  limit?: number
}
=======
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd

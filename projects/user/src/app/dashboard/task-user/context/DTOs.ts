export interface filterTasksModel {
  page: number;
  limit?: number;
  status?: string;
}
export interface GetTasksDetailsModel {
  tasks: tasksModel
}
export interface tasksModel {
  _id: string;
  title: string;
  userId: string;
  image: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isLoading?: boolean;

}
export interface UserData {
  email: string;
  exp: number;
  iat: number;
  userId: string;
}

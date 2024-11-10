export type User = {
  id_user: string;
  name: string;
  username: string;
  email: string;
  role: string;
};

export type UserCreate = {
  name: string;
  username: string;
  email: string;
  role: string;
};

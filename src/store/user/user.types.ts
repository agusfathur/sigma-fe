export type User = {
  id_user: string;
  name: string;
  username: string;
  password: string;
  image?: string;
  email: string;
  role: string;
};

export type UserCreate = {
  name: string;
  username: string;
  password: string;
  image: File;
  email: string;
  role: string;
};

export type UserUpdate = {
  id_user: string;
  name: string;
  username: string;
  password: string;
  image?: File;
  email: string;
  role: string;
};

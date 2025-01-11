export type UpdateUserData = {
  pseudo?: string;
  email?: string;
  bio?: string;
  isBan?: boolean;
  passwordHash?: string;
  profilePhoto?: string;
  city?: string;
};

export type UserSortParams = {
  field: string;
  order: 'asc' | 'desc';
};

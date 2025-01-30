export type UserData = {
  id: string; // UID Firebase Auth
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isForfait: boolean;
  createdAt: Date | null;
};

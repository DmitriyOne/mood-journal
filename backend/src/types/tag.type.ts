export type TTag = {
  id: number;
  user_id: string | null; // Might be null if user is deleted
  name: string;
  created_at: Date;
  updated_at: Date;
};

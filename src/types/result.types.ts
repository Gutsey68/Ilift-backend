export type Set = {
  reps: number;
  weight: number;
};

export type CreateResultData = {
  exerciceId: string;
  sets: Set[];
};

export type UpdateResultData = {
  sets: Set[];
};

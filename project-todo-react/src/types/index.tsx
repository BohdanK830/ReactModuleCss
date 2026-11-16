export interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

export type SortOrder = 'asc' | 'desc' | 'none';
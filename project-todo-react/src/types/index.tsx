export type Priority = 'low' | 'medium' | 'high';

export interface ToDo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  date: string;
}

export type SortOrder = 'asc' | 'desc' | 'none';
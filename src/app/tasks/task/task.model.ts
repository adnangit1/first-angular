export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface NewTaskData {
  title: string;
  summary: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}
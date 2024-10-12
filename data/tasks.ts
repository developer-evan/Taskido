export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  completed?: boolean;
}

export const tasks: Task[] = [
  {
    id: 1,
    title: "Waken up and do some exercise",
    description: "Wake up early and go for a run",
    dueDate: "2024-11-31",
    status: "completed",
  },
  {
    id: 2,
    title: "Do some coding and learn new things",
    description: "Work on a new project and learn a new technology",
    dueDate: "2024-12-31",
    status: "incomplete",
  },
  {
    id: 3,
    title: "Go Out and have some fun",
    description: "Spend time with friends and family",
    dueDate: "2024-12-31",
    status: "progress",
  },
  {
    id: 4,
    title: "Read a book",
    description: "Finish reading 'Atomic Habits'",
    dueDate: "2024-12-15",
    status: "completed",
  },
  {
    id: 5,
    title: "Grocery shopping",
    description: "Buy groceries for the week",
    dueDate: "2024-12-10",
    status: "incomplete",
  },
  {
    id: 6,
    title: "Clean the house",
    description: "Do a thorough cleaning of the house",
    dueDate: "2024-12-12",
    status: "progress",
  },
  {
    id: 7,
    title: "Prepare presentation",
    description: "Prepare slides for the upcoming project presentation",
    dueDate: "2024-12-20",
    status: "completed",
  },
  {
    id: 8,
    title: "Attend workshop",
    description: "Participate in the online workshop on TypeScript",
    dueDate: "2024-12-18",
    status: "incomplete",
  },
  {
    id: 9,
    title: "Visit the doctor",
    description: "Routine health check-up appointment",
    dueDate: "2024-12-22",
    status: "progress",
  },
  {
    id: 10,
    title: "Plan vacation",
    description: "Plan the itinerary for the upcoming vacation",
    dueDate: "2024-12-25",
    status: "completed",
  },
  {
    id: 11,
    title: "Write a blog post",
    description: "Write and publish a blog post on recent tech trends",
    dueDate: "2024-12-28",
    status: "incomplete",
  },
  {
    id: 12,
    title: "Organize files",
    description: "Organize and back up important files on the computer",
    dueDate: "2024-12-30",
    status: "progress",
  },
  {
    id: 13,
    title: "Family dinner",
    description: "Host a family dinner at home",
    dueDate: "2024-12-31",
    status: "completed",
  },
  {
    id: 14,
    title: "Exercise",
    description: "Go for a run in the park",
    dueDate: "2024-12-31",
    status: "incomplete",
  },
  {
    id: 15,
    title: "Meditate",
    description: "Spend 30 minutes meditating",
    dueDate: "2024-12-31",
    status: "progress",
  },
];

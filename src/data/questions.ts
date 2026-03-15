// Mock questions data for CognifyLearn quiz
export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number; // index of correct option
  topic: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    topic: "Algorithms",
  },
  {
    id: 2,
    question: "Which data structure uses FIFO ordering?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1,
    topic: "Data Structures",
  },
  {
    id: 3,
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Standard Query Logic",
      "Sequential Query Language",
    ],
    correct: 0,
    topic: "Databases",
  },
  {
    id: 4,
    question: "Which protocol is used for secure web communication?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    topic: "Networking",
  },
  {
    id: 5,
    question: "What is the output of 2 ** 3 in Python?",
    options: ["6", "8", "9", "5"],
    correct: 1,
    topic: "Programming",
  },
  {
    id: 6,
    question: "Which sorting algorithm has the best average-case complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correct: 2,
    topic: "Algorithms",
  },
  {
    id: 7,
    question: "What is a foreign key in a database?",
    options: [
      "A key from another country",
      "A field that links to another table's primary key",
      "An encrypted key",
      "The first column in any table",
    ],
    correct: 1,
    topic: "Databases",
  },
  {
    id: 8,
    question: "What does OOP stand for?",
    options: [
      "Object-Oriented Programming",
      "Out Of Process",
      "Open Online Platform",
      "Optimized Output Protocol",
    ],
    correct: 0,
    topic: "Programming",
  },
];

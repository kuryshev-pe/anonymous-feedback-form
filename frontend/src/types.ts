// types.ts

export interface FeedbackFormData {
  name: string;
  department: string;
  email: string;
  category: string;
  message: string;
  attachment: File | null;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    createdAt: string;
  };
  error?: string;
}

export interface DepartmentOption {
  value: string;
  label: string;
}

export interface CategoryOption {
  value: string;
  label: string;
  recipientEmail?: string; // Для маршрутизации обращений
}

// Тип для валидации с помощью библиотек типа Zod или Yup
export const feedbackSchema = {
  name: (value: string) => value.length >= 2,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: (value: string) => value.length >= 10,
};

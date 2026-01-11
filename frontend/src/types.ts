// types.ts

export interface FeedbackFormData {
  department: string;
  email: string;
  category: string;
  message: string;
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
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: (value: string) => value.length >= 10,
};

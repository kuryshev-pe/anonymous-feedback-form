import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Snackbar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Типы для формы
interface FeedbackFormData {
  name: string;
  department: string;
  email: string;
  category: string;
  message: string;
  attachment: File | null;
}

interface FormStatus {
  submitting: boolean;
  success: boolean;
  error: string;
}

// Тип для категорий
type FeedbackCategory = 
  | 'improvement' 
  | 'problem' 
  | 'salary' 
  | 'culture' 
  | 'technical' 
  | 'other';

// Тип для отделов
type DepartmentType = 
  | 'development' 
  | 'marketing' 
  | 'hr' 
  | 'accounting' 
  | 'administration';

// Константы для селектов
const CATEGORIES: Array<{ value: FeedbackCategory; label: string }> = [
  { value: 'improvement', label: 'Предложение по улучшению' },
  { value: 'problem', label: 'Проблема в работе' },
  { value: 'salary', label: 'Вопрос по зарплате' },
  { value: 'culture', label: 'Корпоративная культура' },
  { value: 'technical', label: 'Технические вопросы' },
  { value: 'other', label: 'Другое' },
];

const DEPARTMENTS: Array<{ value: DepartmentType; label: string }> = [
  { value: 'development', label: 'Отдел разработки' },
  { value: 'marketing', label: 'Отдел маркетинга' },
  { value: 'hr', label: 'HR' },
  { value: 'accounting', label: 'Бухгалтерия' },
  { value: 'administration', label: 'Администрация' },
];

// Основной компонент формы
const FeedbackForm: React.FC = () => {
  // Состояние формы
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    department: '',
    email: '',
    category: '',
    message: '',
    attachment: null,
  });

  // Статус отправки
  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    success: false,
    error: '',
  });

  // Обработчик изменения текстовых полей
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик изменения селектов
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик загрузки файла
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        attachment: e.target.files![0],
      }));
    }
  };

  // Валидация формы
  const validateForm = (): boolean => {
    const { name, email, category, message } = formData;
    
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus((prev) => ({ ...prev, error: 'Введите корректный email' }));
      return false;
    }
    
    if (!category) {
      setStatus((prev) => ({ ...prev, error: 'Выберите категорию' }));
      return false;
    }
    
    if (!message.trim() || message.length < 10) {
      setStatus((prev) => ({ 
        ...prev, 
        error: 'Сообщение должно содержать минимум 10 символов' 
      }));
      return false;
    }
    
    return true;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus({ submitting: true, success: false, error: '' });
    
    try {
      // Имитация API-запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Здесь обычно будет реальный запрос:
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // });
      
      setStatus({ submitting: false, success: true, error: '' });
      
      // Сброс формы
      setFormData({
        name: '',
        department: '',
        email: '',
        category: '',
        message: '',
        attachment: null,
      });
      
} catch (error) {
      setStatus({ 
        submitting: false, 
        success: false, 
        error: 'Произошла ошибка при отправке формы' 
      });
    }
  };

  // Закрытие уведомления
  const handleCloseSnackbar = () => {
    setStatus((prev) => ({ ...prev, success: false, error: '' }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 800,
          width: '100%',
          p: { xs: 3, md: 4 },
          borderRadius: 2,
	}}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4 
	  }}
        >
          Анонимная форма обратной связи
        </Typography>
        
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Ваше мнение помогает нам становиться лучше
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Без указания адреса электонной связи форма становится анонимной.
	  <br/>
	  При указании адреса электронной связи вам ответят в течении недели.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Выбор отдела */}
            <Grid size={{xs:12, sm: 6}}>
              <FormControl fullWidth>
                <InputLabel>Отдел</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleSelectChange}
                  label="Отдел"
                  disabled={status.submitting}
                >
                  {DEPARTMENTS.map((dept) => (
                    <MenuItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Категория обращения */}
            <Grid size={{xs:12, sm: 6}}>
              <FormControl fullWidth required>
                <InputLabel>Категория обращения</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleSelectChange}
                  label="Категория обращения"
                  disabled={status.submitting}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
	    
            {/* Email */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Email (для обратной связи)"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={status.submitting}
                variant="outlined"
              />
            </Grid>


            {/* Сообщение */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Сообщение"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                multiline
                rows={5}
                disabled={status.submitting}
                variant="outlined"
                placeholder="Опишите подробно ваш вопрос, проблему или предложение..."
                helperText="Минимум 10 символов"
              />
            </Grid>

            {/* Кнопка отправки */}
            <Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={status.submitting}
                startIcon={
                  status.submitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SendIcon />
                  )
                }
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
		}}
              >
                {status.submitting ? 'Отправка...' : 'Отправить обращение'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Уведомление об успехе */}
        <Snackbar
          open={status.success}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            Форма успешно отправлена! Мы ответим вам в ближайшее время.
          </Alert>
        </Snackbar>

        {/* Уведомление об ошибке */}
        <Snackbar
          open={!!status.error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: '100%' }}
          >
            {status.error}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default FeedbackForm;

# Feedback API Tests

## Test Cases

### 1. Successful Feedback Submission
- **Endpoint**: `POST /api/feedback`
- **Request Body**:
```json
{
    "department": "IT",
    "category": "Bug Report", 
    "email": "test@example.com",
    "message": "This is a test message"
}
```
- **Expected Response**: `200 OK` with `{"status": "ok"}`
- **Database Verification**: Feedback should be saved with all fields populated

### 2. Feedback Submission Without Email
- **Endpoint**: `POST /api/feedback`
- **Request Body**:
```json
{
    "department": "HR",
    "category": "Suggestion",
    "message": "This is a suggestion without email"
}
```
- **Expected Response**: `200 OK` with `{"status": "ok"}`
- **Database Verification**: Feedback saved with `email` as `NULL`

### 3. Invalid HTTP Method
- **Endpoint**: `GET /api/feedback`
- **Expected Response**: `400 Bad Request` with `{"status": "nok"}`

### 4. Empty Request Body
- **Endpoint**: `POST /api/feedback` 
- **Request Body**: Empty JSON object `{}` or no body
- **Expected Response**: `200 OK` with `{"status": "ok"}`

## How to Run Tests

To run these tests, you need:

1. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```

2. Navigate to backend directory:
   ```bash
   cd backend
   ```

3. Run tests:
   ```bash
   python manage.py test feedback.tests
   ```

## Test Implementation

The following tests should be implemented in `backend/feedback/tests.py`:

```python
import json
from django.test import TestCase
from django.test import Client
from feedback.models import FeedbackInfo

class TestFeedbackAPI(TestCase):
    def setUp(self):
        self.client = Client()
        
    def test_save_feedback_success(self):
        """Test successful feedback submission with all fields"""
        data = {
            "department": "IT",
            "category": "Bug Report",
            "email": "test@example.com",
            "message": "This is a test message"
        }
        
        response = self.client.post(
            '/api/feedback',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        # Verify successful response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
        
        # Verify the feedback was saved in database
        feedback = FeedbackInfo.objects.get()
        self.assertEqual(feedback.department, "IT")
        self.assertEqual(feedback.category, "Bug Report")
        self.assertEqual(feedback.email, "test@example.com")
        self.assertEqual(feedback.message, "This is a test message")
        
    def test_save_feedback_missing_email(self):
        """Test feedback submission without email field"""
        data = {
            "department": "HR",
            "category": "Suggestion",
            "message": "This is a suggestion without email"
        }
        
        response = self.client.post(
            '/api/feedback',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        # Verify successful response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
        
        # Verify the feedback was saved in database
        feedback = FeedbackInfo.objects.get()
        self.assertEqual(feedback.department, "HR")
        self.assertEqual(feedback.category, "Suggestion")
        self.assertIsNone(feedback.email)
        self.assertEqual(feedback.message, "This is a suggestion without email")
        
    def test_save_feedback_invalid_method(self):
        """Test feedback submission with GET method (should fail)"""
        response = self.client.get('/api/feedback')
        
        # Verify error response for invalid method
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"status": "nok"})
        
    def test_save_feedback_empty_request(self):
        """Test feedback submission with empty request body"""
        response = self.client.post(
            '/api/feedback',
            content_type='application/json'
        )
        
        # Verify successful response even with empty data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
        
    def test_save_feedback_empty_json(self):
        """Test feedback submission with empty JSON object"""
        response = self.client.post(
            '/api/feedback',
            data=json.dumps({}),
            content_type='application/json'
        )
        
        # Verify successful response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
```
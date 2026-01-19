# API Documentation for Anonymous Feedback Form Backend

This document provides detailed information about the API endpoints available in the anonymous feedback form backend application.

## Overview

The backend provides RESTful API endpoints for managing anonymous feedback submissions. The system allows users to submit feedback through a frontend interface, which is then stored in the database.

## Base URL

All endpoints are prefixed with `/api/`:
```
http://<your-domain>/api/
```

## Endpoints

### 1. Get CSRF Token

**Endpoint:** `GET /api/message`

**Description:** This endpoint retrieves a CSRF token required for secure POST requests to the feedback submission endpoint.

**Request:**
- Method: `GET`
- Headers: None required
- Parameters: None

**Response:**
```json
{
  "CSRFToken": "csrf_token_value"
}
```

**Example Request:**
```bash
curl http://localhost:8000/api/message
```

**Example Response:**
```json
{
  "CSRFToken": "abc123def456ghi789"
}
```

### 2. Save Feedback

**Endpoint:** `POST /api/feedback`

**Description:** This endpoint accepts feedback submissions from users. The request must include a valid CSRF token in the headers.

**Request:**
- Method: `POST`
- Headers:
  - `Content-Type: application/json`
  - `X-CSRFToken: <csrf_token_value>` (required)
- Body (JSON):
  ```json
  {
    "department": "string",
    "category": "string",
    "email": "string (optional)",
    "message": "string"
  }
  ```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| department | string | No | Department of the submitter |
| category | string | Yes | Category of feedback |
| email | string | No | Email address (optional) |
| message | string | Yes | Feedback content |

**Response:**
```json
{
  "status": "ok"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/feedback \
  -H "Content-Type: application/json" \
  -H "X-CSRFToken: abc123def456ghi789" \
  -d '{
    "department": "IT",
    "category": "Suggestion",
    "email": "user@example.com",
    "message": "This is a sample feedback message."
  }'
```

**Example Response:**
```json
{
  "status": "ok"
}
```

### 3. Error Endpoint (for testing)

**Endpoint:** `GET /api/error`

**Description:** This endpoint intentionally throws an error for testing purposes.

**Request:**
- Method: `GET`
- Headers: None required
- Parameters: None

**Response:**
This endpoint will return a server error (500) due to intentional division by zero.

## Data Model

The feedback data is stored in the `FeedbackInfo` model with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| department | CharField (max_length=16) | No | Department of the submitter |
| email | EmailField | No | Email address of the submitter |
| category | CharField (max_length=16) | Yes | Category of feedback |
| message | TextField | Yes | Feedback content |
| submission_date | DateTimeField | No | Date and time when feedback was submitted |

## Error Handling

The API follows standard HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid request format or missing required fields
- `500 Internal Server Error`: Server-side errors (e.g., database issues, intentional errors for testing)

### Example Error Responses

**Missing required fields:**
```json
{
  "error": "Missing required fields",
  "status": 400
}
```

## Security Considerations

1. **CSRF Protection**: All POST requests require a valid CSRF token to prevent cross-site request forgery attacks.
2. **Data Validation**: The backend validates input data before processing.
3. **Anonymous Nature**: No user identification is stored with feedback submissions.

## Usage Example

Here's a complete example of how to use the API:

1. First, get the CSRF token:
```bash
curl http://localhost:8000/api/message
```

2. Then submit feedback using the obtained CSRF token:
```bash
curl -X POST http://localhost:8000/api/feedback \
  -H "Content-Type: application/json" \
  -H "X-CSRFToken: <obtained_token>" \
  -d '{
    "department": "HR",
    "category": "Complaint",
    "message": "I have a complaint about the office environment."
  }'
```

## Version History

- **v1.0**: Initial release with basic feedback submission functionality
- **v1.1**: Added CSRF protection for all POST requests
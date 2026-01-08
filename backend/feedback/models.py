from datetime import datetime
from django.db import models

class FeedbackInfo(models.Model):
    department = models.CharField(max_length=16, null=True)
    email = models.EmailField(null=True)
    category = models.CharField(max_length=16)
    message = models.TextField()
    submission_date = models.DateTimeField(default=datetime.now())
    

    def __str__(self):
        m = str(self.message)[:32]
        s = f"Anonymous feedback for {self.category}: {m}"

        if self.email is None or len(str(self.email)) < 3:
            return s
        else:
            return f"Feedback from {self.email}: {m}"

from django.db import models
from django.utils import timezone
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=500, unique=True, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)

    def __str__(self):
        return self.title  # TODO


class Note(models.Model):
    name = models.CharField(max_length=50)
    uploaded_by = models.ForeignKey(
        User, default=1, related_name="uploaded", on_delete=models.SET_DEFAULT
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="notes")
    no_download = models.IntegerField()
    date_uploaded = models.DateTimeField(auto_now_add=True)
    note_file = models.FileField()

    class Meta:
        ordering = ["-no_download"]

    def __str__(self):
        return self.name  # TODO


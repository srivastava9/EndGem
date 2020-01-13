from django.contrib import admin
from .models import Course, Note

# Register your models here.
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Course, CourseAdmin)


class NoteAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "uploaded_by",
        "no_download",
        "date_uploaded",
        "course",
        "note_file",
    )
    list_filter = ("course", "uploaded_by")
    search_fields = ("course", "uploaded_by")
    ordering = ("no_download", "date_uploaded")


admin.site.register(Note, NoteAdmin)


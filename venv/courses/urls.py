from django.conf.urls import url
from django.urls import path
from .views import CourseList, NoteList, CreateNote, UpdateDownload, Noteslist

urlpatterns = [
    path("list", CourseList.as_view(), name="Course_list"),
    path("list/<int:pk>", NoteList.as_view(), name="Note_list"),
    path("new/", CreateNote.as_view(), name="New_Note"),
    path("note", Noteslist.as_view(), name="Notes_List"),
    path("note/<int:pk>", UpdateDownload.as_view(), name="Note_Update"),
]

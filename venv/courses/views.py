from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Course, Note
from django.utils import timezone
from django.contrib.auth.models import User
from .serializers import (
    CourseSerializer,
    NoteSerializer,
    NoteSerializerPost,
    NoteDownloadSerializer,
)


class CourseList(APIView):
    def get(self, request):
        courses = Course.objects.all()
        data = CourseSerializer(courses, many=True).data
        return Response(data)


class Noteslist(APIView):
    def get(self, request):
        notes = Note.objects.all()

        data = NoteSerializer(notes, many=True).data
        return Response(data)


class NoteList(APIView):
    def get(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        notes = course.notes.all()
        data = NoteSerializer(notes, many=True).data
        return Response(data)


class CreateNote(APIView):
    permission_classes = [AllowAny]
    serializer_class = NoteSerializerPost

    def post(self, request):
        serializer = NoteSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateDownload(APIView):
    def put(self, request, pk):
        note = get_object_or_404(Note, pk=pk)
        serializer = NoteDownloadSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

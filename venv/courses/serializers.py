from rest_framework import serializers

from .models import Course, Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

    # read_only_fields = ["date_uploaded", "uploaded_by", "course"]
    def validate_name(self, value):
        qs = Note.objects.filter(name__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("The Name Must be unique")
        return value


class NoteSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("name", "course", "no_download", "note_file")

    # read_only_fields = ["date_uploaded", "uploaded_by", "course"]
    def validate_name(self, value):
        qs = Note.objects.filter(name__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("The Name Must be unique")
        return value


class NoteDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("no_download",)


class CourseSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, required=False)

    class Meta:
        model = Course
        fields = "__all__"
        read_only_fields = ["slug"]

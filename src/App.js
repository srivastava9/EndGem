import React, { Component } from "react";
import EachNote from "./components/eachNote/note";
import CallApi from "./api";
import CreateNote from "./createNote.js";
import "./App.css";
const callApi = new CallApi();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      allnotes: [],
      notes: [],
      newNote: "",
      newNoteCourse: "",
      newNoteFile: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    var self = this;
    callApi.getCourses().then(function(res) {
      console.log(res);
      self.setState({ courses: res });
    });
    callApi.getNotesList().then(function(res) {
      self.setState({ allnotes: res });
    });
  }

  openNotes = e => {
    var self = this;
    callApi.getNotes(e.target.id).then(function(res) {
      console.log(res);
      self.setState({ notes: res });
    });
  };

  submitNote = () => {
    let { newNote, newNoteCourse, newNoteFile } = this.state;

    let form_data = new FormData();
    form_data.append("name", newNote);
    form_data.append("course", newNoteCourse);
    form_data.append("no_download", 0);
    form_data.append("note_file", newNoteFile);

    callApi
      .createNote(form_data)
      .then(() => {
        console.log("sucess");
      })
      .catch(err => console.log(err));
  };
  async handleSubmit(data) {
    if (data) {
      await this.setState({
        newNote: data.name,
        newNoteCourse: Number(data.courseId),
        newNoteFile: data.uploadFile
      });
    }

    this.submitNote();
  }

  render() {
    return (
      <div>
        <ul className="courses-list">
          {this.state.courses.map(item => (
            <li key={item.id} onClick={this.openNotes} id={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
        {this.state.notes.map(item => (
          <EachNote
            id={item.id}
            title={item.name}
            date={item.date_uploaded}
            nodownload={item.no_download}
            notefile={item.note_file}
          />
        ))}
        <div>
          <CreateNote
            courses={this.state.courses}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <br />
        <br />
        <hr />
        <div>
          All Notes By Downloads
          <br />
          <hr />
          {this.state.allnotes.map(item => (
            <EachNote
              id={item.id}
              title={item.name}
              date={item.date_uploaded}
              nodownload={item.no_download}
              notefile={item.note_file}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: "1",
      name: "",
      uploadFile: null
    };
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState({
      name: value
    });
  };
  handleChangeId = e => {
    this.setState({
      courseId: e.target.value
    });
  };
  uploadFile = e => {
    this.setState({
      uploadFile: e.target.files[0]
    });
  };
  handleClick = () => {
    if (this.state.course !== "" && this.state.name !== "") {
      const { courseId, name, uploadFile } = this.state;
      let data = { name: name, courseId: courseId, uploadFile: uploadFile };
      console.log(data, "asdfghj");
      this.props.handleSubmit(data);
    }
  };
  render() {
    return (
      <div>
        <p>Add Material</p>
        <select
          onChange={this.handleChangeId}
          name="courseId"
          value={this.state.courseId}
        >
          {this.props.courses.map(item => (
            <option key={item.id} name="courseId" value={item.id}>
              {item.id}) {item.title}
            </option>
          ))}
        </select>
        <input
          placeholder="Display Name"
          name="name"
          onChange={this.handleChange}
        />
        <input
          type="file"
          name="note_file"
          onChange={this.uploadFile}
          required
        />
        <button onClick={this.handleClick}>Upload</button>
      </div>
    );
  }
}

export default CreateNote;

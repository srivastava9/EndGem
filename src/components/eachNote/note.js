import React, { Component } from "react";
import "./note.css";
import pdf from "../../assets/pdf.png";
import download from "../../assets/download.png";
class EachNote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="eachnote-body">
        <div className="pdf-img">
          <img src={pdf} alt="pdf-img" />
        </div>
        <div className="eachnote-info">
          <div className="eachnote-title">{this.props.title}</div>
          <div className="eachnote-date">{this.props.date}</div>
        </div>
        <div className="noDownloads">
          Total Downloads : {this.props.nodownload}
        </div>
        <div onClick={this.props.handleDownload} className="img-download">
          <img src={download} alt="img-download" />
        </div>
      </div>
    );
  }
}

export default EachNote;

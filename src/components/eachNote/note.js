import React, { Component } from "react";
import "./note.css";
import pdf from "../../assets/pdf.png";
import CallApi from "../../api.js";
import download from "../../assets/download.png";
const callApi = new CallApi();
class EachNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noDownloads: this.props.nodownload
    };
    this.updateDownload = this.updateDownload.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
  async updateDownload(e) {
    this.setState({
      noDownloads: this.state.noDownloads + 1
    });

    callApi.updateDownload(this.props.id, this.state.noDownloads).then(() => {
      console.log("update download");
    });
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
          <a href={this.props.notefile} download onClick={this.updateDownload}>
            <img src={download} alt="img-download" />
          </a>
        </div>
      </div>
    );
  }
}

export default EachNote;

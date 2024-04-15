import React, { Component } from 'react';
import { Col } from 'antd';
import { Document, pdfjs, Page } from 'react-pdf';
import { withRouter } from 'react-router-dom';

export class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfPage: 0,
      url: '',
    };
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`;
  }

  componentDidMount() {
    const filename = this.props.history.location.pathname
      .split('/')
      .slice(-1)[0]; // like this name '1621000447542_FHA_Calculation_PDF_1621000443000.pdf';
    const url = `https://loantack-dev-bucket.s3.us-west-1.amazonaws.com/calculation_files/${filename}.pdf`; // aws pdf url

    this.setState({
      url,
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      pdfPage: numPages,
    });
  };

  render() {
    const { pdfPage, url } = this.state;

    return (
      <Col style={{ paddingTop: 30, textAlign: '-webkit-center' }}>
        <Document file={url} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pdfPage} />
        </Document>
      </Col>
    );
  }
}

export default withRouter(Sample);

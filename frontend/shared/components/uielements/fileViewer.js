import React, { Component } from 'react';
import Modal from '@iso/components/uielements/modal';
import Renderer from './renderImage';
import { Col } from 'antd';
import { Document, pdfjs, Page } from 'react-pdf';

export class FileViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPdf: false,
      pdfPage: 1,
    };
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`;
  }

  componentDidMount() {
    const ext = this.props.url ? this.props.url.split('.').pop() : null;

    if (ext === 'pdf') {
      this.setState({
        isPdf: true,
      });
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      pdfPage: numPages,
    });
  };

  render() {
    const { isPdf, pdfPage } = this.state;
    const { url, visible, handleClose } = this.props;
    return (
      <Modal visible={visible} onCancel={handleClose} width={900} footer={null}>
        <Col style={{ padding: 30 }}>
          {isPdf ? (
            <Document file={url} onLoadSuccess={this.onDocumentLoadSuccess}>
              <Page className="pdf-stl" pageNumber={pdfPage} />
            </Document>
          ) : (
            <Renderer url={url} />
          )}
        </Col>
      </Modal>
    );
  }
}

export default FileViewer;

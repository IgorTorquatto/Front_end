import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class PDFReport extends React.Component {
 render() {
    const { reportData } = this.props;

    return (
      <Document>
        <Page pageNumber={1} />
      </Document>
    );
 }
}

export default PDFReport;
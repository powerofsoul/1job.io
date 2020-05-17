
import { Document, Page } from 'react-pdf';
import React, { useState } from 'react';
import { Button } from 'antd';

interface Props {
    url: string;
}

export default (props: Props) => {
    const [ pageNumber, setPageNumer] = useState(1);
    const [numPages, setNumPages] = useState(0);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    return <Document
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
    >
        <Page pageNumber={pageNumber} />
        <p>Page {pageNumber} of {numPages}</p>
        {pageNumber > 1 && <Button onClick={() => setPageNumer(pageNumber-1)}>Previous</Button>}
        {pageNumber < numPages && <Button onClick={() => setPageNumer(pageNumber+1)}>Next</Button>}
    </Document>
}
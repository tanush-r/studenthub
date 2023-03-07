import React from 'react'
import { useParams } from 'react-router-dom';

export default function ViewPdf() {
        let { id } = useParams();
        return (
                <div className=''>
                        <iframe src={"http://localhost:5000/get_pdf_notes/"+id} width="75%" height="75%">
                        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="/get_pdf_notes">Download PDF</a></p>
                        </iframe>
                </div>
        )
}

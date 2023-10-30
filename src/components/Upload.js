import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Upload({username}) {
    const [files, setFiles] = useState([]);
    //const [format, setFormat] = useState('zip');
    const [compressedFileName, setCompressedFileName] = useState('');
    const [message, setMessage] = useState('');

    const fileInputRef = useRef(null);  // Reference for file input field

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        formData.append('username', username);
        //formData.append('format', format.toLowerCase());
        formData.append('desiredFileName', `${compressedFileName}.7z`);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/upload`, formData);
            setMessage(response.data);
            // Reset fields after successful upload
            setFiles([]);
            //setFormat('zip');
            setCompressedFileName('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error("Upload error:", error.response.data);
            setMessage(error.response.data.error || "Upload failed");
        }

        setTimeout(() => {
            setMessage('');
        }, 5000);
    };

    return (
        <div>
            {message && <Alert color="info">{message}</Alert>}
            <Form>
                <FormGroup>
                    <Label for="fileInput">Select files to upload and compress</Label>
                    <Input type="file" name="files" id="fileInput" multiple onChange={handleFileChange} innerRef={fileInputRef} />
                </FormGroup>
                {/* <FormGroup>
                    <Label for="formatSelect">Compression Format</Label>
                    <Input type="select" name="format" id="formatSelect" value={format} onChange={(e) => setFormat(e.target.value)}>
                        <option value="zip">ZIP</option>
                        <option value="tar">TAR</option>
                    </Input>
                </FormGroup> */}
                <FormGroup>
                    <Label for="compressedFileName">Compressed File Name (without extension)</Label>
                    <Input type="text" name="compressedFileName" id="compressedFileName" value={compressedFileName} onChange={(e) => setCompressedFileName(e.target.value)} placeholder="Enter compressed file name" />
                </FormGroup>
                <Button color="primary" onClick={handleUpload}>Upload and Compress</Button>
            </Form>
            <ListGroup className="mt-4">
                {Array.from(files).map((file, index) => (
                    <ListGroupItem key={index}>
                        <FontAwesomeIcon icon={faFile} className="mr-2" />
                        {file.name}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default Upload;

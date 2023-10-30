import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';

const Profile = ({ username }) => {
    const [files, setFiles] = useState([]);

    const fetchFiles = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/profile/files?username=${username}`);
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    }, [username]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const downloadFile = async (filename) => {
        try {
            // Encode the filename for the URL
            const encodedFilename = encodeURIComponent(filename);
            console.log(encodedFilename);
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/profile/files/${encodedFilename}?username=${username}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const deleteFile = async (filename) => {
        try {
            const encodedFilename = encodeURIComponent(filename); // Encode the filename here as well
            await axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/profile/files/${encodedFilename}?username=${username}`);
            fetchFiles();
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };
    return (
        <Container className="profile mt-5">
            <h2>Your Files</h2>
            <ListGroup>
                {files.map(file => (
                    <ListGroupItem key={file}>
                        <Row>
                            {/* Display only the actual file name by splitting and taking the last part */}
                            <Col md="7" className="my-auto">{file.split('/').pop()}</Col>
                            <Col md="5" className="d-flex justify-content-end">
                                <Button color="success" onClick={() => downloadFile(file)} className="mr-2">Download</Button>
                                <Button color="danger" onClick={() => deleteFile(file)}>Delete</Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Profile;

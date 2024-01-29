import React, { useEffect, useState, useRef } from "react";


import { Col, Row, Card, Form, Button, InputGroup, Container, Table,  Modal, Image, Dropdown } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const onF1Drop = (e) => {};
const [showF1Modal, setShowF1Modal] = useState(false);
const [showLargeF1, setShowLargeF1] = useState(false);
const [F1Base64, setF1Base64] = useState("");
const [F1FileName, setF1FileName] = useState("");


function F1_upload({onF1Drop, F1Base64, F1FileName, F1Type, step, handleDownload}) {
    return (
        <Col>                
            <Form className="mx-auto">
                <Form.Group id="fileUpload">
                <Form.Label>Upload F-1 Receipt</Form.Label>
                <Row>
                    <Col>
                    <Form.Control type="file" accept=".pdf, .jpg, .jpeg" onChange={onF1Drop} />
                    </Col>
                    {F1Base64 && 
                    <Col>
                        <Button variant="Danger" onClick={() => {setShowF1Modal(true); console.log("uploadedF1 is: ", F1Base64)}}>Options</Button>
                        <Modal show={showF1Modal} onHide={handleCloseF1Modal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{step === "Pending" ? "Download or View" : "F1 Settings"}</Modal.Title>
                        </Modal.Header>

                        <Modal.Footer>
                            <Dropdown>
                            <Dropdown.Toggle variant="Light" id="dropdown-basic">
                                Options
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {step === "Pending" && <Dropdown.Item onClick={() => handleDownload(F1Base64, F1FileName)}>Download</Dropdown.Item>}
                                <Dropdown.Item onClick={() => {setShowLargeF1(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>

                            <Modal show={showLargeF1} onHide={() => setShowLargeF1(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Large F1</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {F1Type === "application/pdf" && <div className="pdf-container">
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <Viewer fileUrl={F1Base64} plugins={[newPlugin]} />
                                </Worker>
                                </div>}
                                {F1Type === "image/jpeg" || F1Type === "image/jeg" && 
                                <img src={F1Base64} alt="Large F1" style={{ width: '100%', height: 'auto' }} 
                                />}
                            </Modal.Body>
                            <Modal.Footer/>
                            </Modal>
                        </Modal.Footer>
                        </Modal>
                    </Col>
                    }
                </Row>
                </Form.Group>
            </Form>
            </Col>
    )   
}

export default F1_upload;
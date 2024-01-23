import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import "./EmployeePersonalInformation.css";

import { Col, Row, Card, Form, Button, InputGroup, Container, Table,  Modal } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { CalendarIcon } from '@chakra-ui/icons'


function EmployeePersonalInformation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [SSN, setSSN] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [cellPhone, setCellPhone] = useState("");
  const [workPhone, setWorkPhone] = useState("");

  const [visaTitle, setVisaTitle] = useState("");
  const [visaStartDate, setVisaStartDate] = useState("");
  const [visaEndDate, setVisaEndDate] = useState("");

  const [emerFirstName, setEmerFirstName] = useState("");
  const [emerLastName, setEmerLastName] = useState("");
  const [emerMiddleName, setEmerMiddleName] = useState("");
  const [emerPhone, setEmerPhone] = useState("");
  const [emerEmail, setEmerEmail] = useState("");
  const [relationship, setRelationship] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const files = [
    { name: 'File1', extension: 'pdf', url: '../../assets/file1.pdf' },
    { name: 'File2', extension: 'jpg', url: '../../assets/file2.jpg' },
    { name: 'File3', extension: 'docx', url: '../../assets/file3.docx' },
  ];

  const handleDownload = (url) => {
    // 创建一个隐藏的<a>标签
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    // 设置<a>标签的href属性为文件的URL
    link.href = url;

    // 设置<a>标签的download属性为文件名（你可以根据需要修改文件名）
    link.download = 'downloaded_file';

    // 模拟点击<a>标签，触发下载
    link.click();

    // 移除<a>标签
    document.body.removeChild(link);

    console.log('Downloading file:', url);
  };

  const handlePreview = (url) => {
    setPreviewUrl(url);
    setShowPreview(true);
    // window.open(url, '_blank');
  };

  const closeModal = () => {
    setPreviewUrl('');
    setShowPreview(false);
  };


  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      // Check file extension
      const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'docx'];
      const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        // Process the uploaded file (you can upload it to the server or handle it as needed)
        console.log('Uploaded file:', uploadedFile);
        setUploadedFile(uploadedFile);
      } else {
        alert('Invalid file type. Allowed types: pdf, jpg, jpeg, docx');
      }
    }
  };

  // const handleEmailChange = (e) => {
  //   const inputValue = e.target.value;
  //   const isValidFormat = validateEmailFormat(inputValue);

  //   if (isValidFormat || inputValue === '') {
  //     setEmail(inputValue);
  //   } else {
  //     alert('Invalid email format');
  //   }
  // };

  // const validateEmailFormat = (value) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(value);
  // };

  // const handleSSNChange = (e) => {
  //   const inputValue = e.target.value;
  //   const isValidFormat = validateSSNFormat(inputValue);

  //   if (isValidFormat || inputValue === '') {
  //     setSSN(inputValue);
  //   } else {
  //     alert('Invalid SSN format');
  //   }
  // };

  // const validateSSNFormat = (value) => {
  //   const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  //   return ssnRegex.test(value);
  // };

  // const handleBirthDateChange = (e) => {
  //   const inputValue = e.target.value;
  //   const isValidFormat = validateDateFormat(inputValue);

  //   if (isValidFormat || inputValue === '') {
  //     // 如果符合格式或者是空字符串，则更新状态
  //     setBirthDate(inputValue);
  //   } else {
  //     alert('Invalid date format');
  //   }
  // };

  // const validateDateFormat = (value) => {
  //   const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  //   return dateRegex.test(value);
  // };

  return (
    <div className="all">
      <Container className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} md={6} xl={10}>
            {isEdit ? (<Row className="mt-4 mb-4">
              <Col>
                <Button variant="primary">
                  Save
                </Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => {setIsEdit(false)}}>
                  Cancel
                </Button>
              </Col>
            </Row>) : (
              <Row className="mt-4 mb-4">
              <Col>
                <Button variant="primary" onClick={() => {setIsEdit(true)}}>
                  Edit
                </Button>
              </Col>
            </Row>
            )}

            <Card className="bg-white shadow-sm mb-4" style={{ width : '80vw'}}>
              <Card.Body>
                <h5 className="my-4">General information</h5>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="first-name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control 
                        required 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="last-name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control 
                        required 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="middle-name">
                      <Form.Label>Middle Name (option)</Form.Label>
                      <Form.Control 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="preferred-name">
                      <Form.Label>Preferred Name (option)</Form.Label>
                      <Form.Control 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={preferredName}
                        onChange={(e) => setPreferredName(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>

                  <Col className="mb-3">
                    <Form.Group id="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select 
                        id="gender-select" 
                        disabled={!isEdit} 
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}
                        defaultValue={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                        <option value="not to disclose">Not to disclose</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3">
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        required 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="prefix@mail.suffix" />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="SSN">
                      <Form.Label>SSN</Form.Label>
                      <Form.Control 
                        required 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                        value={SSN}
                        onChange={(e) => setSSN(e.target.value)} 
                        placeholder="xxx-xx-xxxx" />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="birthday">
                      <Form.Label>Date of Birth</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><CalendarIcon /></InputGroup.Text>
                          <Form.Control 
                            required 
                            type="text"
                            readOnly={!isEdit}
                            style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)} 
                            placeholder="mm/dd/yyyy" />
                        </InputGroup>
                      </Form.Group>
                  </Col>
                </Row>

                <h5 className="my-4">Address</h5>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="street">
                      <Form.Label>Street</Form.Label>
                      <Form.Control 
                        required 
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="apt">
                      <Form.Label>Apt # (Option)</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={apt}
                        onChange={(e) => setApt(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3">
                    <Form.Group id="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control 
                        required 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>State</Form.Label>
                      <Form.Select 
                        id="state" 
                        defaultValue={state}
                        disabled={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="zipcode">
                      <Form.Label>Zipcode</Form.Label>
                      <Form.Control 
                        type="text"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="my-4">Contact Information</h5>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="cell-phone">
                      <Form.Label>Cell Phone</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={cellPhone}
                        onChange={(e) => setCellPhone(e.target.value)}
                        placeholder="xxx-xx-xxxx"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="work phone">
                      <Form.Label>Work Phone</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={workPhone}
                        onChange={(e) => setWorkPhone(e.target.value)}
                        placeholder="xxx-xx-xxxx" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                      />
                    </Form.Group>
                  </Col>
                </Row>


                <h5 className="my-4">Employment</h5>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="visa-title">
                      <Form.Label>Visa Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={visaTitle}
                        onChange={(e) => setVisaTitle(e.target.value)}
                        placeholder="H1-B, L2, F1(CPT/OPT), H4, Other"
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="start-date">
                      <Form.Label>Visa Start Date</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><CalendarIcon /></InputGroup.Text>
                          <Form.Control 
                            required 
                            type="text"
                            readOnly={!isEdit}
                            style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                            value={visaStartDate}
                            onChange={(e) => setVisaStartDate(e.target.value)} 
                            placeholder="mm/dd/yyyy" />
                        </InputGroup>
                      </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="end-date">
                      <Form.Label>Visa End Date</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><CalendarIcon /></InputGroup.Text>
                          <Form.Control 
                            required 
                            type="text"
                            readOnly={!isEdit}
                            style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }}  
                            value={visaEndDate}
                            onChange={(e) => setVisaEndDate(e.target.value)} 
                            placeholder="mm/dd/yyyy" />
                        </InputGroup>
                      </Form.Group>
                  </Col>
                </Row>


                <h5 className="my-4">Emergency Contact</h5>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="emer-first-name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={emerFirstName}
                        onChange={(e) => setEmerFirstName(e.target.value)}
                        placeholder="" 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="emer-last-name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={emerLastName}
                        onChange={(e) => setEmerLastName(e.target.value)}
                        placeholder="" 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="emer-last-name">
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={emerMiddleName}
                        onChange={(e) => setEmerMiddleName(e.target.value)}
                        placeholder="" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="emer-phone-number">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={emerPhone}
                        onChange={(e) => setEmerPhone(e.target.value)}
                        placeholder="xxx-xxx-xxxx" 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="emer-email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={emerEmail}
                        onChange={(e) => setEmerEmail(e.target.value)}
                        placeholder="prefix@mail.suffix" 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="emer-relationship">
                      <Form.Label>Relationship with whom</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={!isEdit}
                        style={{ backgroundColor: isEdit ? 'white' : '#f2f2f2' }} 
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        placeholder="Sibling, parent, spouse, etc." 
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Table className="bg-white shadow-sm mb-4" striped bordered hover style={{ width : '80vw'}}>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>File Extension</th>
                  <th>Download</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td>{file.extension}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleDownload(file.url)}>
                        Download
                      </Button>
                    </td>
                    <td>
                      {['pdf', 'jpg', 'jpeg', 'docx'].includes(file.extension) ? (
                        <Button variant="info" onClick={() => handlePreview(file.url)}>
                          Preview
                        </Button>
                      ) : (
                        <span>Not supported</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Form className="mt-4 mb-4 mx-auto" style={{width: '30vw', backgroundColor : 'lightblue'}}>
              <Form.Group controlId="fileUpload">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" accept=".pdf, .jpg, .jpeg, .docx" onChange={handleFileUpload} />
              </Form.Group>
            </Form>

            {/* Preview Modal */}
            <Modal show={showPreview} onHide={closeModal} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>File Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${require('pdfjs-dist/package.json').version}/build/pdf.worker.min.js`}>
                  <Viewer fileUrl="/path/to/preview.pdf" />
                </Worker> */}
                {['pdf', 'jpg', 'jpeg', 'docx'].includes(previewUrl.split('.').pop()) ? (
                  <iframe src={previewUrl} title="File Preview" width="100%" height="500px"></iframe>
                ) : (
                  <span>Not supported</span>
                )}
              </Modal.Body>
            </Modal>

          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default EmployeePersonalInformation;
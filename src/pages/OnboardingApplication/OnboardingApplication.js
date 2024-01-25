import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from 'react-dropzone';

import "./OnboardingApplication.css";

import { Col, Row, Card, Form, Button, InputGroup, Container, Table,  Modal, Image, Dropdown } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { CalendarIcon } from '@chakra-ui/icons';

function OnboardingApplication() {
  const [step, setStep] = useState("Pending");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDownload = () => {};


  const [showImageModal, setShowImageModal] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);

  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);
  
  const onImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setAvatarImage(URL.createObjectURL(file));
      handleCloseImageModal();
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image.');
    }
  };
  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ onImageDrop, accept: 'image/jpeg, image/jpg' });


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

  const [isCitizen, setIsCitizen] = useState("");
  const [title, setTitle] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [uploadedF1, setUploadedF1] = useState(null);

  const handleVisaUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      // Check file extension
      const allowedExtensions = ['pdf', 'jpg', 'jpeg'];
      const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        // Process the uploaded file (you can upload it to the server or handle it as needed)
        console.log('Uploaded file:', uploadedFile);
        setUploadedF1(uploadedFile);
      } else {
        alert('Invalid file type. Allowed types: pdf, jpg, jpeg');
      }
    }
  };

  const [refFirstName, setRefFirstName] = useState("");
  const [refLastName, setRefLastName] = useState("");
  const [refMiddleName, setRefMiddleName] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [refRelationship, setRefRelationship] = useState("");


  const [emergencies, setEmergencies] = useState([
    { firstName: '', lastName: '', middleName: '', phone: '', email: '', relationship: '' },
  ]);
  const addEmergencyBlock = () => {
    setEmergencies([...emergencies, { firstName: '', lastName: '', middleName: '', phone: '', email: '', relationship: '' }]);
  };
  const removeEmergencyBlock = (index) => {
    if (emergencies.length > 1) {
      const updatedEmergencies = [...emergencies];
      updatedEmergencies.splice(index, 1);
      setEmergencies(updatedEmergencies);
    }
  };

  const updateEmergencyFirstName = (index, newFirstName) => {
    setEmergencies(prevEmergencies => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        firstName: newFirstName,
      };
      return newEmergencies;
    });
  };

  const updateEmergencyLastName = (index, newLastName) => {
    setEmergencies(prevEmergencies => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        lastName: newLastName,
      };
      return newEmergencies;
    });
  };
  
  const updateEmergencyMiddleName = (index, newMiddleName) => {
    setEmergencies(prevEmergencies => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        middleName: newMiddleName,
      };
      return newEmergencies;
    });
  };
  
  const updateEmergencyPhone = (index, newPhone) => {
    setEmergencies(prevEmergencies => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        phone: newPhone,
      };
      return newEmergencies;
    });
  };
  
  const updateEmergencyEmail = (index, newEmail) => {
    setEmergencies(prevEmergencies => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        email: newEmail,
      };
      return newEmergencies;
    });
  };
  
  const updateEmergencyRelationship = (index, newRelationship) => {
    setEmergencies(prevEmergencies => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        relationship: newRelationship,
      };
      return newEmergencies;
    });
  };
  

  

  const [showDLModal, setShowDLModal] = useState(false);
  const [showLargeDL, setShowLargeDL] = useState(false);
  const [driverID, setDriverID] = useState(null);

  const handleShowDLModal = () => setShowDLModal(true);
  const handleCloseDLModal = () => setShowDLModal(false);
  const onDLDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf')) {
      if (file.type.startsWith('image/')) {
        setDriverID(URL.createObjectURL(file));
      } else if (file.type === 'application/pdf') {
        setDriverID('your_pdf_file_path');
      }
      handleCloseDLModal();
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image or PDF file.');
    }
  };
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDLDrop, accept: 'image/jpeg, image/jpg, application/pdf'});


  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLargeAuth, setShowLargeAuth] = useState(false);
  const [workAuth, setWorkAuth] = useState(null);

  const handleShowAuthModal = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);
  const onAuthDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf')) {
      if (file.type.startsWith('image/')) {
        setWorkAuth(URL.createObjectURL(file));
      } else if (file.type === 'application/pdf') {
        setWorkAuth('your_pdf_file_path');
      }
      handleCloseAuthModal();
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image or PDF file.');
    }
  };
  const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({ onAuthDrop, accept: 'image/jpeg, image/jpg, application/pdf'});

  const handleSubmit = () => {};



  return (
    <div className="all-onboarding-application">
      {step === "Rejected" && 
        <>
          <div className="custom-textbox-rejected" onClick={() => {setShowFeedback(true)}}>
            Your previous application was rejected. Please click here for the feedback and resubmit your application.
          </div>
          <Modal show={showFeedback} onHide={() => setShowFeedback(false)}>
            <Modal.Header closeButton>
              <Modal.Title>The feedback from HR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Feedback</h5>
            </Modal.Body>
            <Modal.Footer/>
          </Modal>
        </>
      }
      {step === "Pending"  && <div className="custom-textbox-pending">
        Your application has been submitted and is currently pending. You can download files by clicking those round gray areas.
      </div>}
      <h2 style={{textAlign: 'center', paddingTop: '10vh'}}>Onboarding Application Form</h2>
      <Container className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Row>
          <Col xs={12} md={6} xl={10}>
            <Card className="bg-white shadow-sm mb-4" style={{ width : '80vw'}}>
              <Card.Body>
                <Row>
                  <Col className="mb-3">
                    <h5 className="my-4">General information</h5>
                  </Col>
                  <Col className="mb-3">
                    <div>
                      <div className="avatar-container" onClick={handleShowImageModal}>
                        {avatarImage && <Image src={avatarImage} alt="Avatar" roundedCircle />}
                        {!avatarImage && <div className="avatar-placeholder">
                          {step === "Pending" ? "Avatar?" : "Upload Avatar"}
                        </div>}
                      </div>

                      <Modal show={showImageModal} onHide={handleCloseImageModal}>
                        <Modal.Header closeButton>
                          {step === "Pending" ? <Modal.Title>Download or View</Modal.Title> : <Modal.Title>Avatar Settings</Modal.Title>}
                        </Modal.Header>
                        {step !== "Pending" && <Modal.Body>
                          <div {...getRootProps1()} className="dropzone">
                            <input {...getInputProps1()} />
                            <p>Drop new image here, or click to select a file</p>
                          </div>
                        </Modal.Body>}
                        <Modal.Footer>
                          <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                              Options
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {step === "Pending" && <Dropdown.Item onClick={handleDownload}>Download</Dropdown.Item>}
                              <Dropdown.Item onClick={() => {setShowLargeImage(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Modal show={showLargeImage} onHide={() => setShowLargeImage(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Large Image</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={avatarImage} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
                            </Modal.Body>
                            <Modal.Footer/>
                          </Modal>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="first-name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control 
                        required 
                        type="text"
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        disabled={step === "Pending" ? true : false} 
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly="true"
                        style={{ backgroundColor: '#f2f2f2'}}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="apt">
                      <Form.Label>Building/Apt # (Option)</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        disabled={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }} 
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
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="my-4">Visa State</h5>
                <Row>
                  <Col className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>Visa State</Form.Label>
                      <Form.Select 
                        id="visa-state" 
                        defaultValue={""}
                        disabled={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        onChange={(e) => setIsCitizen(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {isCitizen === "yes" && <Col className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>Auth Type</Form.Label>
                      <Form.Select 
                        id="auth-type" 
                        defaultValue={"greenCard"}
                        disabled={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        onChange={(e) => setTitle(e.target.value)}
                      >
                        <option value="greenCard">Green Card</option>
                        <option value="citizen">Citizen</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  }
                  {isCitizen === "no" && <Col className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>Auth Type</Form.Label>
                      <Form.Select 
                        id="auth-type" 
                        defaultValue={"H1-B"}
                        disabled={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        onChange={(e) => setTitle(e.target.value)}
                      >
                        <option value="H1-B">H1-B</option>
                        <option value="L2">L2</option>
                        <option value="F1-CPT/OPT">F1-CPT/OPT</option>
                        <option value="H4">H4</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  }
                  {isCitizen === "no" && title === "Other" && <Col className="mb-3">
                    <Form.Group id="comment-title">
                      <Form.Label>Please specify visa title</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                      />
                    </Form.Group>
                  </Col>
                  }
                  {isCitizen === "no" && title === "F1-CPT/OPT" && <Col className="mb-3">
                  <Form className="mt-4 mx-auto">
                    <Form.Group controlId="fileUpload">
                      <Form.Control type="file" accept=".pdf, .jpg, .jpeg" onChange={handleVisaUpload} />
                    </Form.Group>
                  </Form>
                  </Col>}
                </Row>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="start-date">
                      <Form.Label>Visa Start Date</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><CalendarIcon /></InputGroup.Text>
                          <Form.Control 
                            required 
                            type="text"
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)} 
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
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)} 
                            placeholder="mm/dd/yyyy" />
                        </InputGroup>
                      </Form.Group>
                  </Col>
                </Row>

                <h5 className="my-4">Reference</h5>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="ref-first-name">
                      <Form.Label>Reference First Name</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refFirstName}
                        onChange={(e) => setRefFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="ref-last-name">
                      <Form.Label>Reference Last Name</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refLastName}
                        onChange={(e) => setRefLastName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="ref-middle-name">
                      <Form.Label>Reference Middle Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refMiddleName}
                        onChange={(e) => setRefMiddleName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="ref-phone-number">
                      <Form.Label>Reference Phone Number</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refPhone}
                        onChange={(e) => setRefPhone(e.target.value)}
                        placeholder="xxx-xxx-xxxx" 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="ref-email">
                      <Form.Label>Reference Email</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refEmail}
                        onChange={(e) => setRefEmail(e.target.value)}
                        placeholder="prefix@mail.suffix" 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="ref-relationship">
                      <Form.Label>Relationship</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refRelationship}
                        onChange={(e) => setRefRelationship(e.target.value)}
                        placeholder="Sibling, parent, spouse, etc." 
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="my-4">Emergency Contact</h5>
                {emergencies.map((emergency, index) => (
                  <div key={index}>
                    {index > 0 && <hr />}
                    <Row>
                      <Col className="mb-3">
                        <Form.Group id="ref-first-name">
                          <Form.Label>Emergency Contact {index + 1} First Name</Form.Label>
                          <Form.Control 
                            required
                            type="text" 
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={emergency.firstName}
                            onChange={(e) => updateEmergencyFirstName(index, e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="ref-last-name">
                          <Form.Label>Emergency Contact {index + 1} Last Name</Form.Label>
                          <Form.Control 
                            required
                            type="text" 
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={emergency.lastName}
                            onChange={(e) => updateEmergencyLastName(index, e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="ref-middle-name">
                          <Form.Label>Emergency Contact {index + 1} Middle Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={emergency.middleName}
                            onChange={(e) => updateEmergencyMiddleName(index, e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="mb-3">
                        <Form.Group id="ref-phone-number">
                          <Form.Label>Emergency Contact {index + 1} Phone Number</Form.Label>
                          <Form.Control 
                            required
                            type="text" 
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={emergency.phone}
                            onChange={(e) => updateEmergencyPhone(index, e.target.value)}
                            placeholder="xxx-xxx-xxxx" 
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="ref-email">
                          <Form.Label>Emergency Contact {index + 1} Email</Form.Label>
                          <Form.Control 
                            required
                            type="text" 
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={emergency.email}
                            onChange={(e) => updateEmergencyEmail(index, e.target.value)}
                            placeholder="prefix@mail.suffix" 
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="ref-relationship">
                          <Form.Label>Relationship</Form.Label>
                          <Form.Control 
                            type="text" 
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={emergency.relationship}
                            onChange={(e) => updateEmergencyRelationship(index, e.target.value)}
                            placeholder="Sibling, parent, spouse, etc." 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {index > 0 && <Button variant="danger" onClick={() => removeEmergencyBlock(index)} className="mb-3">
                      Remove Emergency Contact
                    </Button>}

                  </div>
                ))}
                <Button variant="primary" onClick={addEmergencyBlock} className="mt-3">
                  Add Emergency Contact
                </Button>

                <h5 className="my-4">Additional files(Optional)</h5>
                <Row>
                  <Col className="mb-3">
                    <div>
                      <div className="avatar-container" onClick={handleShowImageModal}>
                        {avatarImage && <Image src={avatarImage} alt="Avatar" roundedCircle />}
                        {!avatarImage && <div className="avatar-placeholder">
                          {step === "Pending" ? "Avatar?" : "Upload Avatar"}
                        </div>}
                      </div>

                      <Modal show={showImageModal} onHide={handleCloseImageModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>{step === "Pending" ? "Download or View" : "Upload Avatar"}</Modal.Title>
                        </Modal.Header>
                        {step !== "Pending" && <Modal.Body>
                          <div {...getRootProps1()} className="dropzone">
                            <input {...getInputProps1()} />
                            <p>Drop new image here, or click to select a file</p>
                          </div>
                        </Modal.Body>}
                        <Modal.Footer>
                          <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                              Options
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {step === "Pending" && <Dropdown.Item onClick={handleDownload}>Download</Dropdown.Item>}
                              <Dropdown.Item onClick={() => {setShowLargeImage(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          {/* <Button variant="secondary" onClick={handleCloseImageModal}>
                            Close
                          </Button> */}
                          <Modal show={showLargeImage} onHide={() => setShowLargeImage(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Large Image</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={avatarImage} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
                            </Modal.Body>
                            <Modal.Footer/>
                          </Modal>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Col>
                  <Col className="mb-3">
                    <div>
                      <div className="avatar-container" onClick={handleShowDLModal}>
                        {driverID && <Image src={driverID} alt="Avatar" roundedCircle />}
                        {!driverID && <div className="avatar-placeholder" style={{textAlign: 'center'}}>
                          {step === "Pending" ? "Driver License?" : "Upload Driver License"}
                        </div>}
                      </div>

                      <Modal show={showDLModal} onHide={handleCloseDLModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>{step === "Pending" ? "Download or View" : "Driver License Settings"}</Modal.Title>
                        </Modal.Header>
                        {step !== "Pending" && <Modal.Body>
                          <div {...getRootProps2()} className="dropzone">
                            <input {...getInputProps2()} />
                            <p>Drop new image here, or click to select a file</p>
                          </div>
                        </Modal.Body>}
                        <Modal.Footer>
                          <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                              Options
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {step === "Pending" && <Dropdown.Item onClick={handleDownload}>Download</Dropdown.Item>}
                              <Dropdown.Item onClick={() => {setShowLargeDL(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                            
                          </Dropdown>
                          <Modal show={showLargeDL} onHide={() => setShowLargeDL(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Large DL</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={driverID} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
                            </Modal.Body>
                            <Modal.Footer/>
                          </Modal>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Col>
                  <Col className="mb-3">
                    <div>
                      <div className="avatar-container" onClick={handleShowAuthModal}>
                        {workAuth && <Image src={workAuth} alt="Avatar" roundedCircle />}
                        {!workAuth && <div className="avatar-placeholder" style={{textAlign: 'center'}}>
                          {step === "Pending" ? "Work Authorization?" : "Upload Work Authorization"}
                        </div>}
                      </div>

                      <Modal show={showAuthModal} onHide={handleCloseAuthModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>{step === "Pending" ? "Download or View" : "Driver License Settings"}</Modal.Title>
                        </Modal.Header>
                        {step !== "Pending" && <Modal.Body>
                          <div {...getRootProps3()} className="dropzone">
                            <input {...getInputProps3()} />
                            <p>Drop new image here, or click to select a file</p>
                          </div>
                        </Modal.Body>}
                        <Modal.Footer>
                          <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                              Options
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {step === "Pending" && <Dropdown.Item onClick={handleDownload}>Download</Dropdown.Item>}
                              <Dropdown.Item onClick={() => {setShowLargeAuth(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Modal show={showLargeAuth} onHide={() => setShowLargeAuth(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Large Auth</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={workAuth} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
                            </Modal.Body>
                            <Modal.Footer/>
                          </Modal>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
            {(step === "Never" || step === "Rejected") && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '35vw'}}>
              <Button variant="primary" onClick={handleSubmit}>
                Submit Data
              </Button>
            </div>}
          </Col>
        </Row>
      </Container>
    </div>
    
  );
}

export default OnboardingApplication;
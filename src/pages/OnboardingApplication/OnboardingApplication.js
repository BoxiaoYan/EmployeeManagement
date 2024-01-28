import React, { useEffect, useState } from "react";

import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./OnboardingApplication.css";

import { Col, Row, Card, Form, Button, InputGroup, Container, Table,  Modal, Image, Dropdown } from 'react-bootstrap';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { CalendarIcon } from '@chakra-ui/icons';
import { set } from "mongoose";



function OnboardingApplication() {
  const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const [firstName, setFirstName] = useState(() => {
    const storedFirstName = localStorage.getItem("firstName");
    return storedFirstName !== null ? storedFirstName : "";
  });
  const [lastName, setLastName] = useState(() => {
    const storedLastName = localStorage.getItem("lastName");
    return storedLastName !== null ? storedLastName : "";
  });
  const [middleName, setMiddleName] = useState(() => {
    const storedMiddleName = localStorage.getItem("middleName");
    return storedMiddleName !== null ? storedMiddleName : "";
  });
  const [preferredName, setPreferredName] = useState(() => {
    const storedPreferredName = localStorage.getItem("preferredName");
    return storedPreferredName !== null ? storedPreferredName : "";
  });
  const [gender, setGender] = useState(() => {
    const storedGender = localStorage.getItem("gender");
    return storedGender !== null ? storedGender : "";
  });
  const [SSN, setSSN] = useState(() => {
    const storedSSN = localStorage.getItem("SSN");
    return storedSSN !== null ? storedSSN : "";
  });
  const [birthDate, setBirthDate] = useState(() => {
    const storedBirthDate = localStorage.getItem("birthDate");
    return storedBirthDate !== null ? Date.parse(storedBirthDate) : new Date(2000, 0, 1);
  });

  const [address, setAddress] = useState(() => {
    const storedAddress = localStorage.getItem("address");
    return storedAddress !== null ? storedAddress : "";
  });
  const [apt, setApt] = useState(() => {
    const storedApt = localStorage.getItem("apt");
    return storedApt !== null ? storedApt : "";
  });
  const [city, setCity] = useState(() => {
    const storedCity = localStorage.getItem("city");
    return storedCity !== null ? storedCity : "";
  });
  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem("state");
    return storedState !== null ? storedState : "";
  });
  const [zipCode, setZipCode] = useState(() => {
    const storedZipCode = localStorage.getItem("zipCode");
    return storedZipCode !== null ? storedZipCode : "";
  });


  const [cellPhone, setCellPhone] = useState(() => {
    const storedCellPhone = localStorage.getItem("cellPhone");
    return storedCellPhone !== null ? storedCellPhone : "";
  });
  const [workPhone, setWorkPhone] = useState(() => {
    const storedWorkPhone = localStorage.getItem("workPhone");
    return storedWorkPhone !== null ? storedWorkPhone : "";
  });


  const [isCitizen, setIsCitizen] = useState(() => {
    const storedIsCitizen = localStorage.getItem("isCitizen");
    return storedIsCitizen !== null ? storedIsCitizen : "";
  });
  const [title, setTitle] = useState(() => {
    const storedTitle = localStorage.getItem("title");
    return storedTitle !== null ? storedTitle : "";
  });
  const [finalVisa, setFinalVisa] = useState(() => {
    const storedFinalVisa = localStorage.getItem("finalVisa");
    return storedFinalVisa !== null ? storedFinalVisa : "";
  });
  const [startDate, setStartDate] = useState(() => {
    const storedStartDate = localStorage.getItem("startDate");
    return storedStartDate !== null ? Date.parse(storedStartDate) : new Date(2000, 0, 1);
  
  });
  const [endDate, setEndDate] = useState(() => {
    const storedEndDate = localStorage.getItem("endDate");
    return storedEndDate !== null ? Date.parse(storedEndDate) : new Date(2000, 0, 1);
  })


  const [refFirstName, setRefFirstName] = useState(() => {
    const storedRefFirstName = localStorage.getItem("refFirstName");
    return storedRefFirstName !== null ? storedRefFirstName : "";
  });
  const [refLastName, setRefLastName] = useState(() => {
    const storedRefLastName = localStorage.getItem("refLastName");
    return storedRefLastName !== null ? storedRefLastName : "";
  });
  const [refMiddleName, setRefMiddleName] = useState(() => {
    const storedRefMiddleName = localStorage.getItem("refMiddleName");
    return storedRefMiddleName !== null ? storedRefMiddleName : "";
  });
  const [refPhone, setRefPhone] = useState(() => {
    const storedRefPhone = localStorage.getItem("refPhone");
    return storedRefPhone !== null ? storedRefPhone : "";
  });
  const [refEmail, setRefEmail] = useState(() => {
    const storedRefEmail = localStorage.getItem("refEmail");
    return storedRefEmail !== null ? storedRefEmail : "";
  });
  const [refRelationship, setRefRelationship] = useState(() => {
    const storedRefRelationship = localStorage.getItem("refRelationship");
    return storedRefRelationship !== null ? storedRefRelationship : "";
  });


  const [emergencies, setEmergencies] = useState(() => {
    const storedEmergencies = localStorage.getItem("emergencies");
    return storedEmergencies !== null ? JSON.parse(storedEmergencies) : [{ firstName: '', lastName: '', middleName: '', phone: '', email: '', relationship: '' }];
  });


  const [showImageModal, setShowImageModal] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [avatarType, setAvatarType] = useState("");
  const [avatarFileName, setAvatarFileName] = useState("");

  const [showDLModal, setShowDLModal] = useState(false);
  const [showLargeDL, setShowLargeDL] = useState(false);
  const [driverID, setDriverID] = useState(null);
  const [DLBase64, setDLBase64] = useState("");
  const [DLType, setDLType] = useState("");
  const [DLFileName, setDLFileName] = useState("");

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLargeAuth, setShowLargeAuth] = useState(false);
  const [workAuth, setWorkAuth] = useState(null);
  const [authBase64, setAuthBase64] = useState("");
  const [authType, setAuthType] = useState("");
  const [authFileName, setAuthFileName] = useState("");

  const [uploadedF1, setUploadedF1] = useState();


  const user_status = useSelector((state) => state.user.appStatus);
  const user_email = useSelector((state) => state.user.email);
  const user_id = localStorage.getItem("userID");
  const user_token = localStorage.getItem("token");


  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);
  const onImageDrop = (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      if (file.size / 1024 / 1024 >= 3) {
        console.log('Image must smaller than 3MB!');
        alert('Image must smaller than 3MB!');
      } else {
        console.log(file);
        setAvatarImage(URL.createObjectURL(file));
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log('Base64:', reader.result);
          setAvatarBase64(reader.result);
          console.log('type:', file.type);
          setAvatarType(file.type);
          console.log('name:', file.name);
          setAvatarFileName(file.name);
        }
        reader.onerror = () => {
          console.log("Error:", reader.error);
        }
        reader.onabort = () => {
          console.log('file reading was aborted');
        }
        handleCloseImageModal();
        console.log('Uploaded file:', file);
      }
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image.');
    }
  };
  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ 
    onDrop: onImageDrop, 
    accept: 'image/jpeg, image/jpg, application/pdf',
    multiple: false,  
  });



  const handleShowDLModal = () => setShowDLModal(true);
  const handleCloseDLModal = () => setShowDLModal(false);
  const onDLDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      // setDriverID(URL.createObjectURL(file));
      // setDLURL(file);
      // console.log('Uploaded file:', DLURL, driverID);
      handleCloseDLModal();
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image');
    }
  };
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ 
    onDrop: onDLDrop, 
    accept: 'image/jpeg, image/jpg'
  });


  


  const handleShowAuthModal = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);
  const onAuthDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      // setWorkAuth(URL.createObjectURL(file));
      // setAuthURL(file);
      // console.log('Uploaded file:', authURL, workAuth);
      handleCloseAuthModal();
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image');
    }
  };
  const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({ 
    onDrop: onAuthDrop, 
    accept: 'image/jpeg, image/jpg'
  });



  const handleDownload = () => {

  }

  


  const handleVisaUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      // Check file extension
      const allowedExtensions = ['jpg', 'jpeg'];
      const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        // Process the uploaded file (you can upload it to the server or handle it as needed)
        console.log('Uploaded file:', uploadedFile);
        setUploadedF1(uploadedFile);
      } else {
        alert('Invalid file type. Allowed types: jpg, jpeg');
      }
    }
  };

  

 


  
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

  useEffect(() => {
    localStorage.setItem("emergencies", JSON.stringify(emergencies));
  }, [emergencies]);
  

  
  const checkBeforeSubmit = () => {
    if (firstName.trim() === "") {
      alert("Please enter your first name");
      return;
    } else if (lastName.trim() === "") {
      alert("Please enter your last name");
      return;
    } else if (gender === "") {
      alert("Please enter the gender");
      return;
    } else if (SSN.trim() === "" || /^\d{3}-\d{2}-\d{4}$/.test(SSN) === false){
      alert("Please enter your SSN in the correct format");
      return;
    } else if (zipCode.trim() === "" || /^\d{5}$/.test(zipCode) === false) {
      alert("Please enter your zipcode in the correct format");
      return;
    } else if (emergencies[0].relationship.trim() === "" || emergencies[1].relationship.trim() === "") {
      alert("Please enter the relationship of your emergency contacts");
      return;
    }
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(localStorage.getItem("email"));
    checkBeforeSubmit();

    console.log(typeof user_email);
    

    const formData = {
      user: user_id,
      name: {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        preferredName: preferredName,
      },
      picture: {
        data: avatarBase64,
        contentType: avatarType,
      },
      email: user_email,
      personalInfo: {
        ssn: SSN,
        birthday: birthDate,
        gender: gender
      },
      address: {
        street: address,
        apt: apt,
        city: city,
        state: state,
        zip: zipCode,
      },
      phone: {
        cellPhone: cellPhone,
        workPhone: workPhone,
      },
      employment: {
        visa: title === "Other" ? finalVisa : title,
        startDate: startDate,
        endDate: endDate,
      },
      reference: {
        firstName: refFirstName,
        lastName: refLastName,
        middleName: refMiddleName,
        phone: refPhone,
        email: refEmail,
        relationship: refRelationship,
      },
      emergencyContacts: emergencies,
      documents: [
        {
          data: DLBase64,
          contentType: DLType,
        },
        {
          data: authBase64,
          contentType: authType,
        },
      ]
    }



    try {
      const response = await axios.post(
        `http://localhost:8080/api/save_profile`, {user_id, formData},
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            Authorization: `${user_token}`,
          },
        }
      );
      if (response.data.status === 201) {
        console.log("Success in submitting the profile:", response.data.message);
        if (step === "UnSubmitted") {
          setStep("Pending");
        }
      } else if (response.data.status === 200) {
        console.log("The profile already exists. Updated.");
        if (step === "Rejected") {
          setStep("Pending");
        }
      } else {
        console.log("Fail in submitting the profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error for submitting the profile:", error.message);
    }
  };




  useEffect(() => {
    console.log("avatarImage is", avatarImage);
  }, [avatarImage]);

  useEffect(() => {
    setIsLoading(true);
    setStep(user_status);
    console.log("userStatus is", user_status);
    console.log("userEmail is", user_email);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/profile/${user_id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${user_token}`,
            },
          }
        );
        if (response.data.status === 200) {
          const profile = response.data.profile;

          setFirstName(profile.name.firstName);
          setLastName(profile.name.lastName);
          setMiddleName(profile.name.middleName);
          setPreferredName(profile.name.preferredName);
          setGender(profile.personalInfo.gender);
          setSSN(profile.personalInfo.ssn);
          setBirthDate(profile.personalInfo.birthday);

          setAddress(profile.address.street);
          setApt(profile.address.apt);
          setCity(profile.address.city);
          setState(profile.address.state);
          setZipCode(profile.address.zip);

          setCellPhone(profile.phone.cellPhone);
          setWorkPhone(profile.phone.workPhone);

          setIsCitizen(profile.employment.visa === "citizen" || profile.employment.visa === "greenCard" ? "Yes" : "No");
          setTitle(profile.employment.visa);
          setStartDate(profile.employment.startDate);
          setEndDate(profile.employment.endDate);

          setRefFirstName(profile.reference.firstName);
          setRefLastName(profile.reference.lastName);
          setRefMiddleName(profile.reference.middleName);
          setRefPhone(profile.reference.phone);
          setRefEmail(profile.reference.email);
          setRefRelationship(profile.reference.relationship);

          setEmergencies(profile.emergencyContacts);

          console.log("Setting done.")

        } else if (response.data.status === 201) {
          console.log("The profile does not exist", response.data.message);
        } else {
          console.log("???");
        }
      } catch (err) {
        console.error("Error fetching product", err.message);
      }
    }

    fetchProfile();

    setIsLoading(false);

  }, []);



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
                        onChange={(e) => {setFirstName(e.target.value); localStorage.setItem("firstName", e.target.value); console.log(e.target.value)}} />
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
                        onChange={(e) => {setLastName(e.target.value); localStorage.setItem("lastName", e.target.value); console.log(lastName)}} 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="middle-name">
                      <Form.Label>Middle Name (Optional)</Form.Label>
                      <Form.Control 
                        type="text"
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={middleName}
                        onChange={(e) => {setMiddleName(e.target.value); localStorage.setItem("middleName", e.target.value)}} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="preferred-name">
                      <Form.Label>Preferred Name (Optional)</Form.Label>
                      <Form.Control 
                        type="text"
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={preferredName}
                        onChange={(e) => {setPreferredName(e.target.value); localStorage.setItem("preferredName", e.target.value)}} 
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
                        onChange={(e) => {setGender(e.target.value); localStorage.setItem("gender", e.target.value); console.log(gender)}}
                      >
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                        <option value="not to disclose">I wish not to disclose</option>
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
                        readOnly={true}
                        style={{ backgroundColor: '#f2f2f2'}}
                        value={user_email} 
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
                        onChange={(e) => {setSSN(e.target.value); localStorage.setItem("SSN", e.target.value)}} 
                        placeholder="xxx-xx-xxxx" />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="birthday">
                      <Form.Label>Date of Birth</Form.Label>
                      <DatePicker
                        showIcon
                        selected={birthDate}
                        onChange={(date) => {setBirthDate(date); localStorage.setItem("birthDate", date); console.log(birthDate)}}
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        closeOnScroll={true}
                        monthsShown={2}
                      />
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
                        onChange={(e) => {setAddress(e.target.value); localStorage.setItem("address", e.target.value)}}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="apt">
                      <Form.Label>Building/Apt # (Optional)</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={apt}
                        onChange={(e) => {setApt(e.target.value); localStorage.setItem("apt", e.target.value)}}
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
                        onChange={(e) => {setCity(e.target.value); localStorage.setItem("city", e.target.value)}}
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
                        onChange={(e) => {setState(e.target.value); localStorage.setItem("state", e.target.value); console.log(state)}}
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
                        onChange={(e) => {setZipCode(e.target.value); localStorage.setItem("zipCode", e.target.value)}}
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
                        onChange={(e) => {setCellPhone(e.target.value); localStorage.setItem("cellPhone", e.target.value)}}
                        placeholder="xxx-xxx-xxxx"
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }} 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="work phone">
                      <Form.Label>Work Phone (Optional)</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={workPhone}
                        onChange={(e) => {setWorkPhone(e.target.value); localStorage.setItem("workPhone", e.target.value)}}
                        placeholder="xxx-xxx-xxxx" 
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
                      <Form.Label>Ciziten/PR?</Form.Label>
                      <Form.Select 
                        id="visa-state" 
                        defaultValue={isCitizen}
                        disabled={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        onChange={(e) => {setIsCitizen(e.target.value); localStorage.setItem("isCitizen", e.target.value); console.log(isCitizen)}}
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
                        onChange={(e) => {setTitle(e.target.value); localStorage.setItem("title", e.target.value); console.log(title)}}
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
                        onChange={(e) => {setTitle(e.target.value); localStorage.setItem("title", e.target.value); console.log(title)}}
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
                        value={finalVisa}
                        onChange={(e) => {setFinalVisa(e.target.value); console.log(finalVisa); localStorage.setItem("finalVisa", e.target.value)}}
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
                      <DatePicker
                        showIcon
                        selected={startDate}
                        onChange={(date) => {
                          if (date < endDate) {
                            setStartDate(date);
                            localStorage.setItem("startDate", date); 
                            console.log(date);
                          } else {
                            alert("Please select a date earlier than the end date");
                          }
                        }}
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        closeOnScroll={true}
                        monthsShown={2}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="end-date">
                      <Form.Label>Visa End Date</Form.Label>
                      <DatePicker
                        showIcon
                        selected={endDate}
                        onChange={(date) => {
                          if (date > startDate) {
                            setEndDate(date); 
                            localStorage.setItem("endDate", date);
                            console.log(date);
                          } else {
                            alert("Please select a date later than the start date");
                          }
                        }}
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        closeOnScroll={true}
                        monthsShown={2}
                      />
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
                        onChange={(e) => {setRefFirstName(e.target.value); localStorage.setItem("refFirstName", e.target.value)}}
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
                        onChange={(e) => {setRefLastName(e.target.value); localStorage.setItem("refLastName", e.target.value)}}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="ref-middle-name">
                      <Form.Label>Reference Middle Name (Optional)</Form.Label>
                      <Form.Control 
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refMiddleName}
                        onChange={(e) => {setRefMiddleName(e.target.value); localStorage.setItem("refMiddleName", e.target.value)}}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3">
                    <Form.Group id="ref-phone-number">
                      <Form.Label>Reference Phone Number (Optional)</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refPhone}
                        onChange={(e) => {setRefPhone(e.target.value); localStorage.setItem("refPhone", e.target.value)}}
                        placeholder="xxx-xxx-xxxx" 
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group id="ref-email">
                      <Form.Label>Reference Email (Optional)</Form.Label>
                      <Form.Control 
                        required
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={refEmail}
                        onChange={(e) => {setRefEmail(e.target.value); localStorage.setItem("refEmail", e.target.value)}}
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
                        onChange={(e) => {setRefRelationship(e.target.value); localStorage.setItem("refRelationship", e.target.value)}}
                        placeholder="Supervisor, colleague, etc." 
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
                          <Form.Label>First Name {index + 1}</Form.Label>
                          <Form.Control 
                            required
                            type="text" 
                            readOnly={step === "Pending" ? true : false}
                            style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                            value={emergency.firstName}
                            onChange={(e) => {updateEmergencyFirstName(index, e.target.value); console.log(emergencies[index].firstName)}}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="ref-last-name">
                          <Form.Label>Last Name {index + 1}</Form.Label>
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
                          <Form.Label>Middle Name {index + 1} (Optional)</Form.Label>
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
                          <Form.Label>Phone Number {index + 1} (Optional)</Form.Label>
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
                          <Form.Label>Email {index + 1} (Optional)</Form.Label>
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
                    {index > 0 && <Button variant="danger" onClick={() => {removeEmergencyBlock(index); console.log(emergencies)}} className="mb-3">
                      Remove Emergency Contact
                    </Button>}

                  </div>
                ))}
                <Button variant="primary" onClick={addEmergencyBlock} className="mt-3">
                  Add Emergency Contact
                </Button>

                <hr/>

                <h4 className="my-4">Additional files(Optional)</h4>
                <Row>
                  
                </Row>

              </Card.Body>
            </Card>
            {(step === "UnSubmitted" || step === "Rejected") && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '35vw'}}>
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
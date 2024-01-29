import React, { useEffect, useState, useRef } from "react";

import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DatePicker from "react-datepicker";

import { logOutUser } from "../../app/userSlice";

import "react-datepicker/dist/react-datepicker.css";

import "./OnboardingApplication.css";

import { Col, Row, Card, Form, Button, InputGroup, Container, Table,  Modal, Image, Dropdown } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { CalendarIcon } from '@chakra-ui/icons';
import { now, set } from "mongoose";



function OnboardingApplication() {
  const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

  const [isLoading, setIsLoading] = useState(false);
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
  const [avatarBase64, setAvatarBase64] = useState("");
  const [avatarType, setAvatarType] = useState("");
  const [avatarFileName, setAvatarFileName] = useState("");

  const [showDLModal, setShowDLModal] = useState(false);
  const [showLargeDL, setShowLargeDL] = useState(false);
  const [DLBase64, setDLBase64] = useState("");
  const [DLType, setDLType] = useState("");
  const [DLFileName, setDLFileName] = useState("");

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLargeAuth, setShowLargeAuth] = useState(false);
  const [authBase64, setAuthBase64] = useState("");
  const [authType, setAuthType] = useState("");
  const [authFileName, setAuthFileName] = useState("");

  const [showF1Modal, setShowF1Modal] = useState(false);
  const [showLargeF1, setShowLargeF1] = useState(false);
  const [F1Base64, setF1Base64] = useState("");
  const [F1Type, setF1Type] = useState("");
  const [F1FileName, setF1FileName] = useState("");

  const [step, setStep] = useState("UnSubmitted");


  const user_email = useSelector((state) => state.user.email);
  const user_id = useSelector((state) => state.user.user.id);
  const user_token = localStorage.getItem("token");
  const user_position = localStorage.getItem("position");

  const navigate = useNavigate();
  const dispatch = useDispatch();












  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);
  const onImageDrop = (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf')) {
      if (file.size / 1024 / 1024 >= 3) {
        console.log('Image must smaller than 3MB!');
        alert('Image must smaller than 3MB!');
      } else {
        console.log(file);
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
      alert('Invalid file format. Please upload a JPG/JPEG image or pdf.');
    }
  };
  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ 
    onDrop: onImageDrop, 
    accept: 'image/jpeg, image/jpg, application/pdf',
    multiple: false, 
    maxSize: 3 * 1024 * 1024,  
  });



  const handleShowDLModal = () => setShowDLModal(true);
  const handleCloseDLModal = () => setShowDLModal(false);
  const onDLDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf')) {
      if (file.size / 1024 / 1024 >= 3) {
        console.log('Image must smaller than 3MB!');
        alert('Image must smaller than 3MB!');
      } else {
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log('Base64:', reader.result);
          setDLBase64(reader.result);
          console.log('type:', file.type);
          setDLType(file.type);
          console.log('name:', file.name);
          setDLFileName(file.name);
        }
        reader.onerror = () => {
          console.log("Error:", reader.error);
        }
        reader.onabort = () => {
          console.log('file reading was aborted');
        }
        handleCloseDLModal();
        console.log('Uploaded file:', file);
      }
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image or pdf.');
    }
  };
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ 
    onDrop: onDLDrop, 
    accept: 'image/jpeg, image/jpg, application/pdf',
    multiple: false,  
    maxSize: 3 * 1024 * 1024, 
  });


  


  const handleShowAuthModal = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);
  const onAuthDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf')) {
      if (file.size / 1024 / 1024 >= 3) {
        console.log('Image must smaller than 3MB!');
        alert('Image must smaller than 3MB!');
      } else {
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log('Base64:', reader.result);
          setAuthBase64(reader.result);
          console.log('type:', file.type);
          setAuthType(file.type);
          console.log('name:', file.name);
          setAuthFileName(file.name);
        }
        reader.onerror = () => {
          console.log("Error:", reader.error);
        }
        reader.onabort = () => {
          console.log('file reading was aborted');
        }
        handleCloseAuthModal();
        console.log('Uploaded file:', file);
        }
    } else {
      alert('Invalid file format. Please upload a JPG/JPEG image or pdf.');
    }
  }
  const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({ 
    onDrop: onAuthDrop, 
    accept: 'image/jpeg, image/jpg, application/pdf',
    multiple: false, 
    maxSize: 3 * 1024 * 1024,  
  });



  const handleShowF1Modal = () => setShowF1Modal(true);
  const handleCloseF1Modal = () => setShowF1Modal(false);
  const onF1Drop = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.size / 1024 / 1024 >= 3) {
      console.log('Image must smaller than 3MB!');
      alert('Image must smaller than 3MB!');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log('Base64:', reader.result);
        setF1Base64(reader.result);
        console.log('type:', file.type);
        setF1Type(file.type);
        console.log('name:', file.name);
        setF1FileName(file.name);    
      }
      reader.onerror = () => {
        console.log("Error:", reader.error);
      }
      reader.onabort = () => {
        console.log('file reading was aborted');
      }
      console.log('Uploaded file:', file);
    }
  }


  const newPlugin = defaultLayoutPlugin();
  const handleDownload = (base64_url, fileName) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = base64_url;
    downloadLink.download = fileName;

    // 触发点击事件
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 移除下载链接
    document.body.removeChild(downloadLink);
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
    }

    emergencies.forEach((emergency, index) => {
      if (emergency.firstName.trim() === "") {
        alert(`Please enter the first name of the emergency contact ${index + 1}`);
        return;
      } else if (emergency.lastName.trim() === "") {
        alert(`Please enter the last name of the emergency contact ${index + 1}`);
        return;
      } else if (emergency.relationship.trim() === "") {
        alert(`Please enter the relationship of the emergency contact ${index + 1}`);
        return;
      }
    });
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(localStorage.getItem("email"));
    checkBeforeSubmit();

    console.log(typeof user_email);
    console.log(refEmail);
    console.log(emergencies[0].email);
    console.log(emergencies[1].email);
    

    const profile = {
      name: {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        preferredName: preferredName,
      },
      picture: {
        data: avatarBase64,
        contentType: avatarType,
        fileName: avatarFileName,
      },
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
      email: user_email,
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
          fileName: DLFileName,
        },
        {
          data: authBase64,
          contentType: authType,
          fileName: authFileName,
        },
        {
          data: F1Base64,
          contentType: F1Type,
          fileName: F1FileName,
        }
      ]
    }



    try {
      const response = await axios.post(
        `http://localhost:8080/api/save_profile`, {profile},
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            Authorization: `Bearer ${user_token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Success in submitting the profile:", response.data.message);
        localStorage.setItem("userStatus", response.data.newStatus);
        setStep(response.data.newStatus);
        alert("Your application has been submitted successfully!");
      } else if (response.status === 200) {
        console.log("Success in updating the profile:", response.data.message);
        localStorage.setItem("userStatus", response.data.newStatus);
        setStep(response.data.newStatus);
        alert("Your application was updated successfully!");
      } else {
        console.log("Fail in submitting the profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error for submitting the profile:", error.message);
    }
  };


  useEffect(() => {
    if (step === "Finished") {
      if (user_position === "hr") { 
        navigate("/hr-profile");
      } else {
        navigate("/personal-profile");
      }
    }

    setIsLoading(true);

    console.log("user_id is", user_id);

    const now_status = localStorage.getItem("appStatus");
    setStep(now_status);
    console.log("now_status is: ", now_status);

    console.log("userStatus is", now_status);
    console.log("userEmail is", user_email);
    console.log("refemail is", refEmail);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/profile/${user_id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user_token}`,
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
          setBirthDate(new Date(profile.personalInfo.birthday));

          setAddress(profile.address.street);
          setApt(profile.address.apt);
          setCity(profile.address.city);
          setState(profile.address.state);
          setZipCode(profile.address.zip);

          setCellPhone(profile.phone.cellPhone);
          setWorkPhone(profile.phone.workPhone);

          setIsCitizen(profile.employment.visa === "citizen" || profile.employment.visa === "greenCard" ? "Yes" : "No");
          setTitle(profile.employment.visa);
          setStartDate(new Date(profile.employment.startDate));
          setEndDate(new Date(profile.employment.endDate));

          setRefFirstName(profile.reference.firstName);
          setRefLastName(profile.reference.lastName);
          setRefMiddleName(profile.reference.middleName);
          setRefPhone(profile.reference.phone);
          setRefEmail(profile.reference.email);
          setRefRelationship(profile.reference.relationship);

          setEmergencies(profile.emergencyContacts);


          setAvatarBase64(profile.picture.data);
          setAvatarType(profile.picture.contentType);
          setAvatarFileName(profile.picture.fileName);

          setDLBase64(profile.documents[0].data);
          setDLType(profile.documents[0].contentType);
          setDLFileName(profile.documents[0].fileName);

          setAuthBase64(profile.documents[1].data);
          setAuthType(profile.documents[1].contentType);
          setAuthFileName(profile.documents[1].fileName);

          setF1Base64(profile.documents[2].data);
          setF1Type(profile.documents[2].contentType);
          setF1FileName(profile.documents[2].fileName);



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

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/signin");
  }



  return (
    <div className="all-onboarding-application">
      <Button onClick={handleLogOut}>Log out</Button>
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
        This application has been submitted and is currently pending. You can download files by clicking those round image areas.
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
                        {avatarBase64 && <Image src={avatarBase64} alt="Avatar" roundedCircle />}
                        {!avatarBase64 && <div className="avatar-placeholder">
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
                              {step === "Pending" && <Dropdown.Item onClick={() => handleDownload(avatarBase64, avatarFileName)}>Download</Dropdown.Item>}
                              <Dropdown.Item onClick={() => {setShowLargeImage(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Modal show={showLargeImage} onHide={() => setShowLargeImage(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Large Image</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={avatarBase64} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
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
                      {step !== "Pending" && <Form.Select 
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
                      </Form.Select>}

                      {step === "Pending" && <Form.Control 
                        required 
                        type="text"
                        readOnly={true}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={gender}
                      />}
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
                      {step !== "Pending" && <Form.Select 
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
                      </Form.Select>}
                      {step === "Pending" && '#f2f2f2' && <Form.Control 
                        required 
                        type="text" 
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                        value={state}
                      />}
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

                <h5 className="my-4">Visa Status</h5>
                <Row>
                  <Col className="mb-3">
                    {step !== "Pending" && <Form.Group className="mb-2">
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
                    </Form.Group>}
                    {step === "Pending" && <Form.Group className="mb-2">
                      <Form.Label>Visa status</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={title}
                        readOnly={step === "Pending" ? true : false}
                        style={{ backgroundColor: step === "Pending" ? '#f2f2f2' : 'white' }}
                      />
                    </Form.Group>}
                  </Col>
                  {step !== "Pending" && isCitizen === "yes" && <Col className="mb-3">
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
                  {step !== "Pending" && isCitizen === "no" && <Col className="mb-3">
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
                  {step !== "Pending" && isCitizen === "no" && title === "Other" && <Col className="mb-3">
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
                  {step !== "Pending" && isCitizen === "no" && title === "F1-CPT/OPT" && 
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
                  }
                  {step === "Pending" && title === "F1-CPT/OPT" && <Col>                
                    <Form className="mx-auto">
                      <Form.Group id="fileUpload">
                        <Form.Label>F-1 Receipt</Form.Label>
                        <Row>
                            <Col>
                              <Button variant="Danger" onClick={() => {setShowF1Modal(true); console.log("uploadedF1 is: ", F1Base64)}}>Download or View</Button>
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
                        </Row>
                      </Form.Group>
                    </Form>
                  </Col>
                  }
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
                    {step !== "Pending" && index > 0 && <Button variant="danger" onClick={() => {removeEmergencyBlock(index); console.log(emergencies)}} className="mb-3">
                      Remove Emergency Contact
                    </Button>}

                  </div>
                ))}
                {step !== "Pending" && <Button variant="primary" onClick={addEmergencyBlock} className="mt-3">
                  Add Emergency Contact
                </Button>}

                <hr/>

                <h4 className="my-4">Additional files(Optional)</h4>
                <Row>
                  <Col className="mb-3">
                    <div>
                      <div className="avatar-container" onClick={handleShowImageModal}>
                        {avatarBase64 && <Image src={avatarBase64} alt="Avatar" roundedCircle />}
                        {!avatarBase64 && <div className="avatar-placeholder">
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
                              {step === "Pending" && <Dropdown.Item onClick={() => handleDownload(avatarBase64, avatarFileName)}>Download</Dropdown.Item>}
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
                              <img src={avatarBase64} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
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
                        {DLBase64 && <Image src={DLBase64} alt="Avatar" roundedCircle />}
                        {!DLBase64 && <div className="avatar-placeholder" style={{textAlign: 'center'}}>
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
                              {step === "Pending" && <Dropdown.Item onClick={() => handleDownload(DLBase64, DLFileName)}>Download</Dropdown.Item>}
                              <Dropdown.Item onClick={() => {setShowLargeDL(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                            
                          </Dropdown>
                          <Modal show={showLargeDL} onHide={() => setShowLargeDL(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Large DL</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={DLBase64} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
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
                        {authBase64 && <Image src={authBase64} alt="Avatar" roundedCircle />}
                        {!authBase64 && <div className="avatar-placeholder" style={{textAlign: 'center'}}>
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
                              {step === "Pending" && <Dropdown.Item onClick={() => handleDownload(authBase64, authFileName)}>Download</Dropdown.Item>}
                              <Dropdown.Item onClick={() => {setShowLargeAuth(true)}}>View Large Image</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Modal show={showLargeAuth} onHide={() => setShowLargeAuth(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Large Auth</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={authBase64} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
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
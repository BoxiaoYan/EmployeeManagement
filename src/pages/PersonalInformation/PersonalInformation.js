import React, { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";

import axios from "axios";
import Navbar from "../../components/Navbar";

import "./PersonalInformation.css";

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  Container,
  Table,
  Modal,
  Image,
  Dropdown,
} from "react-bootstrap";
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PersonalInformation() {
  const [isLoading, setIsLoading] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [showBigImage, setShowBigImage] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [avatarType, setAvatarType] = useState("");
  const [avatarFileName, setAvatarFileName] = useState("");

  const [showDLImage, setShowDLImage] = useState(false);
  const [DLBase64, setDLBase64] = useState("");
  const [DLType, setDLType] = useState("");
  const [DLFileName, setDLFileName] = useState("");

  const [showAuthImage, setShowAuthImage] = useState(false);
  const [authBase64, setAuthBase64] = useState("");
  const [authType, setAuthType] = useState("");
  const [authFileName, setAuthFileName] = useState("");

  const [F1Base64, setF1Base64] = useState("");
  const [F1Type, setF1Type] = useState("");
  const [F1FileName, setF1FileName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [SSN, setSSN] = useState("");
  const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));

  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [cellPhone, setCellPhone] = useState("");
  const [workPhone, setWorkPhone] = useState("");

  const [visaTitle, setVisaTitle] = useState("");
  const [visaStartDate, setVisaStartDate] = useState(new Date(2000, 0, 1));
  const [visaEndDate, setVisaEndDate] = useState(new Date(2000, 0, 1));

  const [refFirstName, setRefFirstName] = useState("");
  const [refLastName, setRefLastName] = useState("");
  const [refMiddleName, setRefMiddleName] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [refRelationship, setRefRelationship] = useState("");

  const [emergencies, setEmergencies] = useState([
    {
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      email: "",
      relationship: "",
    },
  ]);

  const [isEdit, setIsEdit] = useState(false);

  const user_token = localStorage.getItem("token");
  const is_not_hr = localStorage.getItem("position") !== "hr";
  const user_email = localStorage.getItem("email");

  const { employee_id } = useParams();

  const addEmergencyBlock = () => {
    setEmergencies([
      ...emergencies,
      {
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        email: "",
        relationship: "",
      },
    ]);
  };
  const removeEmergencyBlock = (index) => {
    if (emergencies.length > 1) {
      const updatedEmergencies = [...emergencies];
      updatedEmergencies.splice(index, 1);
      setEmergencies(updatedEmergencies);
    }
  };

  const updateEmergencyFirstName = (index, newFirstName) => {
    setEmergencies((prevEmergencies) => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        firstName: newFirstName,
      };
      return newEmergencies;
    });
  };

  const updateEmergencyLastName = (index, newLastName) => {
    setEmergencies((prevEmergencies) => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        lastName: newLastName,
      };
      return newEmergencies;
    });
  };

  const updateEmergencyMiddleName = (index, newMiddleName) => {
    setEmergencies((prevEmergencies) => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        middleName: newMiddleName,
      };
      return newEmergencies;
    });
  };

  const updateEmergencyPhone = (index, newPhone) => {
    setEmergencies((prevEmergencies) => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        phone: newPhone,
      };
      return newEmergencies;
    });
  };

  const updateEmergencyEmail = (index, newEmail) => {
    setEmergencies((prevEmergencies) => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        email: newEmail,
      };
      return newEmergencies;
    });
  };

  const updateEmergencyRelationship = (index, newRelationship) => {
    setEmergencies((prevEmergencies) => {
      const newEmergencies = [...prevEmergencies];
      newEmergencies[index] = {
        ...newEmergencies[index],
        relationship: newRelationship,
      };
      return newEmergencies;
    });
  };

  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);

  const onImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      if (file.size / 1024 / 1024 >= 3) {
        console.log("Image must smaller than 3MB!");
        alert("Image must smaller than 3MB!");
      } else {
        console.log("Preloaded file: ", file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log("Base64:", reader.result);
          setAvatarBase64(reader.result);
          console.log("type:", file.type);
          setAvatarType(file.type);
          console.log("name:", file.name);
          setAvatarFileName(file.name);
        };
        reader.onerror = () => {
          console.log("Error:", reader.error);
        };
        reader.onabort = () => {
          console.log("file reading was aborted");
        };
        handleCloseImageModal();
        console.log("Uploaded file:", file);
      }
    } else {
      alert("Invalid file format. Please upload a JPG/JPEG image.");
    }
  };

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } =
    useDropzone({
      onDrop: onImageDrop,
      accept: "image/jpeg, image/jpg",
      multiple: false,
      maxSize: 3 * 1024 * 1024,
    });

  const handleDownload = (url, fileName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    // 触发点击事件
    document.body.appendChild(downloadLink);
    downloadLink.click();
    // 移除下载链接
    document.body.removeChild(downloadLink);
    console.log("Downloading file:", url);
  };

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
    } else if (SSN.trim() === "" || /^\d{3}-\d{2}-\d{4}$/.test(SSN) === false) {
      alert("Please enter your SSN in the correct format");
      return;
    } else if (zipCode.trim() === "" || /^\d{5}$/.test(zipCode) === false) {
      alert("Please enter your zipcode in the correct format");
      return;
    }

    emergencies.forEach((emergency, index) => {
      if (emergency.firstName.trim() === "") {
        alert(
          `Please enter the first name of the emergency contact ${index + 1}`
        );
        return;
      } else if (emergency.lastName.trim() === "") {
        alert(
          `Please enter the last name of the emergency contact ${index + 1}`
        );
        return;
      } else if (emergency.relationship.trim() === "") {
        alert(
          `Please enter the relationship of the emergency contact ${index + 1}`
        );
        return;
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    checkBeforeSubmit();

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
      email: user_email,
      personalInfo: {
        ssn: SSN,
        birthday: birthDate,
        gender: gender,
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
        visa: visaTitle,
        startDate: visaStartDate,
        endDate: visaEndDate,
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
        },
      ],
      appStatus: "Approved",
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/save_profile`,
        { profile },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user_token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(
          "Success in submitting the profile:",
          response.data.message
        );
        alert("Your profile has been saved successfully!");
      } else {
        console.log("Fail in submitting the profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error for submitting the profile:", error.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/profile/${employee_id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // ????????????????
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

        setVisaTitle(profile.employment.visa);
        setVisaStartDate(new Date(profile.employment.startDate));
        setVisaEndDate(new Date(profile.employment.endDate));

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

        console.log("Setting done.");
      } else if (response.data.status === 201) {
        console.log("The profile does not exist", response.data.message);
      } else {
        console.log("???");
      }
    } catch (err) {
      console.error("Error fetching product", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    console.log("employee_id is", employee_id);

    fetchProfile();
  }, []);

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
    <div className="all-personal-profile">
      {isLoading ? (
        <h2>The Page is Loading...</h2>
      ) : (
        <div className="not-loading-personal-profile">
          <Container className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <Row>
              <Col xs={12} md={6} xl={10}>
                {is_not_hr &&
                  (isEdit ? (
                    <Row className="mt-4 mb-4">
                      <Col>
                        <Button variant="primary" onClick={handleSave}>
                          Save
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => {
                            fetchProfile();
                            setIsEdit(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="mt-4 mb-4">
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => setIsEdit(true)}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  ))}

                <Card
                  className="bg-white shadow-sm mb-4"
                  style={{ width: "80vw" }}
                >
                  <Card.Body>
                    <Row>
                      <Col className="mb-3">
                        <h5 className="my-4">
                          Personal Information Page: General information
                        </h5>
                      </Col>
                      <Col className="mb-3">
                        <div>
                          <div
                            className="avatar-container"
                            onClick={handleShowImageModal}
                          >
                            {avatarBase64 && (
                              <Image
                                src={avatarBase64}
                                alt="Avatar"
                                roundedCircle
                              />
                            )}
                            {!avatarBase64 && (
                              <div className="avatar-placeholder">
                                Upload Avatar
                              </div>
                            )}
                          </div>

                          <Modal
                            show={showImageModal}
                            onHide={handleCloseImageModal}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Avatar Settings</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {is_not_hr && isEdit && (
                                <div {...getRootProps1()} className="dropzone">
                                  <input {...getInputProps1()} />
                                  <p>
                                    Drop new image here, or click to select a
                                    file
                                  </p>
                                </div>
                              )}
                            </Modal.Body>
                            <Modal.Footer>
                              {DLBase64 && (
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="primary"
                                    id="dropdown-basic"
                                  >
                                    Options
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => setShowBigImage(true)}
                                    >
                                      View Large Image
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() =>
                                        handleDownload(
                                          avatarBase64,
                                          avatarFileName
                                        )
                                      }
                                    >
                                      Download
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              )}
                              <Button
                                variant="secondary"
                                onClick={handleCloseImageModal}
                              >
                                Close
                              </Button>
                              <Modal
                                show={showBigImage}
                                onHide={() => setShowBigImage(false)}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Large Image</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <img
                                    src={avatarBase64}
                                    alt="Large Image"
                                    style={{ width: "100%", height: "auto" }}
                                  />
                                </Modal.Body>
                                <Modal.Footer />
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="last-name">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            style={{
                              backgroundColor: isEdit ? "white" : "#f2f2f2",
                            }}
                            value={preferredName}
                            onChange={(e) => setPreferredName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col className="mb-3">
                        {is_not_hr && isEdit ? (
                          <Form.Group id="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                              id="gender-select"
                              disabled={!(is_not_hr && isEdit)}
                              style={{
                                backgroundColor:
                                  is_not_hr && isEdit ? "white" : "#f2f2f2",
                              }}
                              defaultValue={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value=""></option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="transgender">Transgender</option>
                              <option value="non-binary">Non-binary</option>
                              <option value="other">Other</option>
                              <option value="I wish not to disclose">
                                I wish not to disclose
                              </option>
                            </Form.Select>
                          </Form.Group>
                        ) : (
                          <Form.Group id="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                              type="text"
                              readOnly={true}
                              style={{ backgroundColor: "#f2f2f2" }}
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            />
                          </Form.Group>
                        )}
                      </Col>
                    </Row>

                    <Row>
                      <Col className="mb-3">
                        <Form.Group id="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="prefix@mail.suffix"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="SSN">
                          <Form.Label>SSN</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
                            value={SSN}
                            onChange={(e) => setSSN(e.target.value)}
                            placeholder="xxx-xx-xxxx"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="birthday">
                          <Form.Label>Date of Birth</Form.Label>
                          <DatePicker
                            showIcon
                            selected={birthDate}
                            onChange={(date) => {
                              setBirthDate(date);
                              console.log(birthDate);
                            }}
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group className="mb-2">
                          <Form.Label>State</Form.Label>
                          {is_not_hr && isEdit ? (
                            <Form.Select
                              id="state"
                              defaultValue={state}
                              disabled={!(is_not_hr && isEdit)}
                              style={{
                                backgroundColor:
                                  is_not_hr && isEdit ? "white" : "#f2f2f2",
                              }}
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
                          ) : (
                            <Form.Control
                              type="text"
                              readOnly={true}
                              style={{ backgroundColor: "#f2f2f2" }}
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          )}
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="zipcode">
                          <Form.Label>Zipcode</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3">
                        <Form.Group id="start-date">
                          <Form.Label>Visa Start Date</Form.Label>
                          <DatePicker
                            showIcon
                            selected={visaStartDate}
                            onChange={(date) => {
                              if (date <= visaEndDate) {
                                setVisaStartDate(date);
                              } else {
                                alert(
                                  "Please select a date earlier than the end date"
                                );
                              }
                            }}
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
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
                            selected={visaEndDate}
                            onChange={(date) => {
                              if (date >= visaStartDate) {
                                setVisaEndDate(date);
                              } else {
                                alert(
                                  "Please select a date later than the start date"
                                );
                              }
                            }}
                            readOnly={!(is_not_hr && isEdit)}
                            style={{
                              backgroundColor:
                                is_not_hr && isEdit ? "white" : "#f2f2f2",
                            }}
                            closeOnScroll={true}
                            monthsShown={2}
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
                                readOnly={!(is_not_hr && isEdit)}
                                style={{
                                  backgroundColor:
                                    is_not_hr && isEdit ? "white" : "#f2f2f2",
                                }}
                                value={emergency.firstName}
                                onChange={(e) => {
                                  updateEmergencyFirstName(
                                    index,
                                    e.target.value
                                  );
                                  console.log(emergencies[index].firstName);
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col className="mb-3">
                            <Form.Group id="ref-last-name">
                              <Form.Label>Last Name {index + 1}</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                readOnly={!(is_not_hr && isEdit)}
                                style={{
                                  backgroundColor:
                                    is_not_hr && isEdit ? "white" : "#f2f2f2",
                                }}
                                value={emergency.lastName}
                                onChange={(e) =>
                                  updateEmergencyLastName(index, e.target.value)
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col className="mb-3">
                            <Form.Group id="ref-middle-name">
                              <Form.Label>
                                Middle Name {index + 1} (Optional)
                              </Form.Label>
                              <Form.Control
                                type="text"
                                readOnly={!(is_not_hr && isEdit)}
                                style={{
                                  backgroundColor:
                                    is_not_hr && isEdit ? "white" : "#f2f2f2",
                                }}
                                value={emergency.middleName}
                                onChange={(e) =>
                                  updateEmergencyMiddleName(
                                    index,
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="mb-3">
                            <Form.Group id="ref-phone-number">
                              <Form.Label>
                                Phone Number {index + 1} (Optional)
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                readOnly={!(is_not_hr && isEdit)}
                                style={{
                                  backgroundColor:
                                    is_not_hr && isEdit ? "white" : "#f2f2f2",
                                }}
                                value={emergency.phone}
                                onChange={(e) =>
                                  updateEmergencyPhone(index, e.target.value)
                                }
                                placeholder="xxx-xxx-xxxx"
                              />
                            </Form.Group>
                          </Col>
                          <Col className="mb-3">
                            <Form.Group id="ref-email">
                              <Form.Label>
                                Email {index + 1} (Optional)
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                readOnly={!(is_not_hr && isEdit)}
                                style={{
                                  backgroundColor:
                                    is_not_hr && isEdit ? "white" : "#f2f2f2",
                                }}
                                value={emergency.email}
                                onChange={(e) =>
                                  updateEmergencyEmail(index, e.target.value)
                                }
                                placeholder="prefix@mail.suffix"
                              />
                            </Form.Group>
                          </Col>
                          <Col className="mb-3">
                            <Form.Group id="ref-relationship">
                              <Form.Label>Relationship</Form.Label>
                              <Form.Control
                                type="text"
                                readOnly={!(is_not_hr && isEdit)}
                                style={{
                                  backgroundColor:
                                    is_not_hr && isEdit ? "white" : "#f2f2f2",
                                }}
                                value={emergency.relationship}
                                onChange={(e) =>
                                  updateEmergencyRelationship(
                                    index,
                                    e.target.value
                                  )
                                }
                                placeholder="Sibling, parent, spouse, etc."
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        {is_not_hr && isEdit && index > 0 && (
                          <Button
                            variant="danger"
                            onClick={() => {
                              removeEmergencyBlock(index);
                              console.log(emergencies);
                            }}
                            className="mb-3"
                          >
                            Remove Emergency Contact
                          </Button>
                        )}
                      </div>
                    ))}
                    {is_not_hr && isEdit && (
                      <Button
                        variant="primary"
                        onClick={addEmergencyBlock}
                        className="mt-3"
                      >
                        Add Emergency Contact
                      </Button>
                    )}
                  </Card.Body>
                </Card>

                <Table
                  className="bg-white shadow-sm mb-4"
                  striped
                  bordered
                  hover
                  style={{ width: "80vw" }}
                >
                  <thead>
                    <tr>
                      <th>File Type</th>
                      <th>File Name</th>
                      <th>Download</th>
                      <th>Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={0}>
                      <td>Driver License</td>
                      <td>{DLFileName}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleDownload(DLBase64, DLFileName)}
                        >
                          Download
                        </Button>
                      </td>
                      <td>
                        {DLFileName ? (
                          <>
                            <Button
                              variant="info"
                              onClick={() => setShowDLImage(true)}
                            >
                              Preview
                            </Button>
                            <Modal
                              show={showDLImage}
                              onHide={() => setShowDLImage(false)}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Driver License Image</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <img
                                  src={DLBase64}
                                  alt="Large Image"
                                  style={{ width: "100%", height: "auto" }}
                                />
                              </Modal.Body>
                              <Modal.Footer />
                            </Modal>
                          </>
                        ) : (
                          <span>Not supported</span>
                        )}
                      </td>
                    </tr>
                    <tr key={1}>
                      <td>Work Authentication</td>
                      <td>{authFileName}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() =>
                            handleDownload(authBase64, authFileName)
                          }
                        >
                          Download
                        </Button>
                      </td>
                      <td>
                        {authFileName ? (
                          <>
                            <Button
                              variant="info"
                              onClick={() => setShowAuthImage(true)}
                            >
                              Preview
                            </Button>
                            <Modal
                              show={showAuthImage}
                              onHide={() => setShowAuthImage(false)}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Work Authentication Image
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <img
                                  src={authBase64}
                                  alt="Large Image"
                                  style={{ width: "100%", height: "auto" }}
                                />
                              </Modal.Body>
                              <Modal.Footer />
                            </Modal>
                          </>
                        ) : (
                          <span>Not supported</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default PersonalInformation;

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
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);

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

  const [isCitizen, setIsCitizen] = useState(null);
  const [visaTitle, setVisaTitle] = useState("");
  const [visaStartDate, setVisaStartDate] = useState("");
  const [visaEndDate, setVisaEndDate] = useState("");

  const [refFirstName, setRefFirstName] = useState("");
  const [refLastName, setRefLastName] = useState("");
  const [refMiddleName, setRefMiddleName] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [refRelationship, setRefRelationship] = useState("");

  const [emerFirstName, setEmerFirstName] = useState("");
  const [emerLastName, setEmerLastName] = useState("");
  const [emerMiddleName, setEmerMiddleName] = useState("");
  const [emerPhone, setEmerPhone] = useState("");
  const [emerEmail, setEmerEmail] = useState("");
  const [emerRelationship, setEmerRelationship] = useState("");

  const [showDLModal, setShowDLModal] = useState(false);
  const [showLargeDL, setShowLargeDL] = useState(false);
  const [driverID, setDriverID] = useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLargeAuth, setShowLargeAuth] = useState(false);
  const [workAuth, setWorkAuth] = useState(null);
}

export default OnboardingApplication;
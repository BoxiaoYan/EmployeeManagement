import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faEllipsisH, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, InputGroup, Dropdown, Card, Table, Nav, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./HRInformation.css";
import Navbar from "../../components/Navbar";

import { useNavigate } from "react-router-dom";
import { fetchProfileSummary } from "../../services/profiles";
import { set } from "mongoose";

function HRInformation() {
    const [search, setSearch] = useState("");
    const [profile, setProfile] = useState([]);
    const [displayProfile, setDisplayProfile] = useState([]);
    const [totalDatas, setTotalDatas] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalDatas / itemsPerPage);

    const navigate = useNavigate();

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    const handleSearch = () => {
    };

    useEffect(() => {
      fetchProfileSummary(setProfile, setDisplayProfile, navigate);
      setTotalDatas(displayProfile.length);
    }, []);

    useEffect(() => {
      // Update displayed employee with search result
      setDisplayProfile(
        profile.filter((item) => {
          const { firstName, lastName, preferredName } = item.name.name;
          const fullName = firstName + " " + lastName;
          const lowerCaseSearchTerm = search.toLowerCase();
          return (
            firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
            lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
            preferredName.toLowerCase().includes(lowerCaseSearchTerm) ||
            fullName.toLowerCase().includes(lowerCaseSearchTerm)
          );
        })
      );
    }, [search, profile]);




    const TableRow = (props) => {
        const fullName = props.name.name.firstName + " " + props.name.name.lastName;
        const SSN = props.ssn;
        const visa = props.visa;
        const cellPhone = props.cellPhone;
        const email = props.email;
        const user_id = props.name.id;

        return (
          <tr>
            <td>
              <Card.Link as={Link} to={`/personal-profile/${user_id}`} className="fw-normal">
                {fullName}
              </Card.Link>
            </td>
            <td>
              <span className="fw-normal">
                {SSN}
              </span>
            </td>
            <td>
              <span className="fw-normal">
                {visa}
              </span>
            </td>
            <td>
              <span className="fw-normal">
                {cellPhone}
              </span>
            </td>
            <td>
              <span className="fw-normal">
                {email}
              </span>
            </td>
            <td>
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                  <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                  </Dropdown.Item>
                  <Dropdown.Item className="text-danger">
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        );
      };


    return (
        <div className="all-HR-profiles">
            <div className="table-settings">
                <Navbar/>
                <Row style={{ marginLeft: '2rem', marginRight: '2rem'}} className="justify-content-between align-items-center mb-4 pt-4">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              placeholder="Search"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                              variant="primary"
                              className="btn-icon btn-icon-only ms-1"
                              onClick={handleSearch}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm icon-gray">
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                                {/* <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item> */}
                                <Dropdown.Item className="d-flex fw-bold" onClick={() => setItemsPerPage(5)}>
                                  5 
                                  {itemsPerPage === 5 && <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>}
                                </Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold" onClick={() => setItemsPerPage(10)}>
                                  10
                                  {itemsPerPage === 10 && <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>}
                                </Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold" onClick={() => setItemsPerPage(20)}>
                                  20
                                  {itemsPerPage === 20 && <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>}
                                </Dropdown.Item>
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <Card border="light" className="table-wrapper table-responsive shadow-sm m-4">
              <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                  <thead>
                    <tr>
                      <th className="border-bottom">Full Name</th>
                      <th className="border-bottom">SSN</th>
                      <th className="border-bottom">Work Authorization</th>
                      <th className="border-bottom">Phone Number</th>
                      <th className="border-bottom">Email</th>
                      <th className="border-bottom">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProfile.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
                      <TableRow key={`profile-${item.name.id}`} {...item} />
                    ))}
                  </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                  <Nav>
                    <Pagination className="mb-2 mb-lg-0">
                      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                      </Pagination.Prev>

                      {Array.from({ length: totalPages }, (value, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                      </Pagination.Next>
                    </Pagination>
                  </Nav>
                  <small className="fw-bold">
                    Showing <b>{currentPage !== totalPages ? itemsPerPage : totalDatas % itemsPerPage}</b> out of <b>{totalDatas}</b> entries
                  </small>
                </Card.Footer>
              </Card.Body>
            </Card>
        </div>
    );
}

export default HRInformation;
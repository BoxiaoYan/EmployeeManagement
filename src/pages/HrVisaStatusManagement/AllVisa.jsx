import { useState, useEffect } from "react";
import { Typography, Button, Table, Input, Tabs } from "antd";

import SearchBar from "../../components/SearchBar";
import PDF from "../../components/PDF";

import styles from "./style.module.css";

export default function AllVisa({ employees, search, setSearch }) {

  const [feedback, setFeedback] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const columns = [
    // Lists all employees who have not yet uploaded and been approved
    // for all required OPT documents
  ];

  useEffect(() => {
    // Update displayed employee with search result
    setSelectedEmployee(
      employees.filter((item) => {
        const { firstName, lastName, preferredName } = item.name;
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
  }, [search, employees]);

  return (
    <>
    <SearchBar
        storageId="visaStatusSearch"
        search={search}
        setSearch={setSearch}
      />

      <div className={styles.text}>
        Found {selectedEmployee.length} employee(s)
      </div>
{/* 
      <Table
        className={styles.employeeTable}
        dataSource={employees}
        columns={columns}
        rowKey={(record) => record.userId}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            setSelectedEmployee(record);
          },
        })}
      /> */}
    </>
  );
}

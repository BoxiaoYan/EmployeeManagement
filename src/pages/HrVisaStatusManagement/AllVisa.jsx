import { useState, useEffect } from "react";
import { Table } from "antd";
import { commonColumns } from "./dataFormat";

import SearchBar from "../../components/SearchBar";
import PDF from "../../components/PDF";

import styles from "./style.module.css";

export default function AllVisa({ employees, search, setSearch }) {
  const [displayEmployees, setDisplayEmployees] = useState([]);

  useEffect(() => {
    // Update displayed employee with search result
    setDisplayEmployees(
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

  const allColumns = [
    ...commonColumns,
    {
      title: "Approved Documents",
      dataIndex: "visa",
      key: "documents",
      render: (visa) => (
        <div className={styles.files}>
          {visa.opt_receipt === "Approved" && (
            <PDF fileName="opt_receipt" userID={visa.user} />
          )}
          {visa.opt_ead === "Approved" && (
            <PDF fileName="opt_ead" userID={visa.user} />
          )}
          {visa.i983 === "Approved" && (
            <PDF fileName="i983" userID={visa.user} />
          )}
          {visa.i20 === "Approved" && <PDF fileName="i20" userID={visa.user} />}
        </div>
      ),
    },
  ];

  return (
    <>
      <SearchBar
        storageId="visaStatusSearch"
        search={search}
        setSearch={setSearch}
      />

      <div className={styles.text}>
        Found {displayEmployees.length} employee(s)
      </div>

      <Table
        className={styles.employeeTable}
        dataSource={displayEmployees}
        columns={allColumns}
      />
    </>
  );
}

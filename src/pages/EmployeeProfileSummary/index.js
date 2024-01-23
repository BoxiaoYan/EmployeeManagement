import { useEffect, useState } from "react";
import { Input, Table } from "antd";

import { tableColumns, sampleData } from "./dataFormat";
import styles from "./style.module.css";

export default function EmployeeProfileSummary() {
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState([]);
  const [displayEmloyee, setDisplayEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load the current page from localStorage
    const storedPage = localStorage.getItem("profileSummaryPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }

    // Load the search result from localStorage
    const storedSearch = localStorage.getItem("profileSummarySearch");
    if (storedSearch) {
      setSearch(storedSearch);
    }

    // Fetch employee profile summary
    // TODO
    setEmployee(sampleData);
    setDisplayEmployee(sampleData);
  }, []);

  useEffect(() => {
    // Update displayed employee with search result
    setDisplayEmployee(
      employee.filter((item) => {
        const { firstName, lastName, preferredName } = item.name.name;
        const lowerCaseSearchTerm = search.toLowerCase();
        return (
          firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
          lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
          preferredName.toLowerCase().includes(lowerCaseSearchTerm)
        );
      })
    );
  }, [search, employee]);

  // Handle search bar change
  const handleSearchBarChange = (e) => {
    setSearch(e.target.value);
    localStorage.setItem("profileSummarySearch", e.target.value);
    handlePaginationChange(1);
  };

  // Handle pagination change
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("profileSummaryPage", page);
  };

  return (
    <>
      {/** TODO: navigation bar */}
      <div className={styles.searchBar}>
        <Input
          value={search}
          placeholder="Search employee by name"
          allowClear
          size="large"
          onChange={handleSearchBarChange}
        />
      </div>
      <div className={styles.text}>
        Found {displayEmloyee.length} employee(s)
      </div>
      <div className={styles.employeeTable}>
        <Table
          pagination={{
            current: currentPage,
            onChange: handlePaginationChange,
            pageSize: 10,
          }}
          columns={tableColumns}
          dataSource={displayEmloyee}
        />
      </div>
    </>
  );
}

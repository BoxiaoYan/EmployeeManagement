import { useEffect, useState } from "react";
import { Input, Table } from "antd";

import { tableColumns, sampleData } from "./dataFormat";
import styles from "./style.module.css";

export default function EmployeeProfileSummary() {
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedPage = localStorage.getItem("profileSummaryPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  useEffect(() => {
    // TODO: fetch data with search result
    handlePaginationChange(1);
  }, [search]);

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
          placeholder="Search employee by name"
          allowClear
          size="large"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.text}>Found {employee.length} employee(s)</div>
      <div className={styles.employeeTable}>
        <Table
          pagination={{
            current: currentPage,
            onChange: handlePaginationChange,
            pageSize: 10,
          }}
          columns={tableColumns}
          dataSource={sampleData}
        />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Input, Table } from "antd";

import { tableColumns, sampleData } from "./dataFormat";
import styles from "./style.module.css";

const { Search } = Input;

export default function EmployeeProfileSummary() {
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    // TODO: fetch data with search result
  }, [search]);

  return (
    <>
      {/** TODO: navigation bar */}
      <div className={styles.searchBar}>
        <Search
          placeholder="Search for employee"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
        />
      </div>
      <div className={styles.text}>Found {employee.length} employee(s)</div>
      <div className={styles.employeeTable}>
        <Table
          pagination={{ pageSize: 12 }}
          columns={tableColumns}
          dataSource={sampleData}
        />
      </div>
    </>
  );
}

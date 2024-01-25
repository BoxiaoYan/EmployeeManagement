import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Table } from "antd";

import { fetchEmployeeByStatus } from "../../services/employees";
import styles from "./style.module.css";


// HiringManagementPage
export default function ReviewTable(props) {
  const { status } = props;

  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const tableColumns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "View Application",
      dataIndex: "id",
      key: "view_app",
      render: (id) => (
        <Link to={`/profile/${id}`} target="_blank">
          View Application
        </Link>
      ),
    },
  ];

  useEffect(() => {
    console.log(status)
    fetchEmployeeByStatus(status, setEmployees, navigate)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className={styles.searchBar}>
        <Input
          value={search}
          placeholder="Search employee by name"
          allowClear
          size="large"
          onChange={handleSearchBarChange}
        />
      </div>
      <div className={styles.text}>Found {employees.length} employee(s)</div>
      <div className={styles.table}>
        <Table
          pagination={{
            current: currentPage,
            onChange: handlePaginationChange,
            pageSize: 10,
          }}
          columns={tableColumns}
          dataSource={employees}
        />
      </div>
    </>
  );
}

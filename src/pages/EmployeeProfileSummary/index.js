import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Table } from "antd";

import { fetchProfileSummary } from "../../services/profiles";
import { tableColumns } from "./dataFormat";
import styles from "./style.module.css";

export default function EmployeeProfileSummary() {
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState([]);
  const [displayProfile, setDisplayProfile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

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
    fetchProfileSummary(setProfile, setDisplayProfile, navigate)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className={styles.title}>Employee Profile Summary</div>
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
        Found {displayProfile.length} employee(s)
      </div>
      <div className={styles.employeeTable}>
        <Table
          pagination={{
            current: currentPage,
            onChange: handlePaginationChange,
            pageSize: 10,
          }}
          columns={tableColumns}
          dataSource={displayProfile}
        />
      </div>
    </>
  );
}

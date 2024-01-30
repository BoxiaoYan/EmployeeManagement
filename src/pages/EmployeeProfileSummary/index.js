import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Typography } from "antd";

import { fetchProfileSummary } from "../../services/profiles";
import { tableColumns } from "./dataFormat";

import SearchBar from "../../components/SearchBar";
import styles from "./style.module.css";

export default function EmployeeProfileSummary() {
  const { Title } = Typography;
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

    // Fetch employee profile summary
    fetchProfileSummary(setProfile, setDisplayProfile, navigate);

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

  // Handle pagination change
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("profileSummaryPage", page);
  };

  return (
    <>
      <Title className={styles.title}>Employee Profile Summary</Title>
      <SearchBar
        searchId="profileSummarySearch"
        search={search}
        setSearch={setSearch}
        pageId="profileSummaryPage"
        setCurrentPage={setCurrentPage}
      />
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

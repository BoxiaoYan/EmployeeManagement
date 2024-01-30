import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Divider } from "antd";
import { pageTableColumns } from "./dataFormat";
import { fetchEmployeeByStatus } from "../../services/hr";

import SearchBar from "../../components/SearchBar";
import SendRegistrationToken from "../../components/SendRegistrationToken";
import styles from "./style.module.css";

export default function TokenList({ search, setSearch }) {
  const [refresh, setRefresh] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [displayEmployees, setDisplayEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch empoyees
    fetchEmployeeByStatus(
      undefined,
      setEmployees,
      setDisplayEmployees,
      navigate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    // Update displayed employee with search result
    setDisplayEmployees(
      employees.filter((item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, employees]);

  return (
    <>
      <SendRegistrationToken refresh={refresh} setRefresh={setRefresh} />

      <Divider style={{ color: "black" }} />

      <div className={styles.title}>Registration Token History</div>
      <SearchBar
        storageId="hiringManagementSearch"
        search={search}
        setSearch={setSearch}
      />
      <div className={styles.text}>
        Found {displayEmployees.length} employee(s)
      </div>
      <div className={styles.table}>
        <Table
          pagination={{ pageSize: 5 }}
          columns={pageTableColumns}
          dataSource={displayEmployees}
        />
      </div>
    </>
  );
}
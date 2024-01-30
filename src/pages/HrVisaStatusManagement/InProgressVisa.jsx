import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { commonColumns } from "./dataFormat";

import SearchBar from "../../components/SearchBar";
import ReviewFile from "./ReviewFile";
import styles from "./style.module.css";

export default function InProgressVisa({
  employees,
  search,
  setSearch,
  refresh,
}) {
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [displayEmployees, setDisplayEmployees] = useState([]);

  useEffect(() => {
    // Update selected employee with in progress employees
    setSelectedEmployee(
      employees.filter((item) => item.visa.i20 !== "Approved")
    );
  }, [employees]);

  useEffect(() => {
    // Update displayed employee with search result
    setDisplayEmployees(
      selectedEmployee.filter((item) => {
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
  }, [search, selectedEmployee]);

  const inProgressColumns = [
    ...commonColumns,
    Table.EXPAND_COLUMN,
    {
      title: "Action",
      dataIndex: "visa",
      key: "action",
      render: (visa) =>
        [visa.opt_receipt, visa.opt_ead, visa.i983, visa.i20].includes(
          "Pending"
        ) ? (
          "Action"
        ) : (
          <Button onClick={handleSendNotification(visa.user)}>
            Send Notification
          </Button>
        ),
    },
  ];

  const handleSendNotification = (user) => () => {
    console.log(user);
  };

  // const handleSendNotification = async () => {
  //   if (selectedEmployee) {
  //     setLoading(true);
  //     const success = await sendNotification(selectedEmployee.userId);
  //     if (success) {
  //       // will send an email to the employee as a reminder
  //       // for their next steps
  //     }
  //     setLoading(false);
  //   }
  // };

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
        columns={inProgressColumns}
        expandable={{
          rowExpandable: (record) =>
            record.visa &&
            [
              record.visa.opt_receipt,
              record.visa.opt_ead,
              record.visa.i983,
              record.visa.i20,
            ].includes("Pending"),
          expandedRowRender: (record) => (
            <ReviewFile visa={record.visa} refresh={refresh} />
          ),
        }}
      />
    </>
  );
}

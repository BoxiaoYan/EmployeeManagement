import { Link } from "react-router-dom";

export const tableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: ({ id, name }) => (
      <Link to={`/profile/${id}`} target="_blank">
        {name}
      </Link>
    ),
  },
  {
    title: "SSN",
    dataIndex: "ssn",
    key: "ssn",
  },
  {
    title: "Work Authorization Title",
    dataIndex: "visa",
    key: "visa",
  },
  {
    title: "Phone",
    dataIndex: "cellPhone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

export const sampleData = Array(20)
  .fill(undefined)
  .map((_, index) => ({
    key: index,
    name: { id: "00000", name: "Joe Black" },
    ssn: "123456",
    visa: "OPT",
    cellPhone: "12345678",
    email: "test0@gmail.com",
  }));

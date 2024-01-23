import { Link } from "react-router-dom";

export const tableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: ({ id, name }) => (
      <Link to={`/profile/${id}`} target="_blank">
        {`${name.firstName} ${name.lastName}`}
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

const randomNames = [
  "Emily Thompson",
  "Joshua Davis",
  "Olivia Miller",
  "Alexander Lee",
  "Sophia Rodriguez",
  "Liam Johnson",
  "Ava Wilson",
  "Noah Taylor",
  "Mia Brown",
  "Ethan Martinez",
  "Isabella Harris",
  "Lucas Anderson",
  "Amelia Smith",
  "James Taylor",
  "Emma Garcia",
  "Benjamin White",
  "Abigail Jackson",
  "Oliver Martinez",
  "Harper Davis",
  "William Turner",
  "Charlotte Harris",
  "Logan Smith",
  "Aria Johnson",
  "Daniel Wilson",
];

export const sampleData = randomNames.map((name, index) => {
  const [firstName, lastName] = name.split(" ");
  return {
    key: index,
    name: {
      id: "00000",
      name: {
        firstName: firstName,
        lastName: lastName,
        preferredName: "test0",
      },
    },
    ssn: "123456",
    visa: "OPT",
    cellPhone: "12345678",
    email: "test0@gmail.com",
  };
});

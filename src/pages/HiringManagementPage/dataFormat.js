import { Link } from "react-router-dom";

export const reviewTableColumns = [
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
    dataIndex: "_id",
    key: "view_app",
    render: (id) => (
      <Link to={`/profile/${id}`} target="_blank">
        View Application
      </Link>
    ),
  },
];

export const pageTableColumns = [
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
    title: "Registration Link",
    dataIndex: "regLink",
    key: "regLink",
    render: (link) => {
      const regex = new RegExp(`.{1,60}`, "g");
      const segments = link.match(regex);
      if (segments) {
        return segments.map((seg, index) => <div key={index}>{seg}</div>);
      }
      return link;
    },
  },
  {
    title: "Status",
    dataIndex: "appStatus",
    key: "appStatus",
    render: (status) =>
      status !== "UnRegistered" && status !== "UnSubmitted"
        ? "Submitted"
        : status,
  },
];
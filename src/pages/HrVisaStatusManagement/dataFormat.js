import moment from "moment";

const handleNextStep = (visa) => {
  if (["Unsubmitted", "Rejected"].includes(visa.opt_receipt)) {
    return "Submit OPT receipt";
  } else if (visa.opt_receipt === "Pending") {
    return "OPT Receipt: wait for HR approval";
  } else if (["Unsubmitted", "Rejected"].includes(visa.opt_ead)) {
    return "Submit OPT EAD";
  } else if (visa.opt_ead === "Pending") {
    return "OPT EAD: wait for HR approval";
  } else if (["Unsubmitted", "Rejected"].includes(visa.i983)) {
    return "Submit I-983";
  } else if (visa.i983 === "Pending") {
    return "I-983: wait for HR approval";
  } else if (["Unsubmitted", "Rejected"].includes(visa.i20)) {
    return "Submit I-20";
  } else if (visa.i20 === "Pending") {
    return "I-20: wait for HR approval";
  } else {
    return "All documents have been approved";
  }
};

export const commonColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => `${name.firstName} ${name.lastName}`,
  },
  {
    title: "Work Authorization",
    children: [
      {
        title: "Title",
        dataIndex: ["employment", "visa"],
        key: "title",
        render: (title) => title,
      },
      {
        title: "Start Date - End Date",
        dataIndex: "employment",
        key: "date",
        render: (employment) =>
          `${moment(employment.startDate).format("MM/DD/YYYY")} - 
                 ${moment(employment.endDate).format("MM/DD/YYYY")}`,
      },
      {
        title: "Days Remaining",
        dataIndex: ["employment", "endDate"],
        key: "remain",
        render: (date) => moment(date).diff(moment(), "days"),
      },
    ],
  },
  {
    title: "Next Steps",
    dataIndex: "visa",
    key: "nextSteps",
    render: (visa) => handleNextStep(visa),
  },
];
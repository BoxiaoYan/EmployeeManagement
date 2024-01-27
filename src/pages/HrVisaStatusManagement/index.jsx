import { useState, useEffect } from "react";
import { Typography, Button, Table, Input } from "antd";
import { useSelector } from "react-redux";
import { FaFilePdf } from "react-icons/fa";
import { fetchVisaStatus, approveDocument, rejectDocument, sendNotification } from "../../services/visa"; // 你需要编写这些服务函数

const { Title, Text } = Typography;
const { Search } = Input;

export default function VisaStatusManagement() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const userID = useSelector((state) => state.user.user.id || null);

    useEffect(() => {
        fetchVisaStatus(userID, setEmployees);
    }, [userID]);


    const handleApprove = async () => {
        if (selectedEmployee) {
            setLoading(true);
            const success = await approveDocument(selectedEmployee.documentId);
            if (success) {
                // logic to handle approved file
            }
            setLoading(false);
        }
    };

    const handleReject = async () => {
        if (selectedEmployee && feedback.trim() !== "") {
            setLoading(true);
            const success = await rejectDocument(selectedEmployee.documentId, feedback);
            if (success) {
                // logic to handle rejected file
            }
            setLoading(false);
        }
    };


    const handleSendNotification = async () => {
        if (selectedEmployee) {
            setLoading(true);
            const success = await sendNotification(selectedEmployee.userId);
            if (success) {
                // will send an email to the employee as a reminder
                // for their next steps

            }
            setLoading(false);
        }
    };

    const columns = [
        // Lists all employees who have not yet uploaded and been approved
        // for all required OPT documents
    ];

    return (
        <div>
            <Title>Visa Status Management</Title>
            <Text italic>Please follow the document order one by one.</Text>


            <Search
                placeholder="Search by name"
                onSearch={(value) => {

                }}
                style={{ width: 200, marginBottom: 16 }}
            />


            <Table
                dataSource={employees}
                columns={columns}
                rowKey={(record) => record.userId}
                pagination={false}
                onRow={(record) => ({
                    onClick: () => {
                        setSelectedEmployee(record);
                    },
                })}
            />


            {selectedEmployee && (
                <div>
                    {selectedEmployee.nextStep === "HR approval" && (
                        <div>
                            <Button type="primary" onClick={handleApprove} loading={loading}>
                                Approve
                            </Button>
                            <Button type="danger" onClick={handleReject} loading={loading}>
                                Reject
                            </Button>
                            <Input
                                placeholder="Feedback (if rejected)"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                style={{ marginTop: 16 }}
                            />
                        </div>
                    )}
                    {selectedEmployee.nextStep === "Send notification" && (
                        <Button type="primary" onClick={handleSendNotification} loading={loading}>
                            Send Notification
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

import React from "react";
import correct from '../../../../../assets/images/svg-icon/correct.svg';
import question from '../../../../../assets/images/svg-icon/question.svg';
import warning from '../../../../../assets/images/svg-icon/warning.svg';
import DataTable from "react-data-table-component";

const Tag = ({ label }) => {
    const getTagStyle = (status) => {
        switch (status) {
            case "Target Achieved":
                return {
                    backgroundColor: "#EBF7EB",
                    color: "#43953B",
                    icon: correct,
                };
            case "Not Achieved":
                return {
                    backgroundColor: "#FEF2F2",
                    color: "#DC2626",
                    icon: warning,
                };
            case "Target Not Set":
            default:
                return {
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280",
                    icon: question,
                };
        }
    };

    const style = getTagStyle(label);

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 5px 5px",
                borderRadius: "5px",
                fontSize: "11px",
                fontWeight: "400",
                backgroundColor: style.backgroundColor,
                color: style.color,
                whiteSpace: "nowrap"
            }}
        >
            {style.icon && (
                <img src={style.icon} alt="icon" style={{ marginRight: "4px" }} />
            )}
            {label}
        </span>
    );
};

const RankingTable = ({ loading, tableData }) => {
    const formatTimeSpent = (minutes) => {
        return `${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`;
    };

    const getTargetStatus = (data) => {
        if (data.target === "Not Set") {
            return "Target Not Set";
        }
        return data.compliance_percentage >= 95
            ? "Target Achieved"
            : "Not Achieved";
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.Name,
            style: {
                fontSize: "14px",
                fontWeight: 400,
            },
        },
        {
            name: "Area Name",
            selector: (row) => row.areaid,
            center: true,
            style: {
                fontSize: "14px",
                fontWeight: 400,
            },
        },
        {
            name: "Alerts",
            selector: (row) => row.totalalert,
            center: true,
            style: {
                fontSize: "14px",
                fontWeight: 400,
            },
        },
        {
            name: "Compliance",
            selector: (row) => `${row.compliance_percentage}%`,
            center: true,
            style: {
                fontSize: "14px",
                fontWeight: 400,
            },
        },
        {
            name: "Time Spent",
            selector: (row) => formatTimeSpent(row.time),
            center: true,
            style: {
                fontSize: "14px",
                fontWeight: 400,
            },
        },
        {
            name: "Target Status",
            cell: (row) => <Tag label={getTargetStatus(row)} />,
            center: true,
        },
        {
            name: "Points",
            selector: (row) => row.points,
            center: true,
            style: {
                fontSize: "14px",
                fontWeight: 400,
            },
        },
    ];

    return loading ? (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "250px" }}
        >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : (
        <div style={{paddingBottom:"10px", borderRadius:"18px" }}>
            <h2 style={{ fontWeight: 700, fontSize: "24px", marginBottom: "20px" }}>
                Ranks
            </h2>
            <DataTable
                columns={columns}
                data={tableData}
                pagination={false} 
                customStyles={{
                    headCells: {
                        style: {
                            backgroundColor: "#E8EFF6",
                            fontSize: "14px",
                            fontWeight: 500,
                          
                        },
                    },
                    rows: {
                        style: {
                            borderBottomRadius:"15px"
                        },
                    },
                }}
            />
        </div>
    );
};

export default RankingTable;

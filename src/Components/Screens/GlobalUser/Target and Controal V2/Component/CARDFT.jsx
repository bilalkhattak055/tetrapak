import React, { useState, useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import redarrow from "../../../../../assets/images/svg-icon/redarrow.svg"

const Tag = ({ label }) => {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        fontSize: "13px",
        fontWeight: "500",
        color: "#43953B",
        backgroundColor: "#ebf7eb",
        borderRadius: "4px",
        textAlign: "center",
        marginLeft: "10px",
      }}
    >
      {label}
    </span>
  );
};

const Cards = ({
  title,
  subArea,
  targetStatus,
  reductionTarget,
  currentWeekData,
  lastWeekData,
  onSelectTarget,
  isCurrentWeek
}) => {
  const [activeTab, setActiveTab] = useState("current");

  //my function to give current weak to match current weak logic
  const getCurrentWeek = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      (((now.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7
    );
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
  };
  const currentWeek = useMemo(() => getCurrentWeek(), []);
  const currentAlerts = currentWeekData?.alerts || 0;
  const lastWeekAlerts = lastWeekData?.alerts || 0;
  const showSetTarget = lastWeekAlerts > 0 && isCurrentWeek === currentWeek;

  // Function to calculate alert increase percentage
  const calculateAlertIncrease = (currentAlerts, lastWeekAlerts) => {
    if (currentAlerts === 0 || lastWeekAlerts === 0) return 0;
    if (currentAlerts <= lastWeekAlerts) return 0;
    const increase = ((currentAlerts - lastWeekAlerts) / lastWeekAlerts) * 100;
    return Math.round(increase);
  };

  const alertChange = calculateAlertIncrease(currentAlerts, lastWeekAlerts);

  return (
    <Card
      className="shadow-sm"
      style={{
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        height: "92%",
      }}
    >
      <CardBody className="p-0 d-flex flex-column">
        {/* Header Section */}
        <div>
          {/* Title and Target Achieved row */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5
              style={{
                fontSize: "16px",
                fontWeight: "500",
                margin: 0,
              }}
            >
              {title}
            </h5>
            <Tag label={targetStatus} />
          </div>

          {/* SubArea and Reduction Target row */}
          <div className="d-flex justify-content-between align-items-center">
            <div
              style={{
                fontSize: "13px",
                color: "#666",
              }}
            >
              {subArea}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#666",
              }}
            >
              Reduction Target: {reductionTarget}
            </div>
          </div>
        </div>

        {/* Set Target or Cannot Set Message */}
        <div
          style={{
            marginTop: "6px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: showSetTarget ? "flex-end" : "flex-start",
          }}
        >
          {showSetTarget ? (
            <div
              onClick={onSelectTarget}
              style={{
                fontSize: "12px",
                color: "#666",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 6px",
                borderRadius: "4px",
              }}
            >
              Set a Target
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          ) : (
            <div
              style={{
                fontSize: "13px",
                color: "#0066CC",
              }}
            >
              Target for this week cannot be set
            </div>
          )}
        </div>

        {/* Tabs Section */}
        <div
          className="mt-1"
          style={{
            background: "#f5f5f5",
            borderRadius: "10px",
            padding: "3px",
            marginBottom: "24px",
          }}
        >
          <div className="d-flex m">
            <div
              onClick={() => setActiveTab("current")}
              style={{
                flex: 1,
                padding: "8px 12px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeTab === "current" ? "#fff" : "transparent",
                borderRadius: "6px",
                transition: "background-color 0.3s",
                fontWeight: "500",
                fontSize: "14px",
                boxShadow:
                  activeTab === "current" ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
              }}
            >
              Current Week
            </div>
            <div
              onClick={() => setActiveTab("last")}
              style={{
                flex: 1,
                padding: "8px 12px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeTab === "last" ? "#fff" : "transparent",
                borderRadius: "6px",
                transition: "background-color 0.3s",
                fontWeight: "500",
                fontSize: "14px",
                boxShadow:
                  activeTab === "last" ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
              }}
            >
              Last Week
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div>
          <div className="d-flex justify-content-between mb-3">
            <div style={{ fontSize: "16px", color: "#666" }}>Targets</div>
            <div style={{ fontSize: "16px", fontWeight: "500" }}>
              {activeTab === "current"
                ? currentWeekData.targets
                : lastWeekData.targets}
            </div>
          </div>
          <div style={{ border: "1px solid #ECECEC", marginBottom: "16px" }} />
          <div className="d-flex justify-content-between">
            <div style={{ fontSize: "16px", color: "#666" }}>Alerts</div>
            <div style={{ fontSize: "16px", fontWeight: "500" }}>
              {activeTab === "current"
                ? currentWeekData.alerts
                : lastWeekData.alerts}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "12px",
            fontSize: "14px",
            color: "red",
            fontWeight: "500",
          }}
        >
          {/* Display the percentage increase in alerts */}
          {alertChange > 0 && (
            <span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                <img src={redarrow} alt="Alert Increased" />
              </span>
              {alertChange}% Alerts Increased
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
export default Cards;

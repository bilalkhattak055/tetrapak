import React, { forwardRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import './PDFReportTemplate.css';
import Logo from '../asset/tetrapaklogo.png';
import { formatNumber, formatPercentage, calculateCompliancePercentage, getStatusColor } from '../pdfUtils';

// Components remain the same...
const PDFComplianceChart = ({ data }) => {
    if (!data || Object.keys(data).length === 0) return <div className="pdf-empty-chart">No data available</div>;

    const compliancePercentage = calculateCompliancePercentage(data);
    const statusColor = getStatusColor(compliancePercentage);

    return (
        <div className="pdf-chart pdf-compliance-chart">
            <h3 className="pdf-chart-title">Compliance Target Overview</h3>
            <div className="pdf-chart-content">
                <div className="pdf-chart-data">
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Total Reels:</span>
                        <span className="pdf-stat-value">{formatNumber(data.total_reels || 0)}</span>
                    </div>
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Match Reels:</span>
                        <span className="pdf-stat-value">{formatNumber(data.match_reels || 0)}</span>
                    </div>
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Mismatch Reels:</span>
                        <span className="pdf-stat-value">{formatNumber(data.mismatch_reels || 0)}</span>
                    </div>
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Compliance Rate:</span>
                        <span className="pdf-stat-value" style={{ color: statusColor }}>{formatPercentage(compliancePercentage)}</span>
                    </div>
                </div>
                <div className="pdf-chart-visual">
                    <div className="pdf-progress-bar">
                        <div
                            className="pdf-progress-fill"
                            style={{
                                width: `${compliancePercentage}%`,
                                backgroundColor: statusColor
                            }}
                        ></div>
                    </div>
                    <div className="pdf-progress-label">{formatPercentage(compliancePercentage)} Compliant</div>
                </div>
            </div>
        </div>
    );
};

const PDFAlertChart = ({ data }) => {
    if (!data || Object.keys(data).length === 0) return <div className="pdf-empty-chart">No data available</div>;

    // Safely access data properties
    const cameraProblem = data.camera_problem || 0;
    const timeProblem = data.time_problem || 0;
    const detectionProblem = data.detection_problem || 0;
    
    // Determine if there are any problems
    const hasProblems = cameraProblem > 0 || timeProblem > 0 || detectionProblem > 0;

    return (
        <div className="pdf-chart pdf-alert-chart">
            <h3 className="pdf-chart-title">Alert Count Summary</h3>
            <div className="pdf-chart-content">
                <div className="pdf-chart-data">
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Total Camera Problem:</span>
                        <span className="pdf-stat-value">{cameraProblem}</span>
                    </div>
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Total Time Problem:</span>
                        <span className="pdf-stat-value">{timeProblem}</span>
                    </div>
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Total Detection Problem:</span>
                        <span className="pdf-stat-value">{detectionProblem}</span>
                    </div>
                </div>
                <div className="pdf-chart-visual">
                    <div className="pdf-alert-indicator">
                        <div className="pdf-alert-icon">{hasProblems ? '⚠️' : '✓'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PDFReprocessChart = ({ data }) => {
    if (!data || Object.keys(data).length === 0) return <div className="pdf-empty-chart">No data available</div>;

    // Ensure we have valid data
    const totalReprocess = data.total_reprocess || 0;
    const reprocessByDay = data.reprocess_by_day || {};
    
    // Filter out days with zero values and sort
    const nonZeroDays = Object.entries(reprocessByDay)
        .filter(([_, count]) => Number(count) > 0)
        .sort((a, b) => {
            // If it's a numeric day (1, 2, 3...)
            if (!isNaN(a[0]) && !isNaN(b[0])) {
                return parseInt(a[0]) - parseInt(b[0]);
            }
            // If it's a month name or other string
            return a[0].localeCompare(b[0]);
        });
    
    // Determine if we're looking at days or months/other periods
    const timeUnit = nonZeroDays.length > 0 && !isNaN(nonZeroDays[0][0]) ? 'day' : 'period';

    return (
        <div className="pdf-chart pdf-reprocess-chart">
            <h3 className="pdf-chart-title">Reprocess Analytics</h3>
            <div className="pdf-chart-content">
                <div className="pdf-chart-data">
                    <div className="pdf-stat">
                        <span className="pdf-stat-label">Total Reprocess:</span>
                        <span className="pdf-stat-value">{totalReprocess}</span>
                    </div>
                </div>
                
                {nonZeroDays.length > 0 ? (
                    <div className="pdf-reprocess-table-container">
                        <p className="pdf-reprocess-summary">
                            Reprocessing occurred on the following {timeUnit}s:
                        </p>
                        <table className="pdf-reprocess-table">
                            <thead>
                                <tr>
                                    <th>{timeUnit === 'day' ? 'Day' : 'Period'}</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nonZeroDays.map(([day, count], index) => {
                                    const percentage = (Number(count) / totalReprocess * 100).toFixed(1);
                                    return (
                                        <tr key={index} className={index % 2 === 0 ? 'pdf-row-even' : 'pdf-row-odd'}>
                                            <td className="pdf-cell-period">{day}</td>
                                            <td className="pdf-cell-count">{count}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="pdf-empty-data">No reprocessing data available for this period.</div>
                )}
            </div>
        </div>
    );
};

const PDFReelsDashboard = ({ data }) => {
    if (!data) return <div className="pdf-empty-chart">No data available</div>;

    return (
        <div className="pdf-chart pdf-reels-dashboard">
            <h3 className="pdf-chart-title">Reels Summary Dashboard</h3>
            <div className="pdf-reels-grid">
                <div className="pdf-reels-card">
                    <div className="pdf-reels-icon">📊</div>
                    <div className="pdf-reels-label">Total Reels</div>
                    <div className="pdf-reels-value">{data.TotalReels || 0}</div>
                </div>
                <div className="pdf-reels-card">
                    <div className="pdf-reels-icon">✅</div>
                    <div className="pdf-reels-label">Match Reels</div>
                    <div className="pdf-reels-value">{data.MatchReels || 0}</div>
                </div>
                <div className="pdf-reels-card">
                    <div className="pdf-reels-icon">❌</div>
                    <div className="pdf-reels-label">Mismatch Reels</div>
                    <div className="pdf-reels-value">{data.MisMatchReels || 0}</div>
                </div>
                <div className="pdf-reels-card">
                    <div className="pdf-reels-icon">⚠️</div>
                    <div className="pdf-reels-label">Wrong Mismatch</div>
                    <div className="pdf-reels-value">{data.WrongMisMatch || 0}</div>
                </div>
            </div>
        </div>
    );
};

const PDFUserActivity = ({ userData }) => {
    if (!userData) return <div className="pdf-empty-chart">No user data available</div>;

    return (
        <div className="pdf-chart pdf-user-activity">
            <h3 className="pdf-chart-title">User Activity Summary</h3>
            <div className="pdf-user-table-container">
                <table className="pdf-user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Bypass</th>
                            <th>Reprocess</th>
                            <th>Wrong Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userData.id || 'N/A'}</td>
                            <td>{userData.username || 'N/A'}</td>
                            <td>{userData.email || 'N/A'}</td>
                            <td>{userData.bypass || 0}</td>
                            <td>{userData.reprocess || 0}</td>
                            <td>{userData.WrongCount || 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Header component extracted to be reused across pages
const ReportHeader = ({ formattedDate, filterDisplay }) => (
    <div className="pdf-report-header">
        <div className="pdf-report-logo">
            <div className="logo-container">
                <img src={Logo} alt="TetraPak Logo" className="logo-image" />
            </div>
        </div>
        <div className="pdf-report-title">
            <h1>AI Based Reels Inspection System Report</h1>
            <p className="pdf-report-date">Generated: {formattedDate}</p>
            {filterDisplay && (
                <p className="pdf-report-filter">Filter: {filterDisplay}</p>
            )}
        </div>
    </div>
);
//Header 2
const ReportHeadertwo = ({ formattedDate, filterDisplay }) => (
    <div className="pdf-report-headerss">
        <div className="pdf-report-logo">
            <div className="logo-container">
                <img src={Logo} alt="TetraPak Logo" className="logo-image" />
            </div>
        </div>
        <div className="pdf-report-title">
            <h1>AI Based Reels Inspection System Report</h1>
            <p className="pdf-report-date">Generated: {formattedDate}</p>
            {filterDisplay && (
                <p className="pdf-report-filter">Filter: {filterDisplay}</p>
            )}
        </div>
    </div>
);
// Updated main PDF report component with proper page break control
const PDFReportTemplate = forwardRef(({
    reelsData = {},
    wrongMatchData = {},
    reprocessData = {},
    userData = {},
    filterDisplay = ''
}, ref) => {
    // Format the current date for the report header
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const reelsDashboardData = {
        TotalReels: reelsData.total_reels || 0,
        MatchReels: reelsData.match_reels || 0,
        MisMatchReels: reelsData.mismatch_reels || 0,
        WrongMisMatch: reelsData.wrong_mismatch_reels || 0
    };

    const reprocessByDay = reprocessData || {};
    const totalReprocess = Object.values(reprocessByDay).reduce(
        (sum, val) => sum + Number(val || 0),
        0
    );
    const formattedReprocessData = {
        total_reprocess: totalReprocess,
        reprocess_by_day: reprocessByDay
    };

    return (
        <div className="pdf-report-container" ref={ref}>
            {/* First page content */}
            <div className="pdf-page">
                <ReportHeader formattedDate={formattedDate} filterDisplay={filterDisplay} />

                <div className="pdf-report-content">
                    <Row className="pdf-row">
                        <Col md={7} className="pdf-col">
                            <PDFComplianceChart data={reelsData} />
                        </Col>
                        <Col md={5} className="pdf-col">
                            <PDFAlertChart data={wrongMatchData} />
                        </Col>
                    </Row>

                    <Row className="pdf-section pdf-row">
                        <Col md={12} className="pdf-col">
                            <PDFReprocessChart data={formattedReprocessData} />
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Second page content with proper page break and header */}
            <div className="pdf-page page-break-before">
                <ReportHeadertwo formattedDate={formattedDate} filterDisplay={filterDisplay} />
                
                <div className="pdf-report-content">
                    <Row className="pdf-section pdf-row">
                        <Col md={12} className="pdf-col">
                            <PDFReelsDashboard data={reelsDashboardData} />
                        </Col>
                    </Row>

                    <Row className="pdf-section pdf-row pdf-user-actions-section">
                        <Col md={12} className="pdf-col">
                            <h3 className="pdf-section-title">User Actions</h3>
                            <PDFUserActivity userData={userData} />
                        </Col>
                    </Row>
                </div>

                <div className="pdf-report-footer">
                    <p>© {today.getFullYear()} TetraPak AI Inspection System</p>
                    <p>Confidential and Proprietary</p>
                </div>
            </div>
        </div>
    );
});

export default PDFReportTemplate;
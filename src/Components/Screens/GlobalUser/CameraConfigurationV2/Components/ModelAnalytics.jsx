import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  ButtonGroup,
} from 'reactstrap';
import { useWeekFilter } from '../../../../../Contexts/WeakGlobal';
import filter from '../../../../../assets/fonts/feather/filter.svg';
import { use } from 'react';

const ModelAnalyticsHeader = ({
  heading,
  headingstyle,
  hideWeekText = false,
  alertText = false,
  currentWeekDisable = false,
  currentWeek = true,
  shifts = true,
  months = true,
  modules = true,
  severity = true,
  areas = true,
  timeFilterOption = false,
  showActions = true,
  multiShift = false,
  onAccept,
  onReset,
  heatmapPayload = null
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    currentFilter,
    setCurrentFilter,
    selectedWeek,
    selectedMonth,
    selectedShift,
    setSelectedWeek,
    setSelectedMonth,
    setSelectedShift,
    setCurrentweekForLeaderBoard,
  } = useWeekFilter();

  const [selectedModule, setSelectedModule] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectmultishift, setSelectMultiShift] = useState([]);
  const [timeFilterSelection, setTimeFilterSelection] = useState('week');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const moduleOptions = ['Helmet', 'Boots', 'Glasses', 'Mask', 'Gloves'];
  const severityOptions = ['High', 'Medium-Plus', 'Medium'];
  const areaOptions = ['Gate 1', 'Gate 2', 'Gate 3', 'Gate 4', 'Gate 5', 'Gate 6', 'Gate 7'];

  const getCurrentWeek = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfWeek = oneJan.getDay();
    const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
    const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
    const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
}
  //custom and all event handler
console.log("MY CURRENT WEAK",getCurrentWeek())
  const handleTimeFilterChange = (e) => {
    const newFilterType = e.target.value;
    setTimeFilterSelection(newFilterType);

    // Reset custom dates when switching away from custom
    if (newFilterType !== 'custom') {
      setCustomStartDate('');
      setCustomEndDate('');
    }

    // Reset week/month when switching to different filter type
    if (newFilterType === 'week') {
      setSelectedMonth('');
      setCurrentFilter('week');
      setSelectedWeek(getCurrentWeek());
    } else if (newFilterType === 'month') {
      setSelectedWeek('');
      setCurrentFilter('month');
      setSelectedMonth(getCurrentMonth());
    } else if (newFilterType === 'custom') {
      setSelectedWeek('');
      setSelectedMonth('');
      setCurrentFilter('custom');
    } else if (newFilterType === 'daily') {
      setSelectedWeek('');
      setSelectedMonth('');
      setCurrentFilter('daily');
      setCustomStartDate(""); // Set to today's date
    }
  };

  const handleWeekChange = (e) => {
    setCurrentFilter('week');
    setSelectedWeek(e.target.value);
    setSelectedMonth(null);
  };

  const handleMonthChange = (e) => {
    setCurrentFilter('month');
    setSelectedMonth(e.target.value);
    setSelectedWeek(null);
  };

  const handleShiftChange = (shift) => {
    setSelectedShift(selectedShift === shift ? null : shift);
  };
  const handleMultiShiftChange = (shift) => {
    setSelectMultiShift((prevShifts) => {
      if (prevShifts.includes(shift)) {
        // Remove shift if already selected
        return prevShifts.filter((s) => s !== shift);
      } else {
        // Add shift if not selected
        return [...prevShifts, shift];
      }
    });
  };
  //accept

  const handleReset = () => {
    setSelectedModule('');
    setSelectedSeverity('');
    setSelectedArea([]);
    setSelectMultiShift([]);
    setSelectedShift(null);
    setSelectedWeek(getCurrentWeek());
    setSelectedMonth('');
    setCustomStartDate('');
    setCustomEndDate('');
    setTimeFilterSelection('week');
    setCurrentFilter('week');
    setCurrentweekForLeaderBoard(getCurrentWeek());
    

    console.log("Reset triggered:");
    console.log("Selected Week:", getCurrentWeek());
    console.log("Current Filter:", currentFilter); // Check if it's staying on 'week'

    if (onReset) onReset();
  };

  const handleAccept = () => {
    if (onAccept) {
      const areaToNumber = (area) => {
        if (!area) return [];
        const gateNumber = parseInt(area.replace('Gate ', ''));
        return [gateNumber];
      };

      const payload = {
        module: selectedModule,
        severity: selectedSeverity,
        subarea: areaToNumber(selectedArea),
        // Handle single shift and multi-shift separately
        shift: multiShift ? selectmultishift : selectedShift ? selectedShift : null,
        multiShift: multiShift ? selectmultishift : [], // Only include multiShift when the feature is enabled
        week: selectedWeek,
        month: selectedMonth,
        customStartDate,
        customEndDate,
        filter: currentFilter,
        timeFilterSelection
      };
      console.log('Sending payload with shift configuration:', {
        isMultiShift: multiShift,
        selectedShift,
        selectmultishift,
        finalPayload: payload
      });
      onAccept(payload);
    }
  };
  const getDisplayHeading = () => {
    if (hideWeekText) return heading;

    let timeFilter = '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();

    if (currentFilter === 'week') {
      // Handle week filter reset case
      if (!selectedWeek) {
        const currentWeekValue = getCurrentWeek();
        timeFilter = currentWeekValue;
      } else {
        timeFilter = selectedWeek;
      }
    } else if (currentFilter === 'month') {
      // Handle month filter reset case
      if (!selectedMonth) {
        timeFilter = `${now.getFullYear()}-${monthNames[now.getMonth()]}`;
      } else {
        const date = new Date(selectedMonth);
        timeFilter = `${date.getFullYear()}-${monthNames[date.getMonth()]}`;
      }
    }else if (currentFilter === 'daily') {
    if (customStartDate) {
      const date = new Date(customStartDate);
      timeFilter = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      timeFilter = getCurrentWeek();
    }
  } else if (timeFilterSelection === 'custom' && customStartDate && customEndDate) {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      timeFilter = `${monthNames[startDate.getMonth()]} ${startDate.getDate()} to ${monthNames[endDate.getMonth()]} ${endDate.getDate()}`;
    } else {
      // Default case when no filter is explicitly set
      if (timeFilterSelection === 'week' || currentFilter === 'week') {
        timeFilter = getCurrentWeek();
      } else {
        timeFilter = `${now.getFullYear()}-${monthNames[now.getMonth()]}`;
      }
    }

    return `${heading} - ${timeFilter}`;
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const shouldShowFilters = currentWeek || months || shifts || modules || severity || areas || timeFilterOption || multiShift;

  return (
    <>
      <style>
        {`
          @keyframes expandButton {
            0% { transform: scale(1); }
            50% { transform: scale(1.12); }  
            100% { transform: scale(1); }
          }
          .filter-dropdown .btn-primary {
            background-color: #023F88 !important;
            border-color: #023F88!important;
            font-size: 16px;
            transition: all 0.3s ease;
          }
          
          .filter-dropdown .btn-primary:active {
            animation: expandButton 1s ease;  
          }

          .filter-dropdown.show .btn-primary {
            animation: expandButton 1s ease;
          }
      
          .filter-dropdown img {
            margin-left: 8px;
            transition: transform 0.3s ease;
          }

          .filter-dropdown.show img {
            transform: rotate(360deg);
          }

          .shift-button:hover {
            background-color: #635470 !important;
            color: white !important;
            opacity: 0.8;
            border:1px #635470 !important;
          }

          .filter-select {
            margin-bottom: 1rem;
            border-color: #635470;
          }

          .dropdown-menu-container {
            max-height: 350px;
            overflow-y: auto;
          }

          .dropdown-menu-container::-webkit-scrollbar {
            width: 6px;
          }

          .dropdown-menu-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }

          .dropdown-menu-container::-webkit-scrollbar-thumb {
            background: #635470;
            border-radius: 3px;
          }

          .dropdown-menu-container::-webkit-scrollbar-thumb:hover {
            background: #534460;
          }

          .action-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #dee2e6;
          }

        @media (max-width: 490px) {
           .header-container {
             flex-direction: column;
        }
           .week-selector {
             margin-top: 10px !important;
            width: auto !important;
          }
           .heading {
            font-size: 21px !important;
            text-wrap: nowrap;
          }
          .subheading {
            font-size: 18px !important;
            text-wrap: nowrap;
            font-weight: 500;
          }
          .filter-dropdown .btn-primary {
            font-size: 14px;
          }
          .filter-dropdown img {
            width: 14px;
            height: 14px;
            margin-left: 4px;
          }
          .dropdown{
            display:flex !important;
            flex-direction:column !important;
            align-items:flex-start !important;
            margin-top:7px !important;
          }        
        }
      `}
      </style>


      <Container fluid >
        <Row className="py-2 pb-2 mb-3 shadow-sm " style={{backgroundColor:"#FFFFFF",borderRadius:"10px",width:"100%",marginLeft:"0px"}}>
          <Col className="d-flex align-items-center justify-content-between  dropdown">

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
              <h5 className="mb-0 heading " style={{ fontSize: "19px" }}>{getDisplayHeading()}</h5>
              <p className="mb-0 subheading" style={{ fontSize: "3vw" }}>{alertText}</p>
            </div>
            {shouldShowFilters && (

              <Dropdown
                isOpen={dropdownOpen}
                className='filter-dropdown bg-white rounded'
                toggle={() => setDropdownOpen(!dropdownOpen)}
                style={{ border: "1px solid #ECECEC" }}
              >
                <DropdownToggle className='ml-2' color="primary" style={{ textWrap: "nowrap" }}>
                  Filters<img src={filter} />
                </DropdownToggle>
                <DropdownMenu end className="p-3" style={{ minWidth: '300px' }}>
                  <div className="dropdown-menu-container">
                    <div className="px-1">
                      {modules && (
                        <div className="mb-1">
                          <Label for="moduleSelect" className="form-label">Select Module</Label>
                          <Input
                            type="select"
                            id="moduleSelect"
                            className="filter-select"
                            value={selectedModule}
                            onChange={(e) => setSelectedModule(e.target.value)}
                          >
                            <option value="">Select Module</option>
                            {moduleOptions.map(module => (
                              <option key={module} value={module}>{module}</option>
                            ))}
                          </Input>
                        </div>
                      )}

                      {severity && (
                        <div className="mb-1">
                          <Label for="severitySelect" className="form-label">Select Severity</Label>
                          <Input
                            type="select"
                            id="severitySelect"
                            className="filter-select"
                            value={selectedSeverity}
                            onChange={(e) => setSelectedSeverity(e.target.value)}
                          >
                            <option value="">Select Severity</option>
                            {severityOptions.map(severity => (
                              <option key={severity} value={severity}>{severity}</option>
                            ))}
                          </Input>
                        </div>
                      )}

                      {areas && (
                        <div className="mb-1">
                          <Label for="areaSelect" className="form-label">Select Sub Area</Label>
                          <Input
                            type="select"
                            id="areaSelect"
                            className="filter-select"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                          >
                            <option value="">Select Sub Area</option>
                            {areaOptions.map(area => (
                              <option key={area} value={area}>{area}</option>
                            ))}
                          </Input>
                        </div>
                      )}

                      {timeFilterOption ? (
                        <>
                          <div className="mb-1">
                            <Label for="timeFilterSelection" className="form-label">Time Filter</Label>
                            <Input
                              type="select"
                              id="timeFilterSelection"
                              className="filter-select"
                              value={timeFilterSelection}
                              onChange={handleTimeFilterChange}
                            >
                              <option value="week">Week</option>
                              <option value="month">Month</option>
                              <option value="custom">Custom</option>
                              <option value="daily">Daily</option>
                            </Input>
                          </div>

                          {timeFilterSelection === 'week' && (
                            <div className="mb-1">
                              <Label for="weekSelect" className="form-label">Select Week</Label>
                              <Input
                                style={{ borderColor: '#635470' }}
                                type="week"
                                id="weekSelect"
                                value={selectedWeek || ''}
                                onChange={handleWeekChange}
                                min="2024-W01"
                                max={getCurrentWeek()}
                              />
                            </div>
                          )}

                          {timeFilterSelection === 'month' && (
                            <div className="mb-1">
                              <Label for="monthSelect" className="form-label">Select Month</Label>
                              <Input
                                style={{ borderColor: '#635470' }}
                                type="month"
                                id="monthSelect"
                                value={selectedMonth || ""}
                                onChange={handleMonthChange}
                                min="2024-01"
                                max={getCurrentMonth()}
                              />
                            </div>
                          )}

                          {timeFilterSelection === 'custom' && (
                            <div className="mb-1">
                              <Label for="customStartDate" className="form-label">Start Date</Label>
                              <Input
                                style={{ borderColor: '#635470' }}
                                type="date"
                                id="customStartDate"
                                value={customStartDate}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                              />
                              <Label for="customEndDate" className="form-label mt-2">End Date</Label>
                              <Input
                                style={{ borderColor: '#635470' }}
                                type="date"
                                id="customEndDate"
                                value={customEndDate}
                                onChange={(e) => setCustomEndDate(e.target.value)}
                              />
                            </div>
                          )}
                          {timeFilterSelection === 'daily' && (
                            <div className="mb-1">
                              <Label for="dailySelect" className="form-label">Select Date</Label>
                              <Input
                                style={{ borderColor: '#635470' }}
                                type="date"
                                id="dailySelect"
                                value={customStartDate || ''}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]} // Restrict to today or earlier
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {currentWeek && (
                            <div className="mb-1">
                              <Label for="weekSelect" className="form-label">Select Week</Label>
                              <Input
                                style={{ borderColor: '#635470' }}
                                type="week"
                                id="weekSelect"
                                value={selectedWeek || ''}
                                onChange={handleWeekChange}
                                min="2024-W01"
                                max={getCurrentWeek()}
                              />
                            </div>
                          )}

                          {months && (
                            <div className="mb-1">
                              <Label for="monthSelect" className="form-label">Select Month</Label>
                              <Input
                                style={{ borderColor: '#635470' }}
                                type="month"
                                id="monthSelect"
                                value={selectedMonth || ""}
                                onChange={handleMonthChange}
                                min="2024-01"
                                max={getCurrentMonth()}
                              />
                            </div>
                          )}
                        </>
                      )}

                      {shifts && (
                        <div className="mb-1">
                          <Label className="form-label">Select Shift</Label>
                          <ButtonGroup className="d-flex">
                            {['Shift A', 'Shift B', 'Shift C'].map((shift) => (
                              <Button
                                key={shift}
                                style={{
                                  backgroundColor: selectedShift === shift ? '#635470' : 'white',
                                  color: selectedShift === shift ? '#fff' : '#635470',
                                  borderColor: '#635470',
                                  textWrap: "nowrap"
                                }}
                                className="flex-grow-1 shift-button"
                                outline={selectedShift !== shift}
                                onClick={() => handleShiftChange(shift)}
                              >
                                {shift}
                              </Button>
                            ))}
                          </ButtonGroup>
                        </div>
                      )}

                      {multiShift && (
                        <div className="mb-1">
                          <Label className="form-label">Select Shift</Label>
                          <ButtonGroup className="d-flex">
                            {['Shift A', 'Shift B', 'Shift C'].map((shift) => (
                              <Button
                                key={shift}
                                style={{
                                  backgroundColor: selectmultishift.includes(shift) ? '#635470' : 'white',
                                  color: selectmultishift.includes(shift) ? '#fff' : '#635470',
                                  borderColor: '#635470',
                                  textWrap: "nowrap",
                                }}
                                className="flex-grow-1 shift-button"
                                outline={!selectmultishift.includes(shift)}
                                onClick={() => handleMultiShiftChange(shift)}
                              >
                                {shift}
                              </Button>
                            ))}
                          </ButtonGroup>
                        </div>
                      )}

                      {showActions && (
                        <div className="action-buttons">
                          {/* <Button
                            color="secondary"
                            onClick={handleReset}
                            outline
                            style={{color:'red',border:'1px solid red'}}
                          >
                            Reset
                          </Button> */}
                          <button className='btn' style={{ color: 'red', border: '1px solid red' }} onClick={handleReset}>
                            Reset
                          </button>
                          <Button
                            color="primary"
                            onClick={handleAccept}
                            style={{
                              backgroundColor: '#635470',
                              borderColor: '#635470'
                            }}
                          >
                            Accept
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </DropdownMenu>
              </Dropdown>

            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ModelAnalyticsHeader;

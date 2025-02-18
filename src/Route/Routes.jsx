// super admin
// import Default from "../Components/Dashboards/Dashboard/Default";
// import ItSupport from "../Components/Dashboards/Dashboard/itSupport";
// import LiveCamera from "../Components/Dashboards/Dashboard/liveCamera/liveCamera"
import SuperDashboard from "../Components/Dashboards/Super Admin Dashboard/Pages/Dashboard";
import ActivityMonitor from "../Components/Dashboards/Super Admin Dashboard/Pages/Activity_Monitor";
import Permissions from "../Components/Dashboards/Super Admin Dashboard/Pages/Permissions";
import Role from "../Components/Dashboards/Super Admin Dashboard/Pages/Role";
import Logs from "../Components/Dashboards/Super Admin Dashboard/Pages/Logs";
import DetailLog from "../Components/Dashboards/Super Admin Dashboard/Pages/DetailLog";
import Dashboardd from "../Components/Dashboards/Super Admin Dashboard/Pages/Dashboardd";
import CameraStatusIt from "../Components/Dashboards/ItDashboard/It Officer/Pages/CameraStatusIt";



//Global
import Default from "../Components/Dashboards/GlobalDashboard/Default/Default"
// import GlobalReports from "../Components/Dashboards/GlobalDashboard/reports";
// import GlobalItSupport from "../Components/Dashboards/GlobalDashboard/itSupport";
// import GlobalUsers from '../Components/Dashboards/GlobalDashboard/users/';
import GlobalLiveCamera from "../Components/Dashboards/GlobalDashboard/liveCamera/liveCamera";
// import PpeModule from '../Components/Dashboards/GlobalDashboard/ppeModule/Index';
import EmergencyExit from '../Components/Dashboards/GlobalDashboard/emergencyExit/Index';
// import MachineGuard from '../Components/Dashboards/GlobalDashboard/machineGuard/Index';
// import VehicleEntrance from '../Components/Dashboards/GlobalDashboard/truckMonitoring/vehicleEntrance/Index';
// import VehicleExit from '../Components/Dashboards/GlobalDashboard/truckMonitoring/vehicleExit/Index';
// import VehicleStatus from '../Components/Dashboards/GlobalDashboard/truckMonitoring/vehicleStatus/Index';
// import AddCompany from "../Components/Dashboards/GlobalDashboard/factoryWiseReports/addFactory/AddCompany";
// import AddArea from "../Components/Dashboards/GlobalDashboard/AreawiseReports/addArea/AddArea";

import GlobalLiveAnalytics from '../Components/Screens/GlobalUser/LiveAnalytics/live_analytics';
import GlobalAIModelAndReports from '../Components/Screens/GlobalUser/AIModelReports/model_and_reports';
import GlobalTargetAndControls from '../Components/Screens/GlobalUser/TargetsAndControls/targets_and_controls';
import GlobalLiveAlerts from '../Components/Screens/GlobalUser/LiveAlerts/live_alerts';
import GlobalCameraConfigurations from '../Components/Screens/GlobalUser/CameraConfigurations/camera_configurations';
import GlobalAllCamera from '../Components/Screens/GlobalUser/CameraConfigurations/cameras_table';
import GlobalSupportAndTickets from '../Components/Screens/GlobalUser/SupportAndTickets/support_and_tickets';
import GlobalDocumentationandFAQs from '../Components/Screens/GlobalUser/SupportAndTickets/Documentation_FAQs'
import NewPageLiveAnalytics from '../Components/Screens/GlobalUser/LiveAnalytics/New_Page_Live_Analytics';
import SupportAndTicketsScreenV2 from "../Components/Screens/GlobalUser/SupportAndTicketss/support_and_tickets"; 
import CameraDashboard from '../Components/Screens/GlobalUser/CameraConfigurationV2/CameraDashboard'
import TargetControl from '../Components/Screens/GlobalUser/Target and Controal V2/TargetControl'
import LeaderBoardV2 from "../Components/Screens/GlobalUser/LeaderBoard V2/LeaderBoard"
import HeatAlertAxen from "../Components/Screens/GlobalUser/LiveAlertsV2/AlertHeatMap";

//Company
import FactoryDashboard from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryDashboard";
import CameraFeed from "../Components/Dashboards/CompanyDashbaord/Pages/CameraFeed";
import LiveAlerts from "../Components/Dashboards/CompanyDashbaord/Pages/LiveAlerts";
import FactoryNotications from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryNotifications";
import FactoryContactusPage from "../Components/Dashboards/CompanyDashbaord/Pages/factoryContactusPage";
import FactoryDailyReport from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryDailyReport";
import FactoryWeeklyReport from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryWeeklyReport";
import FactoryMonthlyReport from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryMonthlyReport";
import FactoryYearlyReport from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryYearlyReport";
import FactoryPPEModal from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryPPEModule";
import FactoryEmergencyExit from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryEmergencyExit";
import FactoryMachineGuard from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryMachineGuard";

//Area
import AreaDefault from "../Components/Dashboards/AreaDashbaord/Default/Index"
import AreaReports from "../Components/Dashboards/AreaDashbaord/reports/Index";
import AreaItSupport from "../Components/Dashboards/AreaDashbaord/itSupport/Index";
import AreaUsers from '../Components/Dashboards/AreaDashbaord/users/Index'
import AreaLiveCamera from "../Components/Dashboards/AreaDashbaord/liveCamera/Index";
import AreaSupportTickets from '../Components/Dashboards/AreaDashbaord/Support/Area_Support_tickets'
import LiveAlertsNewDesign from "../Components/Dashboards/AreaDashbaord/reports/Live_Alerts_New/index";

//Tech Qa
import QaDefault from "../Components/Dashboards/QaDashbaord/Default/Index"
import QaReports from "../Components/Dashboards/QaDashbaord/reports/Index";
import QaItSupport from "../Components/Dashboards/QaDashbaord/itSupport/Index";
import QaUsers from '../Components/Dashboards/QaDashbaord/users/Index'
import QaLiveCamera from "../Components/Dashboards/QaDashbaord/liveCamera/Index";

//It-support
// import ItDefault from "../Components/Dashboards/ItDashboard/Default/Index";
// import ItReports from "../Components/Dashboards/ItDashboard/reports/Index";
// import ItItSupport from "../Components/Dashboards/ItDashboard/itSupport/Index";
// import ItUsers from '../Components/Dashboards/ItDashboard/users/Index';
// import ItLiveCamera from "../Components/Dashboards/ItDashboard/liveCamera/Index";
import ItDashboard from "../Components/Dashboards/ItDashboard/It Officer/Pages/ItDashboard";
import ITNotifications from "../Components/Dashboards/ItDashboard/It Officer/Pages/ITNotifications";
import ItSupports from "../Components/Dashboards/ItDashboard/It Officer/Pages/ItSupport";
import ItLogs from "../Components/Dashboards/ItDashboard/It Officer/Pages/ItLogs";
import ITDetailLogs from "../Components/Dashboards/ItDashboard/It Officer/Pages/ITDetailLogs";
import FactoryFolklift from "../Components/Dashboards/CompanyDashbaord/Pages/FactoryFolklift";
import Production from "../Components/Dashboards/GlobalDashboard/AreawiseReports/production/Production";
import WareHouse from "../Components/Dashboards/GlobalDashboard/AreawiseReports/warehouse/WareHouse";
import Distribution from "../Components/Dashboards/GlobalDashboard/AreawiseReports/Distribution/Distribution";
import ContactSupport from "../Components/Dashboards/GlobalDashboard/contactSupport/ContactSupport";
import FactoryOne from "../Components/Dashboards/GlobalDashboard/factoryWiseReports/factoryOne/FactoryOne";
import FactoryTwo from "../Components/Dashboards/GlobalDashboard/factoryWiseReports/factoryTwo/FactoryTwo";
import FactoryThree from "../Components/Dashboards/GlobalDashboard/factoryWiseReports/factoryThree/FactoryThree";
import AddAlert from "../Components/Dashboards/CompanyDashbaord/Pages/AddAlert";
import Allcameras from "../Components/Dashboards/AreaDashbaord/allCameras/Allcameras";
import AddUser from "../Components/Dashboards/ItDashboard/It Officer/Pages/AddUser";
import LeaderBoard from "../Components/Screens/GlobalUser/LeaderBoard/Leader_Board";
import AddCamera from "../Components/Screens/GlobalUser/CameraConfigurations/AddCamera";
import EditCamera from "../Components/Screens/GlobalUser/CameraConfigurations/edit_camera";
import AiModelAndReports from "../Components/Dashboards/AreaDashbaord/areaReports/AiModelAndReports";
import TargetsAndControls from "../Components/Dashboards/AreaDashbaord/targetsAndControls/TargetsAndControls";
import ConnectedCameras from "../Components/Dashboards/AreaDashbaord/connectedCameras/ConnectedCameras";
import GlobalAIReport from "../Components/Screens/GlobalUser/AIModelReports/GlobalAIReport";
import AreaAnalysis from "../Components/Screens/AreaAnalysis/Area_Analysis";
import SpecificAreaDetails from "../Components/Screens/AreaAnalysis/Specific_Area_Details";
import SubAreaAnalysis from "../Components/Screens/AreaAnalysis/SubAreaAnalysis";
import AddFactory from "../Components/Dashboards/ItDashboard/It Officer/Pages/AddFactory";
import AllFactories from "../Components/Dashboards/ItDashboard/It Officer/Pages/AllFactories";
import ModuleTable from "../Components/Screens/GlobalUser/AIModelReports/Components/ModuleTable";
import New_Design_Area_Analysis from "../Components/Screens/AreaAnalysis/NewDesigns/New_Design_Area_Analysis";
import NewSubareaAnalysis from "../Components/Screens/AreaAnalysis/NewDesigns/NewSubareaAnalysis";
import AreaAnalysisDetails from "../Components/Dashboards/AreaDashbaord/reports/AreaAnalysisDetails";
import SubAreaAnalysisDetails from "../Components/Dashboards/AreaDashbaord/reports/SubAreaAnalysisDetails";
import HeatMapDetails from "../Components/Dashboards/AreaDashbaord/reports/HeatMapDetails";
import Area_Analysis_new from "../Components/Screens/AreaAnalysis/Area_Analysis_new";
import SummaryForGlobal from "../Components/Screens/GlobalUser/Summary/SummaryForGlobal";
import LiveAnalyticsScreen from "../Components/Screens/GlobalUser/LiveAnalytics/LiveAnalyticsNewDesignV2";

//axens routes
import AxenLiveAnalytics from "../Components/Screens/GlobalUser/LiveAnalyticsAxens/LiveAnalyticsAxens";
import LiveAlertAxen from "../Components/Screens/GlobalUser/LiveAlertsV2/LiveAlertAxen"; 

 
export const routes = {
  // superAdmin
  'super-admin': [
    // {path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <Default /> },
    // {path: `${process.env.PUBLIC_URL}/dashboard/reports`, Component: <Reports />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/support`, Component: <ItSupport />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/users`, Component: <Users />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, Component: <LiveCamera />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <SuperDashboard />},
    
    { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <Dashboardd /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/activitymonitor`, Component: <ActivityMonitor /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/permissions`, Component: <Permissions /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/role`, Component: <Role /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/logs`, Component: <Logs /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/logs/Details`, Component: <DetailLog /> },
  ],
  //Global
  'factory': [
     { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <LiveAnalyticsScreen /> },
    
    { path: `${process.env.PUBLIC_URL}/dashboard/summary`, Component: <SummaryForGlobal /> },
    //{ path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <AxenLiveAnalytics/> },
    //{ path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <LiveAnalyticsScreen /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <GlobalLiveAnalytics /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/default/alerts`, Component: <HeatMapDetails /> },
    { path: `${process.env.PUBLIC_URL}/reports`, Component: <GlobalAIReport /> },
    { path: `${process.env.PUBLIC_URL}/moduleInfo`, Component: <ModuleTable /> },
    { path: `${process.env.PUBLIC_URL}/targets`, Component: <GlobalTargetAndControls /> },
    { path: `${process.env.PUBLIC_URL}/newtargets`, Component:<TargetControl /> },
    //{ path: `${process.env.PUBLIC_URL}/live_alerts`, Component:<AreaReports /> },
    { path: `${process.env.PUBLIC_URL}/live_alert`, Component:<HeatAlertAxen/> },
    { path: `${process.env.PUBLIC_URL}/live_alerts`, Component:<LiveAlertAxen/> },
    
    { path: `${process.env.PUBLIC_URL}/camera_configuration`, Component: <GlobalAllCamera /> },
    { path: `${process.env.PUBLIC_URL}/support`, Component: <SupportAndTicketsScreenV2 /> }, 
    // { path: `${process.env.PUBLIC_URL}/support`, Component: <GlobalSupportAndTickets /> },
    //{ path: `${process.env.PUBLIC_URL}/camera_configuration`, Component: <CameraDashboard/> },
    // { path: `${process.env.PUBLIC_URL}/support`, Component: <GlobalSupportAndTickets /> },

    // this path created by sheheryar for documentation and FAQs page 
    { path: `${process.env.PUBLIC_URL}/support/documentationfaqs`, Component: <GlobalDocumentationandFAQs /> },
    // this path created by sheheryar for LeaderBoard
    // { path: `${process.env.PUBLIC_URL}/leaderboard`, Component: <LeaderBoard /> },
    { path: `${process.env.PUBLIC_URL}/leaderboard`, Component: <LeaderBoardV2 /> },
    { path: `${process.env.PUBLIC_URL}/newleaderboard`, Component: <LeaderBoardV2/> },
    // { path: `${process.env.PUBLIC_URL}/areaanalysis`, Component: <AreaAnalysis /> },
    { path: `${process.env.PUBLIC_URL}/areaanalysis`, Component: <Area_Analysis_new /> },
    { path: `${process.env.PUBLIC_URL}/areaanalysis/alerts/:id`, Component: <AreaAnalysisDetails /> },
    { path: `${process.env.PUBLIC_URL}/sub-area-analysis`, Component: <SubAreaAnalysis /> },
    { path: `${process.env.PUBLIC_URL}/sub-area-analysis/alerts`, Component: <SubAreaAnalysisDetails /> },
    { path: `${process.env.PUBLIC_URL}/areaanalysis/details/:id`, Component: <SpecificAreaDetails /> },
    { path: `${process.env.PUBLIC_URL}/liveanalytics/newdesign`, Component: <NewPageLiveAnalytics /> },
    { path: `${process.env.PUBLIC_URL}/livealert/newdesign`, Component: < LiveAlertsNewDesign/> },
    // { path: `${process.env.PUBLIC_URL}/area-analysis/newdesign`, Component: < New_Design_Area_Analysis/> },
    { path: `${process.env.PUBLIC_URL}/area-analysis/newdesign`, Component: <Area_Analysis_new /> },
    { path: `${process.env.PUBLIC_URL}/sub-area-analysis/newdesign`, Component: < NewSubareaAnalysis/> },

    // { path: `${process.env.PUBLIC_URL}/dashboard/reports`, Component: <GlobalReports /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/support-it`, Component: <GlobalItSupport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/users`, Component: <GlobalUsers /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, Component: <GlobalLiveCamera /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/ppe-module`, Component: <PpeModule /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-exit`, Component: <EmergencyExit /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard`, Component: <MachineGuard /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-entrance`, Component: <VehicleEntrance /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-exit`, Component: <VehicleExit /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-status`, Component: <VehicleStatus /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/dailyreport`, Component: <FactoryDailyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/weelkyreport`, Component: <FactoryWeeklyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/monthlyreport`, Component: <FactoryMonthlyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/yearlyreport`, Component: <FactoryYearlyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/production`, Component: <Production /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/warehouse`, Component: <WareHouse /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/distribution`, Component: <Distribution /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/contact-support`, Component: <ContactSupport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/forklift`, Component: <FactoryFolklift /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/factory-one`, Component: <FactoryOne /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/factory-two`, Component: <FactoryTwo /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/factory-three`, Component: <FactoryThree /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/factory-three`, Component: <FactoryThree /> },

    // { path: `${process.env.PUBLIC_URL}/dashboard/add-factory`, Component: <AddCompany /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/add-area`, Component: <AddArea /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/add-alerts`, Component: <AddAlert /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/live-alerts`, Component: <LiveAlerts /> },
    // {path: `${process.env.PUBLIC_URL}/dashboard/emergency-alerts`, Component: <LiveAlerts />  },
    // {path: `${process.env.PUBLIC_URL}/dashboard/machine-guard-alerts`, Component: <LiveAlerts />  },
    // {path: `${process.env.PUBLIC_URL}/dashboard/forklift-alerts`, Component: <LiveAlerts />  },


  ],
  'global': [
    // {path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <CompanyDefault /> },
    // {path: `${process.env.PUBLIC_URL}/dashboard/reports`, Component: <CompanyReports />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/support`, Component: <CompanyItSupport />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/users`, Component: <CompanyUsers />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, Component: <CompanyLiveCamera />},
    { path: `${process.env.PUBLIC_URL}/dashboard/summary`, Component: <SummaryForGlobal /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <GlobalLiveAnalytics /> },
    
    { path: `${process.env.PUBLIC_URL}/dashboard/default/alerts`, Component: <HeatMapDetails /> },
    { path: `${process.env.PUBLIC_URL}/reports`, Component: <GlobalAIReport /> },
    { path: `${process.env.PUBLIC_URL}/moduleInfo`, Component: <ModuleTable /> },
    { path: `${process.env.PUBLIC_URL}/targets`, Component: <GlobalTargetAndControls /> },
    { path: `${process.env.PUBLIC_URL}/newtargets`, Component:<TargetControl /> },
    { path: `${process.env.PUBLIC_URL}/live_alerts`, Component:<AreaReports /> },
    { path: `${process.env.PUBLIC_URL}/camera_configuration`, Component: <GlobalAllCamera /> },
    { path: `${process.env.PUBLIC_URL}/support`, Component: <GlobalSupportAndTickets /> },
    { path: `${process.env.PUBLIC_URL}/newcamera_configuration`, Component: <CameraDashboard/> },
    // { path: `${process.env.PUBLIC_URL}/support`, Component: <GlobalSupportAndTickets /> },

    // this path created by sheheryar for documentation and FAQs page 
    { path: `${process.env.PUBLIC_URL}/support/documentationfaqs`, Component: <GlobalDocumentationandFAQs /> },
    // this path created by sheheryar for LeaderBoard
    { path: `${process.env.PUBLIC_URL}/leaderboard`, Component: <LeaderBoard /> },
    { path: `${process.env.PUBLIC_URL}/newleaderboard`, Component: <LeaderBoardV2/> },
    { path: `${process.env.PUBLIC_URL}/areaanalysis`, Component: <AreaAnalysis /> },
    { path: `${process.env.PUBLIC_URL}/areaanalysis/alerts/:id`, Component: <AreaAnalysisDetails /> },
    { path: `${process.env.PUBLIC_URL}/sub-area-analysis`, Component: <SubAreaAnalysis /> },
    { path: `${process.env.PUBLIC_URL}/sub-area-analysis/alerts`, Component: <SubAreaAnalysisDetails /> },
    { path: `${process.env.PUBLIC_URL}/areaanalysis/details/:id`, Component: <SpecificAreaDetails /> },
    { path: `${process.env.PUBLIC_URL}/liveanalytics/newdesign`, Component: <NewPageLiveAnalytics /> },
    { path: `${process.env.PUBLIC_URL}/livealert/newdesign`, Component: < LiveAlertsNewDesign/> },
    { path: `${process.env.PUBLIC_URL}/area-analysis/newdesign`, Component: < New_Design_Area_Analysis/> },
    { path: `${process.env.PUBLIC_URL}/area-analysis/newdesignn`, Component: <Area_Analysis_new /> },
    { path: `${process.env.PUBLIC_URL}/sub-area-analysis/newdesign`, Component: < NewSubareaAnalysis/> },

    // { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <FactoryDashboard /> },
    // {path: `${process.env.PUBLIC_URL}/dashboard/camerafeed`, Component: <CameraFeed /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/camerafeed`, Component: <GlobalLiveCamera /> },
    // {path: `${process.env.PUBLIC_URL}/dashboard/camerafeed`, Component: <CameraFeed /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/camerafeed`, Component: <GlobalLiveCamera /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/notifications`, Component: <FactoryNotications /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/factorycontactus`, Component: <FactoryContactusPage /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/dailyreport`, Component: <FactoryDailyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/weeklyreport`, Component: <FactoryWeeklyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/weeklyreport`, Component: <FactoryWeeklyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/monthlyreport`, Component: <FactoryMonthlyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/yearlyreport`, Component: <FactoryYearlyReport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/ppemodule`, Component: <FactoryPPEModal /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/emergencyexit`, Component: <FactoryEmergencyExit /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/forklift`, Component: <FactoryFolklift /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/machineguard`, Component: <FactoryMachineGuard /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-exit`, Component: <EmergencyExit /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/production`, Component: <Production /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/warehouse`, Component: <WareHouse /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/distribution`, Component: <Distribution /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/contact-support`, Component: <ContactSupport /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/live-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/add-alerts`, Component: <AddAlert /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/ppe-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/forklift-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/ppe-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/forklift-alerts`, Component: <LiveAlerts /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/weelkyreport`, Component: <FactoryWeeklyReport /> },
  ],
  'area': [
    { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <AreaDefault /> },
    // { path: `${process.env.PUBLIC_URL}/dashboard/reports`, Component: <AreaReports /> },
    { path: `${process.env.PUBLIC_URL}/reports`, Component: <AiModelAndReports /> },
    { path: `${process.env.PUBLIC_URL}/moduleInfo`, Component: <ModuleTable /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/support-it`, Component: <AreaItSupport /> },
    { path: `${process.env.PUBLIC_URL}/targets`, Component: <TargetsAndControls /> },
    { path: `${process.env.PUBLIC_URL}/live_alerts`, Component:<AreaReports /> },
    // { path: `${process.env.PUBLIC_URL}/live_alerts`, Component: <GlobalAIModelAndReports /> },
    // {path: `${process.env.PUBLIC_URL}/dashboard/users`, Component: <AreaUsers />},
    { path: `${process.env.PUBLIC_URL}/dashboard/camera_configuration`, Component:  <ConnectedCameras /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/all-cameras`, Component: <Allcameras /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/ppemodule`, Component: <FactoryPPEModal /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/emergencyexit`, Component: <FactoryEmergencyExit /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/forklife`, Component: <FactoryFolklift /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/machineguard`, Component: <FactoryMachineGuard /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/dailyreport`, Component: <FactoryDailyReport /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/weelkyreport`, Component: <FactoryWeeklyReport /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/monthlyreport`, Component: <FactoryMonthlyReport /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/yearlyreport`, Component: <FactoryYearlyReport /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/support`, Component: <AreaSupportTickets /> },
    // this path created by sheheryar for documentation and FAQs page 
    { path: `${process.env.PUBLIC_URL}/support/documentationfaqs`, Component: <GlobalDocumentationandFAQs /> },

  ],
  'qa': [
    { path: `${process.env.PUBLIC_URL}/dashboard/defaultqa`, Component: <QaDefault /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/reports`, Component: <QaReports /> },
    { path: `${process.env.PUBLIC_URL}/support`, Component: <GlobalSupportAndTickets /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/users`, Component: <QaUsers /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, Component: <QaLiveCamera /> },
    { path: `${process.env.PUBLIC_URL}/support/documentationfaqs`, Component: <GlobalDocumentationandFAQs /> },

  ],
  'it-officer': [
    // {path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <ItDefault /> },
    // {path: `${process.env.PUBLIC_URL}/dashboard/reports`, Component: <ItReports />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/support`, Component: <ItItSupport />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/users`, Component: <ItUsers />},
    // {path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, Component: <ItLiveCamera />},

    { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <ItDashboard /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/notification`, Component: <ITNotifications /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/support`, Component: <ItSupports /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/itlog`, Component: <ItLogs /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/itlog/itDetailslog`, Component: <ITDetailLogs /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/Detaillogs`, Component: <ITDetailLogs /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/add-user`, Component: <AddUser /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/add-factory`, Component: <AddFactory /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/all-factories`, Component: <AllFactories /> },
    { path: `${process.env.PUBLIC_URL}/addcameras`, Component: <AddCamera /> },
    { path: `${process.env.PUBLIC_URL}/update_camera`, Component: <EditCamera /> },
    // { path: `${process.env.PUBLIC_URL}/cameras`, Component: <GlobalAllCamera /> },
    { path: `${process.env.PUBLIC_URL}/cameras`, Component: <CameraStatusIt /> },
  ],
};


import api from "./api";

const AreaService = {
  getAreaDashboard(payload) {
    return api.put(`area/get_area_dashboard`, payload);
  },
  getRecentAlerts(payload) {
    return api.put(`area/get_recent_alerts`, payload);
  },
  getHelmetModule(payload) {
    return api.put(`area/get_helmet_dashboard`, payload);
  },
  getLiveCameras(payload) {
    return api.put(`area/get_live_cameras`, payload);
  },
  getWeeklyAlerts(payload) {
    return api.put(`area/get_weekly_alerts`, payload);
  },
  getMonthlyAlerts(payload) {
    return api.put(`area/get_monthly_alerts`, payload);
  },
  getDurationAlerts(payload) {
    return api.put(`area/get_duration_alerts`, payload);
  },
  //new function for  alerts count;

  getAlertsCount(payload){
    return api.put(`factory_dashboard/get_alerts_count`,payload);
  },
  // getAlltickets() {
  //   return api.get(
  //     `/tickets/get_user_tickets/${
  //       JSON.parse(localStorage.getItem("userData"))?.id || 41
  //     }`
  //   );
  // },
  getAlltickets(payload) {
    return api.put(`/factory_dashboard/get_user_tickets`,payload );
  },
  getAreaUserTickets(payload) { 
    return api.put(`/factory_dashboard/get_user_tickets`,payload);
  },
  generatenewticket(payload) {
    return api.post("tickets/add_ticket", payload);
  },
  editticket(payload) {
    return api.put("tickets/edit_ticket", payload);
  },
  getFilterAlerts(payload) {
    return api.put("/factory_dashboard/get_live_alerts", payload);
  },
  getDataforItTickets() {
    return api.get(`/tickets/get_all_tickets`);
  },
  handleTicketUpdateReq(payload) {
    return api.put(`/tickets/update_ticket_status`, payload);
  }, 
  getAlertsChart(payload) {
    return api.put("/factory_dashboard/compliance_summary", payload);
  },
  getlineChart(payload){
    return api.put("factory_dashboard/alert_trend_live_analytics",payload)
  },
  getAiReportsCards(payload) {
    return api.put(
      "compliance_by_camera/compliance_by_camera_summary",
      payload
    );
  },
  getApprovalAlerts(payload) {
    return api.post("/tech_qa/insert_compliance_accuracy", payload);
  },
  getModelAccuracyChart(payload) {
    return api.put(
      "/tech_qa/compliance_accuracy_fetch",
      payload
    );
  },
  getOperationID(payload) {
    return api.put(
      "/compliance_accuracy_operation_ids/compliance_accuracy_operation_ids",
      payload
    );
  },
  getAllUserForit() {
    return api.get("/users/get_all_Users");
  },
  deleteUserforIT(id) {
    return api.delete(`/users/delete_user/${id}`);
  },
  updateUserStatusIT(id) {
    return api.put(`/users/update_user_status/${id}`);
  },
  getAllFactoriesDataForIT() {
    return api.get("/factory/get_all_factories");
  },
  AdduserIT(payload) {
    return api.post("/users/add_user", payload);
  },
  fetchAllRolesforIT() {
    return api.get("/users/get_all_roles");
  },
  fetchAnalyticsPercentGbl(payload) {
    return api.put(
      "compliance_week_percentage/compliance_week_percentage",
      payload
    );
  },
  // fetchAnalyticsProgressGbl(payload) {
  //   return api.put(
  //     "compliance_gadget_percentage/compliance_gadget_percentage_new",payload
  //   );
  // },
  // fetchAnalyticsProgressGbl() {
  //   return api.put("compliance_gadget_percentage/compliance_gadget_percentage");
  // },
  fetchAnalyticsProgressGbl(payload) {
    return api.put(
      "factory_dashboard/get_compliance_percentage",payload
    );
  },
  getCompliance(payload){
    return api.put(
      "/factory_dashboard/compliance_summary",payload
    );
  },
  fetchAnalyticsHeatmapGbl(payload) {
    // return api.put("live_analytics_heatmap/live_analytics_heatmap_new");
    return api.put("live_analytics_heatmap/live_analytics_heatmap",payload);
  },
  // AuthLogin(payload) {
  //   return api.post("users/login_with_email", payload);
  // },
  updateUser(payload) {
    return api.put("users/update_user", payload);
  },
  AuthLogin(payload) {
    return api.post("users/login_with_email_new", payload);
  },
  fetchCameraConnectivity(id) {
    return api.get(`cameras/get_user_cameras_count/${id}`);
  },
  fetchDataForLeaderBoard(payload) {
    return api.put("get_leader_board_data/get_leader_board_data", payload);
  },
  generateAreaOwnerTicket(payload) {
    return api.post("/tickets/add_ticket", payload);
  },
  sub_area_status(id) {
    return api.put(`/sub_area/update_sub_area_status/${id}`);
  },
  progressBarOFArea(payload) {
    // return api.put(`/compliance_gadget_percentage/compliance_gadget_percentage_areaDashboard`,payload);
    return api.put(`/compliance_gadget_percentage/compliance_gadget_percentage_new`,payload);
  },
  areaHeatMap(payload){
    return api.put(`/get_live_heatmap_by_area/get_live_heatmap_by_area`,payload);
  },
  getAINewCards(payload){
    return api.post('factory_dashboard/ai_models_and_reports_camera_wise', payload);
  },
  highseverityAlerts(payload){
    return api.put(`/get_high_severity/get_high_severity`,payload);
  },
  GetAllAreas(id){
    return api.get(`/factory/get_factory/${id}`);
  },
  GetModules(){
    return api.get('/modules/get_all_modules')
  },
  itSelectedUserLogs(user_id){
    return api.get(`/users/get_user/${user_id}`)
  },

};

export default AreaService;

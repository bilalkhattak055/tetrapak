import api from "./api";

const CameraService = {
  getAllLiveCameras() {
    return api.get(`/factory_dashboard/get_all_live_cameras`);
  },
  getAllLiveCameras_new(paylaod) {
    return api.put(`/factory_dashboard/get_user_cameras`, paylaod);
  },
  getCameraCounts(user_id) {
    return api.get(`cameras/get_factory_cameras_count/${user_id}`);
  },
  getCameraCountsArea(user_id) {
    return api.get(`cameras/get_area_cameras_count/${user_id}`);
  },
  fetchAllCompanies() {
    return api.get(`factory/get_all_factories`);
  },
  // getAllLiveCameras (payload) {
  //     return api.post(`cameras/get_all_live_cameras`,payload)
  // },
  getAllUserCameras(user_id) {
    return api.get(`cameras/get_all_cameras/${user_id}`);
  },
  
  addCamera(payload) {
    return api.post(`cameras/add_camera`, payload);
  },
  getCameraDropdowns (payload) {
    return api.get(`cameras/camera_dropdowns/${payload}`)
},
  // getCameraDropdowns (payload) {
  //     return api.post(`cameras/camera_dropdowns`,payload)
  // },
  addCamerasWithExcel(payload) {
    return api.post(`cameras/add_cameras_with_excel`, payload);
  },
  deleteCamera(camera_id) {
    return api.delete(`cameras/delete_camera/${camera_id}`);
  },
  getCameraByID(payload) {
    return api.put(`cameras/get_by_camera_id`, payload);
  },
  updateCamera(payload) {
    return api.post(`cameras/update_camera`, payload);
  },
  updateCameraStatus(id) {
    return api.put(`cameras/update_camera_status/${id}`);
  },
  modules() {
    return api.get("/modules/get_all_modules");
  },
  factoryCameras(id) {
    return api.get(`/factory_Dashboard/get_factory_cameras_count/${id}`);
  },

};

export default CameraService;

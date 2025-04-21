import api from "./api";
const tetraPakGraphService = {
    getAllReels(payload){
        return api.put(`inspection/get_all_reels_count`, payload);
    },
    getReprocessCount(payload){
        return api.put(`inspection/get_reprocess_data_count`, payload);
    },
    getWrongCount(payload){
        return api.put(`inspection/get_wrong_mismatch_reasons_count`,payload);
    },
    updateSyncRow(payload){
        return api.post(`inspection/sync_rows`, payload);
    }
}
export default tetraPakGraphService;

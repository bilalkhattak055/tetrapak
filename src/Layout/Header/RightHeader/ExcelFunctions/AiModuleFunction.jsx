import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const generateExcel = (data) => {
    const wb = XLSX.utils.book_new();
    
    // 1. Create the first summary sheet
    const summarySheet = [
        ['Total Accuracy:', data.totalAccuracy || 'N/A'],
        ['Total Alerts:', data.totalAlerts || 'N/A'],
        ['Average Accuracy:', data.AverageAccuracy || 'N/A'],
        [],
        ['Summary of Alerts'],
        [],
        ['Category', 'Value'],
        ...data.summaryofAlerts.map(item => [item.category, item.value]),
        [],
        ['Accuracy of AI Models'],
        [],
        ['Model', 'Accuracy (%)'],
        ...data.AccuracyOfAiModels.map(model => [model.name, model.value])
    ];

    const ws = XLSX.utils.aoa_to_sheet(summarySheet);
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');

    // 2. Create a sheet for each module in AllModulesData
    Object.entries(data.AllModulesData).forEach(([key, module]) => {
        const moduleSheet = [
            ['Total Cameras:', module.total_cameras],
            ['Total Frames:', module.total_frames],
            ['Total Events:', module.total_event],
            ['Total Compliance:', module.total_compliance],
            ['Total Alerts:', module.total_alerts],
            ['Compliance %:', module.total_compliance_percentage],
            [],
            ['Camera ID', 'Camera Name', 'Area Owner', 'Area Name', 'Sub Area', 'Frames', 'Events', 'Alerts', 'Compliances', 'Compliance %'],
            ...module.camera_data.map(camera => [
                camera.camera_id,
                camera.camera_name,
                camera.area_owner_name,
                camera.area_name,
                camera.sub_area_name,
                camera.frame,
                camera.event,
                camera.alerts,
                camera.compliances,
                camera.compliance_percentage
            ])
        ];
        const moduleWS = XLSX.utils.aoa_to_sheet(moduleSheet);
        XLSX.utils.book_append_sheet(wb, moduleWS, key);
    });

    // 3. Write and download the file
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'AI_Surveillance_Report.xlsx');
};

export default generateExcel;

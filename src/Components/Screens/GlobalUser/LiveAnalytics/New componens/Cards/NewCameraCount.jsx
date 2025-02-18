import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { BiCctv } from "react-icons/bi";
import CameraService from '../../../../../../api/cameraService';

const NewCameraCount = ({ loader }) => {
  const [data, setData] = useState({ active_cameras: null, total_cameras: null });

  const getCurrentWeek = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfWeek = oneJan.getDay();
    
    const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
    
    const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
    const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
    
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          user_id: 3,
          status: "",
          connectivity: "",
          areas: [],
          sub_areas: [],
          module: "",
          factory_id: 1,
          pagination: { page_no: 1, per_page: 20 },
          week: getCurrentWeek()
        };

        const response = await CameraService.getAllLiveCameras_new(payload);
        console.log('API Response:', response);

        // Fixed: Access the nested data structure correctly
        if (response?.data?.data) {
          setData({
            active_cameras: response.data.data.active_cameras || 0,
            total_cameras: response.data.data.total_cameras || 0
          });
        } else {
          console.warn('Unexpected API response structure:', response);
          setData({ active_cameras: 0, total_cameras: 0 });
        }
      } catch (error) {
        console.error('Error fetching camera data:', error);
        setData({ active_cameras: 0, total_cameras: 0 });
      }
    };

    fetchData();
  }, []);

  return (
    <Card style={{ borderRadius: '21px', height: '160px' }}>
      <CardBody className='p-4'>
        <p style={{ fontSize: '15px', color: '#383838', fontWeight: '400',textWrap:"nowrap" }}>Live Cameras Count</p>
        <div className='d-flex align-items-center gap-2'>
          <BiCctv style={{ minWidth: '40px', height: '40px', borderRadius: '20px', padding: '5px', background: '#635470', color: 'white' }} className='border' />
          <p className='m-0' style={{ color: '#595959', fontSize: '16px' }}>
            <span style={{ fontSize: '30px', fontWeight: '500' }}>
              {Number.isInteger(data?.active_cameras) ? data.active_cameras : "N/A"}
            </span> / 
            {Number.isInteger(data?.total_cameras) ? data.total_cameras : "N/A"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewCameraCount;
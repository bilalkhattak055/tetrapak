import React from 'react';
import DefaultDashboard from '../../GlobalDashboard/Default/index';

const FactoryEmergencyExit = () => {
    return (
        <>
            <DefaultDashboard type={'emergency'} mainTitle={'Emergency Exit Dashboard'} />
        </>
    );
}

export default FactoryEmergencyExit;

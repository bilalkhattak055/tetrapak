import React from 'react';
import { Card, CardBody } from 'reactstrap';
import plus from '../asset/plus.svg'
import minus from '../asset/minus.svg'
import './style.css'

const MissandMatch = ({MissandMatch,Match}) => {
    return (
        <Card style={{ borderRadius: '21px', height: '130px', width: '100%' }}>
            <CardBody className='pt-4 pb-3'>
                <div className='d-flex justify-content-around'>
                    {/* Match Reels */}
                    <div className='d-flex align-items-center'>
                        <img src={plus} className='icon' alt="plus icon" />
                        <div className='ms-3'>
                            <h2 className='heading-font'>{Match}</h2>
                            <p className='card-text' style={{ color: '#023F88', fontSize: '18px', fontWeight: 500, marginBottom: "-3px" }}>Match Reels</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='divider-mobile' style={{
                        width: '2px',
                        height: '85px',
                        border: 'none',
                        borderLeft: '1px dashed #023F88',
                        display: "flex",
                        alignItems: "center"
                    }}></div>

                    {/* Mis-Match Reels */}
                    <div className='d-flex align-items-center'>
                        <img src={minus} className='icon' alt="minus icon" />
                        <div className='ms-3'>
                            <h2 className='heading-font'>{MissandMatch}</h2>
                            <p className='card-text' style={{ color: '#023F88', fontSize: '18px', fontWeight: 500, margin: 0 }}>Mis-Match Reels</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default MissandMatch;
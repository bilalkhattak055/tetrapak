import { Tooltip } from 'reactstrap';
import { useState, useRef } from 'react';
import TextFormatcheck from '../../../../../CommonFunctions/TextFormatCheck'
import '../../Style/style.css'
const ModuleDisplay = ({ modules }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const tooltipRef = useRef(null);

    const toggleTooltip = (state) => {
        setTooltipOpen(state);
    };

    const moduleLabel = modules?.length > 0 ? modules[0] : 'No Module';
    const remainingModules = modules?.length > 1 ? modules?.length - 1 : 0;

    return ( 
            <div className="d-flex justify-content-between align-items-center"> 
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div className='m-0 ' style={{fontSize:'14px',padding:'4px',background:'#E9F6FC',color:'#1E84B0',borderRadius:"4px"}}>
                      {moduleLabel && TextFormatcheck(moduleLabel)}
                        </div>
                    {remainingModules > 0 && (
                        <span ref={tooltipRef} 
                            onMouseEnter={() => toggleTooltip(true)}
                            onMouseLeave={() => toggleTooltip(false)}
                            id="moduleTooltip" 
                            style={{ fontSize: "10px", 
                                    fontWeight: 400, 
                                    border: "1px dashed #8C8C8C", 
                                    borderRadius: "50%", 
                                    width: "20px", 
                                    height: "20px", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    textAlign: "center", 
                                    color: '#8C8C8C',
                                    cursor: 'pointer' }}>
                            +{remainingModules}
                        </span>
                    )}
                    <Tooltip
                        placement="top"
                        isOpen={tooltipOpen}
                        target={tooltipRef}
                    > 
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                            {modules.map((item, index) => (
                                <>
                                {index==0?null:
                                <li key={index} style={{ padding: '5px 0' }} >{item && TextFormatcheck(item)}</li>
                                }
                                </>
                            ))}
                        </ul>
                    </Tooltip>
                </div>
            </div> 
    );
};

export default ModuleDisplay;

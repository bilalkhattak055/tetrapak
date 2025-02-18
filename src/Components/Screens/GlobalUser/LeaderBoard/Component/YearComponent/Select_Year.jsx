import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from 'reactstrap';

function YearPicker({ filters,setFilters}) {  // Assuming you want to update the year in a parent component state
    const [startDate, setStartDate] = useState(new Date());
    const [minyear, setMinYear] = useState();
    const [maxyear, setMaxYear] = useState();

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        setMinYear(new Date(currentYear - 20, 0, 1));
        setMaxYear(new Date(currentYear, 0, 1));
        setFilters({
            year:currentYear
        })
    }, []);

    const handleChange = (date) => {
        setStartDate(date);
        setFilters({ 
            year:date.getFullYear()
        });   
    }


    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <Input
            className='cursor-pointer'
            name='year'
            onClick={onClick}
            readOnly
            value={value ? new Date(value).getFullYear().toString() : ''}
            style={{ width: '80px' }}
            ref={ref}
        />
    ));

    return (
        <div className="date-picker-container">
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                showYearPicker
                dateFormat="yyyy"
                minDate={minyear}
                maxDate={maxyear}
                customInput={<CustomInput value={startDate} />}
                popperPlacement="bottom-end"
                popperModifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 10],
                        },
                    },
                    {
                        name: "preventOverflow",
                        options: {
                            rootBoundary: "viewport",
                            tether: false,
                            altAxis: true,
                        },
                    }
                ]}
            />
        </div>
    );
}

export default YearPicker;

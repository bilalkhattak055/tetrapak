import React, { useState } from 'react'
import { FormGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Label } from 'reactstrap';
import './commonfilter.css'

const TypeheadFilter = ({typeheadStyle, selected, shifts, placeholder, handleTypeChange}) => {
    const [multiple] = useState(true);
    return (
        <FormGroup>
        
            <Typeahead
                style={typeheadStyle}
                // style={{ fontSize: '14px' }}
                multiple={multiple}
                selected={selected}
                options={shifts}
                placeholder={placeholder}
                className='typehead-filter'
                // selected={formData.factories}
                onChange={(selected) => handleTypeChange(selected)}
                inputProps={{ style: { fontSize: '12px' } }} 

            />
        </FormGroup>
    )
}

export default TypeheadFilter

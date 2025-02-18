import React from 'react';
import search from '../../../assets/SuperAdminIcons/Search.png'; 

const SearchInput = ({onchange,placeholder}) => {
    return (
        <div className='d-flex justify-content-start align-items-center' style={{background:'white',borderRadius:'15px',height:'47px'}}> 
                    <img src={search} alt="search icon" style={{ width: '16px', height: '16px', marginLeft: '15px', marginTop: '2px',marginRight:'10px' }} />
                               
                                <input
                                    type="text"
                                    placeholder={placeholder ? placeholder :'Search...'}
                                    style={{ width: '100%', border: '0px', fontSize: '16px', padding: '0px', margin: '0px' }}
                                    onChange={onchange}
                                />
                    </div>
    );
}

export default SearchInput;

import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const DataTableComponent = ({ staticData, tableColumns, onRowClick }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelet, setToggleDelet] = useState(false);
    const [data, setData] = useState(staticData);

    const handleRowClick = (row) => {
        if (onRowClick && typeof onRowClick === 'function') {
            onRowClick(row); 
        } else {
            console.error('onRowClick is not a function');
        }
    };
    const tableWrapperStyle = {
      borderRadius: '10px',
      overflow: 'hidden', // Ensures content does not spill out of rounded corners
    };
    useEffect(() => {
        setData(staticData);
    }, [staticData]);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
            setToggleDelet(!toggleDelet);
            setData(data.filter(item => !selectedRows.some(elem => elem.id === item.id)));
            setSelectedRows([]);
        }
    };

    return (
        <Fragment>
            {/* {selectedRows.length > 0 && (
                <div className={`d-flex align-items-center justify-content-between bg-light-info p-2`}>
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Delete Selected Data..!</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: handleDelete }}>Delete</Btn>
                </div>
            )} */}
             <div style={tableWrapperStyle}>
            <DataTable
  data={data}
  columns={tableColumns}
  striped={false}
  center={true}
  pagination
  onRowClicked={handleRowClick}
  customStyles={{
    headCells: {
      style: {
        backgroundColor: 'transparent !important',
        fontSize: '15px !important',
        fontWeight: '500 !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important', 
      },
    },
    cells: {
      style: {
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
       
        padding: '0px !important',

      },
    },
    headRow: {
      style: {
        backgroundColor: '#EFF4FA !important',
        borderTopLeftRadius: '10px !important',
        borderTopRightRadius: '10px !important',
        borderBottom: 'none !important',
        padding: '20px !important',
    

      },
    },
  }}
/>

</div>


        </Fragment>
    );
};

export default DataTableComponent;

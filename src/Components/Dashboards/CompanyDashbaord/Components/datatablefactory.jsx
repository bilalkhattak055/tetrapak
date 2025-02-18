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
            
            <DataTable
  data={data}
  columns={tableColumns}
  striped={false}
  center={true}
  pagination
  onRowClicked={handleRowClick}
  customStyles={{
    tableWrapper: {
      style: {
        borderTopLeftRadius: '20px !important', // Rounds the radius of the entire table
        borderTopRightRadius: '20px !important', // Rounds the radius of the entire table
        
        pagination: {
      style: {
        borderBottomLeftRadius: '20px !important', // Rounded bottom left corner for pagination
        borderBottomRightRadius: '20px !important', // Rounded bottom right corner for pagination
        backgroundColor: '#EFF4FA !important', // Match the background with the table
      },
    },
        overflow: 'hidden', // Ensures the rounded corners apply properly
      },
    },
    pagination: {
        style: {
          borderBottomLeftRadius: '20px !important', // Rounded bottom left corner for pagination
          borderBottomRightRadius: '20px !important', // Rounded bottom right corner for pagination
         
        },
      },
    headCells: {
      style: {
        backgroundColor: 'transparent !important',
        fontSize: '15px !important',
        fontWeight: '500 !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        borderRadius: '0 !important', // Keep these 0 to avoid overlapping with the table's overall radius
      },
    },
    cells: {
      style: {
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        borderRadius: '0 !important',
        padding: '2px !important',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#EFF4FA !important',
        borderTopLeftRadius: '20px !important', // Rounded top left corner
        borderTopRightRadius: '20px !important', // Rounded top right corner
        borderBottom: 'none !important',
        padding: '20px !important',
      },
    },
    // rows: {
    //   style: {
    //     borderBottomLeftRadius: '20px !important', // Rounded bottom left corner on the last row
    //     borderBottomRightRadius: '20px !important', // Rounded bottom right corner on the last row
    //   },
    // },
  }}

/>




        </Fragment>
    );
};

export default DataTableComponent;

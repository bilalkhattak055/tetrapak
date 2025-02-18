import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './tableIcon.css' 
const ItDataTable = ({ staticData, tableColumns, onRowClick }) => {
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
    const customStyles = {
      tableWrapper: {
        style: {
          borderRadius: "20px 20px 0 0", // Top left and right border-radius for the wrapper
          overflow: "hidden", // Ensure rounded corners are visible
        },
      },
      table: {
        style: { 
          backgroundColor: "transparent", // Set the table background to transparent
          borderRadius: "20px 20px 0 0", // Apply top left and right border-radius to the table
          overflow: "hidden", // Ensure the table content fits within the rounded corners
        },
      },
      headRow: {
        style: {  
          backgroundColor: "transparent", // Set the header row background to transparent
          borderTopLeftRadius: '20px', // Top left corner radius
          borderTopRightRadius: '20px', // Top right corner radius
          borderBottom: '2px solid #e0e0e0', // Optional: Add a subtle bottom border
        },
      },
      rows: {
        style: {
          backgroundColor: "transparent", // Set the row background to transparent 
          wordBreak: "break-word",
          wordWrap: "break-word",
          overflow: "visible", 
        },
      },
      cells: {
        style: {
          backgroundColor: "transparent", // Set the cell background to transparent
          wordBreak: "break-word",
          wordWrap: "break-word",
          overflow: "visible",
        },
      },
      headCells: {
        style: {
          fontWeight: 'bold', // Bold header text
          backgroundColor: "transparent", // Set the header cell background to transparent
        },
      },
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
  customStyles={
    customStyles
  }
/>
   
 




        </Fragment>
    );
};

export default ItDataTable;
 

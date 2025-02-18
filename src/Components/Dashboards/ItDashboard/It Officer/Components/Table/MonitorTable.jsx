import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './tableIcon.css'
const MonitorTable = ({ staticData, tableColumns, onRowClick }) => {
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
    rows: {
      style: {
        minHeight: '55px', // Override row height
      },
    },
    headCells: {
      style: {
        textAlign: 'left', // Align header text to the left
        justifyContent: 'flex-start', // Align header text content to the left
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        textAlign: 'left', // Align cell text to the left
        justifyContent: 'flex-start', // Align cell content to the left
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
        customStyles={customStyles}

      />
    </Fragment>
  );
};

export default MonitorTable;


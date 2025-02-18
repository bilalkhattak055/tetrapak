import React, { Fragment, useCallback, useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';

const FactoryDataTable = ({ staticData, tableColumns, onRowClick }) => {
    const [data, setData] = useState(staticData);
    const [selectedRowId, setSelectedRowId] = useState(null); // State to track selected row
    const tableRef = useRef(null); // Ref for the table

    useEffect(() => {
        setData(staticData);
    }, [staticData]);

    const handleRowClick = (row) => {
        setSelectedRowId(row.id); // Set the selected row ID
        if (onRowClick && typeof onRowClick === 'function') {
            onRowClick(row);
        } else {
            console.error('onRowClick is not a function');
        }
    };

    useEffect(() => {
        // Function to handle clicks outside the table
        const handleClickOutside = (event) => {
            if (tableRef.current && !tableRef.current.contains(event.target)) {
                setSelectedRowId(null); // Reset selected row when clicking outside
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const customStyles = {
        rows: {
            style: {
                minHeight: '56px', // Adjust row height if needed
            },
        },
        headCells: {
            style: {
                backgroundColor: '#EFF4FA',
                fontSize: '15px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
        cells: {
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px', // Adjust padding if needed
            },
        },
    };

    // Row conditional styles for selected row
    const conditionalRowStyles = [
        {
            when: row => row.id === selectedRowId,
            style: {
                backgroundColor: '#ffe6e6 !important', // Light red background color for the row
                border: '1px solid #ffcccc !important', // Border for selected row
            },
        },
    ];

    return (
        <Fragment>
            <div ref={tableRef}> {/* Set ref to this div */}
                <DataTable
                    data={data} // Display all rows
                    columns={tableColumns}
                    striped={false}
                    center={true}
                    pagination
                    paginationPerPage={5} // Set rows per page to 5
                    onRowClicked={handleRowClick}
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles} // Apply conditional styles for selected row
                />
            </div>
        </Fragment>
    );
};

export default FactoryDataTable;

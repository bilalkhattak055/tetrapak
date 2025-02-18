import React, { Fragment, useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { Edit3, Trash2 } from 'react-feather';
import TableActions from '../../Common/TableActions/Index'

const DataTableComponent = ({dummytabledata, tableColumns,handleRowClick,handleDelete}) => {
    // const [selectedRows, setSelectedRows] = useState([]);
    // const [toggleDelet, setToggleDelet] = useState(false);
    // const [data, setData] = useState(dummytabledata);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [data, setData] = useState([])
    console.log('tableCoulumns', )
   
    const actionAvailabe = tableColumns && tableColumns.map((tab)=> tab?.name).some((som)=> som?.toLowerCase().includes('action'))
    console.log('actionAvailabe', actionAvailabe)

    useEffect(() => {
        let newData = dummytabledata
        if (dummytabledata ) { 
            if(actionAvailabe){
            newData = dummytabledata.map((item) => ({
                ...item,
                action: (
                    <TableActions
                        Icon1={<Trash2 onClick={()=>{handleDelete(item);console.log(item)}} width={20} height={20}  />}
                        Icon2={<Edit3 width={20} height={20} onClick={()=>{handleRowClick(item)}} />}
                    />
                ),
            
            }));
            // setData(dummytabledata);
        }}
        setData(newData); 
    }, [dummytabledata]);

    return (
        <Fragment>
            <DataTable
                data={data}
                columns={tableColumns}
                striped={false}
                center={false}
                pagination
                clearSelectedRows={toggleDelete}
                customStyles={{
                    table: {
                        style: {
                            borderRadius: '12px', // Rounds the border of the entire table
                            overflow: 'hidden', // Ensures content stays within the rounded borders,
                       
                        },
                    },
                    cells: {
                        style: {
                            paddingTop: '12px', // Adjust padding as needed
                            paddingBottom: '12px',
                            textAlign: 'center !important', // Center text horizontally
                            verticalAlign: 'middle !important', // Center text vertically
                            
                        },
                    },
                    headCells: {
                        style: {
                            
                            paddingTop: '12px',
                            paddingBottom: '12px',
                            textAlign: 'center !important', // Center header text horizontally
                            verticalAlign: 'middle !important', // Center header text vertically
                            backgroundColor: '#EDEDED', 
                            
                        },
                    },
                    pagination: {
                        style: {
                            borderBottomLeftRadius: '12px', // Rounds the bottom-left corner of the pagination row
                            borderBottomRightRadius: '12px', // Rounds the bottom-right corner of the pagination row
                        },
                    },
                }} 
                onRowClicked={handleRowClick}
            />
        </Fragment>
    );
}

export default DataTableComponent;

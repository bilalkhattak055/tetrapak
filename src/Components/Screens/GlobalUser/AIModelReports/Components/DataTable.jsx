import React from "react";
import DataTable from "react-data-table-component";


const customStyles = {
  table: {
    style: {
      borderCollapse: "collapse", // Ensures borders align correctly
    },
  },
  rows: {
    style: {
      border: "none", // Remove all borders around the rows
      wordBreak: "break-word",
      wordWrap: "break-word",
      overflow: "visible",
    },
  },
  cells: {
    style: {
      border: "none", // Add a right border for columns
      padding: "8px", // Adjust padding to ensure proper alignment
      margin: "0", // Remove any default margin to align borders correctly
      wordBreak: "break-word",
      wordWrap: "break-word",
      overflow: "visible",
      
    },
  },
  headCells: {
    style: {
      borderRight: "1px solid #ddd", // Add right border to header cells for column separation
      borderBottom: "1px solid #ddd", // Add bottom border to header cells
      padding: "8px", // Adjust padding to match cells
      margin: "0", // Remove any default margin
      wordBreak: "break-word",
      wordWrap: "break-word",
      overflow: "visible",
    },
  },
};

export default function DataTableModel({ dummytabledata, tableColumns }) {
  return (
    <>
      <DataTable
        data={dummytabledata}
        columns={tableColumns}
        pagination
        striped={false}
        customStyles={customStyles} // Apply custom styles
      />
    </>
  );
}

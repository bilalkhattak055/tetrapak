import React, { Fragment, useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Btn, H4 } from "../../../../AbstractElements";
import { Edit3, Trash2 } from "react-feather";
import TableActions from "../../../Common/TableActions/Index";

const DataTableComponentForArea = ({
  dummytabledata,
  pagination_options,
  selectableRows,
  tableColumns,
  handleRowClick,
  handleDelete,
  defaultSortFieldId,
  pagination,
  handleRowSelected,
  clearSelectedRows,
  paginationPerPage
}) => {
  const [toggleDelete, setToggleDelete] = useState(false);

  return (
    <Fragment>
      <DataTable
        data={dummytabledata}
        columns={tableColumns}
        defaultSortFieldId={defaultSortFieldId}
        striped={false}
        center={false}
        selectableRows={selectableRows || false}
        pagination={!pagination ? false : true}
        paginationRowsPerPageOptions={pagination_options}
        clearSelectedRows={toggleDelete || clearSelectedRows}
        paginationPerPage={paginationPerPage}
        customStyles={{
          table: {
            style: {
              borderRadius: "12px", // Rounds the border of the entire table
              overflow: "hidden", // Ensures content stays within the rounded borders,
            },
          },
          pagination: {
            style: {
              borderBottomLeftRadius: "12px", // Rounds the bottom-left corner of the pagination row
              borderBottomRightRadius: "12px", // Rounds the bottom-right corner of the pagination row
            },
          },
        }}
        onRowClicked={handleRowClick}
        onSelectedRowsChange={handleRowSelected}
      />
    </Fragment>
  );
};

export default DataTableComponentForArea;

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Container, Input } from "reactstrap";
import { Search } from "lucide-react";

export default function UserTable({id, username, email, bypass, reprocess,WrongCount}) {
  // State for users data
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // Update users when props change
  useEffect(() => {
    // Only update if we have all required props
    if (id && username && email !== undefined) {
      const userData = {
        id: id,
        username: username,
        email: email,
        bypassCount: bypass || 0,
        reprocessCount: reprocess || 0,
        WrongCount:WrongCount || 0

      };
      
      // Update the users array with the new data
      setUsers([userData]);
    }
  }, [id, username, email, bypass, reprocess]);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())))
  );
  

  // Reset pagination when search term changes
  useEffect(() => {
    setResetPaginationToggle(!resetPaginationToggle);
  }, [searchTerm]);

  // Custom component for username with avatar
  const UsernameCell = ({ row }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: `linear-gradient(45deg, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {row.username?.charAt(0).toUpperCase()}
      </div>
      <span>{row.username}</span>
    </div>
  );

  // Custom component for badge
  const BadgeCell = ({ value, color }) => (
    <span
      style={{
        padding: "8px 16px",
        borderRadius: "30px",
        background: color,
        color: "white",
        fontWeight: "bold",
        boxShadow: `0 4px 10px ${color}33`,
        display: "inline-block",
        minWidth: "40px",
      }}
    >
      {value}
    </span>
  );

  // Table columns configuration
  const columns = [
    {
      name: "USER ID",
      selector: row => row.id,
      sortable: true,
      cell: row => <span style={{ fontWeight: "600", color: "#2575fc" }}>{row.id}</span>,
    },
    {
      name: "USER NAME",
      selector: row => row.username,
      sortable: true,
      cell: row => <UsernameCell row={row} />,
    },
    {
      name: "USER EMAIL",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "BYPASS",
      selector: row => row.bypassCount,
      sortable: true,
      center: true,
      cell: row => <BadgeCell value={row.bypassCount} color="linear-gradient(45deg, #11998e, #38ef7d)" />,
    },
    {
      name: "REPROCESS",
      selector: row => row.reprocessCount,
      sortable: true,
      center: true,
      cell: row => <BadgeCell value={row.reprocessCount} color="linear-gradient(45deg, #6a11cb, #2575fc)" />,
    },
    {
      name: "Unidentified Reels",
      selector: row => row.WrongCount,
      sortable: true,
      center: true,
      cell: row => <BadgeCell value={row.WrongCount} color="linear-gradient(45deg,rgb(1, 35, 80), #2575fc)" />,
    },
  ];

  // Custom styles for the data table
  const customStyles = {
    table: {
      style: {
        borderRadius: '16px',
        overflow: 'hidden',
      },
    },
    headRow: {
      style: {
        background: "linear-gradient(45deg,rgb(17, 29, 203),rgb(56, 53, 230))",
        color: "white",
        textTransform: "uppercase",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "1px",
        minHeight: '60px',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '24px',
        paddingRight: '24px',
        color: "white",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        fontWeight: '400',
        minHeight: '72px',
        '&:nth-child(odd)': {
          backgroundColor: '#f8f9ff',
        },
        '&:hover': {
          backgroundColor: '#f0f4ff',
          boxShadow: '0 4px 12px rgba(37, 117, 252, 0.1)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease',
        },
      },
    },
    cells: {
      style: {
        paddingLeft: '24px',
        paddingRight: '24px',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #edf2f7',
        padding: '16px',
      },
    },
  };

  // No Data Component
  const NoDataComponent = () => (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <p style={{ fontSize: "16px", color: "#6c757d" }}>No user data available</p>
    </div>
  );

  // Custom search component
  const subHeaderComponent = (
    <div
      className="search-container mb-4 mx-auto"
      style={{
        width: "100%",
        maxWidth: "500px",
        position: "relative",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        borderRadius: "50px",
        overflow: "hidden",
        margin: "20px 0",
      }}
    >
      <div className="position-relative">
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6a11cb",
          }}
        >
          <Search size={20} />
        </div>
        <Input
          type="text"
          placeholder="Search name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            paddingLeft: "50px",
            paddingRight: "20px",
            height: "50px",
            border: "none",
            borderRadius: "50px",
            fontSize: "16px",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="table-container py-4">
      <Container>
        {/* Stylish Header */}
        <div className="header-section mb-4" style={{ textAlign: "center" }}>
        <h3
            className=" fw-bold mb-1"
            style={{
              background: "linear-gradient(45deg,rgba(0, 0, 3, 0.93),rgba(41, 43, 46, 0.84))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              textAlign:"center"
            }}
          >
            User Activity Table
    </h3>
          <p className="text-muted">Monitor User Activity and Reporting</p>
        </div>

        {/* React Data Table with enhanced styling */}
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            animation: "fadeIn 0.5s ease-out",
          }}
         
        >
          <div  className="Tabledpt">
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            persistTableHead
            customStyles={customStyles}
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
            paginationPerPage={10}
            noDataComponent={<NoDataComponent />}
          />
          </div>
        </div>

        {/* Add CSS for animations */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .table-container {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </Container>
    </div>
  );
}
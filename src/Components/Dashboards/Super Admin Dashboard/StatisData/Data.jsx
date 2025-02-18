
 
const tableData = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "IT Officer",
        date: "2024-08-01",
        action: "Approved",
        Phone: "+92313778899",
        permissions: [
            { name: 'ITOfficer', isActive: false },
            { name: 'factory', isActive: true },
            { name: 'Factory', isActive: false },
            { name: 'Area', isActive: true },
            { name: 'TechQA', isActive: false }
        ]
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        Phone: "+92313778899",
        role: 'factory',
        date: "2024-08-02",
        action: "Pending",
        permissions: [
            { name: 'ITOfficer', isActive: false },
            { name: 'factory', isActive: true },
            { name: 'Factory', isActive: true },
            { name: 'Area', isActive: false },
            { name: 'TechQA', isActive: false }
        ]
    },
    {
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        Phone: "+92313778899",
        role: "Factory",
        date: "2024-08-03",
        action: "Rejected",
        permissions: [
            { name: 'ITOfficer', isActive: true },
            { name: 'factory', isActive: true },
            { name: 'Factory', isActive: true },
            { name: 'Area', isActive: false },
            { name: 'TechQA', isActive: true }
        ]
    },
    {
        name: "Emily Davis",
        Phone: "+92313778899",
        email: "emily.davis@example.com",
        role: "Area",
        date: "2024-08-04",
        action: "Approved",
        permissions: [
            { name: 'ITOfficer', isActive: true },
            { name: 'factory', isActive: true },
            { name: 'Factory', isActive: false },
            { name: 'Area', isActive: true },
            { name: 'TechQA', isActive: false }
        ]
    },
    {
        name: "William Brown",
        email: "william.brown@example.com",
        role: "Tech QA",
        Phone: "+92313778899",
        date: "2024-08-05",
        action: "Pending",
        permissions: [
            { name: 'ITOfficer', isActive: false },
            { name: 'factory', isActive: true },
            { name: 'Factory', isActive: true },
            { name: 'Area', isActive: false },
            { name: 'TechQA', isActive: false }
        ]
    },
    {
        name: "William Brown",
        Phone: "+92313778899",
        email: "william.brown@example.com",
        role: "Area",
        date: "2024-08-05",
        action: "Pending",
        permissions: [
            { name: 'ITOfficer', isActive: true },
            { name: 'factory', isActive: false },
            { name: 'Factory', isActive: true },
            { name: 'Area', isActive: true },
            { name: 'TechQA', isActive: false }
        ]
    },
    {
        name: "William Brown",
        email: "william.brown@example.com",
        Phone: "+92313778899",
        role: "Area",
        date: "2024-08-05",
        action: "Pending",
        permissions: [
            { name: 'ITOfficer', isActive: true },
            { name: 'factory', isActive: false },
            { name: 'Factory', isActive: true },
            { name: 'Area', isActive: true },
            { name: 'TechQA', isActive: false }
        ]
    }
];
export default tableData ;
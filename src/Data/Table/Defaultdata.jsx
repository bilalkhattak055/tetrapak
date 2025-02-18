import React from 'react';
import TableRoleButton from '../../Components/Common/newButton'
import { Image } from '../../AbstractElements';
import user1 from '../../assets/images/user/20.png';

export const dummytabledata = [
    {
        id: 1,
        name: 'Bilal khattak',
        email: 'mbilalkhk@gmail.com',
        role: <TableRoleButton btnText={'Tech QA'} />,
        date: '2024-09-13',
        
    },
    {
        id: 2,
        name: 'Hassam khan',
        email: 'Hassam@gmail.com',
        role: <TableRoleButton btnText={'Area'} />,
        date: '2024-09-14',
        
    },
    {
        id: 3,
        name: 'Hamza ahmed',
        email: 'Hamza@gmail.com',
        role: <TableRoleButton btnText={'Factory Owner'} />,
        date: '2024-09-15',
        
    },
    {
        id: 4,
        name: 'ali haider',
        email: 'ali@gmail.com',
        role: <TableRoleButton btnText={'Tech QA'} />,
        date: '2024-09-16',
        
    },
    {
        id: 5,
        name: 'Waqqar ali' ,
        email: 'Waqqaroo@gmail.com',
        role: <TableRoleButton btnText={'Area'} />,
        date: '2024-09-16',
        
    },
    {
        id: 6,
        name: 'Wajahat khattak',
        email: 'Waaju@gmail.com',
        role: <TableRoleButton btnText={'Tech QA'} />,
        date: '2024-09-13',
        
    },
    {
        id: 7,
        name: 'Shhreyar khattak',
        email: 'Sherry@gmail.com',
        role: <TableRoleButton btnText={'Area'} />,
        date: '2024-09-14',
         
    },
    {
        id: 8,
        name: 'Bilal khattak',
        email: 'mbilalkhk@gmail.com',
        role: <TableRoleButton btnText={'Factory Owner'} />,
        date: '2024-09-15s',
         
    },
   
   
];

export const tableColumns = [
    {
        name: 'Name',
        selector: row => `${row.name}`,
        // sortable: true,
        center: true,
    },
    {
        name: 'Email',
        selector: row => `${row.email}`,
        // sortable: true,
        center: true,
    },
    {
        name: 'Role',
        cell: row => row.role
    },
    {
        name: 'Created At',
        selector: row => `${row.date}`,
        // sortable: true,
        center: true,
    },
];


//Reports page data 
export const dummytabledataforReports = [
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
    {
        id: 1,
        C_id: '0723',
        E_Date: '23-12-24',
        time: '16:36:00',
        alerts: '145',
        image: <Image attrImage={{ className: 'rounded img-70', src: `${user1}`, alt: 'Generic placeholder image',style: { height: '35px' }, }} />,
    },
   
];

export const tableColumnsForReports = [
    {
        name: 'Camera Id',
        selector: row => row['C_id'],
        // sortable: true,
        center: true,
    },
    {
        name: 'Entry Date',
        selector: row => `${row.E_Date}`,
        // sortable: true,
        center: true,
    },
    {
        name: 'Entry Time',
        selector: row => row['time'],
        // sortable: true,
        center: true,
    },
    {
        name: 'Alerts',
        selector: row => row['alerts'],
        // sortable: true,
        center: true,
    },
    {
        name: 'Image',
        selector: row => row['image'],
        // sortable: true,
        center: true,
    },
  
];
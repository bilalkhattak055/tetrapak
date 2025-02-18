// const staticDatafortickets = {
//     "tickets": [
//         {
//           id: 1,
//           user_id: 9,
//           owner: "Komal",
//           models: [
//             {
//               id: 1,
//               name: "Helmet"
//             }
//           ],
//           areas: [
//             {
//               area_id: 2,
//               area_name: "AO-2",
//               owner: "Aftab"
//             }
//           ],
//           sub_areas: [
//             {
//               sub_area_id: 204,
//               name: "Ref workshop"
//             },
//             {
//                 sub_area_id: 201,
//                 name: "Roof Tops (Service Building)"
//               }
//           ],
//           priority: "low",
//           status: "in process",
//           query: "abc",
//           response: "All ok",
//           ticketDate: "2024-10-18T08:49:37 PM",
//           responseDate: "2024-10-18T06:03:22 PM"
//         },
//         {
//             id: 2,
//             user_id: 10,
//             owner: "Sheheryar",
//             models: [
//               {
//                 id: 2,
//                 name: "Vest"
//               }
//             ],
//             areas: [
//               {
//                 area_id: 2,
//                 area_name: "AO-2",
//                 owner: "Aftab"
//               }
//             ],
//             sub_areas: [
//               {
//                 sub_area_id: 204,
//                 name: "Ref workshop"
//               }
//             ],
//             priority: "High",
//             status: "Pending",
//             query: "xyzzzzz",
//             response: "",
//             ticketDate: "2024-10-18T08:49:37 PM",
//             responseDate: ""
//         }
//       ],
//     "data":{
//         "models": [
//           {
//             "module_id": 1,
//             "module_name": "Helmet"
//           },
//           {
//             "module_id": 2,
//             "module_name": "Vest"
//           },
//           {
//             "module_id": 3,
//             "module_name": "Emergency Exit"
//           },
//           {
//             "module_id": 4,
//             "module_name": "Machine Guard"
//           },
//           {
//             "module_id": 5,
//             "module_name": "MMHE"
//           }
//         ],
//         "areas":[
//         {
//           area_id: 1,
//           active: true,
//           area_name: 'AO-1',
//           area_owner: 'Adil',
//           sub_areas: [
//             { id: 101, name: 'Roof Tops (Palletizing)' },
//             { id: 102, name: 'Palletizing 1,2 & 3' },
//             { id: 103, name: 'Palletizing office' },
//             { id: 104, name: 'Palletizing corridor' },
//             { id: 105, name: 'Waste window area' }
//           ]
//         },
//         {
//           area_id: 2,
//           active: true,
//           area_name: 'AO-2',
//           area_owner: 'Aftab',
//           sub_areas: [
//             { id: 201, name: 'Roof Tops (Service Building)' },
//             { id: 202, name: 'Ammonia Compressor room' },
//             { id: 203, name: 'Catch pit area' },
//             { id: 204, name: 'Ref workshop' },
//             { id: 205, name: 'Ref Control Room' },
//             { id: 206, name: 'Ammonia CCR' },
//             { id: 207, name: 'Diffusion tank' }
//           ]
//         },
//         {
//           area_id: 3,
//           active: true,
//           area_name: 'AO-3',
//           area_owner: 'Arslan',
//           sub_areas: [
//             { id: 301, name: 'Void Area (Production, Mixing)' },
//             { id: 302, name: 'Admin Building Roof Top' },
//             { id: 303, name: 'AHU Room above Canteen' },
//             { id: 304, name: 'Main Asset scrap yard' },
//             { id: 305, name: 'Motor / panel scrap yard' },
//             { id: 306, name: 'R&D front side scrap yard' },
//             { id: 307, name: 'Contractor Workshops' },
//             { id: 308, name: 'DP store area' },
//             { id: 309, name: 'Engineering store' },
//             { id: 310, name: 'Safety office' },
//             { id: 311, name: 'Safety storage area' },
//             { id: 312, name: 'Engineering store placement yard' },
//             { id: 313, name: 'Fabrication workshop & surrounding area' },
//             { id: 314, name: 'Lathe Machine Workshop' },
//             { id: 315, name: 'MAMz workshop' }
//           ]
//         },
//         {
//           area_id: 4,
//           active: false,
//           area_name: 'AO-4',
//           area_owner: 'Ayesha Khaliq',
//           sub_areas: [
//             { id: 401, name: 'Roof Tops (Cone Baking)' },
//             { id: 402, name: 'Cone Baking' },
//             { id: 403, name: 'Mixing' },
//             { id: 404, name: 'LI room' },
//             { id: 405, name: 'Aging room' },
//             { id: 406, name: 'Chocolate plant' },
//             { id: 407, name: 'Mixing pits' },
//             { id: 408, name: 'Oil/glucose decanting area' },
//             { id: 409, name: 'Sauce plant' },
//             { id: 410, name: 'Chilled room' },
//             { id: 411, name: 'Day store area' },
//             { id: 412, name: 'Mixing control room' },
//             { id: 413, name: 'Tank form' }
//           ]
//         },
//         {
//           area_id: 5,
//           active: true,
//           area_name: 'AO-5',
//           area_owner: 'Dr. Amjab',
//           sub_areas: [
//             { id: 501, name: 'OHC' },
//             { id: 502, name: 'Medical Roof Top' }
//           ]
//         },
//         {
//           area_id: 6,
//           active: false,
//           area_name: 'AO-6',
//           area_owner: 'Meraj',
//           sub_areas: [
//             { id: 601, name: 'Roof Tops (Dry Store)' },
//             { id: 602, name: 'Roof Tops (Pulp Store)' },
//             { id: 603, name: 'Scrap Yard (Packmat area / drums)' },
//             { id: 604, name: 'Dry Store 1, 2' },
//             { id: 605, name: 'Chemical store' },
//             { id: 606, name: 'Dry store driver room' },
//             { id: 607, name: 'Docking stations' },
//             { id: 608, name: 'Washrooms' },
//             { id: 609, name: 'Pulp Store' },
//             { id: 610, name: 'Hot room' },
//             { id: 611, name: 'Flavour room' },
//             { id: 612, name: 'Pallet washing room' }
//           ]
//         },
//         {
//           area_id: 7,
//           active: true,
//           area_name: 'AO-7',
//           area_owner: 'Moazzam Ali',
//           sub_areas: [
//             { id: 701, name: 'Machine Parts Room' },
//             { id: 702, name: 'Ultra Clean' },
//             { id: 703, name: 'Production floor' },
//             { id: 704, name: 'Production offices' },
//             { id: 705, name: 'TPM room' },
//             { id: 706, name: 'Day store' },
//             { id: 707, name: 'Parts room' },
//             { id: 708, name: 'Room 10' },
//             { id: 709, name: 'OPC chemical room' }
//           ]
//         },
//         {
//           area_id: 8,
//           active: true,
//           area_name: 'AO-8',
//           area_owner: 'Muhammza Shahbaz',
//           sub_areas: [
//             { id: 801, name: 'ETP' },
//             { id: 802, name: 'Boiler' },
//             { id: 803, name: 'Air compressor' },
//             { id: 804, name: 'Boiler control room' },
//             { id: 805, name: 'HFO tank' },
//             { id: 806, name: 'Water filter area' }
//           ]
//         },
//         {
//           area_id: 9,
//           active: true,
//           area_name: 'AO-9',
//           area_owner: 'Muhammza Wasi',
//           sub_areas: [
//             { id: 901, name: 'Roof Tops (Canteen)' },
//             { id: 902, name: 'Roof Tops (Security)' },
//             { id: 903, name: 'Time Office' },
//             { id: 904, name: 'ETMS' },
//             { id: 905, name: 'Medical OHC' },
//             { id: 906, name: 'Security Office' },
//             { id: 907, name: 'Parkings' },
//             { id: 908, name: 'Cycle Stand' },
//             { id: 909, name: 'Smoking Area' },
//             { id: 910, name: 'Area between Multan road gate to inner factory entrance gate' },
//             { id: 911, name: 'Admin Building' },
//             { id: 912, name: 'Reception' },
//             { id: 913, name: 'Canteen' },
//             { id: 914, name: 'Kitchen' },
//             { id: 915, name: 'Galleries' },
//             { id: 916, name: 'Washrooms' },
//             { id: 917, name: 'Locker area' },
//             { id: 918, name: 'Masjid' },
//             { id: 919, name: 'Changing rooms' },
//             { id: 920, name: 'Waiting area' },
//             { id: 921, name: 'Girls room' },
//             { id: 922, name: 'Exit routes' },
//             { id: 923, name: 'Brains lab' },
//             { id: 924, name: 'Recharge room' },
//             { id: 925, name: "Humail's office" },
//             { id: 926, name: 'Meeting rooms' },
//             { id: 927, name: 'IT room' },
//             { id: 928, name: 'Outside Taris' }
//           ]
//         },
//         {
//           area_id: 10,
//           active: true,
//           area_name: 'AO-10',
//           area_owner: 'Nazir Sb',
//           sub_areas: [
//             { id: 1001, name: 'Solar Area (Panels, Transformer rooms & entire area)' },
//             { id: 1002, name: 'Diesel Storage area' },
//             { id: 1003, name: 'Earth pit area' },
//             { id: 1004, name: 'Electrical power house' },
//             { id: 1005, name: 'LT room' },
//             { id: 1006, name: 'HT room' },
//             { id: 1007, name: 'Gen set area' },
//             { id: 1008, name: 'Transformer room' },
//             { id: 1009, name: 'Ammonia soft starter room' }
//           ]
//         },
//         {
//           area_id: 11,
//           active: true,
//           area_name: 'AO-11',
//           area_owner: 'Sadia',
//           sub_areas: [
//             { id: 1101, name: 'R&D Innovation Centre (Complete)' }
//           ]
//         },
//         {
//           area_id: 12,
//           active: true,
//           area_name: 'AO-12',
//           area_owner: 'Shafiq',
//           sub_areas: [
//             { id: 1201, name: 'QA' },
//             { id: 1202, name: 'Pathogen Lab' },
//             { id: 1203, name: 'QA storeroom' }
//           ]
//         },
//         {
//           area_id: 13,
//           active: true,
//           area_name: 'AO-13',
//           area_owner: 'Shahbaz',
//           sub_areas: [
//             { id: 1301, name: 'LPG Area' },
//             { id: 1302, name: 'Pump House' },
//             { id: 1303, name: 'Water treatment plant & roof' },
//             { id: 1304, name: 'Biomass Boiler (including fuel storage shed)' }
//           ]
//         },
//         {
//           area_id: 14,
//           active: true,
//           area_name: 'AO-14',
//           area_owner: 'Sheraz',
//           sub_areas: [
//             { id: 1401, name: 'Roof Tops (Cold Stores)' },
//             { id: 1402, name: 'Wooden Pallets Area' },
//             { id: 1403, name: 'FG BOF' },
//             { id: 1404, name: 'Cold Store 1&2' },
//             { id: 1405, name: 'Cold store offices' },
//             { id: 1406, name: 'Dispatch area' }
//           ]
//         },
//         {
//           area_id: 15,
//           active: false,
//           area_name: 'AO-15',
//           area_owner: 'Umair Pervaiz',
//           sub_areas: [
//             { id: 1501, name: 'UE Projects' },
//             { id: 1502, name: 'Projects Store' }
//           ]
//         }
//       ]
//     }
// }

// export default staticDatafortickets;




export const CandleStaticAreasOption=[
  {
     name:'MOULDING',
     id:1,
     owner:'Mr. Fida Khan Shareef',
    sub_areas:[
      {name:'MOULDING DEPART',id:1},
    ]
  },
  {
    name:'STORE',
    id:2,
    owner:'Mr. Kashif Ghani Usman Ghani',
    sub_areas:[
      {name:'LOCAL STORE',id:2}, 
    ]
  },
  {
    name:'Ali Pump',
    id:3,
    owner:'Qaiser',
    sub_areas:[
      {name:'Ali Pump Doubling',id:3}
    ]
  }
]

export const Candelmodule= [
  {
    id: 1,
    name: 'Person Available Alert'
  },
  {
    id: 2,
    name: 'Grouping'
  },
  {
    id: 3,
    name: 'Supervisor presence'
  },
  {
    id: 4,
    name: 'Machine Guard'
  },
]
export const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];
import { BookOpen, Grid, Calendar, Book, Aperture, Settings, Users, MapPin, Cpu, Layers, HelpCircle, Video, Activity, Clipboard, UserCheck, Key, BarChart, Target, Award, PieChart, Table, FileText } from 'react-feather';

export const MENUITEMS = {
  'super-admin': [
    {
      Items: [
        {
          children: [],
        },

        { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/activitymonitor`, icon: <Aperture />, title: "Activity Monitor", activeTitle: 'activitymonitor', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/permissions`, icon: <Key />, title: "Permissions", activeTitle: 'permissions', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/role`, icon: <UserCheck />, title: "Role", activeTitle: 'role', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/logs`, icon: <Book />, title: "Logs", activeTitle: 'logs', type: "link" }
      ],
    },
  ],
  'it-officer': [
    {
      Items: [
        {
          children: [],
        },
        { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/notification`, icon: <Activity />, title: "Activity Monitor", activeTitle: 'notification', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/itlog`, icon: <Clipboard />, title: "User Logs", activeTitle: 'itlog', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/all-factories`, icon: <Table />, title: "Factories", activeTitle: 'all-factories', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/support`, icon: <HelpCircle />, title: "Support & Tickets", activeTitle: 'support', type: "link" },
        { path: `${process.env.PUBLIC_URL}/cameras`, icon: <Aperture />, title: "Camera Status", activeTitle: 'cameras', type: "link" },
      ],
    },
  ],
  'factory': [
    {
      Items: [

        {
          path: `${process.env.PUBLIC_URL}/dashboard/summary`, icon: <FileText />, title: "Summary", activeTitle: 'summary', type: "link"
        },
        // { path: `${process.env.PUBLIC_URL}/dashboard/summary`, icon: <Grid />, title: "Summary", activeTitle: 'summary', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
        { path: `${process.env.PUBLIC_URL}/reports`, icon: <BarChart />, title: "Inspection", activeTitle: 'reports', type: "link" },
        //{ path: `${process.env.PUBLIC_URL}/areaanalysis`, icon: <PieChart />, title: "Area Owner Analysis", activeTitle: 'areaanalysis', type: "link" },
        //{ path: `${process.env.PUBLIC_URL}/sub-area-analysis`, icon: <Layers />, title: "Sub Area Analysis", activeTitle: 'sub-area-analysis', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/targets`, icon: <Target />, title: "Targets & Controls", activeTitle: 'targets', type: "link" },
        //{ path: `${process.env.PUBLIC_URL}/live_alerts`, icon: <Activity />, title: "Live Alerts", activeTitle: 'live_alerts', type: "link" },
        //{ path: `${process.env.PUBLIC_URL}/camera_configuration`, icon: <Aperture />, title: "Camera Status", activeTitle: 'camera_configuration', type: "link" },

        // created by sheheryar

        //{ path: `${process.env.PUBLIC_URL}/leaderboard`, icon: <Award />, title: "Leaderboard", activeTitle: 'leaderboard', type: "link" },
       // { path: `${process.env.PUBLIC_URL}/support`, icon: <HelpCircle />, title: "Support & Tickets", activeTitle: 'support', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/reports`, icon:<BookOpen />, title: "Reports", activeTitle:'reports', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/support-it`, icon:<import EmergencyExit from '../Components/Dashboards/GlobalDashboard/emergencyExit/Index'; /> , title: "IT Support", activeTitle:'support-it', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/users`, icon: <Users />, title: "Users", activeTitle: 'users', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, icon: <Aperture />, title: "Live Camera", activeTitle: 'live-camera', type: "link" },
        // {

        //   title: "Live ALerts",
        //   activeTitle: "Live ALerts",
        //   icon: <Activity />,
        //   type: "sub",

        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/add-alerts`, icon: <Activity />, title: "Add ALert", activeTitle: 'add-alerts', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/live-alerts`, icon: <Activity />, title: "Alerts", activeTitle: 'live-alerts', type: "link" },
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-alerts`,icon:<Activity />, title: "Emergency Notifications", activeTitle:'emergency-alerts', type: "link" }, 
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard-alerts`,icon:<Activity />, title: "Machine Guard Notifications", activeTitle:'machine-guard-alerts', type: "link" }, 
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/forklift-alerts`,icon:<Activity />, title: "Forklift Notifications", activeTitle:'forklift-alerts', type: "link" }, 
        //   ],
        // },
        // {

        //   title: "Reports",
        //   activeTitle: "Reports",
        //   icon: <Calendar />,
        //   type: "sub",

        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/dailyreport`, icon: <BookOpen />, title: "Daily", activeTitle: 'dailyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/weelkyreport`, icon: <BookOpen />, title: "Weekly", activeTitle: 'weelkyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/monthlyreport`, icon: <BookOpen />, title: "Monthly", activeTitle: 'monthlyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/yearlyreport`, icon: <BookOpen />, title: "Yearly", activeTitle: 'yearlyreport', type: "link" },
        //   ],
        // },
        // {

        //   title: "Area Reports",
        //   activeTitle: "Area Wise Reports",
        //   icon: <MapPin />,
        //   type: "sub",
        //   children: [
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/add-area`,icon:<BookOpen />, title: "Add Area", activeTitle:'add-area', type: "link" }, 
        //     { path: `${process.env.PUBLIC_URL}/dashboard/production`, icon: <BookOpen />, title: "Refrigeration", activeTitle: 'production', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/warehouse`, icon: <BookOpen />, title: "Warehouse", activeTitle: 'warehouse', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/distribution`, icon: <BookOpen />, title: "Distribution", activeTitle: 'distribution', type: "link" },
        //   ],
        // },
        // {
        //   title: "AI Model Reports",
        //   activeTitle: 'AI Model Reports',
        //   icon: <Cpu />,
        //   type: "sub",
        //   badge: "badge badge-light-primary",
        //   // badgetxt: "5",
        //   active: false,
        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/ppe-module`, title: "PPE Module", activeTitle: 'ppe-module', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/emergency-exit`, title: "Emergency Exit", activeTitle: 'emergency-exit', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard`, title: "Machine Guard", activeTitle: 'machine-guard', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/forklift`, icon: <BookOpen />, title: "Fork Lift", activeTitle: 'forklift', type: "link" },


        //   ],
        // },
        // {

        //   title: "Factory Reports",
        //   activeTitle: "Factory Wise Reports",
        //   icon: <Layers />,
        //   type: "sub",

        //   children: [
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/add-factory`,icon:<BookOpen />, title: "Add Factory", activeTitle:'add-factory', type: "link" }, 
        //     { path: `${process.env.PUBLIC_URL}/dashboard/factory-one`, icon: <BookOpen />, title: "ICF Factory", activeTitle: 'factory-one', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/factory-two`, icon: <BookOpen />, title: "Foods factory", activeTitle: 'factory-two', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/factory-three`, icon: <BookOpen />, title: "RYK factory", activeTitle: 'factory-three', type: "link" },
        //   ],
        // },

        // {
        //   title: "Truck Monitoring",
        //   activeTitle: 'Truck Monitoring',
        //   icon: <Layers />,
        //   type: "sub",
        //   badge: "badge badge-light-primary",
        //   // badgetxt: "5",
        //   active: false,
        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-entrance`,  title: "Vehicle Entrance", activeTitle:'vehicle-entrance', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-exit`,  title: "Vehicle Exit", activeTitle:'vehicle-exit', type: "link" },
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-status`,  title: "Vehicle Status", activeTitle:'vehicle-status', type: "link" },
        //   ],
        // },
        // { path: `${process.env.PUBLIC_URL}/dashboard/contact-support`, icon: <HelpCircle />, title: "Support", activeTitle: 'contact-support', type: "link" },



      ],
    },
  ],
  'global': [
    {
      Items: [
        { path: `${process.env.PUBLIC_URL}/dashboard/summary`, icon: <Grid />, title: "Summary", activeTitle: 'summary', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Live Analytics", activeTitle: 'default', type: "link" },
        { path: `${process.env.PUBLIC_URL}/reports`, icon: <BarChart />, title: "AI Model & Reports", activeTitle: 'reports', type: "link" },
        { path: `${process.env.PUBLIC_URL}/areaanalysis`, icon: <PieChart />, title: "Area Owner Analysis", activeTitle: 'areaanalysis', type: "link" },
        { path: `${process.env.PUBLIC_URL}/sub-area-analysis`, icon: <Layers />, title: "Sub Area Analysis", activeTitle: 'sub-area-analysis', type: "link" },
        { path: `${process.env.PUBLIC_URL}/targets`, icon: <Target />, title: "Targets & Controls", activeTitle: 'targets', type: "link" },
        { path: `${process.env.PUBLIC_URL}/live_alerts`, icon: <Activity />, title: "Live Alerts", activeTitle: 'live_alerts', type: "link" },
        { path: `${process.env.PUBLIC_URL}/camera_configuration`, icon: <Aperture />, title: "Camera Status", activeTitle: 'camera_configuration', type: "link" },
        // created by sheheryar
        { path: `${process.env.PUBLIC_URL}/leaderboard`, icon: <Award />, title: "Leaderboard", activeTitle: 'leaderboard', type: "link" },
        { path: `${process.env.PUBLIC_URL}/support`, icon: <HelpCircle />, title: "Support & Tickets", activeTitle: 'support', type: "link" },



        // { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/reports`, icon:<BookOpen />, title: "Reports", activeTitle:'reports', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/support-it`, icon:<import EmergencyExit from '../Components/Dashboards/GlobalDashboard/emergencyExit/Index'; /> , title: "IT Support", activeTitle:'support-it', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/users`, icon: <Users />, title: "Users", activeTitle: 'users', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, icon: <Aperture />, title: "Live Camera", activeTitle: 'live-camera', type: "link" },
        // {

        //   title: "Live ALerts",
        //   activeTitle: "Live ALerts",
        //   icon: <Activity />,
        //   type: "sub",

        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/add-alerts`, icon: <Activity />, title: "Add ALert", activeTitle: 'add-alerts', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/live-alerts`, icon: <Activity />, title: "Alerts", activeTitle: 'live-alerts', type: "link" },
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-alerts`,icon:<Activity />, title: "Emergency Notifications", activeTitle:'emergency-alerts', type: "link" }, 
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard-alerts`,icon:<Activity />, title: "Machine Guard Notifications", activeTitle:'machine-guard-alerts', type: "link" }, 
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/forklift-alerts`,icon:<Activity />, title: "Forklift Notifications", activeTitle:'forklift-alerts', type: "link" }, 
        //   ],
        // },
        // {

        //   title: "Reports",
        //   activeTitle: "Reports",
        //   icon: <Calendar />,
        //   type: "sub",

        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/dailyreport`, icon: <BookOpen />, title: "Daily", activeTitle: 'dailyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/weelkyreport`, icon: <BookOpen />, title: "Weekly", activeTitle: 'weelkyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/monthlyreport`, icon: <BookOpen />, title: "Monthly", activeTitle: 'monthlyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/yearlyreport`, icon: <BookOpen />, title: "Yearly", activeTitle: 'yearlyreport', type: "link" },
        //   ],
        // },
        // {

        //   title: "Area Reports",
        //   activeTitle: "Area Wise Reports",
        //   icon: <MapPin />,
        //   type: "sub",
        //   children: [
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/add-area`,icon:<BookOpen />, title: "Add Area", activeTitle:'add-area', type: "link" }, 
        //     { path: `${process.env.PUBLIC_URL}/dashboard/production`, icon: <BookOpen />, title: "Refrigeration", activeTitle: 'production', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/warehouse`, icon: <BookOpen />, title: "Warehouse", activeTitle: 'warehouse', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/distribution`, icon: <BookOpen />, title: "Distribution", activeTitle: 'distribution', type: "link" },
        //   ],
        // },
        // {
        //   title: "AI Model Reports",
        //   activeTitle: 'AI Model Reports',
        //   icon: <Cpu />,
        //   type: "sub",
        //   badge: "badge badge-light-primary",
        //   // badgetxt: "5",
        //   active: false,
        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/ppe-module`, title: "PPE Module", activeTitle: 'ppe-module', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/emergency-exit`, title: "Emergency Exit", activeTitle: 'emergency-exit', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard`, title: "Machine Guard", activeTitle: 'machine-guard', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/forklift`, icon: <BookOpen />, title: "Fork Lift", activeTitle: 'forklift', type: "link" },


        //   ],
        // },
        // {

        //   title: "Factory Reports",
        //   activeTitle: "Factory Wise Reports",
        //   icon: <Layers />,
        //   type: "sub",

        //   children: [
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/add-factory`,icon:<BookOpen />, title: "Add Factory", activeTitle:'add-factory', type: "link" }, 
        //     { path: `${process.env.PUBLIC_URL}/dashboard/factory-one`, icon: <BookOpen />, title: "ICF Factory", activeTitle: 'factory-one', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/factory-two`, icon: <BookOpen />, title: "Foods factory", activeTitle: 'factory-two', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/factory-three`, icon: <BookOpen />, title: "RYK factory", activeTitle: 'factory-three', type: "link" },
        //   ],
        // },

        // {
        //   title: "Truck Monitoring",
        //   activeTitle: 'Truck Monitoring',
        //   icon: <Layers />,
        //   type: "sub",
        //   badge: "badge badge-light-primary",
        //   // badgetxt: "5",
        //   active: false,
        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-entrance`,  title: "Vehicle Entrance", activeTitle:'vehicle-entrance', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-exit`,  title: "Vehicle Exit", activeTitle:'vehicle-exit', type: "link" },
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/vehicle-status`,  title: "Vehicle Status", activeTitle:'vehicle-status', type: "link" },
        //   ],
        // },
        // { path: `${process.env.PUBLIC_URL}/dashboard/contact-support`, icon: <HelpCircle />, title: "Support", activeTitle: 'contact-support', type: "link" },



      ],
    },
  ],
  // 'global': [
  //   {
  //     Items: [
  //       {
  //         children: [],
  //       },
  //       { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
  //       { path: `${process.env.PUBLIC_URL}/dashboard/camerafeed`, icon: <Video />, title: "Camera Feed", activeTitle: 'camerafeed', type: "link" },

  //       // { path: `${process.env.PUBLIC_URL}/dashboard/factorycontactus`,icon:<Aperture />, title: "Support", activeTitle:'factorycontactus', type: "link" }, 
  //       { path: `${process.env.PUBLIC_URL}/dashboard/notifications`, icon: <Aperture />, title: "Activity Monitor", activeTitle: 'notifications', type: "link" },
  //       // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-exit`,icon:<Aperture />, title: "Activity Monitor", activeTitle:'emergency-exit', type: "link" }, 
  //       // { path: `${process.env.PUBLIC_URL}/dashboard/factory/factorycontactus`,icon:<Aperture />, title: "Support", activeTitle:'notifications', type: "link" }, 
  //       // { path: `${process.env.PUBLIC_URL}/dashboard/livealerts`,icon:<Activity />, title: "Live Alerts", activeTitle:'livealerts', type: "link" }, 
  //       {

  //         title: "Live Alerts",
  //         activeTitle: "Live Alerts",
  //         icon: <Activity />,
  //         type: "sub",

  //         children: [
  //           { path: `${process.env.PUBLIC_URL}/dashboard/add-alerts`, icon: <Activity />, title: "Add Alert", activeTitle: 'add-alerts', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/live-alerts`, icon: <Activity />, title: "Alerts", activeTitle: 'live-alerts', type: "link" },
  //           // { path: `${process.env.PUBLIC_URL}/dashboard/emergency-alerts`,icon:<Activity />, title: "Emergency Notifications", activeTitle:'emergency-alerts', type: "link" }, 
  //           // { path: `${process.env.PUBLIC_URL}/dashboard/machine-guard-alerts`,icon:<Activity />, title: "Machine Guard Notifications", activeTitle:'machine-guard-alerts', type: "link" }, 
  //           // { path: `${process.env.PUBLIC_URL}/dashboard/forklift-alerts`,icon:<Activity />, title: "Forklift Notifications", activeTitle:'forklift-alerts', type: "link" }, 
  //         ],
  //       },
  //       {

  //         title: "Custom Duration Reports",
  //         activeTitle: "Custom Duration Reports",
  //         icon: <Calendar />,
  //         type: "sub",

  //         children: [
  //           { path: `${process.env.PUBLIC_URL}/dashboard/dailyreport`, icon: <BookOpen />, title: "Daily", activeTitle: 'dailyreport', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/weelkyreport`, icon: <BookOpen />, title: "Weekly", activeTitle: 'weelkyreport', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/monthlyreport`, icon: <BookOpen />, title: "Monthly", activeTitle: 'monthlyreport', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/yearlyreport`, icon: <BookOpen />, title: "Yearly", activeTitle: 'yearlyreport', type: "link" },
  //         ],
  //       },
  //       {

  //         title: "Area Wise Reports",
  //         activeTitle: "Area Wise Reports",
  //         icon: <MapPin />,
  //         type: "sub",

  //         children: [
  //           { path: `${process.env.PUBLIC_URL}/dashboard/production`, icon: <BookOpen />, title: "Production", activeTitle: 'production', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/warehouse`, icon: <BookOpen />, title: "Warehouse", activeTitle: 'warehouse', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/distribution`, icon: <BookOpen />, title: "Distribution", activeTitle: 'distribution', type: "link" },
  //         ],
  //       },
  //       {

  //         title: "AI Model Reports",
  //         activeTitle: "AI Model Reports",
  //         icon: <Cpu />,
  //         type: "sub",

  //         children: [
  //           { path: `${process.env.PUBLIC_URL}/dashboard/ppemodule`, icon: <BookOpen />, title: "PPE Module", activeTitle: 'ppemodule', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/emergencyexit`, icon: <BookOpen />, title: "Emergency Exit", activeTitle: 'emergencyexit', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/machineguard`, icon: <BookOpen />, title: "Machine Guard", activeTitle: 'machineguard', type: "link" },
  //           { path: `${process.env.PUBLIC_URL}/dashboard/forklift`, icon: <BookOpen />, title: "Fork Lift", activeTitle: 'forklift', type: "link" },
  //         ],
  //       },
  //       { path: `${process.env.PUBLIC_URL}/dashboard/contact-support`, icon: <HelpCircle />, title: "Support", activeTitle: 'contact-support', type: "link" },


  //     ],
  //   },
  // ],
  'area': [
    {
      Items: [
        {
          children: [],
        },
        { path: `${process.env.PUBLIC_URL}/dashboard/default`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
        { path: `${process.env.PUBLIC_URL}/reports`, icon: <BarChart />, title: "AI Model & Reports", activeTitle: 'reports', type: "link" },
        { path: `${process.env.PUBLIC_URL}/targets`, icon: <Target />, title: "Targets & Controls", activeTitle: 'targets', type: "link" },
        { path: `${process.env.PUBLIC_URL}/live_alerts`, icon: <BookOpen />, title: "Live Alerts", activeTitle: 'live_alerts', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/support-it`, icon:<Settings /> , title: "IT Support", activeTitle:'support-it', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/users`, icon:<Calendar /> , title: "Users", activeTitle:'users', type: "link" },
        { path: `${process.env.PUBLIC_URL}/dashboard/camera_configuration`, icon: <Aperture />, title: "Camera Status", activeTitle: 'camera_configuration', type: "link" },

        // { path: `${process.env.PUBLIC_URL}/dashboard/all-cameras`, icon: <Aperture />, title: "Camera Table", activeTitle: 'all-cameras', type: "link" },

        // {

        //   title: "AI Model Reports",
        //   activeTitle: "AI Model Reports",
        //   icon: <Cpu />,
        //   type: "sub",

        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/ppemodule`, icon: <BookOpen />, title: "Helmet Module", activeTitle: 'ppemodule', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/emergencyexit`, icon: <BookOpen />, title: "Emergency Exit", activeTitle: 'emergencyexit', type: "link",  },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/machineguard`, icon: <BookOpen />, title: "Machine Guard", activeTitle: 'machineguard', type: "link",  },
        //     // { path: `${process.env.PUBLIC_URL}/dashboard/forklife`,icon:<BookOpen />, title: "Fork Lift", activeTitle:'forklife', type: "link" },  
        //   ],
        // },
        // {
        //   title: "Duration Reports",
        //   activeTitle: "Duration Reports",
        //   icon: <Calendar />,
        //   type: "sub",


        //   children: [
        //     { path: `${process.env.PUBLIC_URL}/dashboard/dailyreport`, icon: <BookOpen />, title: "Daily", activeTitle: 'dailyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/weelkyreport`, icon: <BookOpen />, title: "Weekly", activeTitle: 'weelkyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/monthlyreport`, icon: <BookOpen />, title: "Monthly", activeTitle: 'monthlyreport', type: "link" },
        //     { path: `${process.env.PUBLIC_URL}/dashboard/yearlyreport`, icon: <BookOpen />, title: "Yearly", activeTitle: 'yearlyreport', type: "link" },
        //   ],
        // },
        { path: `${process.env.PUBLIC_URL}/dashboard/support`, icon: <HelpCircle />, title: "Support & Tickets", activeTitle: 'support', type: "link", },

      ],


    },
  ],
  'qa': [
    {
      Items: [
        {
          children: [],
        },
        { path: `${process.env.PUBLIC_URL}/dashboard/defaultqa`, icon: <Grid />, title: "Dashboard", activeTitle: 'default', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/reports`, icon: <BookOpen />, title: "Reports", activeTitle: 'reports', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/support`, icon: <Settings />, title: "IT Support", activeTitle: 'support', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/users`, icon: <Users />, title: "Users", activeTitle: 'users', type: "link" },
        // { path: `${process.env.PUBLIC_URL}/dashboard/live-camera`, icon: <Aperture />, title: "Live Camera", activeTitle: 'live-camera', type: "link" },
        { path: `${process.env.PUBLIC_URL}/support`, icon: <HelpCircle />, title: "Support", activeTitle: 'support', type: "link", },

      ],
    },
  ],
}




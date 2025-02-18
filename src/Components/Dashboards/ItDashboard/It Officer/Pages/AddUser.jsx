import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { H2, H4, H5 } from '../../../../../AbstractElements';
import { Typeahead } from 'react-bootstrap-typeahead';
import GenerateButton from '../../../../Common/newButton/index';
import '../../../Super Admin Dashboard/Components/Form/form.css'
import '../../../ItDashboard/It Officer/Styling/itStyle.css'
import { generatePassword } from '../../../../../utils/generatePassword';
import { ArrowLeft, Eye, EyeOff } from 'react-feather';
import { validatePassword } from '../../../../../utils/passwordValidation';
import formDataContext from '../../../../../_helper/formData';
import { useLocation, useNavigate } from 'react-router';
import { areaOptionsData, subareaOptionsData } from '../../../../../Data/staticData/data';
import AreaService from '../../../../../api/areaService';
import Loader from '../../../../../CommonElements/Spinner/loader'
import { errorToast, successToast } from '../../../../../_helper/helper';
import { ItemBullets } from '../../../../../Constant';
import { BeatLoader   } from 'react-spinners';
import { Link } from 'react-router-dom';

const AddUser = () => {
    const location = useLocation()
    const { register, handleSubmit, formState: { errors },trigger, setValue, watch, control } = useForm();
    const initialRole = JSON.parse(localStorage.getItem('role') || '"user"');
    const { AddUserData, setAddUserData } = useContext(formDataContext)
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isAllSelectedSub, setIsAllSelectedSub] = useState(false);
    const [eyeOpen, seteyeOpen] = useState(false) 
    const [areaOptions, setareaOptions] = useState([])
    const [subAreasOptions, setSubAreaOptions] = useState()
    // const subAreasOptions = subareaOptionsData;
    const [loading, setloading] = useState(true)
    const navigate = useNavigate();
    const [allareasID, setallareasID] = useState()
    const [factories, setfactories] = useState([])
    const [role] = useState(initialRole);
    const [multiple] = useState(true);
    const [smallLoader, setsmallLoader] = useState(false)
    const [allRoles, setallRoles] = useState(); 
    const [showarea, setshowarea] = useState(false);
    const [newAreaOptions, setnewAreaOptions] = useState([]);
    const [newSubareaOptions, setnewSubareaOptions] = useState([]);
    const [selectednewareas, setselectednewareas] = useState([]);
    const [alldata, setalldata] = useState([]);
    const [forEDITuserID, setforEDITuserID] = useState()
    const [forglobal, setforglobal] = useState({
        globalarea:[],
        otherarea:[],
        W_globalarea:[],
        W_otherarea:[],
    })
    const [formData, setFormData] = useState({
        userId: '',
        name: '', 
        role_name:'',
        email: '',
        phone: '',
        password: '',
        role: '',
        id: '',
        role_id:'',
        status: true,
        createdBy: role,
        passwordReneval: '90 Days',
        emailNotification: false,
        emailNotifications: [],
        whatsappNotification: false,
        whatsappNotifications: [],
        notificationAreasWhatsapp: [],
        notificationSubAreasWhatsapp: [],
        notificationAreasEmail: [],
        notificationSubAreasEmail: [],
        Areas: [],
        factories: [],
        subArea: [],
    });
    const [MobileNoCheck, setMobileNoCheck] = useState(false)
    const [allfacotires, setallfacotires] = useState([]);
    function extractData(data,transformedData) {
        const alldata=transformedData 
        let areas ;
        const subareas = [];
        const factoriess = [];
        let emailAreas ;
        const emailSubareas = [];
        const alertemails = (data?.email_notifications?.[0]?.toggle && Array.isArray(data.email_notifications[0].alert_emails)) ?
        data.email_notifications[0].alert_emails.filter(email => email != null) :
        [];

        let emailnotification=false;
        let whatsappAreas ;
        const whatsappSubareas = [];
        const whatsappnumber= (data?.whatsapp_notifications?.[0]?.toggle && Array.isArray(data.whatsapp_notifications[0].phone_numbers)) ?
        data.whatsapp_notifications[0].phone_numbers.filter(phone => phone != null) :
        [];
        let whatsappnotification=false
        // Extracting areas
        if (data.areas && Array.isArray(data.areas)) {
            const filteredData =alldata && alldata.flatMap(item =>
                item.areas
                    .filter(item2 =>
                        data.areas.some(name => name.area_id === item2.id)
                    )
                    .map(item2 => ({
                        factory_id: item.factory_id, // Assuming factory_id is at the root level of `item`
                        id: item2.id,
                        name: item2.newName
                    }))
            ); 
            areas=filteredData

            // data.areas.forEach(area => {
            //     if (area && area.area_name) {
            //         areas.push(area.area_name);
            //         console.log('Area added:', area.area_name);
            //     }
            // });
        } else {
            console.log('No areas data available');
        }
        // Extracting Email Notifications Areas and Subareas
        if (data.email_notifications && Array.isArray(data.email_notifications)) {
            data.email_notifications.forEach(notification => {
                if (notification.toggle) {
                    emailnotification=true
                   
                    // notification.areas.forEach(area => {
                    //     if (area && area.area_name) {
                    //         emailAreas.push(area.area_name);
                    //         console.log('Email notification area added:', area.area_name);
                    //     }
                    // });
                    const filteredAREAForEmail2 = alldata.flatMap(item =>
                        item.areas
                            .filter(item2 =>
                                notification.areas.some(name => name.area_id === item2.id)
                            )
                            .map(item2 => ({
                                name: item2.newName,
                                id:item2.id,
                                factory_id:item.factory_id,
                            })) // Return the newName of matched item2
                    );
  
                    // temporary changes ------------x---------------------x-----------
 
                    const filteredAREAForEmail = alldata.flatMap(item =>
                        item.areas
                            .filter(item2 =>
                                notification.areas.some(name => name.area_id === item2.id)
                            )
                            .map(item2 => item2.newName) // Return the newName of matched item2
                    );
                    console.log(filteredAREAForEmail2,filteredAREAForEmail,'heloooooooooooooooo')
                    setforglobal((prevState) => ({
                        ...prevState,
                        globalarea: filteredAREAForEmail2,
                        otherarea: filteredAREAForEmail,
                    }));
                    emailAreas=filteredAREAForEmail
                    notification.sub_areas.forEach(subArea => {
                        if (subArea && subArea.sub_area_name) {
                            emailSubareas.push(subArea.sub_area_name);
                            console.log('Email notification subarea added:', subArea.sub_area_name);
                        }
                    });
                }
            });
        } else {
            console.log('No email notification data available');
        }
    
        // Extracting WhatsApp Notifications Areas and Subareas
        if (data.whatsapp_notifications && Array.isArray(data.whatsapp_notifications)) {
            data.whatsapp_notifications.forEach(notification => {
                if (notification.toggle) {
                    whatsappnotification=true
                    // notification.areas.forEach(area => {
                    //     if (area && area.area_name) {
                    //         whatsappAreas.push(area.area_name);
                    //         console.log('WhatsApp notification area added:', area.area_name);
                    //     }
                    // });
                    const filteredAREAForWhatsAPP2 = alldata.flatMap(item =>
                        item.areas
                            .filter(item2 =>
                                notification.areas.some(name => name.area_id === item2.id)
                            )
                            .map(item2 => ({
                                name: item2.newName,
                                id:item2.id,
                                factory_id:item.factory_id,
                            })) // Return the newName of matched item2
                    );

// -------------------x----------temporary changes---------------x---------------

                    const filteredAREAForWhatsAPP = alldata.flatMap(item =>
                        item.areas
                            .filter(item2 =>
                                notification.areas.some(name => name.area_id === item2.id)
                            )
                            .map(item2 => item2.newName) // Return the newName of matched item2
                    );
                    setforglobal((prevState) => ({
                        ...prevState,
                        W_globalarea: filteredAREAForWhatsAPP2,
                        W_otherarea: filteredAREAForWhatsAPP,
                    }));
                    whatsappAreas=filteredAREAForWhatsAPP
                    notification.sub_areas.forEach(subArea => {
                        if (subArea && subArea.sub_area_name) {
                            whatsappSubareas.push(subArea.sub_area_name);
                            console.log('WhatsApp notification subarea added:', subArea.sub_area_name);
                        }
                    });
                }
            });
        } else {

            console.log('No WhatsApp notification data available');
        }
        setFormData({
            ...formData,
            Areas: areas.map(item => item.name),
            factories:factories,
            role:data.role_id,
            email:data.email,
            name:data.name,
            phone:data.mobile_no, 
            emailNotification:emailnotification,
            notificationAreasEmail:emailAreas,
            notificationSubAreasEmail:emailSubareas,
            emailNotifications:alertemails,
            whatsappNotification:whatsappnotification,
            notificationAreasWhatsapp:whatsappAreas,
            notificationSubAreasWhatsapp:whatsappSubareas,
            whatsappNotifications:whatsappnumber
        });
        setValue("factories", factories);
        setValue("Areas", areas);
        setValue("name", AddUserData.name);
        setValue("email", AddUserData.email);
        setValue("role", AddUserData.role_id);
        setValue("phone", AddUserData.mobile_no);
        setValue("emailNotification", emailnotification);
        setValue("notificationAreasEmail", emailAreas);
        setValue("notificationSubAreasEmail", emailSubareas);
        setValue("emailNotifications", alertemails);
        setValue("whatsappNotification", whatsappnotification);
        setValue("notificationAreasWhatsapp", whatsappAreas);
        setValue("notificationSubAreasWhatsapp", whatsappSubareas); 
        setValue("whatsappNotifications", whatsappnumber); 
        return {
            areas,
            subareas,
            factories,
            emailAreas,
            emailSubareas,
            whatsappAreas,
            whatsappSubareas
        };
    }
    
 
    const transformDataToOptionsforEditUser = (data, allAreaOptions, allFactories,transformedData) => {
        try {
           const finalData = extractData(data,transformedData);

        } catch (error) {
            console.error('Error processing data:', error);
            errorToast(`Error encountered: ${error.message}`);
            navigate(`${process.env.PUBLIC_URL}/dashboard/default/${role}`);
        }
    };
    

    const typeHeadChange = (key, selected) => {
        console.log('selecteddd', selected)
      
        setFormData((prev) => ({
            ...prev,
            [key]: selected
        }));
  
    };
    

    const genPassword = (e) => {
        e.preventDefault();
        const password = generatePassword()
        setValue('password', password)
        setFormData((prev) => ({
            ...prev,
            password: password
        }));
    };

    const handleCancel = (e) => {
        e.preventDefault()
        setFormData({
            userId: '',
            name: '',
            email: '',
            phone: '',
            password: '',
            role: '',
            id: '',
            status: true,
            createdBy: role,
            passwordReneval: '90 Days',
            inAppNotification: true,
            emailNotification: false,
            emailNotifications: [],
            whatsappNotification: false,
            whatsappNotifications: [],
            Areas: [],
            factories: [],
            subArea: [],
        });
        navigate(`${process.env.PUBLIC_URL}/dashboard/default/${JSON.parse(localStorage.getItem('role'))}`)
    }
    const generateID = (e) => {
        e.preventDefault(); // Prevent default form submission
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let UserID = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            UserID += chars[randomIndex];
        }
        setValue('userId', UserID); // Set user ID value using setValue
        setFormData((prev) => ({ ...prev, userId: UserID })); // Update the local state for display
    };

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            status: 'Active',
            createdBy: role,
            passwordReneval: '90 Days'
        }));

    };

    const getFilteredSubArea = () => {
        if (formData?.Areas?.length == 0 || isAllSelected) {
            return Object.values(subAreasOptions).flat()
        }

        return formData?.Areas?.flatMap(area => subAreasOptions[area] || [])
    } 
    const handleSelectAllAreas = (e) => {
        e.preventDefault();
        if (isAllSelected) {
            // Clear all selections
            setFormData((prev) => ({
                ...prev,
                Areas: []
            }));
        } else {
            // Select all areas
            setFormData((prev) => ({
                ...prev,
                Areas: areaOptions

            }));
        }
        setIsAllSelected(!isAllSelected); // Toggle selection state
    };
    const handleSelectAllSubAreas = (e) => {
        e.preventDefault();
        if (isAllSelectedSub) {
            // Clear all selections
            setFormData((prev) => ({
                ...prev,
                subArea: []
            }));
        } else {
            let sub;
            if (formData.Areas.length === 0 || isAllSelected) {
                sub = Object.values(subAreasOptions).flat()
            } else {
                sub = formData.Areas.flatMap(area => subAreasOptions[area] || [])
            }
            // Select all areas
            setFormData((prev) => ({
                ...prev,
                subArea: sub
            }));

        }
        setIsAllSelectedSub(!isAllSelectedSub); // Toggle selection state
    };
 

    // console.log("formData", formData)

    const style = { PaddingTop: '20px' }
    const classNamesForPara = 'mb-0 mt-3'

    // this function handleing email notification including areas,subareas and set state of Form for error checking 
    const handleEmailNotificationToggle = () => { 
        setFormData((prev) => ({ ...prev, emailNotification: !prev.emailNotification }));
        const statusCheck= !formData.emailNotification;

        if (statusCheck==true) {
            // Prefill with previously selected values
            const selectedAreas = [...formData.Areas];
            const selectedSubAreas = [...formData.subArea];

            // Update formData state
           
                setFormData((prev) => ({
                    ...prev,
                    notificationAreasEmail: selectedAreas,
                    notificationSubAreasEmail: selectedSubAreas,
                    // emailNotifications:[]
                }));
          
             

            // Sync with react-hook-form and validate
            setValue("notificationAreasEmail", selectedAreas, { shouldValidate: true });
            setValue("notificationSubAreasEmail", selectedSubAreas, { shouldValidate: true });
            // setValue("emailNotifications", [], { shouldValidate: true });

            // Trigger validation to clear errors if fields are now valid
            //   trigger(["notificationAreasEmail", "notificationSubAreasEmail"]);
        }
        else{  
           
            setFormData((prev) => ({
                ...prev,
                notificationAreasEmail: [],
                notificationSubAreasEmail:[],
                emailNotifications:[],
                emailNotification:false
            }));
        }
    };
    const handleWhatsappNotificationToggle = () => {
        // Toggle the whatsappNotification state
        setFormData((prev) => ({ ...prev, whatsappNotification: !prev.whatsappNotification }));
        const statusCheck=!formData.whatsappNotification
        if (statusCheck==true) {
            // Pre-fill with previously selected areas and sub-areas if toggling on
            const selectedAreas = [...formData.Areas];
            const selectedSubAreas = [...formData.subArea];

            // Update formData state with selected values
            setFormData((prev) => ({
                ...prev,
                notificationAreasWhatsapp: selectedAreas,
                notificationSubAreasWhatsapp: selectedSubAreas,
            }));

            // Set values in react-hook-form to sync and trigger validation
            setValue("notificationAreasWhatsapp", selectedAreas, { shouldValidate: true });
            setValue("notificationSubAreasWhatsapp", selectedSubAreas, { shouldValidate: true });

            // Trigger validation to clear errors if fields are now valid
            //   trigger(["notificationAreasWhatsapp", "notificationSubAreasWhatsapp"]);
        }
        else{
            setFormData({
                ...formData,
                notificationAreasWhatsapp: [],
                notificationSubAreasWhatsapp: [],
                whatsappNotifications:[],
                whatsappNotification:false
            })
        }
    };
    const transformDataToOptions = (data) => {
        const optionsData = {};
        const areaNames = [];
        const allfactories=[];
        const filteredArea=data[0].areas.filter(item=>item.active==true); 

        const factoryArea = data.map(factory => ({
            ...factory,
            areas: factory.areas.map(area => ({
                ...area,
                newName: `${area.area}, ${factory.name}`
            }))
        }));
        setalldata(factoryArea)
        
        console.log(factoryArea, 'updated objects');

        const newAreasOption = factoryArea.flatMap(factory =>
            factory.areas.map(area => ({
                id: area.id,
                name: area.newName,
                factory_id: factory.factory_id
            }))
        );
        setnewAreaOptions(newAreasOption)
         
        console.log(newAreasOption,'current area options');

        const newSubareaOptions = factoryArea.flatMap(factory =>
            factory.areas.flatMap(area =>
                area.sub_area.map(sub => ({
                    id: sub.id,
                    name: sub.name,
                    factory_id: factory.factory_id,
                    area_name:area.newName
                }))
            )
        ); 
        setnewSubareaOptions(newSubareaOptions) 

        filteredArea.forEach(areaData => { 
          const areaName = areaData.area; 
          areaNames.push(areaName);
          const subareas = areaData.sub_area.map(subArea => subArea.name); // Collect all sub-area names
          optionsData[areaName] = subareas; // Assign subarea names array to the area name key
        });
        const factoryData = data.map(item => {
            return {
              name: item.name, // Extracting the name
              factory_id: item.factory_id // Extracting the factory_id
            };
          });
        setallfacotires(factoryData);
        setareaOptions(areaNames)
        setfactories(factoryData) ;
        setSubAreaOptions(optionsData)  
        return factoryArea;
      };
      
    const fetchFactories=async()=>{
       const roles= fetchRoless()
        try {
        const res =await AreaService.getAllFactoriesDataForIT();
         
        const transformedData = transformDataToOptions(res.data.data);  
        // setSubAreaOptions(transformedData);
        const allAreas = res.data.data?.flatMap(obj =>
            obj.areas.map(area => area) 
        ); 
        setallareasID(allAreas); 
        // setallareasID(res.data.data[0].areas); 
        
        if(res.status==200 && roles){
            if(location?.state?.type === 'edit'){
                transformDataToOptionsforEditUser(AddUserData,areaOptions,factories,transformedData);
                setloading(false)
            }
            else{
                setloading(false)
            }
        }

        } catch (error) {
            errorToast('Error while fetching data')
        }
    }
    const fetchRoless=async()=>{
        const role=JSON.parse(
            localStorage.getItem("role")
          )
       try {
        const roless=await AreaService.fetchAllRolesforIT(); 
        if(roless){
            console.log(roless.data.data)
            setallRoles(roless.data.data);
        }
       } catch (error) {
            errorToast('You are not authorized to add user');
            navigate(
                `${process.env.PUBLIC_URL}/dashboard/default/${role}`
              )
       }
    }

    const addUser=async(user)=>{
        try {
            const res=await AreaService.AdduserIT(user);
            if(res.status==200){
                successToast('User added');
                const role = JSON.parse(localStorage.getItem('role'));
        const url = `${process.env.PUBLIC_URL}/dashboard/default/${role}`;

        // Navigate to the constructed URL with state
        navigate(url, { state: { addUser: true } });
            }
        } catch (error) {
            setsmallLoader(false)
            errorToast('Error while adding user')
        }
      
    }

    const getAreaIDs = (selectedAreas, allAreas) => {
        return selectedAreas
            .map(areaName => {
                const foundArea = allAreas.find(allid => allid.area === areaName);
                return foundArea ? foundArea.id : null;
            })
            .filter(id => id !== null); // Filter out null values
    };
     
    const getSubAreaIDs = (selectedSubAreas, allAreas) => {
        return selectedSubAreas
            .map(subAreaName => {
                const foundArea = allAreas.find(allid => 
                    allid.sub_area.some(sub => sub.name === subAreaName)
                );
                if (foundArea) {
                    const foundSubArea = foundArea.sub_area.find(sub => sub.name === subAreaName);
                    return foundSubArea ? foundSubArea.id : null;
                }
                return null;
            })
            .filter(id => id !== null); // Filter out null values
    };

    const handleEditApi=async(payload)=>{
        let msg;
         console.log(payload)
         try {
             const res= await AreaService.updateUser(payload);
             msg=res
        console.log(res.data,'from api calling')
        if(res.status==200){
            successToast('User updated');
            navigate(`${process.env.PUBLIC_URL}/dashboard/default/${role}`);
            setsmallLoader(false)
            return
        } 
         } catch (error) {
            errorToast('error')
            setsmallLoader(false)
         }
        
         
    }
    
    const handleSave = (data) => {
        let AREA;
        let AREA_whatsapp;
        let AREA_Email;  
        try { 
            if(formData.Areas?.length>0){ 
               const areaNameWithoutFactory= alldata.flatMap(item =>
                item.areas.flatMap(item2 =>
                    formData.Areas
                        .filter(name => name === item2.newName) // Check if the names match
                        .map(() => item2.id) // Extract the ID of the matching item2
                )
            );
               AREA=areaNameWithoutFactory
            }  
            if(formData.emailNotification==true){

            const EmailareaNameWithoutFactory = formData.notificationAreasEmail.flatMap(nameOrObject => {
                if (typeof nameOrObject === 'object') {
                    // If it's an object, directly extract its id
                    return nameOrObject.id;
                } else {
                    // If it's not an object, run the full filter and map logic
                    return alldata.flatMap(item =>
                        item.areas
                            .filter(item2 => nameOrObject === item2.newName) // Match by newName
                            .map(item2 => item2.id) // Extract the ID
                    );
                }
            }); 
            AREA_Email=EmailareaNameWithoutFactory
            }
            if(formData.whatsappNotification==true){ 
                const WhatsAPPareaNameWithoutFactory = formData.notificationAreasWhatsapp.flatMap(nameOrObject => {
                    if (typeof nameOrObject === 'object') {
                        // If it's an object, directly extract its id
                        return nameOrObject.id;
                    } else {
                        // If it's not an object, run the full filter and map logic
                        return alldata.flatMap(item =>
                            item.areas
                                .filter(item2 => nameOrObject === item2.newName) // Match by newName
                                .map(item2 => item2.id) // Extract the ID
                        );
                    }
                });
                
            AREA_whatsapp=WhatsAPPareaNameWithoutFactory
            } 
        setAddUserData({ ...formData })
        setsmallLoader(true) 
        const updatedEmails = formData?.emailNotifications?.map(item => {
            // Check if the item is an object and is a custom option
            if (typeof item === 'object' && item.customOption) {
                return item.name;  // Return the name property for custom options
            }
            // Otherwise, return the item itself (it should be a string if not a custom option object)
            return item;
        });
        
        const updatedNumbers = formData?.whatsappNotifications?.map(item => {
            // Apply the same logic as for emails
            if (typeof item === 'object' && item.customOption) {
                return item.name;
            }
            return item;
        });
         
        // Extract area IDs, sub-area IDs, and factory IDs
        // const userselectedarea = getAreaIDs(formData.Areas, allareasID);
        const userselectedarea = AREA;
        // const userselectedSubArea = getSubAreaIDs(formData.subArea, allareasID);
        const allFactoryIDs = formData.factories.map(item => item.factory_id);

        // Extract email notification areas and sub-areas
        // const emailNotificationAreas = getAreaIDs(formData.notificationAreasEmail, allareasID);
        const emailNotificationAreas = AREA_Email
        const emailNotificationSubAreas = getSubAreaIDs(formData.notificationSubAreasEmail, allareasID);

        // Extract WhatsApp notification areas and sub-areas
        // const whatsappNotificationAreas = getAreaIDs(formData.notificationAreasWhatsapp, allareasID);
        const whatsappNotificationAreas = AREA_whatsapp
        const whatsappNotificationSubAreas = getSubAreaIDs(formData.notificationSubAreasWhatsapp, allareasID);

        const DataForSubmission = { 
            name: formData?.name,
            role_id: parseInt(formData?.role, 10),
            email: formData?.email,
            mobile_no: formData?.phone,
            password: formData?.password,
            areas:userselectedarea, 
            factories:allFactoryIDs,
            email_notifications: {
                toggle:formData?.emailNotification,
                areas: emailNotificationAreas,
                sub_areas: emailNotificationSubAreas,
                alert_emails: updatedEmails
            },
            whatsapp_notifications: {
                toggle:formData?.whatsappNotification,
                areas: whatsappNotificationAreas,
                sub_areas: whatsappNotificationSubAreas,
                phone_numbers: updatedNumbers
            },
            ...(location?.state?.type === 'edit' ? {
                admin_id: JSON.parse(localStorage.getItem('userData'))?.id || 40,
                user_id:AddUserData.id,
                 
            }:{
                user_id: JSON.parse(localStorage.getItem('userData'))?.id || 40,
                
            })
        } 
        console.log(DataForSubmission,'final submission');
       
        if(DataForSubmission){
            if(location?.state?.type === 'edit'){
                console.log('api hit')
                handleEditApi(DataForSubmission)
            }
            else{
                addUser(DataForSubmission);
            }
        }
    } catch (error) {
        console.log(error,'erorrr')
        setsmallLoader(false)
        errorToast('error while filtering data');
    } 
         
    };
      
useEffect(() => {
    fetchFactories()
}, [])

useEffect(() => {
   if(formData.role=='10'){
    setshowarea(false);
 
   }
   else{
    setshowarea(true);
   
   }
   
}, [formData.role]); 

useEffect(() => {
    if(formData.role=='10'){
        setshowarea(false);
        setFormData({
            ...formData,
            notificationAreasEmail:forglobal?.globalarea || [],
            notificationAreasWhatsapp:forglobal?.W_globalarea || [],
        })
        setValue("notificationAreasEmail", forglobal?.globalarea || []);
        setValue("notificationAreasWhatsapp", forglobal?.W_globalarea || []);
       }
       else{
        setshowarea(true);
        setFormData({
            ...formData,
            notificationAreasEmail:forglobal?.otherarea || [],
            notificationAreasWhatsapp:forglobal?.W_otherarea || [], 
        })
        setValue("notificationAreasEmail", forglobal?.otherarea || []);
        setValue("notificationAreasWhatsapp",forglobal?.W_otherarea || []);
       }
}, [forglobal,formData.role])


useEffect(() => {
    const factoriess=[];
    const data=AddUserData;
    if(data?.factories){
        if (data?.factories && Array.isArray(data.factories)) {
            data.factories.forEach(areaData => {
                const factoryname = areaData.factory_name;
                if (factoryname) { // Ensure that factory_name is not undefined or null
                    const factoryObj = allfacotires.find(factory => factory.name == factoryname);
                    console.log(factoryname,'coming factory',factories,'all factories')
                    if (factoryObj) {
                        factoriess.push(factoryObj);
                        console.log('Factory added:', factoryname);
                    } else {
                        console.log('Factory not found in allFactories:', factoryname);
                    }
                } else {
                    console.log('Factory name is missing or invalid in area data');
                }
            });
        } else {
            console.log('No factories data available or data.factories is not an array');
        }
        setFormData({
            ...formData,
            factories:factoriess
        })
        setValue("factories", factories);
    }
    else{
        console.log('all factories not updated',factories)
    }
}, [factories]) 

// console.log(forglobal,'areas condition')
    return (
        <Container fluid={true} className="dashboard-first-page">
            <div className='d-flex gap-2 align-items-center'>
                <div>
                <Link to={`${process.env.PUBLIC_URL}/dashboard/default/${role}`}>
                    <button className="back-button border mb-2"  >
                        <ArrowLeft color='black' size={20} />
                    </button>
                </Link>
                </div>
                <H4 className="mb-4">{location?.state?.type === 'edit' ? 'Edit User' : 'Add User'}</H4>
            </div>
            {loading?<Loader/>:
            <>
            {smallLoader?<div style={{height:'60vh'}} className='w-100 d-flex justify-content-center align-items-center flex-column'>
                    <p>Please wait...</p>
                    <BeatLoader />
                </div>:
                
            <div className=" border rounded shadow-sm mb-5" style={{ padding: '30px',position:'relative' }}>
                <form onSubmit={handleSubmit(handleSave)}>
                    <Row>
                        <Col xl={5} sm={12} className="mb-4"> 
                            <H5>Basic Information</H5>
                            {/* <FormGroup>
                                <Label for="id">User ID</Label>
                             
                                <div className="d-flex mb-2">
                                    <Controller
                                        name="userId"
                                        control={control}
                                        rules={{ required: 'Name is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="userId"
                                                value={formData.userId}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData((prev) => ({ ...prev, userId: e.target.value }));
                                                }}
                                                className="me-2"
                                            />
                                        )}
                                    />
                                    <GenerateButton btnText='Generate ID' onClick={generateID}  height='40px' width='160px' />
                                </div>
                                {errors.userId && <span className="text-danger">{errors.userId.message}</span>}

                            </FormGroup> */}

                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: 'Name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
                                            message: 'Name should only contain letters',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="name"
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setFormData((prev) => ({ ...prev, name: e.target.value }));
                                            }}
                                        />
                                    )}
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </FormGroup>
                            <FormGroup>

                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="email"
                                                type='email'
                                                value={formData.email}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleInputChange(e);
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                </FormGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="role">Role</Label>
                                <Controller
                                    name="role"
                                    control={control}
                                    rules={{ required: 'Role is required' }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="select"
                                            id="role"
                                            value={formData.role}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                // setFormData({
                                                //     ...formData,
                                                //     subArea:[],
                                                //     Areas:[],
                                                //     factories:[]
                                                // })
                                                if(e.target.value==10){
                                                    setFormData({
                                                        ...formData,
                                                        Areas:[]
                                                    })
                                                    setValue("Areas", []);
                                                }
                                                else{
                                                    setFormData({
                                                        ...formData,
                                                        emailNotification:false,
                                                        whatsappNotification:false,
                                                        notificationAreasWhatsapp:[],
                                                        notificationSubAreasEmail:[],
                                                        notificationSubAreasWhatsapp:[],
                                                        notificationAreasEmail:[],
                                                        whatsappNotifications:[],
                                                        emailNotifications:[]
                                                    });
                                                    setValue("emailNotification", false);
                                                    setValue("notificationAreasEmail", []);
                                                    setValue("notificationSubAreasEmail", []);
                                                    setValue("emailNotifications", []);
                                                    setValue("whatsappNotification", false);
                                                    setValue("notificationAreasWhatsapp", []);
                                                    setValue("notificationSubAreasWhatsapp", []); 
                                                    setValue("whatsappNotifications", []); 
                                                }
                                                 
                                                handleInputChange(e);
                                            }}
                                        >
                                            <option value="">Select Role</option>
                                            {allRoles?.map((item,key)=>(
                                                <>
                                                {item.role_name=='Admin' || item.role_name=='User'?null:
                                                    <option value={item.role_id} key={key}>{item.role_name}</option>
                                                }
                                                </>
                                            ))}
                                            {/* <option value='factory'>Global</option>
                                            <option value="Factory">Factory</option>
                                            <option value="Area">Area</option>
                                            <option value="Tech QA">Tech QA</option> */}
                                        </Input>
                                    )}
                                />
                                {errors.role && <span className="text-danger">{errors.role.message}</span>}
                            </FormGroup>
                            {/* {(formData.role === 'factory' || formData.role === 'Tech QA') && (
                                <FormGroup>
                                    <Label>Select Factories</Label>
                                    <Typeahead
                                        id="factories"
                                        labelKey="name"
                                        multiple={multiple}
                                        options={['ICF', 'RYK', 'Foods']}
                                        selected={formData.factories}
                                        onChange={(selected) => typeHeadChange('factories', selected)}

                                    />
                                </FormGroup>
                            )} */} 

                                        <FormGroup>
                                        <Label>Select Factories</Label>
                                        <Controller
                                            name="factories"
                                            control={control}
                                            rules={{ required: 'Selecting a factory is required' }} // You can specify your validation rules here
                                            render={({ field }) => (
                                                <Typeahead
                                                    {...field}
                                                    id="factories"
                                                    labelKey="name"
                                                    multiple={true} // Or `multiple` based on your variable
                                                    options={factories}
                                                    // selected={field.value || []}
                                                    selected={formData.factories || []}
                                                    onChange={(selected) => {
                                                        field.onChange(selected.map(item => item)); // Assuming items are objects and you want to store the entire object
                                                        setFormData(prevState => ({
                                                            ...prevState,
                                                            factories: selected
                                                        }));
                                                    }}
                                                    onBlur={field.onBlur}
                                                    placeholder="Choose factories..."
                                                />
                                            )}
                                        />
                                        {errors.factories && <span className="text-danger">{errors.factories.message}</span>}
                                    </FormGroup>
                           
                            
                                { formData.role == '10' || formData.factories.length<=0? null:<>
                                  {showarea?
                                  <FormGroup>
                                    <Label>Select Areas</Label>
                                    <Controller
                                        name="Areas"
                                        control={control}
                                        rules={{ required: 'Selecting an area is required' }}  
                                        render={({ field }) => (
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <Typeahead
                                                    {...field}
                                                    className='w-100'
                                                    id="areas"
                                                    labelKey="name"
                                                    multiple={multiple} 
                                                    options={
                                                        formData?.factories.length > 0
                                                            ? formData.factories.flatMap(factory =>
                                                                  newAreaOptions.filter(item => item.factory_id === factory.factory_id)
                                                              )
                                                            : newAreaOptions
                                                    }
                                                    // options={areaOptions}
                                                    selected={field.value || []}
                                                    onChange={(selected) => {
                                                        setselectednewareas([
                                                            ...selectednewareas,
                                                            selected
                                                        ])
                                                        field.onChange(selected.map(item => item)); // Adapt this line if you need to customize the stored value structure
                                                        console.log(selected,'selected areaaa')
                                                        setFormData(prevState => ({
                                                            ...prevState,
                                                            // Areas: selected.map(item => item.name.split(',')[0])
                                                            Areas: selected.map(item => item.name)
                                                        }));
                                                    }}
                                                    placeholder="Choose areas..."
                                                />
                                                {/* <GenerateButton
                                                    btnText={isAllSelected ? 'Clear All' : 'Select All'}
                                                    onClick={handleSelectAllAreas}
                                                    height='38px'
                                                    width='160px'
                                                    className="align-self-start"
                                                    bgcolor={isAllSelected ? 'bg-danger' : ''} 
                                                /> */}
                                            </div>
                                        )}
                                    />
                                    {errors.Areas && <span className="text-danger">{errors.Areas.message}</span>}
                                </FormGroup>
                                :
                                null}
                           
                                 {/* <FormGroup>
                                    <Label>Select Sub Areas</Label>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Typeahead
                                            className='w-100'
                                            id="subAreas"
                                            labelKey="name"
                                            multiple={multiple}
                                            options={getFilteredSubArea()}
                                            selected={formData.subArea}
                                            onChange={(selected) => typeHeadChange('subArea', selected)}

                                        />
                                        <GenerateButton
                                            btnText={isAllSelectedSub ? 'Clear All' : 'Select All'}
                                            onClick={handleSelectAllSubAreas}
                                            height='38px'
                                            width='160px'
                                            className="align-self-start"
                                            bgcolor={isAllSelectedSub ? 'bg-danger' : ''} // Change color to red when "Clear All"
                                        />
                                    </div>

                                </FormGroup> */}
                            
                             
                            </>}
                            <FormGroup>
                                <Label for="phone">Mobile no</Label>
                                {/* <Input type="tel" name="phone" id="phone" placeholder='+92000000000' value={formData.phone} onChange={handleInputChange} /> */}
                                {MobileNoCheck && <p className='text-muted mt-2'>Invalid format or length exceeded</p>}
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{
                                        required: 'Mobile number is required',
                                        pattern: {
                                            value: /^[0-9]{4}-[0-9]{7}$/, // The pattern for '1234-5657575' format
                                            message: 'Format must be 1234-5657575' // Custom message for invalid format
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleInputChange(e); // Optional: Custom handler if you need additional actions
                                            }}
                                            placeholder="1234-5657575" // Updated placeholder
                                        />
                                    )}
                                />

                                {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                            </FormGroup>
                                    {location?.state?.type === 'edit' ?null: <>
                            <FormGroup style={{ position: 'relative' }}>
                                <Label for="password">Password</Label>
                                <div className="d-flex align-items-center">
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: 'Password is required',
                                            minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                                            validate: validatePassword // Add custom validation
                                        }} render={({ field }) => (
                                            <Input
                                                {...field}
                                                type={eyeOpen ? 'text' : 'password'}
                                                id="password"
                                                value={formData.password}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleInputChange(e);
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='d-flex align-items-center justify-content-between my-2'>
                                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                    <Button color='primary' onClick={genPassword}>Generate Password</Button>
                                    {/* <GenerateButton   btnText='Generate Password' onClick={genPassword} height='40px' width='150px' />  */}
                                </div>
                                <div>
                                    {eyeOpen ? <Eye onClick={() => seteyeOpen(!eyeOpen)} strokeWidth={2} size={20} color='#6c757d' style={{ position: 'absolute', top: '34px', right: '13px', cursor: 'pointer' }} /> : <EyeOff onClick={() => seteyeOpen(!eyeOpen)} strokeWidth={2} size={20} color='#6c757d' style={{ position: 'absolute', top: '34px', right: '13px', cursor: 'pointer' }} />}
                                    <p className="text-muted mt-2">
                                        Please make a password that has at least one uppercase letter, one lowercase letter, one number, one special character, and a minimum length of 8 characters.
                                    </p>
                                </div>
                            </FormGroup>
                            </>}
                        </Col>



                        <Col xl={7} md={12} sm={12} className="mb-4">

                            <Row className='d-flex justify-content-center'>
                                <Col xs={12} xl={11} className='d-flex flex-column justify-content-center'>
                                    <H5>Notifications</H5>
                                    <div className="border rounded p-3 mb-3" style={{ marginTop: '23px' }}>
                                        <FormGroup switch>
                                            <Input
                                                type="switch"
                                                checked={formData.emailNotification}
                                                // onChange={() => setFormData((prev) => ({ ...prev, emailNotification: !prev.emailNotification }))}
                                                onChange={() => {
                                                    // setFormData((prev) => ({ ...prev, emailNotification: !prev.emailNotification }));
                                                    // if (!formData.emailNotification) {
                                                    //     // Pre-fill with previously selected values if turning on
                                                    //     // setNotificationAreasEmail([...formData.Areas]);
                                                    //     // setNotificationSubAreasEmail([...formData.subArea]);
                                                    //     setFormData((prev)=> ({...prev, notificationAreasEmail: [...formData.Areas]}))
                                                    //     setFormData((prev)=> ({...prev, notificationSubAreasEmail: [...formData.subArea]}))
                                                    // }
                                                    handleEmailNotificationToggle() 
                                                }}
                                                style={{ border: '1px solid #dee2e6', cursor: 'pointer' }}
                                            />
                                            <Label check>
                                                <strong>Email Notification</strong>
                                            </Label>
                                               
                                            {formData.emailNotification && (
                                                <> 
                                                 { formData.role == '10' ?
                                                 <>
                                                   
                                                 {/* Receive emails for Areas */}
                                                 <p className={classNamesForPara} style={style}>
                                                     Receive emails for the <b>Areas</b> below? 
                                                 </p>
                                                 {/* <Controller
                                                     name="notificationAreasEmail"
                                                     control={control}
                                                     rules={{
                                                         required: 'Please select at least one area',
                                                     }}
                                                     render={({ field }) => (

                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <Typeahead
                                                    {...field}
                                                    className='w-100'
                                                    id="notificationEmailAreas"
                                                    labelKey="name"
                                                    multiple={multiple} 
                                                    options={
                                                        formData?.factories.length > 0
                                                            ? formData.factories.flatMap(factory =>
                                                                  newAreaOptions.filter(item => item.factory_id === factory.factory_id)
                                                              )
                                                            : newAreaOptions
                                                    }
                                                    // options={areaOptions}
                                                    selected={field.value || []}
                                                    onChange={(selected) => {
                                                        setselectednewareas([
                                                            ...selectednewareas,
                                                            selected
                                                        ])
                                                        field.onChange(selected.map(item => item)); // Adapt this line if you need to customize the stored value structure
                                                        console.log(selected,'selected areaaa')
                                                        setFormData(prevState => ({
                                                            ...prevState,
                                                            // Areas: selected.map(item => item.name.split(',')[0])
                                                            notificationEmailAreas: selected.map(item => item.name)
                                                        }));
                                                    }}
                                                    placeholder="Choose areas..."
                                                /> 
                                            </div>
                                        )}
                                    /> */}
                                                 <Controller
                                                     name="notificationAreasEmail"
                                                     control={control}
                                                     rules={{
                                                         required: 'Please select at least one area',
                                                     }}
                                                     render={({ field }) => (
                                                         
                                                         <Typeahead
                                                         {...field}
                                                         id="notificationEmailAreas"
                                                         labelKey="name"
                                                         multiple={multiple}
                                                         options={newAreaOptions}
                                                         // options={getFilteredSubArea()}
                                                         selected={formData.notificationAreasEmail}
                                                         onChange={(selected) => { 
                                                            // const selectedNames = selected.map(item => item.name);
                                                             
                                                             setFormData((prev) => ({
                                                                 ...prev,
                                                                 notificationAreasEmail: selected,
                                                             }));
                                                             field.onChange(selected); // Update react-hook-form state
                                                             typeHeadChange("notificationAreasEmail", selected); // Additional handler if needed
                                                         }}
                                                         placeholder="Areas"
                                                     />
                                                     )}
                                                 />
                                                 {errors.notificationAreasEmail && (
                                                     <span className="text-danger">{errors.notificationAreasEmail.message}</span>
                                                 )}
                                                      
                                                 {/* Receive emails for Sub Areas */}
                                                 <p className={classNamesForPara} style={style}>
                                                     Receive emails for the <b>Sub Areas</b> below?
                                                 </p>
                                                 <Controller
                                                     name="notificationSubAreasEmail"
                                                     control={control}
                                                     rules={{
                                                         required: 'Please select at least one sub area',
                                                     }}
                                                     render={({ field }) => (
                                                        //  <Typeahead
                                                        //      {...field}
                                                        //      id="notificationEmailSubAreas"
                                                        //      labelKey="name"
                                                        //      multiple={multiple}
                                                        //      options={getFilteredSubArea()}
                                                        //      selected={formData.notificationSubAreasEmail}
                                                        //      onChange={(selected) => {
                                                        //          setFormData((prev) => ({
                                                        //              ...prev,
                                                        //              notificationSubAreasEmail: selected,
                                                        //          }));
                                                        //          field.onChange(selected); // Update react-hook-form state
                                                        //          typeHeadChange("notificationSubAreasEmail", selected); // Additional handler if needed
                                                        //      }}
                                                        //      placeholder="Sub Areas"
                                                        //  />
                                                         <Typeahead
                                                         {...field}
                                                         id="notificationEmailSubAreas"
                                                         labelKey="name"
                                                         multiple={multiple}
                                                         options={
                                                            formData.notificationAreasEmail?.length > 0
                                                                ? newSubareaOptions.filter(subarea =>
                                                                      formData.notificationAreasEmail.some(notificationArea => notificationArea.name == subarea.area_name)
                                                                  )
                                                                : newSubareaOptions
                                                        } 
                                                         selected={
                                                             formData.notificationSubAreasEmail.map(name =>
                                                                 newSubareaOptions.find(option => option.name === name)
                                                             ) || []
                                                         }
                                                         onChange={(selected) => {
                                                             console.log(selected, 'selected sub area');
                                                             
                                                             // Extract only the name from selected sub-areas
                                                             const selectedNames = selected.map(item => item.name);
                                                             
                                                             // Update formData and react-hook-form
                                                             setFormData((prev) => ({
                                                                 ...prev,
                                                                 notificationSubAreasEmail: selectedNames, // Only names
                                                             }));
                                                             
                                                             field.onChange(selectedNames); // Send only names to react-hook-form
                                                             typeHeadChange("notificationSubAreasEmail", selectedNames);
                                                         }}
                                                         placeholder="Sub Areas"
                                                     />
                                                     )}
                                                 />
                                                 {errors.notificationSubAreasEmail && (
                                                     <span className="text-danger">{errors.notificationSubAreasEmail.message}</span>
                                                 )}
                                                   </>
                                                 :
                                                 <> 
                                                    {/* Receive emails for Areas */}
                                                    <p className={classNamesForPara} style={style}>
                                                        Receive emails for the <b>Areas</b> below?
                                                    </p>
                                                    <Controller
                                                        name="notificationAreasEmail"
                                                        control={control}
                                                        rules={{
                                                            required: 'Please select at least one area',
                                                        }}
                                                        render={({ field }) => (
                                                            <Typeahead
                                                                {...field}
                                                                id="notificationEmailAreas"
                                                                labelKey="name"
                                                                multiple={multiple}
                                                                options={formData.Areas}
                                                                // options={getFilteredSubArea()}
                                                                selected={formData.notificationAreasEmail}
                                                                onChange={(selected) => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        notificationAreasEmail: selected,
                                                                    }));
                                                                    field.onChange(selected); // Update react-hook-form state
                                                                    typeHeadChange("notificationAreasEmail", selected); // Additional handler if needed
                                                                }}
                                                                placeholder="Areas"
                                                            />
                                                        )}
                                                    />
                                                    {errors.notificationAreasEmail && (
                                                        <span className="text-danger">{errors.notificationAreasEmail.message}</span>
                                                    )}
                                                         
                                                    {/* Receive emails for Sub Areas */}
                                                    <p className={classNamesForPara} style={style}>
                                                        Receive emails for the <b>Sub Areas</b> below?
                                                    </p>
                                                    <Controller
                                                            name="notificationSubAreasEmail"
                                                            control={control}
                                                            rules={{
                                                                required: 'Please select at least one sub area',
                                                            }}
                                                            render={({ field }) => (
                                                                <Typeahead
                                                                    {...field}
                                                                    id="notificationEmailSubAreas"
                                                                    labelKey="name"
                                                                    multiple={multiple}
                                                                    options={
                                                                        formData.notificationAreasEmail?.length > 0
                                                                            ? newSubareaOptions.filter(subarea =>
                                                                                  formData.notificationAreasEmail.includes(subarea.area_name)
                                                                              )
                                                                            : newSubareaOptions
                                                                    }
                                                                    
                                                                    selected={
                                                                        formData.notificationSubAreasEmail.map(name =>
                                                                            newSubareaOptions.find(option => option.name === name)
                                                                        ) || []
                                                                    }
                                                                    onChange={(selected) => {
                                                                        console.log(selected, 'selected sub area');
                                                                        
                                                                        // Extract only the name from selected sub-areas
                                                                        const selectedNames = selected.map(item => item.name);
                                                                        
                                                                        // Update formData and react-hook-form
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            notificationSubAreasEmail: selectedNames, // Only names
                                                                        }));
                                                                        
                                                                        field.onChange(selectedNames); // Send only names to react-hook-form
                                                                        typeHeadChange("notificationSubAreasEmail", selectedNames);
                                                                    }}
                                                                    placeholder="Sub Areas"
                                                                />
                                                            )}
                                                        />

                                                    {errors.notificationSubAreasEmail && (
                                                        <span className="text-danger">{errors.notificationSubAreasEmail.message}</span>
                                                    )}
                                                      </>
                                                      
                                                      }

                                                    {/* Receive Email notifications */}
                                                    <p className={classNamesForPara} style={style}>
                                                        Receive Email notification when alerts get triggered. Who should be notified?
                                                    </p>
                                                    <Controller
                                                        name="emailNotifications"
                                                        control={control}
                                                        rules={{
                                                            required: 'Please enter at least one email address',
                                                        }}
                                                        render={({ field }) => (
                                                            <Typeahead
                                                                {...field}
                                                                id="emailNotifications"
                                                                labelKey="name"
                                                                multiple={multiple}
                                                                options={[]} // Empty options, as emails will be entered manually
                                                                selected={formData.emailNotifications}
                                                                onChange={(selected) => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        emailNotifications: selected,
                                                                    }));
                                                                    field.onChange(selected); // Update react-hook-form state
                                                                    typeHeadChange("emailNotifications", selected); // Additional handler if needed
                                                                }}
                                                                placeholder="Enter email addresses"
                                                                allowNew={true}
                                                            />
                                                        )}
                                                    />
                                                    {errors.emailNotifications && (
                                                        <span className="text-danger">{errors.emailNotifications.message}</span>
                                                    )}
                                                </>
                                            )}
                                           
            
                                        </FormGroup>

                                    </div>
                                    <div className="border rounded p-3">
                                        <FormGroup switch>

                                            <Input
                                                type="switch"
                                                checked={formData.whatsappNotification}
                                                // onChange={() => setFormData((prev) => ({ ...prev, whatsappNotification: !prev.whatsappNotification }))}
                                                onChange={() => {
                                                    // setFormData((prev) => ({ ...prev, whatsappNotification: !prev.whatsappNotification }));
                                                    // if (!formData.whatsappNotification) {
                                                    //     // Pre-fill with previously selected values if turning on
                                                    //     // setFormData([...formData.Areas]);
                                                    //     setFormData((prev)=> ({...prev, notificationAreasWhatsapp: [...formData.Areas]}));
                                                    //     setFormData((prev)=> ({...prev, notificationSubAreasWhatsapp: [...formData.subArea]}));
                                                    //     // setNotificationSubAreasWhatsapp([...formData.subArea]);
                                                    // }
                                                    handleWhatsappNotificationToggle()
                                                }}
                                                style={{ border: '1px solid #dee2e6', cursor: 'pointer' }}
                                            />
                                            <Label check>
                                                <strong>Whatsapp Notification</strong>
                                            </Label>
                                            {formData.whatsappNotification && (
                                                <>
                                                {formData.role == '10'?
                                                     <> 
                                                     {/* Receive WhatsApp notifications for Areas */}
                                                     <p className={classNamesForPara} style={style}>
                                                         Receive WhatsApp notification for the <b>Areas</b> below? 
                                                     </p>
                                                     <Controller
                                                         name="notificationAreasWhatsapp"
                                                         control={control}
                                                         rules={{
                                                             required: 'Please select at least one area for WhatsApp notifications',
                                                         }}
                                                         render={({ field }) => (
                                                            //  <Typeahead
                                                            //      {...field}
                                                            //      id="notificationWhatsappAreas"
                                                            //      labelKey="name"
                                                            //      multiple={multiple}
                                                            //      options={areaOptions}
                                                            //      selected={formData.notificationAreasWhatsapp}
                                                            //      onChange={(selected) => {
                                                            //          setFormData((prev) => ({
                                                            //              ...prev,
                                                            //              notificationAreasWhatsapp: selected,
                                                            //          }));
                                                            //          field.onChange(selected); // Update react-hook-form state
                                                            //          typeHeadChange("notificationAreasWhatsapp", selected); // Additional handler if needed
                                                            //      }}
                                                            //      placeholder="Areas"
                                                            //  />
                                                             <Typeahead
                                                                {...field}
                                                                id="notificationWhatsappAreas"
                                                                labelKey="name"
                                                                multiple={multiple}
                                                                options={newAreaOptions}
                                                                selected={formData.notificationAreasWhatsapp}
                                                                onChange={(selected) => {
                                                                     
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        notificationAreasWhatsapp: selected,
                                                                    }));
                                                                    field.onChange(selected); // Update react-hook-form state
                                                                    typeHeadChange("notificationAreasWhatsapp", selected); // Additional handler if needed
                                                                }}
                                                                placeholder="Areas"
                                                            />
                                                         )}
                                                     />
                                                     {errors.notificationAreasWhatsapp && (
                                                         <span className="text-danger">{errors.notificationAreasWhatsapp.message}</span>
                                                     )}
                                                     
 
                                                     {/* Receive WhatsApp notifications for Sub Areas */}
                                                     <p className={classNamesForPara} style={style}>
                                                         Receive WhatsApp notification for the <b>Sub Areas</b> below?
                                                     </p>
                                                     <Controller
                                                         name="notificationSubAreasWhatsapp"
                                                         control={control}
                                                         rules={{
                                                             required: 'Please select at least one sub area for WhatsApp notifications',
                                                         }}
                                                         render={({ field }) => (
                                                            //  <Typeahead
                                                            //      {...field}
                                                            //      id="notificationWhatsappSubAreas"
                                                            //      labelKey="name"
                                                            //      multiple={multiple}
                                                            //      options={getFilteredSubArea()}
                                                            //      selected={formData.notificationSubAreasWhatsapp}
                                                            //      onChange={(selected) => {
                                                            //          setFormData((prev) => ({
                                                            //              ...prev,
                                                            //              notificationSubAreasWhatsapp: selected,
                                                            //          }));
                                                            //          field.onChange(selected); // Update react-hook-form state
                                                            //          typeHeadChange("notificationSubAreasWhatsapp", selected); // Additional handler if needed
                                                            //      }}
                                                            //      placeholder="Sub Areas"
                                                            //  />
                                                            <Typeahead
                                                            {...field}
                                                            id="notificationWhatsappSubAreas"
                                                            labelKey="name"
                                                            multiple={multiple}
                                                            // options={getFilteredSubArea()}
                                                            // selected={formData.notificationSubAreasWhatsapp}
                                                            options={
                                                                formData.notificationAreasWhatsapp?.length > 0
                                                                    ? newSubareaOptions.filter(subarea =>
                                                                          formData.notificationAreasWhatsapp.some(notificationArea => notificationArea.name === subarea.area_name)
                                                                      )
                                                                    : newSubareaOptions
                                                            } 
                                                            
                                                            selected={
                                                                formData.notificationSubAreasWhatsapp.map(name =>
                                                                    newSubareaOptions.find(option => option.name === name)
                                                                ) || []
                                                            }
                                                            // onChange={(selected) => {
                                                            //     setFormData((prev) => ({
                                                            //         ...prev,
                                                            //         notificationSubAreasWhatsapp: selected,
                                                            //     }));
                                                            //     field.onChange(selected); // Update react-hook-form state
                                                            //     typeHeadChange("notificationSubAreasWhatsapp", selected); // Additional handler if needed
                                                            // }}
                                                            onChange={(selected) => {  
                                                                const selectedNames = selected.map(item => item.name); 
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    notificationSubAreasWhatsapp: selectedNames,  
                                                                }));
                                                                
                                                                field.onChange(selectedNames); 
                                                                typeHeadChange("notificationSubAreasWhatsapp", selectedNames);
                                                            }}
                                                            placeholder="Sub Areas"
                                                        />
                                                         )}
                                                     />
                                                     {errors.notificationSubAreasWhatsapp && (
                                                         <span className="text-danger">{errors.notificationSubAreasWhatsapp.message}</span>
                                                     )}
                                                     </>
                                                :
                                                <> 
                                                    {/* Receive WhatsApp notifications for Areas */}
                                                    <p className={classNamesForPara} style={style}>
                                                        Receive WhatsApp notification for the <b>Areas</b> below?
                                                    </p>
                                                    <Controller
                                                        name="notificationAreasWhatsapp"
                                                        control={control}
                                                        rules={{
                                                            required: 'Please select at least one area for WhatsApp notifications',
                                                        }}
                                                        render={({ field }) => (
                                                            <Typeahead
                                                                {...field}
                                                                id="notificationWhatsappAreas"
                                                                labelKey="name"
                                                                multiple={multiple}
                                                                options={formData.Areas}
                                                                selected={formData.notificationAreasWhatsapp}
                                                                onChange={(selected) => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        notificationAreasWhatsapp: selected,
                                                                    }));
                                                                    field.onChange(selected); // Update react-hook-form state
                                                                    typeHeadChange("notificationAreasWhatsapp", selected); // Additional handler if needed
                                                                }}
                                                                placeholder="Areas"
                                                            />
                                                        )}
                                                    />
                                                    {errors.notificationAreasWhatsapp && (
                                                        <span className="text-danger">{errors.notificationAreasWhatsapp.message}</span>
                                                    )}
                                                    

                                                    {/* Receive WhatsApp notifications for Sub Areas */}
                                                    <p className={classNamesForPara} style={style}>
                                                        Receive WhatsApp notification for the <b>Sub Areas</b> below?
                                                    </p>
                                                    <Controller
                                                        name="notificationSubAreasWhatsapp"
                                                        control={control}
                                                        rules={{
                                                            required: 'Please select at least one sub area for WhatsApp notifications',
                                                        }}
                                                        render={({ field }) => (
                                                            <Typeahead
                                                                {...field}
                                                                id="notificationWhatsappSubAreas"
                                                                labelKey="name"
                                                                multiple={multiple}
                                                                // options={getFilteredSubArea()}
                                                                // selected={formData.notificationSubAreasWhatsapp}
                                                                options={
                                                                    formData.notificationAreasWhatsapp?.length > 0
                                                                        ? newSubareaOptions.filter(subarea =>
                                                                              formData.notificationAreasWhatsapp.includes(subarea.area_name)
                                                                          )
                                                                        : newSubareaOptions
                                                                }
                                                                
                                                                selected={
                                                                    formData.notificationSubAreasWhatsapp.map(name =>
                                                                        newSubareaOptions.find(option => option.name === name)
                                                                    ) || []
                                                                }
                                                                // onChange={(selected) => {
                                                                //     setFormData((prev) => ({
                                                                //         ...prev,
                                                                //         notificationSubAreasWhatsapp: selected,
                                                                //     }));
                                                                //     field.onChange(selected); // Update react-hook-form state
                                                                //     typeHeadChange("notificationSubAreasWhatsapp", selected); // Additional handler if needed
                                                                // }}
                                                                onChange={(selected) => {  
                                                                    const selectedNames = selected.map(item => item.name); 
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        notificationSubAreasWhatsapp: selectedNames,  
                                                                    }));
                                                                    
                                                                    field.onChange(selectedNames); 
                                                                    typeHeadChange("notificationSubAreasWhatsapp", selectedNames);
                                                                }}
                                                                placeholder="Sub Areas"
                                                            />
                                                        )}
                                                    />
                                                    {errors.notificationSubAreasWhatsapp && (
                                                        <span className="text-danger">{errors.notificationSubAreasWhatsapp.message}</span>
                                                    )}
                                                    </>
                                                    }

                                                    {/* Receive WhatsApp notifications for phone numbers */}
                                                    <p className={classNamesForPara} style={style}>
                                                        Receive WhatsApp notification when alerts get triggered. Who should be notified?
                                                    </p>
                                                    <Controller
                                                        name="whatsappNotifications"
                                                        control={control}
                                                        rules={{
                                                            required: 'Please enter at least one phone number for WhatsApp notifications',
                                                        }}
                                                        render={({ field }) => (
                                                            <Typeahead
                                                                {...field}
                                                                id="whatsappNotifications"
                                                                labelKey="name"
                                                                multiple={multiple}
                                                                options={[]} // Empty options, as phone numbers will be entered manually
                                                                selected={formData.whatsappNotifications}
                                                                onChange={(selected) => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        whatsappNotifications: selected,
                                                                    }));
                                                                    field.onChange(selected); // Update react-hook-form state
                                                                    typeHeadChange("whatsappNotifications", selected); // Additional handler if needed
                                                                }}
                                                                placeholder="Enter phone numbers"
                                                                allowNew
                                                            />
                                                        )}
                                                    />
                                                    {errors.whatsappNotifications && (
                                                        <span className="text-danger">{errors.whatsappNotifications.message}</span>
                                                    )}
                                                </>
                                            )}

                                        </FormGroup>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row className="mt-4 pb-2">
                        <Col className="d-flex justify-content-center gap-2">
                            <Button color='primary' type='submit'>
                               {location?.state?.type === 'edit'?'Edit User':'AddUser'}
                            </Button>
                            {/* <GenerateButton btType='submit' btnText='Add User' width='150px' height='40px' /> */}

                            <Button color='dark' type='submit' onClick={handleCancel}>
                                Cancel
                            </Button>

                            {/* <GenerateButton btnText='Cancel' onClick={handleCancel} bgcolor='bg-secondary' width='100px' height='40px' /> */}
                        </Col>
                    </Row>
                </form>
            </div>
}
            </>
            
}
        </Container>
    );
};

export default AddUser;


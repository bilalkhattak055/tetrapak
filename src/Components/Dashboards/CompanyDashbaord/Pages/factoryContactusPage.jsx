import React, { useEffect, useState } from 'react';
import ContactForm from '../Components/FactoryContactusForm'
import { Container, Row } from 'reactstrap';
import { H4 } from '../../../../AbstractElements';
import { useForm } from 'react-hook-form';

const FactoryContactusPage = () => {
    const { register, handleSubmit, formState: { errors },watch,control } = useForm()

    const [contactName, setContactName] = useState('')
    const [role, setRole] = useState('')


    const [contactformData, setcontactformData] = useState();
    const [formShow, setformShow] = useState(false)

    useEffect(() => {
        setContactName(localStorage.getItem('name'))
        const newRole = localStorage.getItem('role')
        setRole(newRole);




    }, [contactName, role])


    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setcontactformData({
            ...contactformData,
            [name]: value,
        });
    };

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        setformShow(true)

        // Create a new notification
        const newNotification = {
            operation: `A form has been submitted`,
            status: `Success`,
            timestamp: new Date().toLocaleString(),
            role: role
        };

        // Store notifications in local storage
        const notificationsFactory = JSON.parse(localStorage.getItem('notificationsFactory')) || [];
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notificationsFactory.push(newNotification);
        notifications.push(newNotification);
        localStorage.setItem('notificationsFactory', JSON.stringify(notificationsFactory));
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault(); 
    //     console.log('Form Data:', contactformData);
    //     setformShow(true)

    //     var newNotification = {
    //         operation: `A Form has been submitted` ,
    //         status: `Success`,
    //         timestamp: new Date().toLocaleString(),
    //         role: role

    //     };
    //     const notificationsFactory = JSON.parse(localStorage.getItem('notificationsFactory')) || [];
    //     const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    //     // console.log('this is notification op', newNotification.operation)
    //     notificationsFactory.push(newNotification);
    //     notifications.push(newNotification);
    //     localStorage.setItem('notificationsFactory', JSON.stringify(notificationsFactory));
    //     localStorage.setItem('notifications', JSON.stringify(notifications));

    // };
    return (
        <div>
            <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>
                <H4 attrH4={{className: 'pb-2'}}>
                    CONTACT US
                </H4>
                <ContactForm handleChange={handleChange} errors={errors} control={control} watch={watch} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} contactformData={contactformData} formShow={formShow} />
            </Container>
        </div>
    );
}

export default FactoryContactusPage;

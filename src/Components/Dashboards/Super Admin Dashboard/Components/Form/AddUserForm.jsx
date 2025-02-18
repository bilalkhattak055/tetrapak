import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container } from 'reactstrap';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { H2, H5, H4 } from '../../../../../AbstractElements';
import { Typeahead } from 'react-bootstrap-typeahead';
import '../../../Super Admin Dashboard/Components/Form/form.css'
import './../../../ItDashboard/It Officer/Styling/itStyle.css'
import GenerateButton from '../../../../Common/newButton/index'

const AddUserForm = ({ toggleModal, typee, modal, modalType, handleSave, handleInputChange, formData, setFormData, handleCheckboxChange, allpermissions }) => {
    const { formState: { errors } } = useForm();
    const [multiple, setMultiple] = useState(true);
    console.log(formData.phone, 'form data phone')

    const typeHeadChange = (key, selected) => {
        setFormData((prev) => ({
            ...prev,
            [key]: selected
        }))
    }

    useEffect(() => {
        console.log('These are all permissions props', allpermissions)
    }, [formData])

    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
        let password = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        // return password;

        const pass = password
        setFormData((prev) => ({
            ...prev,
            password: pass
        }))
    };

    const generateID = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let UserID = '';

        // 8-character ID generation
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            UserID += chars[randomIndex];
        }

        // Update formData with the new UserID
        setFormData((prev) => ({
            ...prev,
            id: UserID // Setting generated ID in formData
        }));
    };


    console.log("formDataaaaaaaaaaa", formData)
    console.log("formDataaaaaaaaaaarole", formData.role)
    return (
        <Modal isOpen={modal} toggle={toggleModal} className='modal-xl'>
            <ModalHeader toggle={toggleModal}>
                 <H4>{modalType === 'edit' ? 'Edit User' : 'Add User'}</H4>
                 </ModalHeader>
            <Container fluid={true}>
                <ModalBody className=''> 
                    <Row lg='12'>
                        <Col lg='4' md='6' sm='12' xs='12' className=' '>
                            <Row xs='12'>
                                <Col xs='12'>
                                <H5>Basic Information</H5> 
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label for="id">User ID</Label>
                                <Input type="text" name="id" id="id" className='mb-2' value={formData.id} onChange={handleInputChange} />
                                <GenerateButton btnText='Generate ID' onClick={generateID} height='40px' />

                                {/* <button className='btn btn-primary mt-2' onClick={generateID}>Generate ID</button> */}
                            </FormGroup>
                            <FormGroup>
                                <Label for="id">Name</Label>
                                <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Mobile no</Label>
                                <Input type="number" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} />
                            </FormGroup>



                            <Row>
                                <Label for="Password">Password</Label>
                                <Col lg='12' xl='12' md='12' sm='12' xs='12'>
                                    <FormGroup>
                                        <Input type="password" name="password" id="Password" className='mb-2' value={formData.password} onChange={handleInputChange} />
                                        <GenerateButton btnText='Generate Password' onClick={generatePassword} height='40px' />

                                        {/* <button className='btn btn-primary mt-2' onClick={generatePassword}>Generate Password</button> */}
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Col>

                        <Col lg='4' md='6' sm='12 mt-3' xs='12 ' className=' m-0 py-0 px-2'>
                            <Row xs='12'><Col xs='12'><H5>Selections</H5></Col></Row>
                            <Row>
                                <Col className='mb-3'>
                                    <Label for='role'>Role</Label>
                                    <Input
                                        className='form-control rounded-3'
                                        type='select'
                                        name='role'
                                        id='role'
                                        value={formData.role}
                                        onChange={handleInputChange}
                                    >
                                        {formData.role}
                                        <option value=''>Select Role</option>
                                        {typee === 'super' && <option value='IT Officer'>IT Officer</option>}
                                        <option value='factory'>Global</option>
                                        <option value='Factory'>Factory</option>
                                        <option value='Area'>Area</option>
                                        <option value='Tech QA'>Tech QA</option>
                                    </Input>
                                    <span className='d-block'>{errors.role && 'Role is required'}</span>
                                </Col>
                                {
                                    formData.role === 'factory' ? (
                                        <>
                                            <FormGroup className="w-100 ">
                                                <Label>
                                                    Select Factories
                                                </Label>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    className=""
                                                    labelKey="name"
                                                    multiple={multiple}
                                                    options={['ICF', 'RYK', 'Foods']}
                                                    selected={formData.factories || []}
                                                    onChange={(selected) => typeHeadChange('factories', selected)}
                                                    placeholder="Select Factories"
                                                    allowNew
                                                />
                                            </FormGroup>
                                        </>
                                    ) : null
                                }

                                {
                                    formData.role === 'factory' || formData.role === 'Factory' ? (
                                        <>
                                            <FormGroup className="w-100 ">
                                                <Label>
                                                    Select Areas
                                                </Label>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    className=""
                                                    labelKey="name"
                                                    multiple={multiple}
                                                    options={['SA-1', 'SA-2', 'SA-3', 'SA-4', 'SA-5', 'SA-6', 'SA-7', 'SA-8', 'SA-9', 'SA-10', 'SA-11', 'SA-12', 'SA-13', 'SA-14', 'SA-15']}
                                                    selected={formData.Areas || []}
                                                    onChange={(selected) => typeHeadChange('Areas', selected)}
                                                    placeholder="Select Areas"
                                                    allowNew
                                                />
                                            </FormGroup>
                                        </>
                                    ) : null
                                }
                                {
                                    formData.role === 'factory' || formData.role === 'Factory' || formData.role === 'Area' ? (
                                        <>
                                            <FormGroup className="w-100 ">
                                                <Label>
                                                    Select Areas
                                                </Label>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    className=""
                                                    labelKey="name"
                                                    multiple={multiple}
                                                    options={['Room', 'Canteen',
                                                        'Admin', 'Building', 'Roof Top',
                                                        'Building',
                                                        'Air compressor',
                                                        'CCR',
                                                        'Ammonia', 'Compressor',
                                                        'gate to inner', 'factory entrance',
                                                        'Boiler',
                                                        'Catch pit area',
                                                        'Cold Store',
                                                        'Cold store', 'offices',
                                                        'Cone Baking',
                                                        'DP store area',
                                                        'Diesel Storage area',
                                                        'Diffusion tank',
                                                        'Dispatch area']}
                                                    selected={formData.subArea || []}
                                                    onChange={(selected) => typeHeadChange('subArea', selected)}
                                                    placeholder="Select Areas"
                                                    allowNew
                                                />
                                            </FormGroup>
                                        </>
                                    ) : null
                                }

                                <Col md='12' lg='12' sm='12' xs='12' xl='12' className='mb-3' >
                                    <Row>
                                        <Col>
                                            <H5 attrH5={{ className: 'mt-4' }}>Select Module Permissions</H5>
                                        </Col>
                                    </Row>
                                    {modalType === 'edit' && formData.permissions && formData.permissions.length > 0 ?
                                        <div className='card pt-2'>
                                            {formData.permissions.map((permission, key) => (
                                                <div key={key} style={{ paddingRight: '15px' }}>
                                                    <Row>
                                                        <Col lg='8' xl='8' md='8' sm='8' xs='8' >

                                                            {permission.isActive == true ? <label  >{permission.routeofPermission}</label> : ''}
                                                            {permission.isActive == false ? <label  >{permission.routeofPermission}</label> : ''}
                                                        </Col>
                                                        <Col lg='4' xl='4' md='4' sm='4' xs='4' className='d-flex align-items-center justify-content-end'>


                                                            {permission.isActive == true ? <input
                                                                type="checkbox"
                                                                name={permission.routeofPermission}
                                                                // checked={formData.permissions.find(p => p.name === permission.name)?.isActive || false}
                                                                checked={permission.isActive}
                                                                onChange={handleInputChange}

                                                            /> : ''}
                                                            {permission.isActive == false ? <input
                                                                type="checkbox"
                                                                name={permission.routeofPermission}
                                                                // checked={formData.permissions.find(p => p.name === permission.name)?.isActive || false}
                                                                checked={permission.isActive}
                                                                onChange={handleInputChange}


                                                            /> : ''}

                                                        </Col>
                                                    </Row>

                                                </div>
                                            ))}

                                        </div>
                                        : modalType === 'add' ? <>

                                            <div className='card pt-4'>
                                                {allpermissions.map((e, index) => (
                                                    <div key={index} style={{ paddingRight: '15px' }}>
                                                        <Row>
                                                            <Col lg='8' xl='8' md='8' sm='8' xs='8'>
                                                                <label>{e.routeofPermission}</label>
                                                            </Col>
                                                            <Col lg='4' xl='4' md='4' sm='4' xs='4' className='d-flex align-items-center justify-content-end'>
                                                                <input
                                                                    type="checkbox"
                                                                    name={e.routeofPermission}
                                                                    id={`permission-${index}`}
                                                                    onChange={handleCheckboxChange}
                                                                    checked={e.isActive}
                                                                    required
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}

                                            </div>
                                        </>
                                            : ''}



                                </Col>
                            </Row>
                        </Col>
                        <Col lg='4' md='12 mt-3' sm='12' xs='12 ' className='m-0 p-0'  >
                            <Row xs='12'><Col xs='12'><H5>Notification</H5></Col></Row>
                            <Col style={{ marginTop: '17px' }} xs="12" className="border-line-container">
                                <div className="border-line rounded-4">
                                    <FormGroup switch className=" ">
                                        <div className="padding-line px-4  py-3">
                                            <Input
                                                type="checkbox"
                                                className='border'
                                                checked={formData.inAppNotification}
                                                onChange={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        inAppNotification: !prev.inAppNotification,
                                                    }))
                                                }
                                            />


                                            <Label check>
                                                <strong>In App</strong>
                                            </Label>
                                            <p>Keep all alerts in the live alert page</p>
                                        </div>
                                    </FormGroup>
                                    <Col xs="12" className="border-line-container">
                                        <div className="padding-line px-4 py-3 rounded-4">
                                            <FormGroup switch className=" ">
                                                <Input
                                                    type="checkbox"
                                                    className='border'
                                                    checked={formData.emailNotification}
                                                    onChange={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            emailNotification: !prev.emailNotification,
                                                        }))
                                                    }
                                                />

                                                <Label check>
                                                    <strong>Email Notification</strong>
                                                </Label>
                                                <p>
                                                    Recieve Email notification when alerts get triggered. who
                                                    should be notified?
                                                </p>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    className="type-head"
                                                    labelKey="name"
                                                    multiple={multiple}
                                                    options={[]}
                                                    selected={formData.emailNotifications || []}
                                                    onChange={(selected) => typeHeadChange('emailNotifications', selected)}
                                                    placeholder="mbilalkhk@gmail.com"
                                                    allowNew
                                                />

                                            </FormGroup>
                                        </div>
                                    </Col>


                                    <Col xs="12" className="border-line-container">
                                        <div className="padding-line px-4 py-4 rounded-4">
                                            <FormGroup switch className=" ">
                                                <Input
                                                    type="switch"
                                                    className='border'
                                                    checked={formData.whatsappNotification}
                                                    onChange={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            whatsappNotification: !prev.whatsappNotification,
                                                        }))
                                                    }
                                                />
                                                <Label check>
                                                    <strong>Whatsapp Notification</strong>
                                                </Label>
                                                <p>
                                                    Recieve whatsapp notification when alerts get triggered.
                                                    who should be notified?
                                                </p>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    className="type-head"
                                                    labelKey="name"
                                                    multiple={multiple}
                                                    options={[]}
                                                    selected={formData.whatsappNotifications || []}
                                                    onChange={(selected) => typeHeadChange('whatsappNotifications', selected)}
                                                    placeholder="+923142676432"
                                                    allowNew
                                                />

                                            </FormGroup>
                                        </div>
                                    </Col>

                                </div>
                            </Col>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <GenerateButton btnText={modalType === 'edit' ? 'Save' : 'Add'} onClick={handleSave} width='100px' height='40px' />

                    {/* <Button color="primary" onClick={handleSave}>{modalType === 'edit' ? 'Save' : 'Add'}</Button> */}
                    {/* <Button color="secondary" onClick={toggleModal}>Cancel</Button> */}
                    <GenerateButton btnText='Cancel' onClick={toggleModal} bgcolor='bg-secondary' width='100px' height='40px' />

                </ModalFooter>
            </Container>
        </Modal>
    );
};

export default AddUserForm;

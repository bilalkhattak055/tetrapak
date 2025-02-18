// import React, { useState } from 'react';
// import FactoryService from '../../../../../api/factoryService';
// import { Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'react-feather';

// const AddFactory2 = () => {
//   const [factoryLogo, setFactoryLogo] = useState(null);
//   const [factoryName, setFactoryName] = useState('');
//   const [factoryAddress, setFactoryAddress] = useState('');
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     setFactoryLogo(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('file', factoryLogo);
//     formData.append('user_id', JSON.parse(localStorage.getItem('userData'))?.id);
//     formData.append('name', factoryName);
//     formData.append('address', factoryAddress);

//     try {
//       const response = await FactoryService.addFactory(formData);
//       if (response.status === 200) {
//         alert('Factory added successfully!');
//         // Reset form
//         setFactoryLogo(null);
//         setFactoryName('');
//         setFactoryAddress('');
//         setPreviewUrl('');
//         navigate(`${process.env.PUBLIC_URL}/dashboard/all-factorie/${JSON.parse(localStorage.getItem('role'))}`)
//       } else {
//         alert('Error adding factory. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePrevious = () => {
//     navigate(-1);
//   };

//   return (
//     <div style={{height: 'calc(100vh - 100px)'}} className="container-fluid d-flex align-items-center">
//       <div className="container">
        
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             <button onClick={handlePrevious} className="btn btn-primary rounded-3 py-2 mb-3 d-flex justify-content-center align-items-center">
//            <ArrowLeft className='align-self-center' size={18} />
//             </button>
//             <div className="card shadow rounded-3">
//               <div className="card-body">
//                 <h2 className="card-title text-center mb-4 mt-2">Add New Factory</h2>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="factoryLogo" className="form-label">Factory Logo</label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       id="factoryLogo"
//                       accept="image/*"
//                       onChange={handleLogoChange}
//                       required
//                     />
//                     {previewUrl && (
//                       <div className="mt-2 text-center">
//                         <img src={previewUrl} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px' }} />
//                       </div>
//                     )}
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="factoryName" className="form-label">Factory Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="factoryName"
//                       value={factoryName}
//                       onChange={(e) => setFactoryName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="factoryAddress" className="form-label">Factory Address</label>
//                     <textarea
//                       className="form-control"
//                       id="factoryAddress"
//                       value={factoryAddress}
//                       onChange={(e) => setFactoryAddress(e.target.value)}
//                       required
//                     ></textarea>
//                   </div>
//                   <div className="d-grid">
//                     <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
//                       {isLoading ? (
//                         <>
//                           <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//                           <span className="ms-2">Adding...</span>
//                         </>
//                       ) : (
//                         'Add Factory'
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFactory2;


import React, { useEffect, useState } from 'react';
import FactoryService from '../../../../../api/factoryService';
import { Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import api from '../../../../../api/api';
import { errorToast, successToast } from '../../../../../_helper/helper';
import ConfigDB from '../../../../../Config/ThemeConfig';

const AddFactory2 = () => {
  const [factoryLogo, setFactoryLogo] = useState(null);
  const [factoryName, setFactoryName] = useState('');
  const [factoryAddress, setFactoryAddress] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  console.log('factoryLogo', factoryLogo)

  useEffect(()=> {
    if(location?.state?.factory) {
      const url = `https://unilever.disruptlabs.tech/`
      setFactoryLogo(`${url}${location?.state?.factory?.logo}`)
      setFactoryName(location?.state?.factory?.name)
      setFactoryAddress(location?.state?.factory?.address)
      setPreviewUrl(`${url}${location?.state?.factory?.logo}`)
    }
     console.log('locationnn', location)
  }, [location])

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFactoryLogo(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', factoryLogo);
    formData.append('user_id', JSON.parse(localStorage.getItem('userData'))?.id);
    formData.append('name', factoryName);
    formData.append('address', factoryAddress);

    try {
      if(location?.state?.factory){
        formData.append('factory_id', location?.state?.factory?.factory_id)
        const response = await FactoryService.editFactory(formData);
      if (response.status === 200) {
        // Reset form
        setFactoryLogo(null);
        setFactoryName('');
        setFactoryAddress('');
        setPreviewUrl('');
        navigate(`${process.env.PUBLIC_URL}/dashboard/all-factories/${JSON.parse(localStorage.getItem('role'))}`)
      } else {
        errorToast('Error adding factory. Please try again.');
      }
    }else {
      const response = await FactoryService.addFactory(formData);
      if (response.status === 200) {
        // Reset form
        setFactoryLogo(null);
        setFactoryName('');
        setFactoryAddress('');
        setPreviewUrl('');
        navigate(`${process.env.PUBLIC_URL}/dashboard/all-factories/${JSON.parse(localStorage.getItem('role'))}`)
      } else {
        errorToast(response?.message);
      }
    }
    } catch (error) {
      console.error('Error:', error);
      errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const buttonStyle = {
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const buttonHoverStyle = {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  };

  const buttonActiveStyle = {
    transform: 'scale(0.95)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={{height: 'calc(100vh - 100px)'}} className="container-fluid d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <button
              onClick={handlePrevious}
              className="btn btn-primary rounded-3 py-2 px-4 mb-3 d-flex justify-content-center align-items-center"
              onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
              onMouseDown={(e) => Object.assign(e.target.style, buttonActiveStyle)}
              onMouseUp={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            >
              <ArrowLeft color='#fff' className='align-self-center' size={18} />
            </button>
            <div className="card shadow rounded-3">
              <div className="card-body">
                <h2 className="card-title text-center mb-4 mt-2">Add New Factory</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="factoryLogo" className="form-label">Factory Logo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="factoryLogo"
                      accept="image/*"
                      onChange={handleLogoChange}
                      required
                    />
                    {previewUrl && (
                      <div className="mt-2 text-center">
                        <img src={previewUrl} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="factoryName" className="form-label">Factory Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="factoryName"
                      value={factoryName}
                      onChange={(e) => setFactoryName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="factoryAddress" className="form-label">Factory Address</label>
                    <textarea
                      className="form-control"
                      id="factoryAddress"
                      value={factoryAddress}
                      onChange={(e) => setFactoryAddress(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                      style={buttonStyle}
                      onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, buttonHoverStyle)}
                      onMouseLeave={(e) => !isLoading && Object.assign(e.target.style, buttonStyle)}
                      onMouseDown={(e) => !isLoading && Object.assign(e.target.style, buttonActiveStyle)}
                      onMouseUp={(e) => !isLoading && Object.assign(e.target.style, buttonHoverStyle)}
                    >
                      {isLoading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          <span className="ms-2">Adding...</span>
                        </>
                      ) : (
                        'Add Factory'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFactory2;






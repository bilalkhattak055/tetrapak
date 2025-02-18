import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import TicketCard from '../TicketCard';
import { Link } from 'react-router-dom';
import { PiTicket } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { ReactComponent as FAQs } from '../../../../../../assets/fonts/faqsvg.svg'
import faq from './faq.svg'
import PreviousTicketCard from '../NewDesignPreviousTickets/PreviousTicketCardNewDesign'
import './style.css'
import PreviousCardSecton from '../PreviousSection/PreviousCardSecton';
import GenerateTicket from '../NewModalForTicket/GeneratedTicket';
import { CandleStaticAreasOption, Candelmodule } from '../../Staticdata/data';
import AreaService from '../../../../../../api/areaService';
import Loader1 from "../../../../../../CommonElements/Spinner/loader";

const dummy = [
  {
    id: 789,
    module: [
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
    ],
    generated_by: 'Mr. Fida Khan Shareef',
    issue_date: '1st Jan 2024',
    area: [
      {
        id: 1,
        name: 'MOULDING',
        owner: 'Mr. Fida Khan Shareef',
      },
      {
        id: 2,
        name: 'STORE',
        owner: 'Mr. Kashif Ghani Usman Ghani'
      },
      {
        id: 3,
        name: 'Ali Pump',
        owner: 'Qaiser'
      },
    ],
    sub_area: [
      {
        id: 2,
        name: 'LOCAL STORE'
      },
      {
        id: 1,
        name: 'MOULDING DEPART'
      },
      {
        id: 3,
        name: 'Ali Pump Doubling'
      },
    ],
    priority: 'high',
    query: 'testing 123',
    status: 'pending',

  },
  {
    id: 780,
    module: [
      {
        id: 1,
        name: 'Person Available Alert'
      },

      {
        id: 3,
        name: 'Supervisor presence'
      },
    ],
    generated_by: 'Qaiser',
    issue_date: '2nd Jan 2025',
    area: [
      {
        id: 1,
        name: 'MOULDING',
        owner: 'Mr. Fida Khan Shareef',
      },

      {
        id: 3,
        name: 'Ali Pump',
        owner: 'Qaiser'
      },
    ],
    sub_area: [
      {
        id: 2,
        name: 'LOCAL STORE'
      },


    ],
    priority: 'high',
    query: 'testing 123',
    status: 'in-process',
    response_date: '7th Jan 2025',
    response: 'testing completed'
  },
  {
    id: 781,
    module: [

      {
        id: 2,
        name: 'Grouping'
      },
      {
        id: 3,
        name: 'Supervisor presence'
      },
    ],
    generated_by: 'Kashif, Usman',
    issue_date: '3rd Jan 2025',
    area: [
      {
        id: 2,
        name: 'STORE',
        owner: 'Mr. Kashif Ghani Usman Ghani'
      },
      {
        id: 3,
        name: 'Ali Pump',
        owner: 'Qaiser'
      },
    ],
    sub_area: [

      {
        id: 1,
        name: 'MOULDING DEPART'
      },
      {
        id: 3,
        name: 'Ali Pump Doubling'
      },
    ],
    priority: 'high',
    query: 'testing 123',
    status: 'resolved',
    response_date: '7th Jan 2025',
    response: 'testing completed'
  },
]
const HeroSection = ({ generateTicket, role, AreaMode }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  // const [dataforDisplay, setdataforDisplay] = useState(dummy);
  const [dataforDisplay, setdataforDisplay] = useState([]);
  const [recentData, setrecentData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalType, setmodalType] = useState('Generate');
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  const [type, settype] = useState('');
  const [editCount, seteditCount] = useState(0)
  const [loading, setLoading] = useState(true);
  const [AllOption, setAllOption] = useState({
    areas: [],
    modules: [],
    tickets: []
  })
  const [selectedTicket, setselectedTicket] = useState(
    {
      id: '',
      models: [],
      generated_by: JSON.parse(localStorage.getItem('name')),
      issue_date: '3rd Jan 2025',
      areas: [],
      sub_areas: [],
      priority: '',
      query: '',
      status: 'pending',
    }
  )
  // Toggle function to open/close modal
  const toggle = () => setModal(!modal);

  const handlenavigate = (where_to_go) => {
    window.open(where_to_go, "_blank");
  }
  // generate & Edit tickets----------------x---------------------------
  const HandleEdit = (data) => {
    console.log(data)
    const FinalFormat = {
      ...data,
      sub_areas: data?.sub_areas.map(item => ({
        name: item.name,
        id: item.sub_area_id
      })),
      areas: data?.areas.map(item => ({
        ...item,
        label: `${item.name}, ${item.owner}`,
        disabled: false
      })),
    }
    setselectedTicket(FinalFormat)
    setmodalType('Edit')
    toggle();
  }
  const handleGneretaeTicketModal = () => {
    if (AreaMode) {
      const areaDetails = {
        id: JSON.parse(localStorage.getItem('userData'))?.area_ids.id,
        name: JSON.parse(localStorage.getItem('userData'))?.area_ids.name,
        owner: JSON.parse(localStorage.getItem('userData'))?.name
      }
      console.log(areaDetails)
      setselectedTicket({
        models: [],
        areas: [areaDetails],
        sub_areas: [],
      })
    }
    else {
      setselectedTicket({
        models: [],
        areas: [],
        sub_areas: [],
      })
    }
    toggle();
    setmodalType('Generate');
  }
  // generate & Edit tickets end ----------------x---------------------------


  //  filter functionality --------------x-----------------------------
  const handleButtonClick = (filter) => {
    setActiveFilter(filter);
    if (filter == 'all') {
      setdataforDisplay(AllOption.tickets);
      setrecentData(AllOption.tickets)
    }
    else {
      const filterOutput = AllOption.tickets?.filter(item => item.status == filter);
      console.log(filter)
      console.log(filterOutput, 'after filteration')
      setrecentData(filterOutput)
      setdataforDisplay(filterOutput)
    }
  };
  const handleSearch = (e) => {
    const query = e.toLowerCase()
    if (query === "") {
      setdataforDisplay(recentData);
      return;
    }
    const searchOutput = dataforDisplay.filter(item => {
      if (item.id.toString().includes(query)) return true;

      if (item.owner.toLowerCase().includes(query)) return true;

      if (item.models?.some(mod => mod.name.toLowerCase().includes(query))) return true;

      if (item.areas?.some(area => area.name.toLowerCase().includes(query))) return true;

      if (item.sub_areas?.some(sub => sub.name.toLowerCase().includes(query))) return true;

      return false;
    });
    setdataforDisplay(searchOutput)
  }
  //  filter functionality end --------------x-----------------------------

  const FetchTickets = async () => {
    try {
      const data = []
      const payload = {
        factory_id: factoryID,
        user_id: JSON.parse(localStorage.getItem("userData"))?.id || 41
      }
      const loggedinUserArea = JSON.parse(localStorage.getItem("userData"))?.area_ids
      // AreaService.getAlltickets(payload)

      if (AreaMode) {
        AreaService.getAreaUserTickets(payload).then((resp) => {
          console.log('AreaMode mode', AreaMode);
          console.log('response from api', resp.data);
          const areaa = resp?.data?.data?.areas.filter(e => e && e.area_id === loggedinUserArea.id);
          console.log(areaa, 'filtered area');
          resp?.data?.data?.tickets.forEach((ticket) => {
            ticket.areas = ticket.areas.map((area) => {
              const matchedArea = resp?.data?.data?.areas.find((a) => a.area_id == area.area_id);
              return {
                id: area.area_id,
                name: area.area_name,
                owner: matchedArea ? matchedArea.area_owner : null,
              };
            });
          });
          const formattedModels = resp?.data?.data?.models.map((model) => ({
            id: model.module_id,
            name: model.module_name,
          }));
          setdataforDisplay(resp?.data?.data?.tickets);
          setAllOption({
            areas: areaa,
            modules: formattedModels,
            tickets: resp?.data?.data?.tickets
          })
          setLoading(false)
        }).catch((err) => {
          console.log('error fetching support ticket data', err)
        })
      }
      else {
        AreaService.getAlltickets(payload)
          .then((res) => {
            const resp = res?.data?.data;
            console.log(resp);

            // getting area owner name from all area options
            resp?.tickets.forEach((ticket) => {
              ticket.areas = ticket.areas.map((area) => {
                const matchedArea = resp?.areas.find((a) => a.area_id == area.area_id);
                return {
                  id: area.area_id,
                  name: area.area_name,
                  owner: matchedArea ? matchedArea.area_owner : null,
                };
              });
            });

            // changing module key module_id into id, for typeahead filteration
            const formattedModels = resp?.models.map((model) => ({
              id: model.module_id,
              name: model.module_name,
            }));

            setdataforDisplay(resp?.tickets);
            setAllOption({
              areas: resp.areas,
              modules: formattedModels,
              tickets: resp.tickets
            })
            setLoading(false)
          })
          .catch((e) => {
            setLoading(false)
          });
      }
    } catch (error) {
      console.log('error fetching support ticket data', error)
    }
  }
  useEffect(() => {
    //   const updatedArray = dataforDisplay.map(item => { 
    //     const updatedArea = item.area.map(areaItem => {
    //       return {
    //         ...areaItem, 
    //         label: `${areaItem.name}, ${areaItem.owner}` 
    //       };
    //     }); 
    //     return {
    //       ...item, 
    //       area: updatedArea 
    //     };
    //   }); 
    //  setdataforDisplay(updatedArray);
    FetchTickets()
  }, [])
  return (
    <Row>
      {loading ? <Loader1 /> : <>
        <Col xs='12'>
          <div className='cardbackcolor' style={{ height: '256px', background: '#635470', borderRadius: '24px' }}>
            <p className='ticketspageheading text-center ' style={{ fontSize: '48px', fontWeight: "600", color: 'white', paddingTop: '70px' }}>Need our help? We’ve got your back</p>
          </div>
          <div className='cardlisting d-flex justify-content-center flex-wrap' style={{ marginTop: '-70px' }} >
            <TicketCard heading={'Generate Support Ticket'} Icon={PiTicket} onClick={() => { handleGneretaeTicketModal() }}
            />
            <TicketCard heading={'Schedule a Meeting Now'} Icon={FaCalendarAlt} onClick={() => handlenavigate('https://calendly.com/')} />
            <TicketCard
              heading="FAQs"
              Icon={() => <img src={faq} alt="FAQs Icon" />}
              flag={true}
              onClick={() => handlenavigate(`${process.env.PUBLIC_URL}/support/documentationfaqs/${role}`)}
            />

          </div>
        </Col>
        <Col xs='12'>
          <Row>

            <div className='d-flex justify-content-between align-items-center flex-wrap mb-2 mt-5 mt-xxl-0 mt-xl-0 mt-lg-0 mt-md-0'>
              <h6 className='mt-3' style={{ color: '#383838', fontSize: '20px', fontWeight: '700' }}>Previous Support Tickets</h6>
              <PreviousCardSecton onClick={handleSearch} />
            </div>

            {/* filters section */}

            <div>
              <button
                className={`filtersbtn px-0 py-2 me-3 ${activeFilter === 'all' ? 'filteractive' : ''}`}
                onClick={() => handleButtonClick('all')}
              >
                All
              </button>
              <button
                className={`filtersbtn px-0 py-2 me-3 ${activeFilter === 'pending' ? 'filteractive' : ''}`}
                onClick={() => handleButtonClick('pending')}
              >
                Pending
              </button>
              <button
                className={`filtersbtn px-0 py-2 me-3 ${activeFilter === 'in process' ? 'filteractive' : ''}`}
                onClick={() => handleButtonClick('in process')}
              >
                In-Process
              </button>
              <button
                className={`filtersbtn px-0 py-2 me-3 ${activeFilter === 'resolved' ? 'filteractive' : ''}`}
                onClick={() => handleButtonClick('resolved')}
              >
                Resolved
              </button>
            </div>

            <hr />

            {/* previouis tickets */}
            {dataforDisplay?.length <= 0 ? <p className='f-light text-center mt-4'>Zero <b>tickets</b> found</p> : dataforDisplay?.sort((a, b) => b.id - a.id)
              .map((item, key) => (
                <Col xxl='4' xl='6' sm='12' key={key}>
                  <PreviousTicketCard data={item} handleEdit={() => { HandleEdit(item) }} />
                </Col>
              ))}

            {/* Generate Ticekt Modal */}
            <GenerateTicket AreaMode={AreaMode} seteditCount={seteditCount} dataforDisplay={dataforDisplay} setdataforDisplay={setdataforDisplay} modalType={modalType} modal={modal} toggle={toggle} modileOptions={AllOption.modules} areaOption={AllOption.areas} NewTicket={selectedTicket} setselectedTicket={setselectedTicket} />
          </Row>
        </Col>
      </>}

    </Row>
  );
}

export default HeroSection;

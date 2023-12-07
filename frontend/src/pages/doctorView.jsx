import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import NavBarDoctor from "../components/NavBarDoctor";
import MainBtn from "../components/Button";
import Contract from '../components/Contract'; 
import Form from '../components/Form.jsx';
import Validation from '../validate/validate';
import { useNavigate } from 'react-router-dom';
import TableNotifications from "../components/TableNotifications";


function DoctorView(){

    const {username} = useParams();
    const[result, setResult] = useState([]);
    const [email, setEmail] = useState('');
    const [hourlyrate, setHourlyRate] = useState(0);
    const [affiliation, setAffiliation] = useState('');
    const [date, setDate] = useState('');
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [contractInfo, setContractInfo] = useState(null);
    const [showContract, setShowContract] = useState(false);
    const[wallet, setWallet] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(true); // State to track loading of notifications



    let tHeadNot = ['Message'];
    let navigate = useNavigate()

    const viewContract = async (DoctorUsername) => {
      try {
        const response = await axios.get(`http://localhost:4000/Doctor/viewContract/${DoctorUsername}`,{
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        });
        setContractInfo(response.data.contract, () => {
          console.log("Contract info set:", contractInfo);
          setShowContract(true);
        });
      } catch (error) {
        console.error("Failed to fetch contract details:", error);
      }
    };
    
    // const handleViewContract = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:4000/Doctor/viewContract/${username}`);
    //     setContractInfo(response.data.contract);
    //     setShowContract(true); // This will display the contract component
    //   } catch (error) {
    //     console.error("Failed to fetch contract details:", error);
    //     setShowContract(false); // In case of error, do not show the contract component
    //   }
    // };
    console.log('date format', date)
const handleAddAppointment = (e) => {
  e.preventDefault();
  if(date && from){
  const data = {date: date, time:from}
 // try{
    const response = axios.post(`http://localhost:4000/Doctor/addAvailableTimeSlots/${username}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res =>alert('added')).catch(err => alert('error'))
  }
      // if (response.status === 200) {
      //       alert(response.data.message);
      //         console.log(response.data.message);
      //     }}
      //     catch(error ){
      //       alert(`Failed to add appointment `);
      //       console.error('Error:', error);
      //     };
         // window.location.reload(true); 
         e.preventDefault();
}

    const handleViewContract = () => {
      navigate(`/doctor/${username}/contract`);
    };

    
  const updateEmail=(e) => {
    e.preventDefault();
    const response = axios.put(`http://localhost:4000/Doctor/updateDoctorByEmail/${username}`, {Email:email},
    {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res => {
      setResult(res.data);
      alert('Email updated successfully.');
    })
    .catch(err => {
      console.log(err);
      alert('Failed to update email.');
    });
    console.log(result)
  }
  const updateHourlyRate=(e) => {
    e.preventDefault();
    const response = axios.put(`http://localhost:4000/Doctor/updateDoctorByHourlyRate/${username}`, {HourlyRate:hourlyrate},{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res => {
      setResult(res.data);
      alert('Hourly rate updated successfully.');
    })
    .catch(err => {
      console.log(err);
      alert('Failed to update hourly rate.');
    });
      console.log(result)
  }
  const updateAffiliation=(e) => {
    e.preventDefault();
    const response = axios.put(`http://localhost:4000/Doctor/updateDoctorByAffiliation/${username}`, {Affiliation:affiliation},{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res => {
      setResult(res.data);
      alert('Affiliation updated successfully.');
    })
    .catch(err => {
      console.log(err);
      alert('Failed to update affiliation.');
    });  console.log(result)
  }
  useEffect(() => {
    if (contractInfo) {
      console.log("Contract info set:", contractInfo);
      setShowContract(true);
    }
  }, [contractInfo]); 

  useEffect(() => {
    const response = axios.get(`http://localhost:4000/Doctor/viewWalletAmountByDoc/${username}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res =>setWallet(res.data)).catch(err => console.log(err))
    console.log('w',wallet)
  }, []); 
  useEffect(() => {
    setIsLoadingNotifications(true); // Start loading notifications
    axios.get(`http://localhost:4000/Doctor/displayDoctorNotifications/${username}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    })
    .then(res => {
      setNotifications(res.data.doctorMessages);
      setIsLoadingNotifications(false); // Stop loading after data is received
    })
    .catch(err => {
      console.error(err);
      setIsLoadingNotifications(false); // Stop loading if there's an error
    });
  }, [username]);
  const renderNotificationsSection = () => {
    if (isLoadingNotifications) {
      return <div>Loading notifications...</div>; // Or any loading spinner component
    } else {
      return <TableNotifications tHead={tHeadNot} data={notifications} />;
    }
  };

 
    return (
        <div>
        <NavBarDoctor username={username}/>
        <div>
            <MainBtn
              txt="My Patients"
              style="green-btn"
              action={() => navigate(`/patientsList/${username}`)}
              key="navBtn"
            />
          </div>
          <div>
            <MainBtn
              txt="My Appointments"
              style="green-btn"
              action={() => navigate(`/appointmentsListDoctor/${username}`)}
              key="navBtn"
            />
            </div>
            <div>
            <MainBtn
              txt="View Contract"
              style="green-btn"
              action={handleViewContract}
              key="navBtn"
            />
            </div>
            {showContract && contractInfo && (
              <Contract contract={contractInfo} />
            )}
            
  
  <form onSubmit={updateEmail}>
  <h3>
    <input type='email' required placeholder='Enter New Email' onChange={(e) => setEmail(e.target.value)} />
    <button type="submit">Update Email</button>
  </h3>
</form>

<form onSubmit={updateHourlyRate}>
  <h3>
    <input type="number" required placeholder="Enter New Hourly Rate" onChange={(e) => setHourlyRate(e.target.value)} />
    <button type="submit">Update Hourly Rate</button>
  </h3>
</form>

<form onSubmit={updateAffiliation}>
  <h3>
    <input type="text" required placeholder="Enter New Affiliation" onChange={(e) => setAffiliation(e.target.value)} />
    <button type="submit">Update Affiliation</button>
  </h3>
</form>
<form onSubmit={handleAddAppointment}>
  <h3>
    <input type='date' required onChange={(e) => setDate(e.target.value)} />
  </h3>
  <h3>
    <input type='number' placeholder="Time" required onChange={(e) => setFrom(e.target.value)} />
  </h3>
  <button type="submit">Add Appointment</button>
</form>

  {wallet &&
  <div>
  <h1>Wallet Amount: {wallet}</h1>
  </div>
  }
  <h1>Notifications</h1>
  {renderNotificationsSection()}
 
      
        </div>
    )
    }
    export default DoctorView;
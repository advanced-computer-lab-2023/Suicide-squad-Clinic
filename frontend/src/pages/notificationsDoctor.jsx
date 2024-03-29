import { Navigate, useNavigate, useParams } from "react-router-dom";
import MainBtn from "../components/Button";
import NavBarPharmacist from "../components/NavBarPharmacist";
import MedicineListPharmacist from "../components/medicineListPharmacist";
import axios from "axios";
import { useEffect, useState } from "react";
import TableNotifications from "../components/TableNotifications";


function NotificationsDoctor(){
    const navigate = useNavigate();
    const {username} = useParams();
    const [notifications, setNotifications] = useState([]);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
    let tHeadNot = ['Message'];


    useEffect(() => {
            const response = axios.get(`http://localhost:8000/Doctor/displayNotifications/${username}`,{
              headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
            })
              .then(res => setNotifications(res.data)).catch(err => console.log(err))
          }, [])
          console.log('notif', notifications);
        
return (
    <div>
    <NavBarDoctor username={username}/>
    <h2>Notifications:</h2>
    <TableNotifications tHead={tHeadNot} data={notifications} />

    </div>
)
}
export default NotificationsDoctor;
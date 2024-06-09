import axios from "axios";
import { useEffect, useState } from "react";
import Chat from "../Chat";
import { useGlobalState } from "@/context/useGlobalState";

export const ChatPagePatient: React.FC = () => {
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [doctors, setDoctors] = useState([]);
    const {state} = useGlobalState()

    useEffect(() => {
		axios.get('https://intelligent-patient-data-management.onrender.com/user/users/doctors').then((res) => {
			setDoctors(res.data || []);
		});
	}, []);

    return (
      <div className="flex">
        <div className="w-1/3 border-r">
          <h1 className="text-lg font-semibold p-4">Doctors</h1>
          <ul>
            {doctors.map((doctor : any) => (
              <li
                key={doctor._id}
                className="p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedDoctor(doctor)}
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 p-4">
          {selectedDoctor ? <Chat room = {selectedDoctor.name + "-" + state.patientProfile.name} /> : <p>Select a doctor to chat with...</p>}
        </div>
      </div>
    );
  };
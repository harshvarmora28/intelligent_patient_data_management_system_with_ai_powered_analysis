import DynamicTable from '@/components/QueryTable';
import { MedicalRecord } from '@/types';
import axios from 'axios';
import React, { useEffect } from 'react';

const DoctorQueryTableView = () => {
	const [data, setData] = React.useState();

	useEffect(() => {
		axios
			.get('https://intelligent-patient-data-management.onrender.com/patient_query/all')
			.then((response) => {
				const data = response.data;
				setData(
					data.map((record: MedicalRecord) => {
						return {
							id: record._id,
							patient_name: record.patient.name,
							gender: record.patient.gender,
							age: record.patient.age,
							current_symptoms: record.current_symptoms.description,
							current_medication: record.medical_history.current_medication,
							created_at: record.createdAt,
						};
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	if (!data) return <div>Loading...</div>;

	return <DynamicTable data={data} link_path='/doctor/case-view' />;
};

export default DoctorQueryTableView;
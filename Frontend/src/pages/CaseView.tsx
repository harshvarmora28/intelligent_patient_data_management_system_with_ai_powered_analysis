import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from '@/components/ui/use-toast';
import { useGlobalState } from '@/context/useGlobalState';

interface VaccinationHistory {
	name: string;
	status: string;
}

interface MedicalHistory {
	_id: string;
	allergies: string;
	past_medical_history: string;
	family_medical_history: string;
	current_medication: string;
	vaccination_history: VaccinationHistory[];
}

interface Lifestyle {
	_id: string;
	smoking: string;
	alcohol: string;
	sleep_time: string;
}

interface Patient {
	_id: string;
	name: string;
	gender: string;
	email: string;
	age: number;
}

interface CurrentSymptoms {
	description: string;
	duration_days: number;
	affected_area: string;
}

interface AiResponse {
	_id: string;
	patient_query: string;
	gemini_response: string;
	openai_response: string;
	createdAt: string;
	updatedAt: string;
	accepted: string;
	custom_doctor_response: string;
	__v: number;
}

interface CaseData {
	current_symptoms: CurrentSymptoms;
	prescription: { medicine: string[] };
	_id: string;
	patient: Patient;
	medical_history: MedicalHistory;
	life_style: Lifestyle;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

const CaseViewComponent: React.FC = () => {
	const { state } = useGlobalState();
	const user = state.patientProfile;
	const { id } = useParams();
	const [data, setData] = useState<CaseData>();
	const [ai_response, set_ai_response] = useState<AiResponse>();

	const [doctorResponse, setDoctorResponse] = useState({
		accepted: 'yes',
		response: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			const axiosRes = await axios.get(
				`https://intelligent-patient-data-management.onrender.com/patient_query/${id}`
			);
			console.log('case data.........', axiosRes);
			setData(axiosRes.data.data);
			set_ai_response(axiosRes.data.ai_response);
			console.log('ai response.........', axiosRes.data.ai_response);
		};
		fetchData();
	}, [id]);

	const handleCaseSubmit = () => {
		axios
			.put(`https://intelligent-patient-data-management.onrender.com/gpt_response/update/${ai_response?._id}`, {
				...doctorResponse,
				mailConfig: {
					toEmail: data?.patient.email,
					caseSymptoms: data?.current_symptoms.description,
					aiResponse: ai_response?.gemini_response,
				},
			})
			.then(() => {
				toast({
					variant: 'default',
					description: 'Case Updated',
				});
			})
			.catch(() => {
				toast({
					variant: 'destructive',
					description: 'Case Updating error',
				});
			});
	};

	if (!data) return <div>Loading...</div>;

	return (
		<div className='p-4 flex flex-col gap-4'>
			<h2 className='text-3xl font-semibold'>Patient Case Details</h2>
			<div className='mt-4 bg-red-100 px-6 py-6 rounded-lg'>
				<h3 className='font-semibold text-xl pb-4'>Current Symptoms</h3>
				<p>
					<span className='font-semibold'>Description:</span>{' '}
					{data?.current_symptoms.description}
				</p>
				<p>
					<span className='font-semibold'>Duration (days):</span>{' '}
					{data?.current_symptoms.duration_days}
				</p>
				<p>
					<span className='font-semibold'>Affected Area:</span>{' '}
					{data?.current_symptoms.affected_area}
				</p>
			</div>
			<div className='mt-4 bg-amber-100 px-6 py-6 rounded-lg'>
				<h3 className='font-semibold text-xl pb-4'>Medical History</h3>
				<p>
					<span className='font-semibold'>Allergies:</span>{' '}
					{data?.medical_history.allergies}
				</p>
				<p>
					<span className='font-semibold'>Past Medical History:</span>{' '}
					{data?.medical_history.past_medical_history}
				</p>
				<p>
					<span className='font-semibold'>Family Medical History:</span>{' '}
					{data?.medical_history.family_medical_history}
				</p>
				<p>
					<span className='font-semibold'>Current Medication:</span>{' '}
					{data?.medical_history.current_medication}
				</p>
				<p>
					<span className='font-semibold'>Vaccination History:</span>{' '}
					{data?.medical_history.vaccination_history
						.map((v) => v.name)
						.join(', ')}
				</p>
			</div>
			<div className='mt-4 bg-green-100 px-6 py-6 rounded-lg'>
				<h3 className='font-semibold text-xl pb-4'>Lifestyle</h3>
				<p>
					<span className='font-semibold'>Smoking:</span>{' '}
					{data?.life_style.smoking}
				</p>
				<p>
					<span className='font-semibold'>Alcohol:</span>{' '}
					{data?.life_style.alcohol}
				</p>
				<p>
					<span className='font-semibold'>Sleep Time:</span>{' '}
					{data?.life_style.sleep_time}
				</p>
			</div>
			{ai_response?.accepted || user.role === 'doctor' ? (
				<>
					<div className='mt-4 flex flex-col gap-4'>
						<h3 className='font-semibold text-2xl'>GPT-Generated Analysis</h3>
						<p>
							<span className='font-semibold'>GeminiAI:</span>{' '}
							{ai_response?.gemini_response}
						</p>
						<p className='bg-red-100 px-3 py-6 rounded-md'>
							<span className='font-semibold'>Doctor Note:</span>{' '}
							{ai_response?.custom_doctor_response}
						</p>
					</div>
				</>
			) : (
				<div className='mt-4 flex flex-col gap-4'>
					<p>Doctor hasn't open your case yet</p>
				</div>
			)}
			{user.role === 'doctor' && (
				<>
					<div className='mt-4 w-1/3'>
						<h3 className='font-semibold text-xl'>Doctor's Note</h3>
						<Input
							placeholder='Write your note here'
							className='mt-2'
							onChange={(e) =>
								setDoctorResponse({
									...doctorResponse,
									response: e.target.value,
								})
							}
						/>
					</div>
					<div className='mt-4 flex justify-center'>
						<Button onClick={handleCaseSubmit} className=''>
							Submit
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default CaseViewComponent;

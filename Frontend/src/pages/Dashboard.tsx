/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '../components/ui/tabs';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/utils/Icons';
import { Label } from '@radix-ui/react-label';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { useGlobalState } from '@/context/useGlobalState';
import PatientQueryTableView from './PatientQueryTableView';

const Dashboard = () => {
	const { state } = useGlobalState();
	const [currentSymptoms, setCurrentSymptoms] = useState({
		description: '',
		duration_days: '',
		affected_area: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [doctors, setDoctors] = useState([]);
	const [selectiveDoctor, setSelectiveDoctor] = useState('');

	const lifeStyleData = state.lifeStyle;
	const medicalHistoryData = state.medicalHistory;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentSymptoms((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleCreateNewCase = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (!selectiveDoctor) {
			alert('Please select a doctor');
			setIsLoading(false);
			return;
		}
		axios.post('https://intelligent-patient-data-management.onrender.com/patient_query/create', {
			medical_history: medicalHistoryData,
			life_style: lifeStyleData,
			current_symptoms: currentSymptoms,
			emailConfig: {
				toEmail: selectiveDoctor,
			},
		});
		setTimeout(() => {
			setIsLoading(false);
			alert('Case created successfully');
		}, 3000);
	};

	useEffect(() => {
		axios.get('https://intelligent-patient-data-management.onrender.com/user/users/doctors').then((res) => {
			setDoctors(res.data || []);
		});
	}, []);

	return (
		<>
			<div className='h-full flex flex-col space-y-4'>
				<div className='mx-auto'>
					<Dialog>
						<DialogTrigger className='py-6'>
							<Button className=''>+ New Case</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className='text-lg mb-4'>
									Current Symptoms
								</DialogTitle>
								<DialogDescription>
									<form
										className='flex flex-col space-y-4'
										onSubmit={handleCreateNewCase}
									>
										<div>
											<Label htmlFor='description'>Describe it</Label>
											<Input
												type='text'
												id='description'
												name='description'
												value={currentSymptoms.description}
												onChange={handleChange}
												placeholder='Enter your current symptoms description'
												required
											/>
										</div>
										<div>
											<Label htmlFor='duration_days'>Duration in Days</Label>
											<Input
												type='number'
												id='duration_days'
												name='duration_days'
												value={currentSymptoms.duration_days}
												onChange={handleChange}
												placeholder='Enter your current symptoms duration in days'
												required
											/>
										</div>
										<div>
											<Label htmlFor='affected_area'>Affected Area</Label>
											<Input
												type='text'
												id='affected_area'
												name='affected_area'
												value={currentSymptoms.affected_area}
												onChange={handleChange}
												placeholder='Enter your current symptoms affected area'
												required
											/>
										</div>
										{doctors.length > 0 && (
											<div>
												<label className='block text-sm font-medium' htmlFor=''>
													Prefer a doctor??
												</label>
												<select
													className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
													onChange={(e) => {
														setSelectiveDoctor(e.target.value);
													}}
												>
													<option value=''>Select Your doctor</option>
													{doctors.map((doctor: any) => (
														<option key={doctor._id} value={doctor.email}>
															{doctor.name}
														</option>
													))}
												</select>
											</div>
										)}
										<Button
											type='submit'
											className='w-full'
											disabled={isLoading}
										>
											{isLoading ? (
												<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
											) : (
												'Create new case'
											)}
										</Button>
									</form>
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</div>
				<div className='grow grid grid-rows-2 gap-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='col-span-full md:col-span-1'>
							<Card className='h-full bg-green-100 flex flex-col justify-center items-center space-y-3 py-6'>
								<Avatar className='h-[100px] w-[100px]'>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>P</AvatarFallback>
								</Avatar>
								<CardTitle className='text-lg'>
									Welcome {state.patientProfile.name} !
								</CardTitle>
								<div className='text-center'>
									<p>
										{state.patientProfile.city}, {state.patientProfile.state}
									</p>
									<p>Mail: {state.patientProfile.email}</p>
								</div>
							</Card>
						</div>
						<div className='md:col-span-2'>
							<Card className='h-full bg-amber-100 px-10 py-6'>
								<Tabs defaultValue='medical-history' className=''>
									<TabsList className='bg-amber-100'>
										<TabsTrigger
											className='bg-amber-100'
											value='medical-history'
										>
											Medical History
										</TabsTrigger>
										<TabsTrigger value='life-style'>Life Style</TabsTrigger>
									</TabsList>
									<TabsContent value='medical-history' className=''>
										<div className='grid grid-cols-2 gap-2'>
											<p>
												<span className='font-semibold'>Allergies:</span>{' '}
												{medicalHistoryData?.allergies}
											</p>
											<p>
												<span className='font-semibold'>
													Past Medical History:
												</span>{' '}
												{medicalHistoryData?.past_medical_history}
											</p>
											<p>
												<span className='font-semibold'>
													Family Medical History:
												</span>{' '}
												{medicalHistoryData?.family_medical_history}
											</p>
											<p>
												<span className='font-semibold'>
													Current Medication:
												</span>{' '}
												{medicalHistoryData?.current_medication}
											</p>
											<p>
												<span className='font-semibold'>
													Vaccination History:
												</span>{' '}
												{medicalHistoryData?.vaccination_history.map((vac) => (
													<span
														className={`${
															vac.status === 'no' && 'line-through	'
														}`}
													>
														{vac.name},{' '}
													</span>
												))}
											</p>
										</div>
									</TabsContent>
									<TabsContent value='life-style'>
										<div className='flex flex-col space-y-2'>
											<p>
												<span className='font-semibold'>Smoking:</span>{' '}
												{lifeStyleData?.smoking}
											</p>
											<p>
												<span className='font-semibold'>Alcohol:</span>{' '}
												{lifeStyleData?.alcohol}
											</p>
											<p>
												<span className='font-semibold'>Sleep Time:</span>{' '}
												{lifeStyleData?.sleep_time}
											</p>
										</div>
									</TabsContent>
								</Tabs>
							</Card>
						</div>
					</div>
					<div className='row-span-1'>
						<Card className='h-full px-6 py-6'>
							<CardTitle className='py-2 text-xl'>
								Patient Cases History
							</CardTitle>
							<CardContent>
								<PatientQueryTableView />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;

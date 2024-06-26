import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';
import AuthLayout from './layout/AuthLayout';
import PatientLayout from './layout/PatientLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MedicalInformation from './pages/MedicalInformation';
import PatientProfile from './pages/PatientProfile';
import axios from 'axios';
import { useEffect } from 'react';
import DoctorLayout from './layout/DoctorLayout';
import CaseView from './pages/CaseView';
import CasesHistory from './pages/CasesHistory';
import Home from './pages/Home';
import DoctorQueryTableView from './pages/DoctorQueryTableView';
import { useGlobalState } from './context/useGlobalState';
import { ActionTypes } from './context/actionTypes';
import { ChatPagePatient } from './components/Chat/Patient/ChatPage';
import { ChatPageDoctor } from './components/Chat/Doctor/ChatPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/auth/signup',
		element: (
			<AuthLayout>
				<Register />
			</AuthLayout>
		),
	},
	{
		path: '/auth/login',
		element: (
			<AuthLayout>
				<Login />
			</AuthLayout>
		),
	},
	{
		path: '/patient/dashboard',
		element: (
			<PatientLayout>
				<Dashboard />
			</PatientLayout>
		),
	},
	{
		path: '/patient/medical-info',
		element: (
			<PatientLayout>
				<MedicalInformation />
			</PatientLayout>
		),
	},
	{
		path: '/patient/cases-history',
		element: (
			<PatientLayout>
				<CasesHistory />
			</PatientLayout>
		),
	},
	{
		path: '/patient/profile',
		element: (
			<PatientLayout>
				<PatientProfile />
			</PatientLayout>
		),
	},
	{
		path: '/doctor/cases',
		element: (
			<DoctorLayout>
				<DoctorQueryTableView />
			</DoctorLayout>
		),
	},
	{
		path: '/doctor/case-view/:id',
		element: (
			<DoctorLayout>
				<CaseView />
			</DoctorLayout>
		),
	},
	{
		path: '/patient/case-view/:id',
		element: (
			<PatientLayout>
				<CaseView />
			</PatientLayout>
		),
	},
	{
		path: '/patient/chat',
		element: (
			<PatientLayout>
				<ChatPagePatient />
			</PatientLayout>
		),
	},
	{
		path: '/doctor/chat',
		element: (
			<DoctorLayout>
				<ChatPageDoctor />
			</DoctorLayout>
		),
	},
]);

const App = () => {
	const { state, dispatch } = useGlobalState();
	useEffect(() => {
		axios.defaults.headers.common[
			'Authorization'
		] = `Token ${localStorage.getItem('token')}`;
	}, []);

	useEffect(() => {
		axios.defaults.headers.common[
			'Authorization'
		] = `Token ${localStorage.getItem('token')}`;

		const fetchMyProfile = async () => {
			await axios.get('https://intelligent-patient-data-management.onrender.com/user/me').then((res) => {
				const user = res.data.data;
				console.log(user)
				dispatch({ type: ActionTypes.SET_PATIENT_PROFILE, payload: user });
			});
		};

		const getMedicalHistoryAndLifeStyle = async () => {
			axios
				.get('https://intelligent-patient-data-management.onrender.com/medical_history/mine')
				.then((res) => {
					const data = res.data;
					dispatch({ type: ActionTypes.UPDATE_MEDICAL_HISTORY, payload: data });
				})
				.catch((err) => {
					console.error(err);
				});
			axios
				.get('https://intelligent-patient-data-management.onrender.com/life_style/mine')
				.then((res) => {
					const data = res.data;
					dispatch({ type: ActionTypes.UPDATE_LIFE_STYLE, payload: data });
				})
				.catch((err) => {
					console.error(err);
				});
		};
		fetchMyProfile();
		getMedicalHistoryAndLifeStyle();
	}, [dispatch]);
	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
};

export default App;

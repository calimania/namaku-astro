import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	Outlet,
	createRootRouteWithContext,
} from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AstroGlobal } from 'astro'
import { markketplace } from "../markket.config";
import { type Store, type UserProfile } from '../markket/index.d';
import { useQuery } from "@tanstack/react-query";
import { IconLoader } from '@tabler/icons-react';
import * as React from 'react';

import { Sidebar } from '../components/portal/layout.sidebar';
import { Header } from '../components/portal/layout.header';
import { NewAppointmentModal } from '../components/ui/AppointmentModal';

export const Route = createRootRouteWithContext<{
	astroContext: AstroGlobal | undefined,
	queryClient: QueryClient,
	store: Store | undefined,
}>()({
	component: Component,
})

const fetchStore = async () => {
	const res = await fetch(new URL(`/api/stores?filters[slug][$eq]=${markketplace.portal.slug}&populate[]=Favicon&populate[]=Logo&populate[]=SEO`, markketplace.api));
	if (!res.ok) throw new Error("Failed to fetch store");
	return res.json();
};

const fetchProfile = async (): Promise<UserProfile> => {
	const jwt = getAuth();
	if (!jwt) throw new Error('No authentication token found.');

	const res = await fetch(new URL(`/api/users/me?populate=avatar`, markketplace.api), {
		headers: {
			'authorization': `Bearer ${jwt}`,
		}
	});

	if (!res.ok) {
		throw new Error('Authentication failed. Please log in again.');
	}

	return res.json();
};

const getAuth = () => {
	const string = localStorage.getItem('namaku.auth') || '{}';
	let json = {
		jwt: '',
	};

	try {
		json = JSON.parse(string);
	} catch {
		console.warn('parsing.namaku.auth');
	}

	return json?.jwt;
}

const getPageSubtitle = (activeTab: string) => {
	switch (activeTab) {
		case 'dashboard': return 'Welcome back! Here\'s what\'s happening today.';
		case 'patients': return 'Manage your patient profiles and health journeys';
		case 'appointments': return 'Schedule and manage your upcoming sessions';
		case 'video': return 'Connect with your patients through secure video calls';
		case 'analytics': return 'Track your practice performance and patient outcomes';
		case 'settings': return 'Manage your account and application preferences';
		default: return '';
	}
};

function Component() {
	const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = React.useState(false);

	const { data, isLoading, error } = useQuery({
		queryKey: ["store"],
		queryFn: fetchStore,
	});


	const {
		data: profile,
		isLoading: isLoadingProfile,
		error: errorProfile,
		refetch: refetchProfile,
	} = useQuery<UserProfile, Error>({
		queryKey: ["profile"],
		queryFn: fetchProfile,
		enabled: !!getAuth(),
		retry: (failureCount, error) => {
			if (error.message.includes("Authentication")) return false;
			return failureCount < 2;
		},
	});


	const [activeTab, setActiveTab] = React.useState('home' as string);

	const [sidebarOpen, setSidebarOpen] = React.useState(true);

	const store = data?.data?.[0] as Store;

	error && console.warn({ error });


	if (isLoadingProfile) {
		return (
			<div className="h-screen w-screen flex items-center justify-center bg-gray-50">
				<div className="flex flex-col items-center space-y-4">
					<IconLoader size={64} className='text-blue-500 animate-spin' />
					<p className="text-lg text-gray-600">Loading Your Portal...</p>
				</div>
			</div>
		);
	}

	if (errorProfile) {
		return (
			<div className="h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
				<div className="flex flex-col items-center space-y-4">
					<div className="text-red-500 font-bold text-xl">{errorProfile.message}</div>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						onClick={() => {
							if (errorProfile.message.includes('Authentication')) {
								window.location.href = '/auth';
							} else {
								refetchProfile();
							}
						}}
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	// Normalize profile for Sidebar
	const sidebarProfile = profile
		? {
			username: profile.username || '',
			displayName: profile.displayName || '',
			bio: profile.bio || '',
			email: profile.email || '',
		}
		: undefined;

	return (
		<div className={`h-screen flex overflow-hidden ${activeTab === 'video' ? 'bg-gray-900' : 'bg-gray-50'}`}>
			<Sidebar activeTab={activeTab} onTabChange={setActiveTab} profile={sidebarProfile} store={store} />
			<div className="flex-1 flex flex-col overflow-hidden">
				{activeTab !== 'video' && (
					<Header
						title={activeTab}
						subtitle={getPageSubtitle(activeTab)}
						onNewAppointment={() => { }}
					/>
				)}
				<main className={`flex-1 overflow-y-auto ${activeTab === 'video' ? '' : 'p-6'}`}>
					<Outlet />
				</main>
			</div>
			<NewAppointmentModal
				isOpen={isNewAppointmentModalOpen}
				onClose={() => setIsNewAppointmentModalOpen(false)}
				onSubmit={() => { }}
			/>
			<ReactQueryDevtools />
		</div>
	);
}

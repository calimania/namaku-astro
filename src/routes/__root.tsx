import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AstroGlobal } from 'astro'
import { markketplace } from "../markket.config";
import type { Store } from '../markket';
import { useQuery } from "@tanstack/react-query";
import { IconAdjustmentsStar, IconMacroFilled, IconHome, IconInfoCircle, IconVideo, IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react';
import * as React from 'react';

import { Sidebar } from '../components/portal/layout.sidebar';
import { Header } from '../components/portal/layout.header';

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

const fetchProfile = async () => {
	const jwt = getAuth();

	const res = await fetch(new URL(`/api/users/me?populate=avatar`, markketplace.api), {
		headers: {
			'authorization': `Bearer ${jwt}`,
		}
	});

	if (!res.ok) {
		window.location.href = '/auth'
	}//  throw new Error("Failed to fetch store");

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

	const { data, isLoading, error } = useQuery({
		queryKey: ["store"],
		queryFn: fetchStore,
	});

	const { data: profile, isLoading: isLoadingProfile, error: errorProfile } = useQuery({
		queryKey: ["profile"],
		queryFn: fetchProfile,
	});


	const [activeTab, setActiveTab] = React.useState('home' as string);

	const [sidebarOpen, setSidebarOpen] = React.useState(true);

	const store = data?.data?.[0] as Store;

	error && console.warn({ error });

	if (isLoadingProfile) {
		return <IconLoader size={72} className='mt-16 ml-4 animate-spin' />
	}

	if (!isLoadingProfile && errorProfile) {
		return <>a</>
	}

	return (
		<div className={`h-screen flex overflow-hidden ${activeTab === 'video' ? 'bg-gray-900' : 'bg-gray-50'}`}>
			<Sidebar activeTab={activeTab} onTabChange={setActiveTab} profile={profile} store={store} />
			<div className="flex-1 flex flex-col overflow-hidden">
				{activeTab !== 'video' && (
					<Header
						title={activeTab}
						subtitle={getPageSubtitle(activeTab)}
						onNewAppointment={() => { }}
					/>
				)}
			</div>
			{/*
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab !== 'video' && (
          <Header
            title={getPageTitle()}
            subtitle={getPageSubtitle()}
            onNewAppointment={handleNewAppointment}
          />
        )}

        <main className={`flex-1 overflow-y-auto ${activeTab === 'video' ? '' : 'p-6'}`}>
          <Outlet />
        </main>
      </div>

      <NewAppointmentModal
        isOpen={isNewAppointmentModalOpen}
        onClose={() => setIsNewAppointmentModalOpen(false)}
        onSubmit={handleAppointmentSubmit}
      /> */}
		</div>
	);

	// return (
	// 	<div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-emerald-50">
	// 		<header className="w-full px-16 md:px-4 py-4 bg-gradient-to-r from-sky-400 to-emerald-400 shadow-md flex items-center justify-between">
	// 			<div className="flex items-center gap-3 ">
	// 				{store?.Favicon?.url && (
	// 					<img src={store.Favicon.url} alt="Logo" className="h-10 w-10 rounded-full shadow" />
	// 				)}
	// 				<span className="text-2xl font-bold text-white drop-shadow">{store?.title || 'Namaku Portal'}</span>
	// 			</div>
	// 		</header>
	// 		<div className="flex flex-1 min-h-0">
	// 			{/* Desktop Sidebar */}
	// 			{sidebarOpen && (
	// 				<aside className="bg-white/80 border-r border-gray-200 w-64 p-6 flex-col gap-6 min-h-full hidden md:flex transition-all duration-300 relative">
	// 					<nav className="flex flex-col gap-2">
	// 						<Link className="flex items-center gap-2 text-sky-700 font-medium hover:bg-sky-100 rounded px-3 py-2 transition" to="/portal">
	// 							<IconHome size={20} /> Home
	// 						</Link>
	// 						<Link className="flex items-center gap-2 text-sky-700 font-medium hover:bg-sky-100 rounded px-3 py-2 transition" to="/portal/about">
	// 							<IconInfoCircle size={20} /> About
	// 						</Link>
	// 						<Link className="flex items-center gap-2 text-sky-700 font-medium hover:bg-sky-100 rounded px-3 py-2 transition" to="/portal/zoom">
	// 							<IconVideo size={20} /> Zoom Room
	// 						</Link>
	// 					</nav>
	// 					<div className="mt-auto text-xs text-gray-400">&copy; {new Date().getFullYear()} Namaku Wellness</div>
	// 					<button
	// 						className="absolute top-4 right-[-18px] bg-sky-400 text-white rounded-full shadow p-1 border border-sky-300 hover:bg-sky-500 transition md:block hidden"
	// 						onClick={() => setSidebarOpen(false)}
	// 						title="Collapse sidebar"
	// 					>
	// 						<IconAdjustmentsStar size={24} color="white" />
	// 					</button>
	// 				</aside>
	// 			)}
	// 			{/* Sidebar expand button (desktop) */}
	// 			{!sidebarOpen && (
	// 				<button
	// 					className="absolute top-24 left-0 bg-sky-400 text-white rounded-r-full shadow p-1 border border-sky-300 hover:bg-sky-500 transition md:block hidden z-20"
	// 					onClick={() => setSidebarOpen(true)}
	// 					title="Expand sidebar"
	// 				>
	// 					<IconAdjustmentsStar size={24} color="white" />
	// 				</button>
	// 			)}
	// 			{/* Mobile sidebar toggle */}
	// 			<input type="checkbox" id="sidebar-toggle" className="peer hidden" />
	// 			<label htmlFor="sidebar-toggle" className="md:hidden absolute top-5 left-4 z-20 cursor-pointer">
	// 				<IconAdjustmentsStar color={'white'} size={32} />
	// 			</label>
	// 			<aside className="mt-16 fixed inset-y-0 left-0 z-30 w-64 bg-white/90 border-r border-gray-200 p-6 flex flex-col gap-6 min-h-full md:hidden transition-transform duration-300 peer-checked:translate-x-0 -translate-x-full">
	// 				<nav className="flex flex-col gap-2">
	// 					<Link className="flex items-center gap-2 text-sky-700 font-medium hover:bg-sky-100 rounded px-3 py-2 transition" to="/portal">
	// 						<IconMacroFilled size={20} /> Home
	// 					</Link>
	// 					<Link className="flex items-center gap-2 text-sky-700 font-medium hover:bg-sky-100 rounded px-3 py-2 transition" to="/portal/about">
	// 						<IconInfoCircle size={20} /> About
	// 					</Link>
	// 					<Link className="flex items-center gap-2 text-sky-700 font-medium hover:bg-sky-100 rounded px-3 py-2 transition" to="/portal/zoom">
	// 						<IconVideo size={20} /> Zoom Room
	// 					</Link>
	// 				</nav>
	// 				<div className="mt-auto text-xs text-gray-400">&copy; {new Date().getFullYear()} Namaku Wellness</div>
	// 			</aside>
	// 			<main className="flex-1 flex flex-col min-h-0 p-4 md:p-8 bg-white/70 rounded-lg shadow-lg m-2 overflow-auto">
	// 				<Outlet />
	// 			</main>
	// 		</div>
	// 		<footer className="w-full bg-gray-900 text-gray-300 mt-8">
	// 			<div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
	// 				<div className="flex items-center gap-2">
	// 					{store?.Favicon?.url && (
	// 						<a href="/">
	// 							<img src={store.Favicon.url} alt="Logo" className="h-8 w-8 rounded-full" />
	// 						</a>
	// 					)}
	// 				</div>
	// 				<div className="text-xs text-gray-400"><span className="font-semibold">{isLoading ? 'Loading...' : store?.title}</span> &copy; {new Date().getFullYear()}</div>
	// 			</div>
	// 		</footer>
	// 		<ReactQueryDevtools buttonPosition='top-right' />
	// 		<TanStackRouterDevtools position='bottom-right' />
	// 	</div>
	// )
}

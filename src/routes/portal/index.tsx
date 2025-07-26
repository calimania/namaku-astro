
import { markketplace } from "../../markket.config";
import { useQuery } from "@tanstack/react-query";
import PageContent from "../../components/content.blocks";
import type { Page } from "../../markket";

const fetchPage = async () => {
  const res = await fetch(new URL(`/api/pages?filters[slug][$eq]=platform.index&filters[store][slug][$eq]=${markketplace.portal.slug}&populate[]=SEO`, markketplace.api));
  if (!res.ok) throw new Error("Failed to fetch store");
  return res.json();
};

import React from 'react';
import { IconUsers as Users, IconCalendarFilled as Calendar, IconClock as Clock, IconTrendingUp as TrendingUp } from '@tabler/icons-react';
import { StatsCard } from '../../components/ui/StatsCard';
import { RecentAppointments } from '../../components/ui/RecentAppointments';
import { Card } from '../../components/ui/Card';
import { mockPatients, mockAppointments, mockCoach } from '../../data/mock';

export const PortalIndex: React.FC = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["page.platform.index"],
    queryFn: fetchPage,
  });

  const page = data?.data?.[0] as Page;

  const todayAppointments = mockAppointments.filter(
    apt => apt.date.toDateString() === new Date().toDateString()
  );

  const upcomingAppointments = mockAppointments.filter(
    apt => apt.date > new Date() && apt.status === 'scheduled'
  );

  const completedThisWeek = mockAppointments.filter(
    apt => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return apt.date >= weekAgo && apt.status === 'completed';
    }
  ).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{page?.Title || 'Good Morning'} 👋</h2>
            <p className="text-blue-100">
              You have {todayAppointments.length} appointments today and {upcomingAppointments.length} upcoming this week.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{new Date().getDate()}</p>
            <p className="text-blue-100">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={mockPatients.length}
          change={{ value: '+2 this month', type: 'increase' }}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={Calendar}
          color="emerald"
        />
        <StatsCard
          title="Completed This Week"
          value={completedThisWeek}
          change={{ value: '+15% vs last week', type: 'increase' }}
          icon={Clock}
          color="purple"
        />
        <StatsCard
          title="Success Rate"
          value="94%"
          change={{ value: '+2% this month', type: 'increase' }}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments */}
        <div className="lg:col-span-2">
          <RecentAppointments appointments={todayAppointments} />
        </div>

        {/* Quick Actions & Insights */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="font-medium text-blue-900">Add New Patient</div>
                <div className="text-sm text-blue-700">Create a new patient profile</div>
              </button>
              <button
                onClick={() => setIsNewAppointmentModalOpen && setIsNewAppointmentModalOpen(true)}
                className="w-full text-left p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                <div className="font-medium text-emerald-900">Schedule Appointment</div>
                <div className="text-sm text-emerald-700">Book a new session</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="font-medium text-purple-900">View Analytics</div>
                <div className="text-sm text-purple-700">Check performance metrics</div>
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Patient Satisfaction</span>
                <span className="font-semibold text-emerald-600">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Session Duration</span>
                <span className="font-semibold text-blue-600">52 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Goal Achievement Rate</span>
                <span className="font-semibold text-purple-600">87%</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded text-blue-700 max-w-[728px]" >
          <PageContent params={{ page }} />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute({
  component: PortalIndex,
});
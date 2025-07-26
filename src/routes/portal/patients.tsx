import React, { useState } from 'react';
import { IconSearch as Search, IconFilter as  Filter, IconPlus as Plus } from '@tabler/icons-react';
import { PatientCard } from '../../components/ui/PatientCard';
import { Button } from '../../components/ui/Button';
import { mockPatients } from '../../data/mock';
import { type Patient } from '../../markket/index.d';

export const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'recent') {
      return matchesSearch && patient.lastVisit &&
             (new Date().getTime() - patient.lastVisit.getTime()) < (7 * 24 * 60 * 60 * 1000);
    }
    if (selectedFilter === 'new') {
      return matchesSearch && !patient.lastVisit;
    }

    return matchesSearch;
  });

  const handleViewDetails = (patient: Patient) => {
    console.log('View details for:', patient.name);
  };

  const handleScheduleAppointment = (patient: Patient) => {
    console.log('Schedule appointment for:', patient.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600 mt-1">Manage your patient profiles and health journeys</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Patients</option>
            <option value="recent">Recent Visits</option>
            <option value="new">New Patients</option>
          </select>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{mockPatients.length}</div>
          <div className="text-sm text-blue-700">Total Patients</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {mockPatients.filter(p => p.lastVisit &&
              (new Date().getTime() - p.lastVisit.getTime()) < (7 * 24 * 60 * 60 * 1000)
            ).length}
          </div>
          <div className="text-sm text-emerald-700">Recent Visits</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {mockPatients.filter(p => !p.lastVisit).length}
          </div>
          <div className="text-sm text-purple-700">New Patients</div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onViewDetails={handleViewDetails}
            onScheduleAppointment={handleScheduleAppointment}
          />
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute({
  component: PatientsList,
})

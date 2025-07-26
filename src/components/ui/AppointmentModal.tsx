import React, { useState } from 'react';
import {
  IconCalendar as Calendar, IconClock as Clock, IconCurrency as DollarSign, IconUser as User, IconPlus as Plus, IconMail as Mail,
  IconCreditCard as CreditCard, IconGift as Gift
} from '@tabler/icons-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { mockPatients } from '../../data/mock';
import { type Patient } from '../../markket/index.d';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointmentData: any) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isCreatingNewPatient, setIsCreatingNewPatient] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    duration: '60',
    type: 'follow-up',
    cost: '150',
    notes: ''
  });
  const [newPatientData, setNewPatientData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    healthGoals: ''
  });

  const appointmentTypes = [
    { value: 'initial', label: 'Initial Consultation (90 min)' },
    { value: 'follow-up', label: 'Follow-up Session (60 min)' },
    { value: 'group', label: 'Group Session (45 min)' },
    { value: 'emergency', label: 'Emergency Consultation (30 min)' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' },
    { value: '90', label: '90 minutes' }
  ];

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsCreatingNewPatient(false);
  };

  const handleCreateNewPatient = () => {
    setIsCreatingNewPatient(true);
    setSelectedPatient(null);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const finalData = {
      patient: selectedPatient || newPatientData,
      appointment: appointmentData,
      isNewPatient: isCreatingNewPatient
    };
    onSubmit(finalData);
    onClose();
    // Reset form
    setStep(1);
    setSelectedPatient(null);
    setIsCreatingNewPatient(false);
    setAppointmentData({
      date: '',
      time: '',
      duration: '60',
      type: 'follow-up',
      cost: '150',
      notes: ''
    });
    setNewPatientData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      healthGoals: ''
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select or Create Patient</h3>
        <p className="text-gray-600">Choose an existing patient or create a new profile</p>
      </div>

      {!isCreatingNewPatient ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Existing Patients</h4>
            <Button variant="outline" size="sm" onClick={handleCreateNewPatient}>
              <Plus className="w-4 h-4 mr-2" />
              New Patient
            </Button>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => handlePatientSelect(patient)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedPatient?.id === patient.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar name={patient.name} size="sm" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {patient.healthGoals.slice(0, 2).map((goal, index) => (
                        <Badge key={index} variant="secondary" size="sm">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Create New Patient</h4>
            <Button variant="ghost" size="sm" onClick={() => setIsCreatingNewPatient(false)}>
              Back to List
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={newPatientData.name}
              onChange={(e) => setNewPatientData({...newPatientData, name: e.target.value})}
              placeholder="Enter patient's full name"
            />
            <Input
              label="Email"
              type="email"
              value={newPatientData.email}
              onChange={(e) => setNewPatientData({...newPatientData, email: e.target.value})}
              placeholder="patient@email.com"
            />
            <Input
              label="Phone"
              value={newPatientData.phone}
              onChange={(e) => setNewPatientData({...newPatientData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
            <Input
              label="Date of Birth"
              type="date"
              value={newPatientData.dateOfBirth}
              onChange={(e) => setNewPatientData({...newPatientData, dateOfBirth: e.target.value})}
            />
          </div>
          <Input
            label="Health Goals"
            value={newPatientData.healthGoals}
            onChange={(e) => setNewPatientData({...newPatientData, healthGoals: e.target.value})}
            placeholder="Weight loss, stress management, nutrition..."
          />
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Appointment</h3>
        <p className="text-gray-600">Set the date, time, and session details</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          value={appointmentData.date}
          onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
          min={new Date().toISOString().split('T')[0]}
        />
        <Input
          label="Time"
          type="time"
          value={appointmentData.time}
          onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Session Type"
          value={appointmentData.type}
          onChange={(e) => setAppointmentData({...appointmentData, type: e.target.value})}
          options={appointmentTypes}
        />
        <Select
          label="Duration"
          value={appointmentData.duration}
          onChange={(e) => setAppointmentData({...appointmentData, duration: e.target.value})}
          options={durationOptions}
        />
      </div>

      <Input
        label="Session Notes (Optional)"
        value={appointmentData.notes}
        onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
        placeholder="Any specific topics or goals for this session..."
      />

      {/* Demo Banner */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <div className="flex items-center space-x-3">
          <Gift className="w-8 h-8 text-emerald-600" />
          <div>
            <h4 className="font-semibold text-emerald-900">Demo Mode - Free 5-Minute Calls</h4>
            <p className="text-sm text-emerald-700">
              All video calls are limited to 5 minutes for demonstration purposes.
              Perfect for showcasing the platform's capabilities!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment & Confirmation</h3>
        <p className="text-gray-600">Set pricing and review appointment details</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Session Cost (USD)"
          type="number"
          value={appointmentData.cost}
          onChange={(e) => setAppointmentData({...appointmentData, cost: e.target.value})}
          placeholder="150"
          min="0"
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-2 text-gray-500">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Stripe Payment (Demo Mode)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Summary */}
      <Card className="bg-gray-50">
        <h4 className="font-semibold text-gray-900 mb-4">Appointment Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Patient:</span>
            <span className="font-medium">
              {selectedPatient?.name || newPatientData.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">
              {appointmentData.date} at {appointmentData.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{appointmentData.duration} minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium">
              {appointmentTypes.find(t => t.value === appointmentData.type)?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost:</span>
            <span className="font-medium text-emerald-600">${appointmentData.cost}</span>
          </div>
        </div>
      </Card>

      {/* Email Notification Info */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Mail className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Automatic Notifications</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>✓ Patient will receive appointment confirmation email</p>
              <p>✓ Secure payment link will be included</p>
              <p>✓ Video call link will be sent 15 minutes before session</p>
              <p>✓ Calendar invite with all details will be attached</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Appointment" size="lg">
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={
              (step === 1 && !selectedPatient && !isCreatingNewPatient) ||
              (step === 1 && isCreatingNewPatient && (!newPatientData.name || !newPatientData.email)) ||
              (step === 2 && (!appointmentData.date || !appointmentData.time))
            }
          >
            {step === 3 ? 'Create Appointment' : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

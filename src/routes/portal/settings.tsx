export const Route = createFileRoute({
  component: SettingsPage,
})


import { useState } from 'react';
import {
  IconCurrencyDollar as DollarSign,
IconBuildingCastle as   Building,
  IconUser as Users,
  IconCards as CreditCard,
  IconPin as MapPin,
  IconExposurePlus1 as Phone,
  IconMail as Mail,
  IconCodePlus as Plus,
  IconPencil as Edit,
  IconTrash as Trash2,
  IconSquares as Copy,
  IconCheck as Check
} from '@tabler/icons-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';

function SettingsPage ()  {
  const [activeTab, setActiveTab] = useState('payouts');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'payouts', name: 'Payouts & Billing', icon: DollarSign },
    { id: 'practice', name: 'Practice Information', icon: Building },
    { id: 'users', name: 'Users & Practitioners', icon: Users },
  ];

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText('https://namaku.com/invite/dr-sarah-johnson-abc123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPayoutsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Stripe Account</h4>
                <p className="text-sm text-gray-600">Connected to process patient payments</p>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Session Rate (USD)
                </label>
                <Input type="number" defaultValue="150" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Schedule</h3>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Weekly Payouts</h4>
                <p className="text-sm text-gray-600">Receive payments every Friday</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">$2,450</div>
                <div className="text-sm text-gray-600">This week's earnings</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">$8,200</div>
                  <div className="text-sm text-gray-600">This month</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">$24,600</div>
                  <div className="text-sm text-gray-600">Last 3 months</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">$98,400</div>
                  <div className="text-sm text-gray-600">This year</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Information</h3>
        <Card>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Tax ID / EIN" defaultValue="12-3456789" />
              <Input label="Business Type" defaultValue="LLC" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">1099 Forms</h4>
                <p className="text-sm text-gray-600">Automatically generated at year-end</p>
              </div>
              <Button variant="outline" size="sm">Download 2024</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPracticeTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Details</h3>
        <Card>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Practice Name" defaultValue="Johnson Wellness Center" />
              <Input label="License Number" defaultValue="WC-2024-001234" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Specialization" defaultValue="Wellness & Nutrition Coaching" />
              <Input label="Years of Experience" defaultValue="12" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio & Credentials
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="Certified wellness coach with over 12 years of experience helping clients achieve their health and wellness goals. Specialized in nutrition counseling, stress management, and lifestyle optimization."
              />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <Card>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                defaultValue="+1 (555) 123-4567"
                icon={<Phone className="w-4 h-4" />}
              />
              <Input
                label="Email Address"
                defaultValue="sarah.johnson@namaku.com"
                icon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Practice Address
              </label>
              <div className="space-y-2">
                <Input placeholder="Street Address" defaultValue="123 Wellness Drive" />
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="City" defaultValue="San Francisco" />
                  <Input placeholder="State" defaultValue="CA" />
                  <Input placeholder="ZIP Code" defaultValue="94102" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
        <Card>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Zone
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking Window
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>2 weeks in advance</option>
                  <option>1 month in advance</option>
                  <option>3 months in advance</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Profile</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        <Card>
          <div className="flex items-center space-x-4">
            <Avatar name="Dr. Sarah Johnson" size="xl" />
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900">Dr. Sarah Johnson</h4>
              <p className="text-gray-600">Wellness & Nutrition Coach</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="primary">Admin</Badge>
                <span className="text-sm text-gray-500">Member since Jan 2023</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Invite Practitioner
          </Button>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar name="Dr. Michael Chen" size="lg" />
                <div>
                  <h4 className="font-semibold text-gray-900">Dr. Michael Chen</h4>
                  <p className="text-gray-600">Physical Therapist</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="secondary">Practitioner</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar name="Lisa Rodriguez" size="lg" />
                <div>
                  <h4 className="font-semibold text-gray-900">Lisa Rodriguez</h4>
                  <p className="text-gray-600">Mental Health Counselor</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="warning">Pending</Badge>
                    <Badge variant="secondary">Practitioner</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Resend Invite</Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite New Practitioners</h3>
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invitation Link
              </label>
              <div className="flex space-x-2">
                <Input
                  readOnly
                  value="https://namaku.com/invite/dr-sarah-johnson-abc123"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleCopyInviteLink}
                  className="flex items-center space-x-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Share this link with practitioners you want to invite to your practice
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Or send direct invitation</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Practitioner's email" />
                <div>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Practitioner Role</option>
                    <option>Admin</option>
                    <option>Practitioner</option>
                    <option>Assistant</option>
                  </select>
                </div>
              </div>
              <Button className="mt-3">Send Invitation</Button>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions & Roles</h3>
        <Card>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Admin</h4>
                <p className="text-sm text-blue-700 mt-1">Full access to all features</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900">Practitioner</h4>
                <p className="text-sm text-emerald-700 mt-1">Manage own patients & appointments</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900">Assistant</h4>
                <p className="text-sm text-purple-700 mt-1">Schedule appointments & basic admin</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account, practice, and team settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'payouts' && renderPayoutsTab()}
        {activeTab === 'practice' && renderPracticeTab()}
        {activeTab === 'users' && renderUsersTab()}
      </div>
    </div>
  );

}

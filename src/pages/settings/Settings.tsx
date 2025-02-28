import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useBusinessContext } from '../../contexts/BusinessContext';
import { EnhancedTooltip } from '../../components/EnhancedTooltip';
import { businessService } from '../../services/businessService';

type Theme = 'light' | 'dark' | 'system';

interface Preferences {
  currency: string;
  dateFormat: string;
  theme: Theme;
}

export function Settings() {
  const { state, dispatch } = useBusinessContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(state.profile);
  const [preferences, setPreferences] = useState<Preferences>({
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await businessService.updateProfile(profile);
      dispatch({ type: 'SET_PROFILE', payload: updatedProfile });
      setIsEditing(false);
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to update profile. Please try again.',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Business Profile Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">
              Business Profile
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <EnhancedTooltip
                  title="What is Business Name?"
                  description="This is your official business name as registered."
                  examples={[
                    { label: 'Legal Name', value: 'Example Corp' },
                    { label: 'DBA Name', value: 'Example' },
                  ]}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Name
                  </label>
                </EnhancedTooltip>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
                />
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Industry?"
                  description="The main sector your business operates in."
                  examples={[
                    { label: 'Retail', value: 'Consumer goods' },
                    { label: 'Tech', value: 'Software' },
                  ]}
                >
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Industry
                  </label>
                </EnhancedTooltip>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={profile.industry}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
                />
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Business Size?"
                  description="The category your business falls into based on revenue and employees."
                  examples={[
                    { label: 'Micro', value: '1-10 employees' },
                    { label: 'Small', value: '11-50 employees' },
                    { label: 'Medium', value: '51-250 employees' },
                  ]}
                >
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Size
                  </label>
                </EnhancedTooltip>
                <select
                  id="size"
                  name="size"
                  value={profile.size}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
                >
                  <option value="micro">Micro (1-10 employees)</option>
                  <option value="small">Small (11-50 employees)</option>
                  <option value="medium">Medium (51-250 employees)</option>
                </select>
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Employee Count?"
                  description="The total number of full-time employees in your business."
                  examples={[
                    { label: 'Full-time', value: '8' },
                    { label: 'Part-time', value: '4' },
                  ]}
                >
                  <label
                    htmlFor="employeeCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee Count
                  </label>
                </EnhancedTooltip>
                <input
                  type="number"
                  id="employeeCount"
                  name="employeeCount"
                  value={profile.employeeCount}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <EnhancedTooltip
                  title="What is City?"
                  description="The city where your business is primarily located."
                  examples={[
                    { label: 'Main Office', value: 'San Francisco' },
                    { label: 'Region', value: 'Bay Area' },
                  ]}
                >
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                </EnhancedTooltip>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profile.location.city}
                  onChange={handleLocationChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
                />
              </div>

              <div>
                <EnhancedTooltip
                  title="What is State?"
                  description="The state or region where your business operates."
                  examples={[
                    { label: 'State', value: 'CA' },
                    { label: 'Province', value: 'ON' },
                  ]}
                >
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                </EnhancedTooltip>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={profile.location.state}
                  onChange={handleLocationChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
                />
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Country?"
                  description="The country where your business is registered."
                  examples={[
                    { label: 'Country', value: 'USA' },
                    { label: 'Code', value: 'US' },
                  ]}
                >
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                </EnhancedTooltip>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={profile.location.country}
                  onChange={handleLocationChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <EnhancedTooltip
                title="What is Currency?"
                description="The primary currency used for all financial calculations."
                examples={[
                  { label: 'USD', value: 'US Dollar' },
                  { label: 'EUR', value: 'Euro' },
                ]}
              >
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Currency
                </label>
              </EnhancedTooltip>
              <select
                id="currency"
                value={preferences.currency}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    currency: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <EnhancedTooltip
                title="What is Date Format?"
                description="How dates will be displayed throughout the application."
                examples={[
                  { label: 'US', value: 'MM/DD/YYYY' },
                  { label: 'EU', value: 'DD/MM/YYYY' },
                ]}
              >
                <label
                  htmlFor="dateFormat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Format
                </label>
              </EnhancedTooltip>
              <select
                id="dateFormat"
                value={preferences.dateFormat}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    dateFormat: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <EnhancedTooltip
                title="What is Theme?"
                description="The visual theme for the application interface."
                examples={[
                  { label: 'Light', value: 'Bright theme' },
                  { label: 'Dark', value: 'Dark theme' },
                ]}
              >
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700"
                >
                  Theme
                </label>
              </EnhancedTooltip>
              <select
                id="theme"
                value={preferences.theme}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    theme: e.target.value as Theme,
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { EnhancedTooltip } from '../../components/EnhancedTooltip';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'appointment' | 'break' | 'training' | 'maintenance';
  description: string;
  client?: string;
  service?: string;
  duration: number; // in minutes
  price?: number;
  transactionId?: string;
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Haircut & Color - Sarah Johnson',
      date: '2025-03-15',
      time: '10:00',
      type: 'appointment',
      description: 'Full color and cut service - Root touch-up with ash blonde, trim and style',
      client: 'Sarah Johnson',
      service: 'Cut & Color',
      duration: 120,
      price: 150,
      transactionId: '1'
    },
    {
      id: '2',
      title: 'Lunch Break',
      date: '2025-03-15',
      time: '12:30',
      type: 'break',
      description: 'Lunch break',
      duration: 30
    },
    {
      id: '3',
      title: 'Balayage - Emily Davis',
      date: '2025-03-15',
      time: '13:30',
      type: 'appointment',
      description: 'Balayage service - Caramel highlights with toner, trim and style',
      client: 'Emily Davis',
      service: 'Balayage',
      duration: 180,
      price: 200,
      transactionId: '4'
    },
    {
      id: '4',
      title: 'New Color Technique Training',
      date: '2025-03-20',
      time: '09:00',
      type: 'training',
      description: 'Learn new balayage and color melting techniques with product rep',
      duration: 240
    },
    {
      id: '5',
      title: 'Men\'s Cut - Michael Brown',
      date: '2025-03-16',
      time: '14:00',
      type: 'appointment',
      description: 'Men\'s haircut service - Fade with scissor work on top',
      client: 'Michael Brown',
      service: 'Men\'s Cut',
      duration: 45,
      price: 45,
      transactionId: '7'
    },
    {
      id: '6',
      title: 'Equipment Maintenance',
      date: '2025-03-17',
      time: '08:00',
      type: 'maintenance',
      description: 'Regular cleaning and maintenance of styling tools, scissors sharpening',
      duration: 60
    },
    {
      id: '7',
      title: 'Full Service - Rachel Green',
      date: '2025-03-16',
      time: '10:00',
      type: 'appointment',
      description: 'Cut, color, and style service - Full highlights, trim and blowout',
      client: 'Rachel Green',
      service: 'Cut, Color & Style',
      duration: 150,
      price: 180,
      transactionId: '9'
    },
    {
      id: '8',
      title: 'Deep Conditioning - Lisa Wong',
      date: '2025-03-17',
      time: '11:00',
      type: 'appointment',
      description: 'Keratin treatment and deep conditioning service',
      client: 'Lisa Wong',
      service: 'Treatment',
      duration: 90,
      price: 120,
      transactionId: '11'
    },
    {
      id: '9',
      title: 'Staff Meeting',
      date: '2025-03-18',
      time: '09:00',
      type: 'training',
      description: 'Weekly staff meeting - Review goals and upcoming promotions',
      duration: 60
    },
    {
      id: '10',
      title: 'Bridal Trial - Jessica Smith',
      date: '2025-03-19',
      time: '11:00',
      type: 'appointment',
      description: 'Bridal hair trial - Updo and style consultation',
      client: 'Jessica Smith',
      service: 'Bridal',
      duration: 120,
      price: 150,
      transactionId: '12'
    },
    {
      id: '11',
      title: 'Color Correction - Amy Chen',
      date: '2025-03-19',
      time: '14:00',
      type: 'appointment',
      description: 'Color correction from box dye to desired blonde',
      client: 'Amy Chen',
      service: 'Color Correction',
      duration: 240,
      price: 300,
      transactionId: '13'
    },
    {
      id: '12',
      title: 'Afternoon Break',
      date: '2025-03-19',
      time: '16:00',
      type: 'break',
      description: 'Short break between appointments',
      duration: 15
    },
    {
      id: '13',
      title: 'Product Training',
      date: '2025-03-21',
      time: '09:00',
      type: 'training',
      description: 'New product line training with vendor',
      duration: 120
    },
    {
      id: '14',
      title: 'Inventory Count',
      date: '2025-03-21',
      time: '14:00',
      type: 'maintenance',
      description: 'Monthly inventory count and restock planning',
      duration: 120
    },
    {
      id: '15',
      title: 'Balayage - Jennifer Lee',
      date: '2024-03-25',
      time: '13:00',
      type: 'appointment',
      description: 'Balayage service with toner and style',
      client: 'Jennifer Lee',
      service: 'Balayage',
      duration: 180,
      price: 220,
      transactionId: '19'
    },
    {
      id: '16',
      title: 'Hair Extensions - Madison Taylor',
      date: '2024-03-26',
      time: '10:00',
      type: 'appointment',
      description: 'Full head extensions installation and styling',
      client: 'Madison Taylor',
      service: 'Extensions',
      duration: 240,
      price: 400,
      transactionId: '20'
    },
    {
      id: '17',
      title: 'Root Touch-up - Olivia Wilson',
      date: '2024-03-27',
      time: '14:00',
      type: 'appointment',
      description: 'Root color touch-up and blow dry',
      client: 'Olivia Wilson',
      service: 'Color',
      duration: 90,
      price: 95,
      transactionId: '21'
    },
    {
      id: '18',
      title: 'Full Highlights - Emma Thompson',
      date: '2024-04-02',
      time: '09:30',
      type: 'appointment',
      description: 'Full head highlights with toner and style',
      client: 'Emma Thompson',
      service: 'Highlights',
      duration: 180,
      price: 250,
      transactionId: '22'
    },
    {
      id: '19',
      title: 'Wedding Hair - Sophie Martinez',
      date: '2024-04-03',
      time: '10:00',
      type: 'appointment',
      description: 'Bridal hair trial and consultation',
      client: 'Sophie Martinez',
      service: 'Bridal',
      duration: 180,
      price: 300,
      transactionId: '23'
    },
    {
      id: '20',
      title: 'Color Correction - Isabella Kim',
      date: '2024-04-04',
      time: '13:00',
      type: 'appointment',
      description: 'Color correction from dark to light blonde',
      client: 'Isabella Kim',
      service: 'Color Correction',
      duration: 240,
      price: 350,
      transactionId: '24'
    },
    {
      id: '21',
      title: 'Keratin Treatment - Grace Liu',
      date: '2024-04-09',
      time: '11:00',
      type: 'appointment',
      description: 'Keratin smoothing treatment and style',
      client: 'Grace Liu',
      service: 'Treatment',
      duration: 180,
      price: 280,
      transactionId: '26'
    },
    {
      id: '22',
      title: 'Staff Meeting',
      date: '2024-04-01',
      time: '09:00',
      type: 'training',
      description: 'Monthly staff meeting and goal setting',
      duration: 60
    },
    {
      id: '23',
      title: 'Inventory Day',
      date: '2024-04-10',
      time: '09:00',
      type: 'maintenance',
      description: 'Monthly inventory count and organization',
      duration: 120
    },
    {
      id: '24',
      title: 'Product Training',
      date: '2024-04-15',
      time: '09:00',
      type: 'training',
      description: 'New spring product line training',
      duration: 120
    },
    {
      id: '25',
      title: 'Equipment Maintenance',
      date: '2024-04-16',
      time: '08:00',
      type: 'maintenance',
      description: 'Monthly equipment maintenance and deep cleaning',
      duration: 120
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => event.date === format(date, 'yyyy-MM-dd'));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {daysInMonth.map((date: Date, index: number) => {
              const dayEvents = getEventsForDate(date);
              return (
                <div
                  key={date.toString()}
                  className={`min-h-[120px] bg-white p-2 ${
                    !isSameMonth(date, currentDate)
                      ? 'bg-gray-50 text-gray-400'
                      : 'text-gray-900'
                  } cursor-pointer hover:bg-gray-50`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        isToday(date)
                          ? 'h-6 w-6 bg-blue-600 text-white rounded-full flex items-center justify-center'
                          : ''
                      }`}
                    >
                      {format(date, 'd')}
                    </span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`px-2 py-1 text-xs rounded-md ${
                          event.type === 'appointment'
                            ? 'bg-blue-100 text-blue-800'
                            : event.type === 'break'
                            ? 'bg-gray-100 text-gray-800'
                            : event.type === 'training'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <EnhancedTooltip
                          title={event.title}
                          description={event.description}
                          examples={[
                            { label: 'Time', value: event.time },
                            { label: 'Duration', value: `${event.duration} min` },
                            ...(event.client ? [{ label: 'Client', value: event.client }] : []),
                            ...(event.service ? [{ label: 'Service', value: event.service }] : []),
                            ...(event.price ? [{ label: 'Price', value: `$${event.price}` }] : [])
                          ]}
                        >
                          <div className="truncate">{event.title}</div>
                        </EnhancedTooltip>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Form */}
        {selectedDate && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Event for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Event title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="60"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option value="appointment">Client Appointment</option>
                  <option value="break">Break</option>
                  <option value="training">Training</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Client name (for appointments)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option value="">Select a service</option>
                  <option value="cut">Haircut ($45-65)</option>
                  <option value="color">Color ($80-150)</option>
                  <option value="cut-color">Cut & Color ($150-200)</option>
                  <option value="balayage">Balayage ($200-300)</option>
                  <option value="style">Styling ($45-75)</option>
                  <option value="treatment">Treatment ($80-150)</option>
                  <option value="bridal">Bridal Styling ($150-250)</option>
                  <option value="color-correction">Color Correction ($250-400)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Service price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows={3}
                  placeholder="Additional notes or instructions"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 
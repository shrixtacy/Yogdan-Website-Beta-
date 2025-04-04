import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Clock, Share2, ExternalLink, Filter } from 'lucide-react';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Mega Blood Donation Drive",
    organizer: "Red Cross Society",
    date: "2025-02-12",
    time: "9:00 AM - 4:00 PM",
    location: "NMIET, Bhubaneswar",
    description: "Annual mega blood donation camp with free health checkups.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    type: "blood_donation",
    expectedDonors: 200
  },
  {
    id: 2,
    title: "Blood Donation Awareness Workshop",
    organizer: "Kalinga Hospital",
    date: "2024-03-28",
    time: "11:00 AM - 2:00 PM",
    location: "Esplanade One Mall, Rasulgarh, Bhubaneswar",
    description: "Learn about the importance of blood donation and its impact on saving lives.",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80",
    type: "awareness",
    expectedDonors: 100
  },
  {
    id: 3,
    title: "Emergency Blood Drive",
    organizer: "SCB Medical College",
    date: "2024-03-30",
    time: "8:00 AM - 6:00 PM",
    location: "SCB Medical College, Cuttack",
    description: "Emergency blood donation drive to replenish critical blood types.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    type: "blood_donation",
    expectedDonors: 150
  },
  {
    id: 4,
    title: "Healthcare & Blood Donation Mela",
    organizer: "District Health Society",
    date: "2024-04-05",
    time: "10:00 AM - 5:00 PM",
    location: "Town Hall, Puri",
    description: "Combined healthcare camp and blood donation drive with free medical consultations.",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80",
    type: "mixed",
    expectedDonors: 300
  },
  {
    id: 5,
    title: "Youth Blood Donation Initiative",
    organizer: "Utkal University",
    date: "2024-04-10",
    time: "9:00 AM - 3:00 PM",
    location: "Utkal University Campus, Bhubaneswar",
    description: "Special blood donation drive focusing on youth participation.",
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=800&q=80",
    type: "blood_donation",
    expectedDonors: 250
  }
];

const eventTypes = [
  { value: "all", label: "All Events" },
  { value: "blood_donation", label: "Blood Donation Camps" },
  { value: "awareness", label: "Awareness Programs" },
  { value: "mixed", label: "Mixed Events" }
];

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterEvents(term, selectedType);
  };

  const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedType(type);
    filterEvents(searchTerm, type);
  };

  const filterEvents = (term: string, type: string) => {
    let filtered = mockEvents.filter(event => 
      event.title.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term)
    );

    if (type !== "all") {
      filtered = filtered.filter(event => event.type === type);
    }

    setFilteredEvents(filtered);
  };

  const shareEvent = (event: typeof mockEvents[0]) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join us for ${event.title} at ${event.location} on ${event.date}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blood Donation Events in Odisha</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-gray-900/50 p-6 rounded-lg mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                onChange={handleSearch}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none appearance-none"
                onChange={handleTypeFilter}
                defaultValue="all"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-gray-900/50 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <button
                    onClick={() => shareEvent(event)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-400 mb-4">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>Expected Donors: {event.expectedDonors}</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Organized by: {event.organizer}</span>
                  <button className="btn-primary flex items-center gap-2">
                    Register <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
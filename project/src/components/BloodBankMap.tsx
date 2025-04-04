import React, { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import { Droplets, Cross, Phone, Clock, Globe, Navigation2, Building2, Heart } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';

// Extended location data with more details and additional types
const locations = [
  {
    id: 1,
    name: "Central Red Cross Blood Bank",
    address: "Red Cross Bhawan, Unit-IX, Bhubaneswar",
    contact: "0674-2375007",
    latitude: 20.2961,
    longitude: 85.8245,
    type: "blood_bank",
    operatingHours: "24x7",
    website: "www.odisharedcross.org",
    bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    services: ["Blood Donation", "Component Separation", "Blood Testing"]
  },
  {
    id: 2,
    name: "Capital Hospital",
    address: "Unit-6, Bhubaneswar",
    contact: "0674-2391983",
    latitude: 20.2696,
    longitude: 85.8443,
    type: "hospital",
    operatingHours: "24x7",
    website: "health.odisha.gov.in",
    bloodGroups: ["A+", "B+", "O+", "AB+"],
    services: ["Emergency Care", "Blood Bank", "ICU"]
  },
  {
    id: 3,
    name: "SCB Medical College",
    address: "SCB Medical College, Cuttack",
    contact: "0671-2414080",
    latitude: 20.4686,
    longitude: 85.8921,
    type: "hospital",
    operatingHours: "24x7",
    website: "scbmch.nic.in",
    bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    services: ["Blood Bank", "Emergency Services", "Specialized Care"]
  },
  {
    id: 4,
    name: "Kalinga Hospital Blood Bank",
    address: "KIIT Road, Patia, Bhubaneswar",
    contact: "0674-2725555",
    latitude: 20.3506,
    longitude: 85.8144,
    type: "blood_bank",
    operatingHours: "24x7",
    website: "kalingahospital.com",
    bloodGroups: ["A+", "B+", "O+", "AB+", "O-"],
    services: ["Blood Donation", "Platelet Separation", "Emergency Supply"]
  },
  {
    id: 5,
    name: "Life Line Blood Bank",
    address: "Saheed Nagar, Bhubaneswar",
    contact: "0674-2544444",
    latitude: 20.2890,
    longitude: 85.8442,
    type: "blood_bank",
    operatingHours: "24x7",
    website: "lifelinebloodbank.org",
    bloodGroups: ["A+", "B+", "O+", "AB+", "O-"],
    services: ["Blood Donation", "Component Separation"]
  },
  {
    id: 6,
    name: "Red Cross NGO Center",
    address: "Master Canteen, Bhubaneswar",
    contact: "0674-2533333",
    latitude: 20.2720,
    longitude: 85.8410,
    type: "ngo",
    operatingHours: "9 AM - 6 PM",
    website: "redcrossngo.org",
    bloodGroups: [],
    services: ["Blood Donation Camps", "Awareness Programs"]
  }
];

function BloodBankMap() {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 20.2961,
    longitude: 85.8245,
    zoom: 11
  });

  const getMarkerStyle = (type: string) => {
    switch(type) {
      case 'blood_bank':
        return {
          icon: <Droplets className="w-8 h-8 drop-shadow-lg" />,
          color: 'text-blue-500 hover:text-blue-600',
          bgColor: 'bg-blue-500'
        };
      case 'hospital':
        return {
          icon: <Cross className="w-8 h-8 drop-shadow-lg" />,
          color: 'text-red-500 hover:text-red-600',
          bgColor: 'bg-red-500'
        };
      case 'ngo':
        return {
          icon: <Heart className="w-8 h-8 drop-shadow-lg" />,
          color: 'text-green-500 hover:text-green-600',
          bgColor: 'bg-green-500'
        };
      default:
        return {
          icon: <Building2 className="w-8 h-8 drop-shadow-lg" />,
          color: 'text-gray-500 hover:text-gray-600',
          bgColor: 'bg-gray-500'
        };
    }
  };

  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(() => locations.map(location => {
    const style = getMarkerStyle(location.type);
    return (
      <Marker
        key={location.id}
        latitude={location.latitude}
        longitude={location.longitude}
        anchor="bottom"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setSelectedLocation(location);
          }}
          className={`transform transition-all duration-300 hover:scale-110 ${style.color}`}
        >
          <div className="relative">
            {style.icon}
            <div className={`absolute -top-1 -right-1 w-3 h-3 ${style.bgColor} rounded-full animate-pulse`} />
          </div>
        </button>
      </Marker>
    );
  }), []);

  // Handle map movement with useCallback
  const handleMove = useCallback((evt: { viewState: any }) => {
    setViewState(evt.viewState);
  }, []);

  // Handle directions
  const openDirections = useCallback((lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  }, []);

  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
      <Map
        {...viewState}
        onMove={handleMove}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        attributionControl={true}
        maxZoom={16}
        minZoom={8}
      >
        <NavigationControl position="top-right" />
        {markers}

        {selectedLocation && (
          <Popup
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            anchor="bottom"
            onClose={() => setSelectedLocation(null)}
            closeButton={true}
            closeOnClick={false}
            className="bg-black/90 text-white rounded-lg max-w-sm"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-xl">{selectedLocation.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  selectedLocation.type === 'blood_bank' 
                    ? 'bg-blue-500/20 text-blue-400'
                    : selectedLocation.type === 'hospital'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {selectedLocation.type === 'blood_bank' 
                    ? 'Blood Bank' 
                    : selectedLocation.type === 'hospital'
                    ? 'Hospital'
                    : 'NGO'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Navigation2 className="w-4 h-4" />
                  <p className="text-sm">{selectedLocation.address}</p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <p className="text-sm">{selectedLocation.contact}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <p className="text-sm">{selectedLocation.operatingHours}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Globe className="w-4 h-4" />
                  <a 
                    href={`https://${selectedLocation.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {selectedLocation.website}
                  </a>
                </div>

                {selectedLocation.bloodGroups.length > 0 && (
                  <div className="border-t border-gray-700 pt-3">
                    <h4 className="font-semibold mb-2">Available Blood Groups</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.bloodGroups.map(group => (
                        <span 
                          key={group} 
                          className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-3">
                  <h4 className="font-semibold mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.services.map(service => (
                      <span 
                        key={service} 
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openDirections(selectedLocation.latitude, selectedLocation.longitude)}
                  className="w-full mt-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation2 className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/80 p-4 rounded-lg backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-2">Map Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="text-white text-sm">Blood Banks</span>
          </div>
          <div className="flex items-center gap-2">
            <Cross className="w-5 h-5 text-red-500" />
            <span className="text-white text-sm">Hospitals</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-500" />
            <span className="text-white text-sm">NGOs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodBankMap;
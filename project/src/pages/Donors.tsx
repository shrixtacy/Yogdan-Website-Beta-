import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Droplets, Phone, Mail, Clock, Shield, AlertCircle, LayoutGrid, List } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Donors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [donors, setDonors] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDonor, setSelectedDonor] = useState<Profile | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDonors(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleBloodGroupFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBloodGroup(e.target.value);
  };

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = 
      donor.name.toLowerCase().includes(searchTerm) ||
      donor.address.toLowerCase().includes(searchTerm);
    
    const matchesBloodGroup = selectedBloodGroup ? 
      donor.blood_group === selectedBloodGroup : true;

    return matchesSearch && matchesBloodGroup;
  });

  const handleContactDonor = (donor: Profile) => {
    setSelectedDonor(donor);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading donors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-xl mb-4">Error loading donors</p>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={fetchDonors}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const renderGridView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDonors.map(donor => (
        <div key={donor.id} className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{donor.name}</h3>
              <span className="inline-block mt-1 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm font-semibold">
                {donor.blood_group}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-green-500 text-sm">Verified</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <p className="text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{donor.address}</span>
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+91 9692402032 / 8260542544</span>
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">yogdanofficial@gmail.com</span>
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>Member since {new Date(donor.created_at).toLocaleDateString()}</span>
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400">
              {donor.last_donation ? (
                <span>Last donated: {new Date(donor.last_donation).toLocaleDateString()}</span>
              ) : (
                <span>No previous donations</span>
              )}
            </div>
            <button 
              onClick={() => handleContactDonor(donor)}
              className="btn-primary text-sm py-2"
            >
              Contact Donor
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredDonors.map(donor => (
        <div key={donor.id} className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{donor.name}</h3>
                  <span className="inline-block mt-1 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm font-semibold">
                    {donor.blood_group}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 text-sm">Verified</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                <p className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{donor.address}</span>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91 9692402032 / 8260542544</span>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">yogdanofficial@gmail.com</span>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Member since {new Date(donor.created_at).toLocaleDateString()}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <div className="text-sm text-gray-400">
                {donor.last_donation ? (
                  <span>Last donated: {new Date(donor.last_donation).toLocaleDateString()}</span>
                ) : (
                  <span>No previous donations</span>
                )}
              </div>
              <button 
                onClick={() => handleContactDonor(donor)}
                className="btn-primary text-sm py-2 w-full md:w-auto"
              >
                Contact Donor
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blood Donors in Odisha</h1>
            <p className="text-gray-400">Connect with verified blood donors in your area</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 px-4 py-2 rounded-lg">
              <span className="text-red-500 font-semibold">{donors.length} Active Donors</span>
            </div>
            <div className="flex bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-gray-900/50 p-6 rounded-lg mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 py-3 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                onChange={handleSearch}
              />
            </div>
            <div className="relative">
              <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none appearance-none"
                onChange={handleBloodGroupFilter}
                defaultValue=""
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Donors View */}
        {viewMode === 'grid' ? renderGridView() : renderListView()}

        {filteredDonors.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No donors found matching your criteria.</p>
            {(searchTerm || selectedBloodGroup) && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBloodGroup("");
                }}
                className="text-red-500 hover:text-red-400 mt-2"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Contact Modal */}
        {selectedDonor && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Contact {selectedDonor.name}</h3>
              <div className="space-y-4 mb-6">
                <p className="text-gray-400">
                  You can reach out to this donor through Yogdan's official contact:
                </p>
                <div className="space-y-2">
                  <a 
                    href="tel:+919692402032"
                    className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-green-500" />
                    <span>+91 9692402032</span>
                  </a>
                  <a 
                    href="tel:+918260542544"
                    className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-green-500" />
                    <span>+91 8260542544</span>
                  </a>
                  <a 
                    href="mailto:yogdanofficial@gmail.com"
                    className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>yogdanofficial@gmail.com</span>
                  </a>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Please be respectful and only contact in case of genuine need. Mention the donor's name when contacting.
                </p>
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => setSelectedDonor(null)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donors;
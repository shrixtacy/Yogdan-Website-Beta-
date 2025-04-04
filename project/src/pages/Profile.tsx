import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Droplets, Calendar, Clock, Shield, AlertCircle, Settings, Camera, Weight, Ruler, LogOut, Upload, Award, Bell, ChevronLeft, FileText, Plus, Trash2, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
}

function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'Blood Donation Certificate',
      issuedBy: 'Red Cross Society',
      date: '2024-02-15',
      imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80'
    }
  ]);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    issuedBy: '',
    date: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        
        if (!user) {
          window.location.href = '/login';
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        setUserData(profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          phone: userData.phone,
          blood_group: userData.blood_group,
          address: userData.address,
          updated_at: new Date().toISOString()
        })
        .eq('id', userData.id);

      if (error) throw error;

      alert('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (userData) {
      setUserData({
        ...userData,
        [e.target.name === 'bloodGroup' ? 'blood_group' : e.target.name]: e.target.value
      });
    }
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const certificate: Certificate = {
      id: Date.now().toString(),
      ...newCertificate
    };
    setCertificates([...certificates, certificate]);
    setShowCertificateForm(false);
    setNewCertificate({
      title: '',
      issuedBy: '',
      date: '',
      imageUrl: ''
    });
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-red-500 mb-4">Error Loading Profile</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Please log in to view your profile</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="btn-primary mt-4"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16 px-2 md:px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-4 sticky top-0 bg-black/95 backdrop-blur-sm z-50 p-4 -mx-2">
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-[300px,1fr] gap-4 md:gap-8">
          {/* Profile Sidebar */}
          <div className={`space-y-4 md:space-y-6 ${showSidebar ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gray-900/50 rounded-lg p-4 md:p-6 text-center">
              <div className="relative w-24 md:w-32 h-24 md:h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <User className="w-12 md:w-16 h-12 md:h-16 text-gray-400" />
                </div>
                <button 
                  className="absolute bottom-0 right-0 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  title="Upload profile photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-lg md:text-xl font-bold">{userData.name}</h2>
              <p className="text-red-500 font-semibold">{userData.blood_group}</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-gray-400">Date Joined</span>
                  <span>{new Date(userData.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-gray-400">Total Donations</span>
                  <span>{certificates.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-gray-400">Lives Saved</span>
                  <span>{certificates.length * 3}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 md:block hidden"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className={`bg-gray-900/50 rounded-lg p-3 md:p-6 ${!showSidebar ? 'block' : 'hidden md:block'}`}>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-700 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 no-scrollbar">
              <button
                className={`pb-2 px-3 whitespace-nowrap text-sm ${activeTab === 'personal' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Info
              </button>
              <button
                className={`pb-2 px-3 whitespace-nowrap text-sm ${activeTab === 'medical' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('medical')}
              >
                Medical Info
              </button>
              <button
                className={`pb-2 px-3 whitespace-nowrap text-sm ${activeTab === 'certificates' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('certificates')}
              >
                Certificates
              </button>
              <button
                className={`pb-2 px-3 whitespace-nowrap text-sm ${activeTab === 'settings' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'personal' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Blood Group</label>
                      <div className="relative">
                        <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          name="bloodGroup"
                          value={userData.blood_group}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none appearance-none text-sm"
                        >
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none min-h-[80px] text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'medical' && (
                <div className="space-y-6">
                  <p className="text-gray-400 text-center text-sm">
                    Medical information can be added later. Please visit a verified blood bank or hospital
                    to complete your medical profile.
                  </p>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-semibold">Blood Donation Certificates</h3>
                    <button
                      type="button"
                      onClick={() => setShowCertificateForm(true)}
                      className="btn-primary flex items-center gap-2 text-sm py-2 w-full sm:w-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Add Certificate
                    </button>
                  </div>

                  {showCertificateForm && (
                    <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                      <h4 className="text-base font-semibold mb-4">Add New Certificate</h4>
                      <form onSubmit={handleAddCertificate} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300">Certificate Title</label>
                          <input
                            type="text"
                            required
                            value={newCertificate.title}
                            onChange={(e) => setNewCertificate({...newCertificate, title: e.target.value})}
                            className="w-full mt-1 px-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">Issued By</label>
                          <input
                            type="text"
                            required
                            value={newCertificate.issuedBy}
                            onChange={(e) => setNewCertificate({...newCertificate, issuedBy: e.target.value})}
                            className="w-full mt-1 px-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">Date of Issue</label>
                          <input
                            type="date"
                            required
                            value={newCertificate.date}
                            onChange={(e) => setNewCertificate({...newCertificate, date: e.target.value})}
                            className="w-full mt-1 px-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">Certificate Image URL</label>
                          <input
                            type="url"
                            required
                            value={newCertificate.imageUrl}
                            onChange={(e) => setNewCertificate({...newCertificate, imageUrl: e.target.value})}
                            className="w-full mt-1 px-4 py-2.5 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                            placeholder="https://example.com/certificate.jpg"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="btn-primary flex-1 text-sm py-2">
                            Add Certificate
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowCertificateForm(false)}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {certificates.map(certificate => (
                      <div key={certificate.id} className="bg-black/50 rounded-lg overflow-hidden border border-gray-700">
                        <img
                          src={certificate.imageUrl}
                          alt={certificate.title}
                          className="w-full h-36 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-semibold text-base mb-2">{certificate.title}</h4>
                          <div className="space-y-2 text-xs text-gray-400">
                            <p className="flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              Issued by: {certificate.issuedBy}
                            </p>
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Date: {certificate.date}
                            </p>
                          </div>
                          <div className="mt-3 flex justify-between">
                            <button
                              type="button"
                              onClick={() => window.open(certificate.imageUrl, '_blank')}
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCertificate(certificate.id)}
                              className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {certificates.length === 0 && !showCertificateForm && (
                    <div className="text-center py-8 text-gray-400">
                      <FileText className="w-10 h-10 mx-auto mb-4" />
                      <p className="text-sm">No certificates added yet.</p>
                      <p className="text-xs">Add your blood donation certificates to showcase your contributions.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <p className="text-gray-400 text-center text-sm">
                    Additional settings and preferences can be configured once your profile is complete.
                  </p>
                </div>
              )}

              {activeTab === 'personal' && (
                <div className="flex justify-end mt-6">
                  <button type="submit" className="btn-primary w-full sm:w-auto text-sm py-2.5">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
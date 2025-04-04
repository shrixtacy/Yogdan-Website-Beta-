import React, { useState, useEffect } from 'react';
import { Heart, Users, Brain, ArrowRight, Phone, Activity, Shield, Mail, MapPin, Menu, X, Calendar, 
         CheckCircle2, Smartphone, Bell, Search, UserCheck, Clock, Star, UserCircle } from 'lucide-react';
import Donors from './pages/Donors';
import Events from './pages/Events';
import About from './pages/About';
import DonorSignup from './pages/DonorSignup';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Footer from './components/Footer';
import BloodBankMap from './components/BloodBankMap';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Check login status from localStorage
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'donors':
        return (
          <>
            <Donors />
            <Footer />
          </>
        );
      case 'events':
        return (
          <>
            <Events />
            <Footer />
          </>
        );
      case 'about':
        return (
          <>
            <About />
            <Footer />
          </>
        );
      case 'donor-signup':
        return <DonorSignup />;
      case 'login':
        return <Login />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-black to-red-900">
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Connecting Lives Through Blood Donation</h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">Bridging the gap between blood donors and patients when every second counts</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="btn-primary flex items-center gap-2"
                    onClick={() => setCurrentPage('donor-signup')}
                  >
                    Become a Donor <Heart className="w-5 h-5" />
                  </button>
                  <button 
                    className="btn-primary flex items-center gap-2"
                    onClick={() => setCurrentPage('donors')}
                  >
                    Find Blood <Activity className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            {/* How We Work Section */}
            <section className="section-padding bg-black">
              <div className="max-w-6xl mx-auto">
                <h2 className="heading text-center">How Yogdan Works</h2>
                <p className="subheading text-center text-gray-300">
                  Our streamlined process ensures quick and efficient blood donation matching
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                  {/* Step 1 */}
                  <div className="bg-gray-900/50 p-6 rounded-lg relative">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <Smartphone className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Register</h3>
                    <p className="text-gray-400">Sign up as a donor or recipient through our mobile app or website</p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-gray-900/50 p-6 rounded-lg relative">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <UserCheck className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Verification</h3>
                    <p className="text-gray-400">Complete profile verification and health screening process</p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-gray-900/50 p-6 rounded-lg relative">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <Bell className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Get Notified</h3>
                    <p className="text-gray-400">Receive real-time alerts for blood donation requests in your area</p>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-gray-900/50 p-6 rounded-lg relative">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <Clock className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Quick Response</h3>
                    <p className="text-gray-400">Connect and coordinate with the recipient or donor within minutes</p>
                  </div>
                </div>

                {/* Additional Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <div className="flex items-start gap-3 p-4">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">24/7 Support</h4>
                      <p className="text-sm text-gray-400">Round-the-clock assistance for emergency situations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Secure Platform</h4>
                      <p className="text-sm text-gray-400">End-to-end encrypted communication and data protection</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Quick Matching</h4>
                      <p className="text-sm text-gray-400">Advanced algorithms for fastest donor matching</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-gray-900">
              <div className="max-w-6xl mx-auto">
                <h2 className="heading text-center">What People Say</h2>
                <p className="subheading text-center text-gray-300">
                  Real stories from our community members
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  {/* Testimonial 1 */}
                  <div className="bg-black/50 p-8 rounded-lg relative">
                    <div className="absolute -top-4 -left-4">
                      <Star className="w-8 h-8 text-red-500 fill-current" />
                    </div>
                    <p className="text-gray-300 mb-6">
                      "Yogdan's quick response system saved my father's life during an emergency surgery. 
                      Within 30 minutes of posting the requirement, we found three matching donors. 
                      The platform's efficiency is remarkable!"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                        alt="Testimonial"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">Rahul Pattnaik</h4>
                        <p className="text-sm text-gray-400">Bhubaneswar</p>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-black/50 p-8 rounded-lg relative">
                    <div className="absolute -top-4 -left-4">
                      <Star className="w-8 h-8 text-red-500 fill-current" />
                    </div>
                    <p className="text-gray-300 mb-6">
                      "As a regular blood donor, Yogdan has made it incredibly easy for me to help others. 
                      The app notifications keep me informed about nearby donation needs, and the verification 
                      system ensures everything is legitimate and safe."
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                        alt="Testimonial"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">Priya Mohanty</h4>
                        <p className="text-sm text-gray-400">Cuttack</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Blood Bank Map Section */}
            <section className="section-padding bg-black">
              <div className="max-w-6xl mx-auto">
                <h2 className="heading text-center">Find Blood Banks Near You</h2>
                <p className="subheading text-center text-gray-300">
                  Locate verified blood banks and donation centers across Odisha
                </p>
                <BloodBankMap />
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
                    <p className="text-gray-400">
                      Most government blood banks operate round the clock for emergency situations
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Verified Centers</h3>
                    <p className="text-gray-400">
                      All listed blood banks are government-approved and regularly audited
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
                    <p className="text-gray-400">
                      Get current information about blood availability and donation requirements
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Do Section */}
            <section id="services" className="section-padding">
              <div className="max-w-6xl mx-auto">
                <h2 className="heading text-center">What We Do</h2>
                <div className="grid md:grid-cols-2 gap-12 mt-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-red-500">Emergency Blood Connection</h3>
                    <p className="text-gray-300">Our primary service connects patients with nearby blood donors when traditional blood banks can't meet immediate needs. We ensure quick response times and reliable connections.</p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <ArrowRight className="text-red-500" />
                        <span>Real-time donor matching</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ArrowRight className="text-red-500" />
                        <span>Verified donor network</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ArrowRight className="text-red-500" />
                        <span>24/7 support system</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-red-500">Future Accessibility Tech</h3>
                    <p className="text-gray-300">Beyond blood donation, we're developing innovative accessibility technologies to help people with various needs lead more independent lives.</p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <ArrowRight className="text-red-500" />
                        <span>Assistive technology research</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ArrowRight className="text-red-500" />
                        <span>Accessibility solutions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ArrowRight className="text-red-500" />
                        <span>Innovation in healthcare tech</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section-padding bg-gray-900">
              <div className="max-w-6xl mx-auto">
                <h2 className="heading text-center">Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-12 mt-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <Phone className="text-red-500 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">Emergency Hotline</h3>
                        <p className="text-gray-400">1800-YOGDAN-HELP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="text-red-500 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">Email Us</h3>
                        <p className="text-gray-400">yogdanofficial@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="text-red-500 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-gray-400">NMIET, Bhubaneswar, Odisha</p>
                      </div>
                    </div>
                  </div>
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full p-3 bg-black/50 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    ></textarea>
                    <button className="btn-primary w-full">Send Message</button>
                  </form>
                </div>
              </div>
            </section>

            <Footer />
          </>
        );
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Wave Background */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 to-transparent"></div>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,90.7C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="rgba(185, 28, 28, 0.15)"
          />
          <path 
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="rgba(153, 27, 27, 0.1)"
          />
        </svg>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-0.5" onClick={() => setCurrentPage('home')} style={{cursor: 'pointer'}}>
              <img 
                src="https://images.unsplash.com/vector-1739552270996-6ec7f86badf9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Yogdan Logo" 
                className="w-14 h-14 object-contain"
                onError={(e) => {
                  // Fallback to Heart icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallbackIcon = document.createElement('span');
                  fallbackIcon.innerHTML = `<svg class="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
                  target.parentNode?.insertBefore(fallbackIcon.firstChild!, target);
                }}
              />
              <span className="text-2xl font-bold">Yogdan</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setCurrentPage('about')} 
                className="hover:text-red-500 transition-colors"
              >
                About
              </button>
              <a href="#services" className="hover:text-red-500 transition-colors">Services</a>
              <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
              <button 
                className="hover:text-red-500 transition-colors flex items-center gap-1"
                onClick={() => setCurrentPage('events')}
              >
                <Calendar className="w-4 h-4" />
                Events
              </button>
              <button 
                className="btn-primary"
                onClick={() => setCurrentPage('donors')}
              >
                Find Donors
              </button>
              {isLoggedIn ? (
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors flex items-center gap-2"
                >
                  <UserCircle className="w-6 h-6" />
                  <span>Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage('login')}
                  className="hover:text-red-500 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden bg-black/90 backdrop-blur-sm`}>
          <div className="px-4 py-2 space-y-3">
            <button 
              onClick={() => {
                setCurrentPage('about');
                setIsMenuOpen(false);
              }} 
              className="block w-full text-left py-2 hover:text-red-500 transition-colors"
            >
              About
            </button>
            <a href="#services" className="block py-2 hover:text-red-500 transition-colors">Services</a>
            <a href="#contact" className="block py-2 hover:text-red-500 transition-colors">Contact</a>
            <button 
              className="block w-full text-left py-2 hover:text-red-500 transition-colors"
              onClick={() => {
                setCurrentPage('events');
                setIsMenuOpen(false);
              }}
            >
              Events
            </button>
            <button 
              className="btn-primary w-full"
              onClick={() => {
                setCurrentPage('donors');
                setIsMenuOpen(false);
              }}
            >
              Find Donors
            </button>
            {isLoggedIn ? (
              <button 
                className="block w-full text-left py-2 hover:text-red-500 transition-colors"
                onClick={() => {
                  setCurrentPage('profile');
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  Profile
                </div>
              </button>
            ) : (
              <button 
                className="block w-full text-left py-2 hover:text-red-500 transition-colors"
                onClick={() => {
                  setCurrentPage('login');
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {renderPage()}
    </div>
  );
}

export default App;
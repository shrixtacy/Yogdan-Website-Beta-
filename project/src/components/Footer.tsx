import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-xl font-bold text-white">Yogdan</span>
            </div>
            <p className="text-sm">
              Bridging the gap between blood donors and recipients through innovative technology and compassionate service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-red-500 transition-colors text-sm">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors text-sm">Find Donors</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors text-sm">Blood Donation Events</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors text-sm">Emergency Services</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+91 96924 02032</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-red-500" />
              <span>yogdanofficial@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>NMIET, Bhubaneswar, Odisha</span>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get the App</h3>
            <div className="space-y-3">
              <button className="w-full bg-white text-black rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png" 
                     alt="Get it on Google Play"
                     className="h-6" />
              </button>
              <button className="w-full bg-white text-black rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png" 
                     alt="Download on App Store"
                     className="h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-red-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">© 2024 Yogdan. All rights reserved.</p>
            <p className="text-xs mt-1">Saving lives through technology and compassion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import React from 'react';
import { Heart, Shield, Brain, Users, Target, Award, Globe, Sparkles } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission to Save Lives</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Yogdan is more than just a blood donation platform. We're a community of compassionate individuals
            working together to create a reliable and efficient blood donation network across Odisha.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-red-900/20 to-black p-8 rounded-lg border border-red-900/20">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-300">
              To create a world where no life is lost due to blood shortage, by building the most
              responsive and reliable blood donation network in Odisha, powered by technology and
              driven by compassion.
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-900/20 to-black p-8 rounded-lg border border-red-900/20">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300">
              To bridge the gap between blood donors and recipients through innovative technology,
              ensuring immediate access to safe blood donation services while fostering a culture
              of regular voluntary blood donation.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center p-6 bg-gray-900/50 rounded-lg">
            <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
            <div className="text-gray-400">Active Donors</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 rounded-lg">
            <div className="text-3xl font-bold text-red-500 mb-2">2</div>
            <div className="text-gray-400">Lives Saved</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 rounded-lg">
            <div className="text-3xl font-bold text-red-500 mb-2">Still working...</div>
            <div className="text-gray-400">Partner Hospitals</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 rounded-lg">
            <div className="text-3xl font-bold text-red-500 mb-2">3+</div>
            <div className="text-gray-400">Districts Covered</div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <Heart className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Compassion First</h3>
              <p className="text-gray-400">
                Every action we take is driven by our deep commitment to saving lives and helping
                those in need. We believe in treating every donor and recipient with care and respect.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <Shield className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Safety & Trust</h3>
              <p className="text-gray-400">
                We maintain the highest standards of safety and security in our processes. Every donor
                is verified, and every donation is tracked with utmost care.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <Globe className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
              <p className="text-gray-400">
                We're building a community of lifesavers. Our network spans across Odisha, connecting
                donors with those in need, creating a sustainable ecosystem of support.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">The Team Behind Yogdan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1738467923922-b8f380099ebe?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Dr. Rajesh Kumar"
                className="w-full aspect-square object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="font-semibold text-xl mb-1">Shriyansh Dash</h3>
              <p className="text-red-500 font-medium mb-2">Co-Founder & CEO</p>
              <p className="text-gray-400 text-sm">
                Visionary healthcare leader with 15+ years of experience in medical administration and public health initiatives.
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1738467977475-1d3eb7a27d8c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Dr. Priya Sharma"
                className="w-full aspect-square object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="font-semibold text-xl mb-1">Om Prakash Nahak</h3>
              <p className="text-red-500 font-medium mb-2">Founder & CTO</p>
              <p className="text-gray-400 text-sm">
                Renowned hematologist specializing in blood banking and transfusion medicine with a focus on safety protocols.
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1738467977476-f7f06ff916ee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Amit Patel"
                className="w-full aspect-square object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="font-semibold text-xl mb-1">Aman Singh</h3>
              <p className="text-red-500 font-medium mb-2">Co-Founder & COO</p>
              <p className="text-gray-400 text-sm">
                Innovation expert with extensive experience in healthcare technology and emergency response systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
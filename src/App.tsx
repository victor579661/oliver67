/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  HardHat, 
  Hammer, 
  Building2, 
  Truck, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  ArrowRight,
  CheckCircle2,
  Construction,
  ShieldCheck,
  Award,
  FileText,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'services' | 'projects' | 'about' | 'testimonials' | 'standards' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // SEO: Update document title based on page
    const pageTitles: Record<Page, string> = {
      home: 'Home | SEN 201 (GROUP 15) Construction',
      services: 'Our Services | SEN 201 (GROUP 15) Construction',
      projects: 'Project Gallery | SEN 201 (GROUP 15) Construction',
      about: 'About Us | SEN 201 (GROUP 15) Construction',
      standards: 'Our Standards & FAQ | SEN 201 (GROUP 15) Construction',
      testimonials: 'Client Testimonials | SEN 201 (GROUP 15) Construction',
      contact: 'Contact Us & Quote Request | SEN 201 (GROUP 15) Construction',
    };
    document.title = pageTitles[currentPage];

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const navItems: { label: string; id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Standards', id: 'standards' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setPage={setCurrentPage} />;
      case 'services': return <ServicesPage />;
      case 'projects': return <ProjectsPage />;
      case 'about': return <AboutPage />;
      case 'standards': return <StandardsPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy py-3 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-accent p-2 rounded-sm transform group-hover:rotate-12 transition-transform">
              <Construction className="text-navy w-6 h-6" />
            </div>
            <span className="text-white font-black text-xl tracking-tighter uppercase">
              SEN 201 <span className="text-accent">(GROUP 15)</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-accent ${currentPage === item.id ? 'text-accent' : 'text-white'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-accent text-navy px-6 py-2 font-black uppercase text-sm hover:bg-white transition-colors"
            >
              Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-navy border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left text-lg font-bold uppercase ${currentPage === item.id ? 'text-accent' : 'text-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Construction className="text-accent w-8 h-8" />
                <span className="font-black text-2xl tracking-tighter uppercase">SEN 201 <span className="text-accent">(GROUP 15)</span></span>
              </div>
              <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                Building the future with precision and integrity. We specialize in industrial, commercial, and residential construction projects that stand the test of time.
              </p>
              <div className="flex gap-4">
                {['FB', 'TW', 'IG', 'LI'].map(social => (
                  <button key={social} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-navy hover:border-accent transition-all font-bold text-xs">
                    {social}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button onClick={() => setCurrentPage(item.id)} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest mb-6">Contact Info</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>123 Industrial Way, Steel City, SC 54321</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span>+1 (555) 012-3456</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span>contact@sen201group15.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 SEN 201 (GROUP 15) Construction. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-white">Privacy Policy</button>
              <button className="hover:text-white">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/construction-site/1920/1080" 
            alt="Construction Site" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-accent"></div>
              <span className="text-accent font-black uppercase tracking-[0.3em] text-sm">Industrial Excellence</span>
            </div>
            <h1 className="text-5xl md:text-8xl text-white mb-8 leading-[0.9]">
              Built on <span className="text-accent">Reliability</span> & Precision
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
              We deliver world-class construction solutions with a focus on safety, efficiency, and uncompromising quality. Your vision, our expertise.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setPage('contact')}
                className="bg-accent text-navy px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3 group"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => setPage('projects')}
                className="border-2 border-white text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all"
              >
                View Projects
              </button>
            </div>
          </motion.div>
        </div>

        {/* Geometric Accent */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-accent/10 geometric-bg hidden lg:block"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-navy py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Projects Completed', value: '250+' },
              { label: 'Years Experience', value: '15+' },
              { label: 'Expert Workers', value: '120+' },
              { label: 'Safety Awards', value: '45' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center"
              >
                <div className="text-accent text-4xl md:text-6xl font-black mb-2 font-mono">{stat.value}</div>
                <div className="text-slate-400 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-8 bg-accent"></div>
                <span className="text-steel font-bold uppercase tracking-widest text-sm">What We Do</span>
              </div>
              <h2 className="text-4xl md:text-6xl text-navy">Comprehensive <span className="text-accent">Construction</span> Services</h2>
            </div>
            <button 
              onClick={() => setPage('services')}
              className="text-navy font-black uppercase tracking-widest flex items-center gap-2 group border-b-2 border-accent pb-1"
            >
              All Services <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Building2 />, title: 'Commercial Building', desc: 'Large scale office complexes and retail spaces built with modern efficiency.' },
              { icon: <Truck />, title: 'Infrastructure', desc: 'Roads, bridges, and essential public works engineered for longevity.' },
              { icon: <HardHat />, title: 'Industrial Facilities', desc: 'Specialized manufacturing and warehouse facilities designed for peak performance.' },
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-10 border-l-4 border-accent shadow-sm hover:shadow-xl transition-all geometric-card"
              >
                <div className="text-navy mb-6 bg-white w-16 h-16 flex items-center justify-center shadow-inner">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-xl mb-4 text-navy">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{service.desc}</p>
                <button className="text-accent font-bold uppercase text-xs tracking-widest flex items-center gap-2 group">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage() {
  const services = [
    { 
      icon: <Building2 />, 
      title: 'Commercial Work', 
      desc: 'We deliver high-performance commercial spaces, from modern office complexes to vibrant retail centers, ensuring efficiency and aesthetic excellence.',
      items: ['Office Buildings', 'Retail Centers', 'Hotels', 'Mixed-use Developments'] 
    },
    { 
      icon: <Users />, 
      title: 'Residential Work', 
      desc: 'Creating dream homes with precision. We specialize in luxury custom homes, multi-family residences, and sustainable living spaces.',
      items: ['Custom Homes', 'Apartment Complexes', 'Townhouses', 'Sustainable Housing'] 
    },
    { 
      icon: <Hammer />, 
      title: 'Renovation Work', 
      desc: 'Transforming existing structures into modern masterpieces. Our renovation services focus on structural integrity and contemporary design.',
      items: ['Structural Repairs', 'Modernization', 'Interior Fit-outs', 'Energy Upgrades'] 
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl text-navy mb-6">Our <span className="text-accent">Services</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Specialized construction solutions tailored to your specific needs. We bring expertise to every sector of the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-navy p-10 text-white relative overflow-hidden group flex flex-col h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 -mr-12 -mt-12 rotate-45 transition-transform group-hover:scale-150"></div>
              <div className="text-accent mb-6">{React.cloneElement(service.icon as React.ReactElement, { size: 48 })}</div>
              <h3 className="text-2xl mb-4 font-black uppercase">{service.title}</h3>
              <p className="text-slate-300 mb-8 leading-relaxed flex-grow">
                {service.desc}
              </p>
              <ul className="space-y-3 mb-10">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="bg-accent text-navy px-6 py-3 font-black uppercase text-xs tracking-widest hover:bg-white transition-colors self-start">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Commercial', 'Residential', 'Renovation'];

  const projects = [
    { 
      title: 'Steel City Plaza', 
      category: 'Commercial', 
      beforeImage: 'https://picsum.photos/seed/old-plaza/600/400',
      afterImage: 'https://picsum.photos/seed/new-plaza/600/400',
      timeline: '18 Months',
      summary: 'A complete transformation of a derelict downtown lot into a state-of-the-art 15-story commercial hub with sustainable features.'
    },
    { 
      title: 'Harbor View Lofts', 
      category: 'Residential', 
      beforeImage: 'https://picsum.photos/seed/old-lofts/600/400',
      afterImage: 'https://picsum.photos/seed/new-lofts/600/400',
      timeline: '12 Months',
      summary: 'Luxury residential complex featuring 50 high-end units with panoramic harbor views and integrated smart home technology.'
    },
    { 
      title: 'The Grand Atrium', 
      category: 'Renovation', 
      beforeImage: 'https://picsum.photos/seed/old-atrium/600/400',
      afterImage: 'https://picsum.photos/seed/new-atrium/600/400',
      timeline: '8 Months',
      summary: 'Restoration of a historic 1920s lobby, preserving original architectural details while upgrading systems for modern use.'
    },
    { 
      title: 'Industrial Park Alpha', 
      category: 'Commercial', 
      beforeImage: 'https://picsum.photos/seed/old-park/600/400',
      afterImage: 'https://picsum.photos/seed/new-park/600/400',
      timeline: '24 Months',
      summary: 'Development of a multi-facility industrial logistics center spanning 200,000 square feet of optimized warehouse space.'
    },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl text-navy mb-4">Project <span className="text-accent">Gallery</span></h1>
            <p className="text-slate-600 max-w-xl">Explore our detailed case studies showcasing the full lifecycle of our construction projects.</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 uppercase font-bold text-xs tracking-widest border-2 transition-all ${filter === cat ? 'bg-navy text-white border-navy' : 'border-slate-200 text-slate-500 hover:border-navy hover:text-navy'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-24">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-accent text-navy px-3 py-1 text-xs font-black uppercase tracking-widest">{project.category}</span>
                  <span className="text-slate-400 font-mono text-sm">Timeline: {project.timeline}</span>
                </div>
                <h3 className="text-4xl text-navy">{project.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{project.summary}</p>
                <div className="pt-4">
                  <button className="border-2 border-navy text-navy px-8 py-3 font-black uppercase text-sm tracking-widest hover:bg-navy hover:text-white transition-all">
                    View Full Case Study
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <img 
                    src={project.beforeImage} 
                    alt={`${project.title} - Before construction`} 
                    className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-navy/80 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Before</div>
                </div>
                <div className="relative group">
                  <img 
                    src={project.afterImage} 
                    alt={`${project.title} - After construction`} 
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-navy px-3 py-1 text-[10px] font-black uppercase tracking-widest">After</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-accent"></div>
              <span className="text-steel font-bold uppercase tracking-widest text-sm">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-navy mb-8 leading-tight">Legacy of <span className="text-accent">Excellence</span></h1>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Founded on the principles of hard work and integrity, SEN 201 (GROUP 15) has grown from a small local contractor to a leading force in the construction industry.
            </p>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Our team of dedicated professionals brings decades of collective experience to every project, ensuring that we not only meet but exceed the expectations of our clients. We believe in building more than just structures; we build relationships.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-navy font-black text-xl mb-2 uppercase">Our Mission</h4>
                <p className="text-slate-500 text-sm">To deliver superior construction services through innovation, safety, and sustainable practices.</p>
              </div>
              <div>
                <h4 className="text-navy font-black text-xl mb-2 uppercase">Our Vision</h4>
                <p className="text-slate-500 text-sm">To be the most trusted partner in building the infrastructure of tomorrow.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 geometric-bg -z-10"></div>
            <img 
              src="https://picsum.photos/seed/team/800/1000" 
              alt="Our Team" 
              className="w-full h-auto shadow-2xl border-8 border-white"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 bg-navy p-10 text-white hidden md:block">
              <div className="text-5xl font-black text-accent mb-2">15+</div>
              <div className="uppercase tracking-widest font-bold text-sm">Years of Success</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-20">
          <h2 className="text-3xl text-center mb-16 text-navy">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: 'Integrity', desc: 'We do what we say we will do, every single time.' },
              { title: 'Safety', desc: 'The well-being of our team and clients is our top priority.' },
              { title: 'Quality', desc: 'We never compromise on the standards of our work.' },
              { title: 'Innovation', desc: 'We embrace new technologies to build better and faster.' },
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-1 bg-accent mx-auto mb-6"></div>
                <h3 className="text-lg mb-4 text-navy uppercase font-black">{value.title}</h3>
                <p className="text-slate-500 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StandardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const certifications = [
    { title: 'OSHA 30-Hour Safety', icon: <ShieldCheck className="text-accent" />, desc: 'All our site supervisors are OSHA 30 certified, ensuring the highest safety standards.' },
    { title: 'LEED Gold Certified', icon: <Award className="text-accent" />, desc: 'We are recognized for our commitment to sustainable and green building practices.' },
    { title: 'Licensed General Contractor', icon: <FileText className="text-accent" />, desc: 'Fully licensed and bonded to operate in all major industrial zones.' },
    { title: 'ISO 9001:2015', icon: <CheckCircle2 className="text-accent" />, desc: 'International standard for quality management systems in construction.' },
  ];

  const memberships = [
    'Associated General Contractors of America (AGC)',
    'National Association of Home Builders (NAHB)',
    'U.S. Green Building Council (USGBC)',
    'Construction Management Association of America (CMAA)',
  ];

  const faqs = [
    { 
      q: 'What are your standard payment terms?', 
      a: 'We typically operate on a milestone-based payment schedule. This includes an initial mobilization deposit, followed by progress payments at key stages of the project (e.g., foundation, framing, lock-up), and a final retention payment upon completion.' 
    },
    { 
      q: 'How do you handle project timelines and delays?', 
      a: 'We provide a detailed project schedule during the planning phase. While we strive to meet all deadlines, factors like weather or supply chain issues can cause delays. We maintain transparent communication and provide weekly status reports to keep you informed of any adjustments.' 
    },
    { 
      q: 'What kind of warranties do you provide?', 
      a: 'We offer a comprehensive 1-year warranty on all workmanship and a 10-year structural warranty. Additionally, all materials and appliances installed carry their respective manufacturer warranties, which we help you register and manage.' 
    },
    { 
      q: 'Are you fully insured for large-scale projects?', 
      a: 'Yes, we carry comprehensive general liability insurance, workers compensation, and professional indemnity insurance. We can provide certificates of insurance specifically tailored to your project requirements.' 
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl text-navy mb-6">Our <span className="text-accent">Standards</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Excellence is not an act, but a habit. We adhere to the most rigorous industry standards to ensure safety, quality, and sustainability.
          </p>
        </div>

        {/* Certifications & Licenses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-8">
            <h2 className="text-3xl text-navy flex items-center gap-3">
              <ShieldCheck className="text-accent" /> Certifications & Licenses
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {certifications.map((cert, i) => (
                <div key={i} className="bg-white p-6 border-l-4 border-accent shadow-sm flex gap-4 items-start">
                  <div className="mt-1">{cert.icon}</div>
                  <div>
                    <h4 className="text-navy font-black uppercase text-sm mb-2">{cert.title}</h4>
                    <p className="text-slate-500 text-sm">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl text-navy flex items-center gap-3">
              <Users className="text-accent" /> Industry Memberships
            </h2>
            <div className="bg-navy text-white p-10 geometric-card">
              <p className="text-slate-400 mb-8">
                We are proud members of leading industry organizations, collaborating to advance construction standards and safety nationwide.
              </p>
              <ul className="space-y-4">
                {memberships.map((m, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent w-5 h-5 shrink-0" />
                    <span className="font-bold uppercase tracking-tight text-sm">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 p-12 md:p-20">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <HelpCircle className="text-accent w-10 h-10" />
            <h2 className="text-4xl md:text-5xl text-navy text-center">Frequently Asked <span className="text-accent">Questions</span></h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className="text-navy font-black uppercase tracking-tight text-sm md:text-base group-hover:text-accent transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown className={`text-accent transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsPage() {
  const testimonials = [
    { name: 'Robert Chen', role: 'CEO, TechCorp', text: 'SEN 201 delivered our headquarters ahead of schedule and under budget. Their attention to detail is unmatched in the industry.', avatar: 'RC' },
    { name: 'Sarah Jenkins', role: 'Director, Urban Dev', text: 'Working with Group 15 was a seamless experience. Their project management team kept us informed at every stage of the bridge construction.', avatar: 'SJ' },
    { name: "Michael O'Brian", role: 'Property Manager', text: 'The industrial warehouse they built for us is a masterpiece of efficiency. Highly recommend their specialized industrial services.', avatar: 'MO' },
    { name: 'Elena Rodriguez', role: 'Architect', text: 'As an architect, I appreciate contractors who respect the design intent. SEN 201 executed our vision perfectly.', avatar: 'ER' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl text-navy mb-6">Client <span className="text-accent">Feedback</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Our reputation is built on the satisfaction of our clients. Here is what some of our partners have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-12 border border-slate-100 shadow-sm relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Star size={80} className="text-navy" />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
              </div>
              <p className="text-slate-600 text-xl italic mb-10 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-navy text-accent flex items-center justify-center font-black rounded-full">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-navy font-black uppercase text-sm">{t.name}</h4>
                  <p className="text-slate-400 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { 
      name: 'Robert Chen', 
      role: 'CEO, TechCorp', 
      text: 'SEN 201 delivered our headquarters ahead of schedule and under budget. Their attention to detail is unmatched in the industry.', 
      image: 'https://picsum.photos/seed/person1/200/200',
      rating: 5
    },
    { 
      name: 'Sarah Jenkins', 
      role: 'Director, Urban Dev', 
      text: 'Working with Group 15 was a seamless experience. Their project management team kept us informed at every stage of the bridge construction.', 
      image: 'https://picsum.photos/seed/person2/200/200',
      rating: 5
    },
    { 
      name: "Michael O'Brian", 
      role: 'Property Manager', 
      text: 'The industrial warehouse they built for us is a masterpiece of efficiency. Highly recommend their specialized industrial services.', 
      image: 'https://picsum.photos/seed/person3/200/200',
      rating: 4
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h1 className="text-5xl md:text-7xl text-navy mb-8">Get in <span className="text-accent">Touch</span></h1>
            <p className="text-slate-600 text-lg mb-12">Ready to start your next project? Fill out the form or use our contact details to reach our expert team.</p>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-slate-100 flex items-center justify-center text-navy shrink-0">
                  <MapPin />
                </div>
                <div>
                  <h4 className="text-navy font-black uppercase mb-1">Headquarters</h4>
                  <p className="text-slate-500">123 Industrial Way, Steel City, SC 54321</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-slate-100 flex items-center justify-center text-navy shrink-0">
                  <Phone />
                </div>
                <div>
                  <h4 className="text-navy font-black uppercase mb-1">Phone Number</h4>
                  <p className="text-slate-500">+1 (555) 012-3456</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-slate-100 flex items-center justify-center text-navy shrink-0">
                  <Mail />
                </div>
                <div>
                  <h4 className="text-navy font-black uppercase mb-1">Email Address</h4>
                  <p className="text-slate-500">contact@sen201group15.com</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-navy text-white geometric-card">
              <h4 className="text-accent font-bold uppercase tracking-widest mb-4">Business Hours</h4>
              <div className="flex justify-between border-b border-white/10 py-3">
                <span>Mon - Fri</span>
                <span className="font-mono">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 py-3">
                <span>Saturday</span>
                <span className="font-mono">09:00 - 14:00</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Sunday</span>
                <span className="text-accent uppercase font-bold">Closed</span>
              </div>
            </div>
          </div>

            <div className="space-y-12">
            <div className="bg-white p-10 md:p-16 shadow-2xl border-t-8 border-accent">
              <h3 className="text-3xl text-navy mb-8">Request a Quote</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    <input id="fullName" type="text" className="w-full border-b-2 border-slate-200 py-3 focus:border-navy outline-none transition-colors text-base" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                    <input id="email" type="email" className="w-full border-b-2 border-slate-200 py-3 focus:border-navy outline-none transition-colors text-base" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                    <input id="phone" type="tel" className="w-full border-b-2 border-slate-200 py-3 focus:border-navy outline-none transition-colors text-base" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="projectType" className="text-xs font-bold uppercase tracking-widest text-slate-400">Project Type</label>
                    <select id="projectType" className="w-full border-b-2 border-slate-200 py-3 focus:border-navy outline-none transition-colors bg-transparent text-base">
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Infrastructure</option>
                      <option>Residential</option>
                      <option>Renovation</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-xs font-bold uppercase tracking-widest text-slate-400">Project Location</label>
                    <input id="location" type="text" className="w-full border-b-2 border-slate-200 py-3 focus:border-navy outline-none transition-colors text-base" placeholder="City, State" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-xs font-bold uppercase tracking-widest text-slate-400">Estimated Budget</label>
                    <select id="budget" className="w-full border-b-2 border-slate-200 py-3 focus:border-navy outline-none transition-colors bg-transparent text-base">
                      <option>$50k - $100k</option>
                      <option>$100k - $500k</option>
                      <option>$500k - $1M</option>
                      <option>$1M+</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                  <textarea id="message" rows={4} className="w-full border-b-2 border-slate-200 py-3 focus:border-navy outline-none transition-colors resize-none text-base" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="w-full bg-navy text-white py-5 font-black uppercase tracking-widest hover:bg-accent hover:text-navy transition-all shadow-lg active:scale-95">
                  Send Request
                </button>
              </form>
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="w-full h-[400px] bg-slate-200 relative overflow-hidden group shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.41941548468254!3d37.77492957975922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050c58!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2s!4v1647891234567!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-8 border-white/20"></div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32 pt-20 border-t border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-navy mb-4">Client <span className="text-accent">Success</span></h2>
            <p className="text-slate-500 uppercase tracking-widest font-bold text-sm">Trusted by Industry Leaders</p>
          </div>

          <div className="max-w-4xl mx-auto relative px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="bg-navy text-white p-12 md:p-20 relative geometric-card"
              >
                <div className="absolute top-10 left-10 opacity-10">
                  <Star size={120} className="text-accent fill-accent" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-8">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-accent text-accent" />
                    ))}
                  </div>
                  
                  <p className="text-2xl md:text-3xl italic mb-12 leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <img 
                      src={testimonials[activeTestimonial].image} 
                      alt={testimonials[activeTestimonial].name}
                      className="w-20 h-20 rounded-full border-4 border-accent object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-tight">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-accent font-bold uppercase tracking-widest text-xs">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-4 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 transition-all ${activeTestimonial === i ? 'bg-accent w-10' : 'bg-slate-300 hover:bg-navy'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

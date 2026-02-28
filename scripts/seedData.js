require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Import models
const Hero = require('../models/Hero');
const Team = require('../models/Team');
const WhyChooseUs = require('../models/WhyChooseUs');
const Service = require('../models/Service');
const Pricing = require('../models/Pricing');
const Location = require('../models/Location');

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log('Clearing existing data...');
    
    // Clear existing data
    await Hero.deleteMany({});
    await Team.deleteMany({});
    await WhyChooseUs.deleteMany({});
    await Service.deleteMany({});
    await Pricing.deleteMany({});
    await Location.deleteMany({});

    console.log('Seeding Hero Section...');
    // Seed Hero Section with current data
    await Hero.create({
      logoUrl: "https://via.placeholder.com/150x50.png?text=LOGO",
      carouselImages: [
        {
          url: 'https://images.unsplash.com/photo-1676803704427-496b1de33baa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: 'Massage Therapy Session 1'
        },
        {
          url: 'https://images.unsplash.com/photo-1611073615830-9f76902c10fe?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: 'Massage Therapy Session 2'
        },
        {
          url: 'https://images.unsplash.com/photo-1707355274813-633939fbc8e0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: 'Massage Therapy Session 3'
        }
      ],
      floatingPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          x: '10%',
          y: '20%',
          size: 120,
          delay: 0
        },
        {
          url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          x: '85%',
          y: '35%',
          size: 90,
          delay: 1
        },
        {
          url: 'https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          x: '80%',
          y: '70%',
          size: 80,
          delay: 2
        },
        {
          url: 'https://images.unsplash.com/photo-1611073615830-9f76902c10fe?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          x: '15%',
          y: '75%',
          size: 100,
          delay: 1.5
        },
        {
          url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          x: '80%',
          y: '10%',
          size: 70,
          delay: 0.5
        },
        {
          url: 'https://images.unsplash.com/photo-1675159364615-38e1f6b62282?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          x: '5%',
          y: '45%',
          size: 85,
          delay: 2.5
        }
      ],
      mainHeading: "Premium Massage",
      subHeading: "Therapy",
      description: "Experience ultimate relaxation and rejuvenation with our expert massage therapists in the heart of London",
      buttonTexts: ["Book Now", "Learn More"]
    });

    console.log('Seeding Team Members...');
    // Seed Team Members with current data
    await Team.create([
      {
        name: 'Sarah Mitchell',
        role: 'Lead Massage Therapist',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'With over 10 years of experience in therapeutic massage, Sarah specializes in deep tissue and Swedish massage techniques. Her holistic approach combines traditional methods with modern wellness practices to provide personalized treatments that address both physical and mental well-being. Sarah is certified in prenatal massage and has extensive training in sports injury rehabilitation.',
        specialties: ['Deep Tissue', 'Swedish', 'Prenatal', 'Sports Therapy'],
        experience: '10+ years',
        order: 0
      },
      {
        name: 'James Chen',
        role: 'Senior Wellness Specialist',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'James brings a unique blend of Eastern and Western massage techniques to his practice. Trained in traditional Chinese medicine and modern therapeutic massage, he specializes in acupressure, reflexology, and hot stone therapy. His expertise in treating chronic pain and stress-related conditions has helped countless clients achieve lasting relief and improved quality of life.',
        specialties: ['Acupressure', 'Reflexology', 'Hot Stone', 'Chinese Medicine'],
        experience: '8+ years',
        order: 1
      },
      {
        name: 'Emma Williams',
        role: 'Relaxation Expert',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Emma is renowned for her gentle yet effective approach to relaxation massage. Her expertise in aromatherapy, lymphatic drainage, and craniosacral therapy creates deeply restorative experiences for her clients. With a background in psychology and wellness coaching, Emma understands the intricate connection between mind and body, tailoring each session to promote profound relaxation and healing.',
        specialties: ['Aromatherapy', 'Lymphatic Drainage', 'Craniosacral', 'Wellness Coaching'],
        experience: '6+ years',
        order: 2
      }
    ]);

    console.log('Seeding Why Choose Us...');
    // Seed Why Choose Us
    await WhyChooseUs.create({
      mainImage: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      mainHeading: "Your Wellness Journey Begins Here",
      mainDescription: "At our massage therapy center, we combine ancient healing techniques with modern wellness practices to provide you with an unparalleled relaxation experience. Our expert therapists are dedicated to helping you achieve optimal physical and mental well-being.",
      features: [
        {
          title: "Certified Professionals",
          description: "All our therapists are fully certified and continuously trained in the latest massage techniques.",
          icon: "check"
        },
        {
          title: "Flexible Scheduling",
          description: "Book appointments at your convenience with our extended hours from 9 AM to 2 AM.",
          icon: "clock"
        },
        {
          title: "Personalized Care",
          description: "Each session is tailored to your specific needs and preferences for maximum benefit.",
          icon: "heart"
        },
        {
          title: "Mobile Service",
          description: "Enjoy professional massage therapy in the comfort of your own home or hotel.",
          icon: "location"
        }
      ],
      ctaHeading: "Ready to Transform Your Well-being?",
      ctaDescription: "Join hundreds of satisfied clients who have discovered the healing power of professional massage therapy."
    });

    console.log('Seeding Services...');
    // Seed Services
    await Service.create([
      {
        name: 'Swedish Massage',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Relaxing full-body massage using long, smooth strokes to improve circulation and reduce stress.',
        order: 0
      },
      {
        name: 'Deep Tissue',
        image: 'https://images.unsplash.com/photo-1662467191034-9cc663f1de92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Therapeutic massage targeting deeper muscle layers to release chronic tension and alleviate pain.',
        order: 1
      },
      {
        name: 'Couples massage',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Romantic side-by-side massage experience for two people to enjoy relaxation together in a serene setting.',
        order: 2
      },
      {
        name: 'Aromatherapy',
        image: 'https://images.unsplash.com/photo-1598556146869-aeb261893c35?q=80&w=1197&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Essential oil massage combining therapeutic touch with aromatic benefits for mind and body.',
        order: 3
      },
      {
        name: 'Sports Massage',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Specialized techniques for athletes to prevent injury and enhance performance and recovery.',
        order: 4
      }
    ]);

    console.log('Seeding Pricing...');
    // Seed Pricing
    await Pricing.create({
      travelFeePackage: {
        title: "Price from 9:00 AM until 11.00 PM",
        originalPrice: 90,
        discountedPrice: 70,
        options: [
          { duration: "60 MINUTE", price: "£70.00 +15 TRAVEL FEE" },
          { duration: "90 MINUTE", price: "£90.00 +15 TRAVEL FEE" },
          { duration: "120 MINUTE", price: "£110.00 +15 TRAVEL FEE" }
        ]
      },
      uberPackage: {
        title: "Price from 11.00 PM until 2:00 AM",
        originalPrice: 130,
        discountedPrice: 110,
        options: [
          { duration: "60 MINUTE", price: "£110+UBER" },
          { duration: "90 MINUTE", price: "£145+UBER" },
          { duration: "120 MINUTE", price: "£180+UBER" }
        ]
      },
      safetyNotice: {
        heading: "**For the safety and well-being of our therapists...",
        content: "we kindly request that all late bookings who finishing after 10.30 pm will have to include Uber for their return journey home. Our top priority is to ensure therapists safety due to the late hours and allow them to continue providing exceptional service with peace of mind. We appreciate your understanding and cooperation in helping us maintain a secure and respectful environment for everyone involved."
      }
    });

    console.log('Seeding Location...');
    // Seed Location
    await Location.create({
      backgroundImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: {
        line1: "United Kingdom",
        line2: "London area"
      },
      contact: {
        phone: "+44 7400 415437",
        email: "info@massagetherapy.co.uk"
      },
      hours: "Monday - Sunday: 9:00 AM - 2:00 AM",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.432384928423!2d-0.122920684423873!3d51.51121371806905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ca7d2d3b7b%3A0x4f3b5b5b5b5b5b5b!2sCovent%20Garden%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890"
    });

    console.log('✅ Database seeded successfully!');
    console.log('📊 Summary:');
    console.log('- Hero section: 1 document');
    console.log('- Team members: 3 documents');
    console.log('- Why Choose Us: 1 document');
    console.log('- Services: 5 documents');
    console.log('- Pricing: 1 document');
    console.log('- Location: 1 document');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

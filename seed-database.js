require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://your_connection_string')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Define Hero Schema (inline for standalone script)
const HeroSchema = new mongoose.Schema({
  logoUrl: { type: String },
  carouselImages: [{
    url: { type: String, required: true },
    alt: { type: String, required: true }
  }],
  floatingPhotos: [{
    url: { type: String, required: true },
    x: { type: String, required: true },
    y: { type: String, required: true },
    size: { type: Number, required: true },
    delay: { type: Number, required: true }
  }],
  mainHeading: { type: String, required: true },
  subHeading: { type: String, required: true },
  description: { type: String, required: true },
  buttonTexts: [{ type: String }]
}, { timestamps: true });

// Define Team Schema (inline for standalone script)
const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  specialties: [{ type: String, required: true }],
  experience: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Define Service Schema (inline for standalone script)
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Define Pricing Schema (inline for standalone script)
const PricingSchema = new mongoose.Schema({
  travelFee: {
    title: { type: String, required: true },
    price: { type: String, required: true },
    options: [{ type: String }],
    safetyNotice: { type: String }
  },
  uberPackage: {
    title: { type: String, required: true },
    price: { type: String, required: true },
    options: [{ type: String }],
    safetyNotice: { type: String }
  }
}, { timestamps: true });

// Define Location Schema (inline for standalone script)
const LocationSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  hours: { type: String, required: true },
  googleMapsEmbedUrl: { type: String, required: true }
}, { timestamps: true });

// Define WhyChooseUs Schema (inline for standalone script)
const WhyChooseUsSchema = new mongoose.Schema({
  mainImage: { type: String, required: true },
  mainHeading: { type: String, required: true },
  mainDescription: { type: String, required: true },
  features: [{
    title: { type: String, required: true },
    description: { type: String, required: true }
  }]
}, { timestamps: true });

// Create models
const Hero = mongoose.model('Hero', HeroSchema);
const Team = mongoose.model('Team', TeamSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Pricing = mongoose.model('Pricing', PricingSchema);
const Location = mongoose.model('Location', LocationSchema);
const WhyChooseUs = mongoose.model('WhyChooseUs', WhyChooseUsSchema);

// Seed data function
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    await Hero.deleteMany({});
    await Team.deleteMany({});
    await Service.deleteMany({});
    await Pricing.deleteMany({});
    await Location.deleteMany({});
    await WhyChooseUs.deleteMany({});
    console.log('Cleared existing data');
    
    // Seed Hero Section
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
        { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '10%', y: '20%', size: 120, delay: 0 },
        { url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '85%', y: '35%', size: 90, delay: 1 },
        { url: 'https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '80%', y: '70%', size: 80, delay: 2 },
        { url: 'https://images.unsplash.com/photo-1611073615830-9f76902c10fe?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '15%', y: '75%', size: 100, delay: 1.5 },
        { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '80%', y: '10%', size: 70, delay: 0.5 },
        { url: 'https://images.unsplash.com/photo-1675159364615-38e1f6b62282?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '5%', y: '45%', size: 85, delay: 2.5 }
      ],
      mainHeading: "Premium Massage",
      subHeading: "Therapy",
      description: "Experience ultimate relaxation and rejuvenation with our expert massage therapists in the heart of London",
      buttonTexts: ["Book Now", "Learn More"]
    });
    console.log('✅ Hero section seeded');
    
    // Seed Team Members
    await Team.create([
      {
        name: 'Sarah Mitchell',
        role: 'Lead Massage Therapist',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'With over 10 years of experience in therapeutic massage, Sarah specializes in deep tissue and Swedish massage techniques. Her holistic approach combines traditional methods with modern wellness practices to provide personalized treatments that address both physical and mental well-being.',
        specialties: ['Deep Tissue', 'Swedish', 'Prenatal', 'Sports Therapy'],
        experience: '10+ years',
        order: 1
      },
      {
        name: 'James Chen',
        role: 'Senior Wellness Specialist',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'James brings a unique blend of Eastern and Western massage techniques to his practice. Trained in traditional Chinese medicine and modern therapeutic massage, he specializes in acupressure, reflexology, and hot stone therapy.',
        specialties: ['Acupressure', 'Reflexology', 'Hot Stone', 'Chinese Medicine'],
        experience: '8+ years',
        order: 2
      },
      {
        name: 'Emma Williams',
        role: 'Relaxation Expert',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Emma is renowned for her gentle yet effective approach to relaxation massage. Her expertise in aromatherapy, lymphatic drainage, and craniosacral therapy creates deeply restorative experiences for her clients.',
        specialties: ['Aromatherapy', 'Lymphatic Drainage', 'Craniosacral', 'Wellness Coaching'],
        experience: '6+ years',
        order: 3
      }
    ]);
    console.log('✅ Team members seeded');
    
    // Seed Services
    await Service.create([
      {
        name: 'Swedish Massage',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Relaxing full-body massage using long, smooth strokes to improve circulation and reduce stress.',
        order: 1
      },
      {
        name: 'Deep Tissue',
        image: 'https://images.unsplash.com/photo-1662467191034-9cc663f1de92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Therapeutic massage targeting deeper muscle layers to release chronic tension and alleviate pain.',
        order: 2
      },
      {
        name: 'Couples massage',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Romantic side-by-side massage experience for two people to enjoy relaxation together in a serene setting.',
        order: 3
      },
      {
        name: 'Aromatherapy',
        image: 'https://images.unsplash.com/photo-1598556146869-aeb261893c35?q=80&w=1197&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Essential oil massage combining therapeutic touch with aromatic benefits for mind and body.',
        order: 4
      },
      {
        name: 'Sports Massage',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Specialized techniques for athletes to prevent injury and enhance performance and recovery.',
        order: 5
      }
    ]);
    console.log('✅ Services seeded');
    
    // Seed Pricing
    await Pricing.create({
      // Simple structure for admin dashboard
      travelFee: {
        title: 'Travel Fee',
        price: '£70',
        options: [
          '60 MINUTE - £70.00 +15 TRAVEL FEE',
          '90 MINUTE - £90.00 +15 TRAVEL FEE',
          '120 MINUTE - £110.00 +15 TRAVEL FEE'
        ],
        safetyNotice: '* MASSAGE TRAVEL FEE ARE REQUIRED'
      },
      uberPackage: {
        title: 'Uber Package',
        price: '£110',
        options: [
          '60 MINUTE - £110+UBER',
          '90 MINUTE - £145+UBER',
          '120 MINUTE - £180+UBER'
        ],
        safetyNotice: '* MASSAGE TRAVEL FEE ARE REQUIRED'
      },
      // Complex structure for home page
      travelFeePackage: {
        title: 'Travel Fee',
        timeRange: 'Price from 9:00 AM until 11.00 PM',
        originalPrice: 90,
        discountedPrice: 70,
        options: [
          { duration: '60 MINUTE', price: '£70.00 +15 TRAVEL FEE' },
          { duration: '90 MINUTE', price: '£90.00 +15 TRAVEL FEE' },
          { duration: '120 MINUTE', price: '£110.00 +15 TRAVEL FEE' }
        ]
      },
      uberPackageComplex: {
        title: 'Uber Package',
        timeRange: 'Price from 11.00 PM until 2:00 AM',
        originalPrice: 130,
        discountedPrice: 110,
        options: [
          { duration: '60 MINUTE', price: '£110+UBER' },
          { duration: '90 MINUTE', price: '£145+UBER' },
          { duration: '120 MINUTE', price: '£180+UBER' }
        ]
      },
      safetyNotice: {
        heading: '* MASSAGE TRAVEL FEE ARE REQUIRED',
        content: 'All massage sessions require travel fee payment'
      }
    });
    console.log('✅ Pricing seeded');
    
    // Seed Location
    await Location.create({
      backgroundImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: 'United Kingdom\nLondon area',
      phone: '+44 7400 415437',
      email: 'info@massagetherapy.co.uk',
      hours: 'Monday - Sunday: 9:00 AM - 2:00 AM',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.432384928423!2d-0.122920684423873!3d51.51121371806905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ca7d2d3b7b%3A0x4f3b5b5b5b5b5b5b!2sCovent%20Garden%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890'
    });
    console.log('✅ Location seeded');
    
    // Seed WhyChooseUs
    await WhyChooseUs.create({
      mainImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      mainHeading: 'Why Choose Us',
      mainDescription: 'Experience the difference with our premium massage therapy services',
      subHeading: 'Your Wellness Journey Begins Here',
      subDescription: 'At our massage therapy center, we combine ancient healing techniques with modern wellness practices to provide you with an unparalleled relaxation experience. Our expert therapists are dedicated to helping you achieve optimal physical and mental well-being.',
      features: [
        {
          title: 'Certified Professionals',
          description: 'All our therapists are fully certified and continuously trained in the latest massage techniques.'
        },
        {
          title: 'Flexible Scheduling',
          description: 'Book appointments at your convenience with our extended hours from 9 AM to 2 AM.'
        },
        {
          title: 'Personalized Care',
          description: 'Each session is tailored to your specific needs and preferences for maximum benefit.'
        },
        {
          title: 'Mobile Service',
          description: 'Enjoy our professional massage therapy in the comfort of your own home.'
        }
      ]
    });
    console.log('✅ WhyChooseUs seeded');
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('Your website now has all the content from the frontend!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeding
seedDatabase();

const mongoose = require('mongoose');
require('dotenv').config();

// Import the Pricing model
const Pricing = require('./models/Pricing');

async function seedPricingData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete any existing pricing data
    await Pricing.deleteMany({});
    console.log('🗑️  Cleared existing pricing data');

    // Create pricing data that matches exactly what's on the home page
    const pricingData = new Pricing({
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
      
      // Complex structure for home page (exact match)
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

    // Save the pricing data
    await pricingData.save();
    console.log('✅ Pricing data seeded successfully!');
    console.log('📊 Travel Fee Package: £70 (was £90)');
    console.log('🚗 Uber Package: £110 (was £130)');
    console.log('🎯 Both admin dashboard and home page will now show the same prices');

    // Verify the data was saved
    const savedPricing = await Pricing.findOne();
    console.log('🔍 Verification:');
    console.log('  - Travel Fee (Simple):', savedPricing.travelFee.price);
    console.log('  - Travel Fee (Complex):', savedPricing.travelFeePackage.discountedPrice);
    console.log('  - Uber Package (Simple):', savedPricing.uberPackage.price);
    console.log('  - Uber Package (Complex):', savedPricing.uberPackageComplex.discountedPrice);

  } catch (error) {
    console.error('❌ Error seeding pricing data:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seed function
seedPricingData();

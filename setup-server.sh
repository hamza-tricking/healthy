#!/bin/bash

echo "Creating missing directories..."
mkdir -p /root/healthy/healthy/models
mkdir -p /root/healthy/healthy/config
mkdir -p /root/healthy/healthy/scripts

echo "Directories created. Now you need to upload the files:"
echo ""
echo "Upload these files to /root/healthy/healthy/models/:"
echo "  - Hero.js"
echo "  - Team.js"
echo "  - WhyChooseUs.js"
echo "  - Service.js"
echo "  - Pricing.js"
echo "  - Location.js"
echo ""
echo "Upload these files to /root/healthy/healthy/config/:"
echo "  - db.js"
echo ""
echo "Upload these files to /root/healthy/healthy/scripts/:"
echo "  - seedData.js"
echo ""
echo "Then restart the server:"
echo "pm2 restart healthy-backend"

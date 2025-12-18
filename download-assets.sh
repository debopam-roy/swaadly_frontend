#!/bin/bash

# Navigate to project root
cd /Users/mapobed/Documents/Personal/swaadly/swaadly_frontend

# Create images directory
mkdir -p public/images

echo "Downloading homepage image assets..."

# Download all assets
curl -s http://localhost:3845/assets/a052dc5dd9486f0fc64119ae3864b251e195aa8b.svg -o public/images/hero-products.svg
curl -s http://localhost:3845/assets/c84d0f41d4ca997c4368b63e78b9c8203e6f8f74.svg -o public/images/decorative-line-left.svg
curl -s http://localhost:3845/assets/7fb48d324ef3adc160324e23f204b4edb5885404.svg -o public/images/decorative-line-right.svg
curl -s http://localhost:3845/assets/2776fce20fca81af527eaa5f2eed124f3feeddf3.svg -o public/images/wave-pattern.svg
curl -s http://localhost:3845/assets/931d5c8aff87e4052b4f7bee7ece3ea30397de84.svg -o public/images/chevron-right.svg
curl -s http://localhost:3845/assets/733f65356e07f1193a4768b82ce91bbb6d7b93fb.png -o public/images/product-classic.png
curl -s http://localhost:3845/assets/8097fde46e72534cc47a03d3f93aa1b68f1af251.svg -o public/images/star-filled.svg
curl -s http://localhost:3845/assets/c103538a2afbf0240b5add4c03d488ee9293209d.svg -o public/images/star-empty.svg
curl -s http://localhost:3845/assets/d8ee5cb519ab32ac8388490d3fd3b7ed98290b57.png -o public/images/peanut-sandwich.png
curl -s http://localhost:3845/assets/29db8dfe4d0e588cdff7637f3083dc193fe3fa56.svg -o public/images/wave-top.svg
curl -s http://localhost:3845/assets/e0534a632aaae14134e5214c9baafe29960542a1.svg -o public/images/wave-bottom.svg
curl -s http://localhost:3845/assets/0a344e8d19b9d835d1444e2b8eafe8b0c55a0c69.png -o public/images/promise-image.png
curl -s http://localhost:3845/assets/e3bbc41f206e6563051d3d2e18ec392346847351.svg -o public/images/decorative-circle.svg

echo "All images downloaded successfully to public/images/"
echo "Total files downloaded: $(ls -1 public/images/ | wc -l)"

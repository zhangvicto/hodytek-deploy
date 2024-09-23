// updateData.ts
import fs from 'fs';
import path from 'path';

const fetchData = async () => {
  // Replace with your data fetching logic
  const response = await fetch('https://script.google.com/macros/s/AKfycbxp3EkcWX8Z6Ytw5_ULbWjrWxm6qsHkQDz3KlSSq5r5jF1MfwsPcYzIIIeZJ4DIYBc/exec');
  const data = await response.json();

  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), '/public/data.json');

  // Write data to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const readImagesDir = async () => {
  // Path to the images directory
  const logosDirectory = path.join(process.cwd(), '/public/images/brand-logos');
  // Read all files in the directory
  const logoFiles = fs.readdirSync(logosDirectory).filter((file) =>
    /\.(png|jpe?g|svg|gif)$/i.test(file)
  );
  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), '/public/images.json');
  // Generate JSON data
  fs.writeFileSync(filePath, JSON.stringify(logoFiles, null, 2), 'utf-8');
}

fetchData()
  .then(() => console.log('Data has been updated successfully'))
  .catch((error) => console.error('Error updating data:', error));

readImagesDir()
  .then(() => console.log('Image JSON has been updated successfully'))
  .catch((error) => console.error('Error updating images JSON:', error));

import mongoose from 'mongoose';
import app from './app';
import envConfig from './config/env.config';

async function main() {
  try {
    console.log(envConfig)
     await mongoose.connect(envConfig.url.database as string);
    console.log('--database connected successfully');
    app.listen(5000, async () => {
      console.log('Server is running on port:5000');
    });
  } catch (error) {
    console.log(error);
  }
}

main();

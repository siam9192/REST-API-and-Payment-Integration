import mongoose from 'mongoose';
import envConfig from '../config/env.config';
import userService from '../modules/user/user.service';
import { sampleProducts } from './sample-data/projects.data';
import productService from '../modules/product/product.service';
import { sampleUsers } from './sample-data/users.data';

async function clearAllCollections() {
  const collections = mongoose.connection.collections;

  const promises = Object.keys(collections).map((collectionName) => {
    console.log(`Clearing collection: ${collectionName}`);
    return mongoose.connection.collections[collectionName].deleteMany({});
  });

  await Promise.all(promises);
  console.log('All collections cleared.');
}

async function main() {
  try {
    console.log('--- Script started ---');
    await mongoose.connect(envConfig.url.database as string);
    console.log('Database connected');

    //Clear full database
    await clearAllCollections();

    console.log('Creating sample users and  products ');
    //Creating user and products
    console.log('Creating users...');
    await Promise.all([
      Promise.all(sampleUsers.map((u) => userService.createUser(u as any))),
      Promise.all(sampleProducts.map((p) => productService.createProduct(p))),
    ]);

    console.log('--- Script run successfully ---');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected');
    process.exit(0);
  }
}

main();

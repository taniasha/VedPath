// ─── Seed Script for VedPath Database ───
// Run: node seed.js
// This will populate Books, Trending, and Audio collections

require('dotenv').config();
const mongoose = require('mongoose');
const { Book, Trending } = require('./models/models');
const { Audio } = require('./models/audioModels');

const books = [
  { title: 'Bhagavad Gita As It Is', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png', price: 299 },
  { title: 'The Upanishads', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', price: 349 },
  { title: 'Rig Veda – Complete Edition', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png', price: 499 },
  { title: 'Mahabharata (Abridged)', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png', price: 599 },
  { title: 'Ramayana by Valmiki', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', price: 449 },
  { title: 'Yoga Sutras of Patanjali', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png', price: 259 },
  { title: 'Atharva Veda', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png', price: 379 },
  { title: 'Sama Veda', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', price: 319 },
  { title: 'Vishnu Purana', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png', price: 429 },
  { title: 'Shiva Purana', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png', price: 389 },
  { title: 'Devi Mahatmyam', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', price: 279 },
  { title: 'Brahma Sutras', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png', price: 459 },
];

const trendings = [
  { title: 'Bhagavad Gita As It Is', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png', price: 299, author: 'A.C. Bhaktivedanta Swami', rating: 5 },
  { title: 'The Upanishads', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', price: 349, author: 'Eknath Easwaran', rating: 5 },
  { title: 'Yoga Sutras of Patanjali', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png', price: 259, author: 'Sri Swami Satchidananda', rating: 4 },
  { title: 'Ramayana', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png', price: 449, author: 'Valmiki', rating: 5 },
  { title: 'Shiva Purana', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', price: 389, author: 'Ved Vyasa', rating: 4 },
  { title: 'Devi Mahatmyam', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png', price: 279, author: 'Markandeya', rating: 4 },
  { title: 'Rig Veda', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png', price: 499, author: 'Ancient Rishis', rating: 5 },
  { title: 'Vishnu Purana', image: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', price: 429, author: 'Parashara', rating: 4 },
];

const audios = [
  { title: 'Gayatri Mantra', scripture: 'Rig Veda', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'Om Namah Shivaya', scripture: 'Shiva Purana', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { title: 'Maha Mrityunjaya Mantra', scripture: 'Rig Veda', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { title: 'Hanuman Chalisa', scripture: 'Ramcharitmanas', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { title: 'Vishnu Sahasranama', scripture: 'Mahabharata', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { title: 'Durga Kavach', scripture: 'Markandeya Purana', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { title: 'Lalitha Sahasranama', scripture: 'Brahmanda Purana', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { title: 'Shri Sukta', scripture: 'Rig Veda', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
];

async function seed() {
  try {
    console.log(' Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' Connected!\n');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Book.deleteMany({});
    await Trending.deleteMany({});
    await Audio.deleteMany({});
    console.log('   ✓ Collections cleared\n');

    // Insert seed data
    console.log(' Seeding Books...');
    const insertedBooks = await Book.insertMany(books);
    console.log(`   ✓ ${insertedBooks.length} books inserted`);

    console.log(' Seeding Trending Books...');
    const insertedTrending = await Trending.insertMany(trendings);
    console.log(`  ${insertedTrending.length} trending books inserted`);

    console.log(' Seeding Audio...');
    const insertedAudio = await Audio.insertMany(audios);
    console.log(` ${insertedAudio.length} audio tracks inserted`);

    console.log('\n Database seeded successfully!');
    console.log('   Books:', insertedBooks.length);
    console.log('   Trending:', insertedTrending.length);
    console.log('   Audio:', insertedAudio.length);

  } catch (err) {
    console.error(' Seed error:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed.');
  }
}

seed();

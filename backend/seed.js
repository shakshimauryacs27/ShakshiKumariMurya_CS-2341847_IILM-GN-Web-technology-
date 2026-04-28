const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_CONN);
    console.log('Connected to database for seeding');

    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Seed users with complementary skills
    const users = [
      {
        name: 'Alex Johnson',
        email: 'alex@gmail.com',
        password: 'password123',
        bio: 'Full-stack developer passionate about React and Node.js',
        skillsToTeach: [
          { skillName: 'react', experienceLevel: 'expert' },
          { skillName: 'node.js', experienceLevel: 'intermediate' },
          { skillName: 'javascript', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['python', 'data science', 'photography', 'marketing'],
        location: 'Mumbai',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Sarah Chen',
        email: 'sarah@gmail.com',
        password: 'password123',
        bio: 'Data scientist and Python expert',
        skillsToTeach: [
          { skillName: 'python', experienceLevel: 'expert' },
          { skillName: 'data science', experienceLevel: 'intermediate' },
          { skillName: 'machine learning', experienceLevel: 'intermediate' }
        ],
        skillsToLearn: ['react', 'ui/ux design', 'marketing', 'web development'],
        location: 'Delhi',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Mike Rodriguez',
        email: 'mike@gmail.com',
        password: 'password123',
        bio: 'UI/UX designer with marketing skills',
        skillsToTeach: [
          { skillName: 'ui/ux design', experienceLevel: 'expert' },
          { skillName: 'marketing', experienceLevel: 'intermediate' },
          { skillName: 'figma', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['photography', 'python', 'react', 'content writing'],
        location: 'Mumbai',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Emma Wilson',
        email: 'emma@gmail.com',
        password: 'password123',
        bio: 'Professional photographer and content creator',
        skillsToTeach: [
          { skillName: 'photography', experienceLevel: 'expert' },
          { skillName: 'content writing', experienceLevel: 'intermediate' },
          { skillName: 'social media', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['web development', 'ui/ux design', 'marketing', 'video editing'],
        location: 'Delhi',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'David Kim',
        email: 'david@gmail.com',
        password: 'password123',
        bio: 'Web developer and JavaScript enthusiast',
        skillsToTeach: [
          { skillName: 'web development', experienceLevel: 'expert' },
          { skillName: 'javascript', experienceLevel: 'intermediate' },
          { skillName: 'html/css', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['python', 'data science', 'photography', 'marketing'],
        location: 'Bangalore',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Lisa Thompson',
        email: 'lisa@gmail.com',
        password: 'password123',
        bio: 'Marketing specialist and social media expert',
        skillsToTeach: [
          { skillName: 'marketing', experienceLevel: 'expert' },
          { skillName: 'social media', experienceLevel: 'intermediate' },
          { skillName: 'content writing', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['react', 'python', 'photography', 'ui/ux design'],
        location: 'Pune',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'James Brown',
        email: 'james@gmail.com',
        password: 'password123',
        bio: 'Python developer and machine learning practitioner',
        skillsToTeach: [
          { skillName: 'python', experienceLevel: 'expert' },
          { skillName: 'machine learning', experienceLevel: 'intermediate' },
          { skillName: 'data analysis', experienceLevel: 'intermediate' }
        ],
        skillsToLearn: ['react', 'web development', 'photography', 'marketing'],
        location: 'Mumbai',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Anna Davis',
        email: 'anna@gmail.com',
        password: 'password123',
        bio: 'React developer and frontend specialist',
        skillsToTeach: [
          { skillName: 'react', experienceLevel: 'expert' },
          { skillName: 'javascript', experienceLevel: 'intermediate' },
          { skillName: 'frontend development', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['python', 'data science', 'photography', 'marketing'],
        location: 'Delhi',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Robert Lee',
        email: 'robert@gmail.com',
        password: 'password123',
        bio: 'Full-stack developer and photography enthusiast',
        skillsToTeach: [
          { skillName: 'web development', experienceLevel: 'expert' },
          { skillName: 'photography', experienceLevel: 'intermediate' },
          { skillName: 'node.js', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['python', 'machine learning', 'marketing', 'ui/ux design'],
        location: 'Chennai',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Maria Garcia',
        email: 'maria@gmail.com',
        password: 'password123',
        bio: 'Data scientist and marketing strategist',
        skillsToTeach: [
          { skillName: 'data science', experienceLevel: 'expert' },
          { skillName: 'marketing', experienceLevel: 'intermediate' },
          { skillName: 'python', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['react', 'photography', 'ui/ux design', 'content writing'],
        location: 'Delhi',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Chris Taylor',
        email: 'chris@gmail.com',
        password: 'password123',
        bio: 'UI/UX designer and content creator',
        skillsToTeach: [
          { skillName: 'ui/ux design', experienceLevel: 'expert' },
          { skillName: 'content writing', experienceLevel: 'intermediate' },
          { skillName: 'figma', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['python', 'web development', 'photography', 'marketing'],
        location: 'Bangalore',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Sophie Martin',
        email: 'sophie@gmail.com',
        password: 'password123',
        bio: 'Photographer and social media marketer',
        skillsToTeach: [
          { skillName: 'photography', experienceLevel: 'expert' },
          { skillName: 'social media', experienceLevel: 'intermediate' },
          { skillName: 'marketing', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['react', 'python', 'web development', 'data science'],
        location: 'Mumbai',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Kevin White',
        email: 'kevin@gmail.com',
        password: 'password123',
        bio: 'JavaScript developer and data analyst',
        skillsToTeach: [
          { skillName: 'javascript', experienceLevel: 'expert' },
          { skillName: 'data analysis', experienceLevel: 'intermediate' },
          { skillName: 'web development', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['python', 'photography', 'marketing', 'ui/ux design'],
        location: 'Pune',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Rachel Green',
        email: 'rachel@gmail.com',
        password: 'password123',
        bio: 'Machine learning engineer and React developer',
        skillsToTeach: [
          { skillName: 'machine learning', experienceLevel: 'expert' },
          { skillName: 'react', experienceLevel: 'intermediate' },
          { skillName: 'python', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['photography', 'marketing', 'ui/ux design', 'content writing'],
        location: 'Chennai',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      },
      {
        name: 'Tom Anderson',
        email: 'tom@gmail.com',
        password: 'password123',
        bio: 'Frontend developer and marketing specialist',
        skillsToTeach: [
          { skillName: 'frontend development', experienceLevel: 'expert' },
          { skillName: 'marketing', experienceLevel: 'intermediate' },
          { skillName: 'html/css', experienceLevel: 'expert' }
        ],
        skillsToLearn: ['python', 'data science', 'photography', 'machine learning'],
        location: 'Hyderabad',
        profilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        profileCompleted: true
      }
    ];

    // Create users
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = new User({
        ...userData,
        password: hashedPassword
      });

      await newUser.save();
      console.log(`Created user: ${userData.name} (${userData.email})`);
    }

    console.log(`\n✅ Successfully seeded ${users.length} users!`);
    console.log('\n📋 LOGIN CREDENTIALS:');
    console.log('All users have password: password123');
    console.log('\nUser List:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} - ${user.email}`);
      console.log(`   Teaches: ${user.skillsToTeach.map(s => s.skillName).join(', ')}`);
      console.log(`   Learns: ${user.skillsToLearn.join(', ')}`);
      console.log('');
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

seedDatabase();
const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

const thoughts = [];

const thoughtsText = [
  'Its Tuesday',
  'Did you remember to bring your umbrella?',
  'I got the rumblies in my tummy that only hands can satisfy',
  'Deep Thoughts, by Jack Handy',
  'I don\'t mind the sun sometimes',
  'Images it brings',
  'I can taste you on my lips and see you in my dreams',
  'Cops, come and try to take my crops',
  'These pigs wanna blow my house down',
  'Underground --> to the next town',
  'Insane in the membrane',
  'Insane in the Brain',
  'I\'m insane, got no brain',
  'Who you tryna get crazy with, ese?',
  'Don\'t you know I\'m loco?',
  'I think I\'m going crazy',
  'Do you realize?',
  'Jump around, jump around, jump up jump up and get down',
  'House of Pain, got no brain',
  'Thought no. 20: rock n roll part 2, blur song 2'
];

for (let i = 0; i < 20; i++) {
  const thoughtText = thoughtsText[i];

  thoughts.push({
    thoughtText,
  });
};

await Thought.collection.insertMany(thoughts);

const usernames = [
  'coolkid182',
  'davemira',
  'joepiscopo',
  'pepsico',
  'charityfaith',
  'hotguy6969',
  'noobevad',
  'noobsaibot',
  'shaokahn',
  'example10'
];

const emails = [
  'coolkid182@zmail.com',
  'davemira@ayohell.com',
  'joepiscopo@army.gov',
  'pepsico@reintegrate.org',
  'charityfaith@penis.net',
  'hotguy6969@clownfart.au',
  'noobevad@coding.info',
  'noobsaibot@mortalkombat.game',
  'shaokahn@starfox.fox',
  'example10@example.to'
];
  // Create empty array to hold the users
  const users = [];

getThreeRandomThoughts = () => {
for (let i = 0; i <20; i++) {

}

}

  // Loop 10 times -- add users to the users array
  for (let i = 0; i < 10; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const username = usernames[i];
    const email = emails[i];

    users.push({
      username,
      email,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});

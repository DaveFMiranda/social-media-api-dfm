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
  '@mail.com',
'@bluemail.com',
'@zmail.com',
'@geemail.com',
'@ayohell.com'
]

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
    'Underdround --> to the next town',
    'Insane in the membrane',
    'Insane in the Brain',
    'I\'m insane, got no brain',
    'Who you tryna get crazy with, ese?',
    'Don\'t you know I\'m loco?',
    'I think I\'m going crazy',
    'Do you realize?',
    'Jump around, jump around, jump up jump up and get down',
    'House of Pain, got no brain',
  ];
  
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
const getRandomName = () =>
`${getRandomArrItem(usernames)}`;

  const getRandomEmail = () =>
    `${getRandomArrItem(usernames)}${getRandomArrItem(emails)}`;
  
  // Function to generate random assignments that we can add to student object.
  const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughtsText),
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { getRandomName, getRandomEmail, getRandomThoughts };
  
let curScore = 0;
let curQuestion = -1;

const questionSet = [
  { 
    text: `There is a safe house but you have to cross a long street with hundreds of zombies on it, what's the best course of action?`,
    ans1: `Try to sneak past the zombies and only kill the ones that see you.`,
    ans2: `Hot wire a car and plow through them to get to the other side.`,
    ans3: `Run straight through them with your weapon and hope you get to the other side in time.`,
    ans4: `Take out the zombies one by one being as stealthy as possible.`
  },

  {
    text: `What is the safest place to stay during the apocalypse?`,
    ans1: `In my house. I already have a food stash and weapons to protect myself with.`,
    ans2: `Inside a grocery store or mall, which will have unlimited supplies and weapons to sustain myself.`,
    ans3: `At the police station. More weapons than anywhere else as well as people who know how to fight.`,
    ans4: `A hospital, they might have a cure to the zombie virus.`
  },

  {
    text: `You are about to escape the zombie infected city by bridge, but the military starts to bomb it to quarantine it, what do you do?`,
    ans1: `Hunker down and stay in the city to fend for yourself.`,
    ans2: `Try to swim across the 1 mile river to safety.`,
    ans3: `Try to run across the bridge before it's completely destroyed.`,
    ans4: `Send out an SOS flare to try to get them to stop the bombing.`
  }, 
  {
    text: `You're being chased by a horde of zombies and you are about to enter the safe room, but realize one of the zombies chasing you is your best friend. What do you do?`,
    ans1: `Try to take him into the safe room with you while you look for a possible cure.`,
    ans2: `Lock yourself in the safe room, there's no reasoning with him and he might infect you as well.`,
    ans3: `Try to take out the rest of the zombies to save your friend.`,
    ans4: `Hug your friend and try to get him to snap out of it so he can tell the rest of the zombies to leave you alone.`
  }, 
  {
    text: `You're on your way to a rescue zone but your car runs out of gas. The next gas station is 7 miles and the rescue zone is 50 miles away. What do you do?`,
    ans1: `Walk 7 miles to the gas station on foot to get gas and then go back to fill your car.`,
    ans2: `Resolve to run the remaining 50 miles (2 marathons) and not stop until you make it to the rescue zone.`,
    ans3: `Try to hot wire another car without setting off its alarm.`,
    ans4: `Head back to the closest city and come up with another plan.`
  }
];

const ANSWERS = [ 
  `Try to sneak past the zombies and only kill the ones that see you.`, 
  `Inside a grocery store or mall, which will have unlimited supplies and weapons to sustain myself.`, 
  `Try to swim across the 1 mile river to safety.`, 
  `Lock yourself in the safe room, there's no reasoning with him and he might infect you as well.`, 
  `Try to hot wire another car without setting off its alarm.`,
];

const EXPLANATIONS = [ 
  `Attracting attention to yourself is never a good idea during a zombie outbreak.`, 
  `For long term survival, food and barricading supplies are a necessity.`, 
  `Even though it might be difficult, securing your own survival and not counting on anyone else is the best option.`, 
  `Until a cure is discovered and you are safe, you have to make sure you survive.`, 
  `Unless you are with other survivors who have a car, this would be your best chance to get to the rescue zone safely and in time.`,
];

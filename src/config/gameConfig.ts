import { GameConfig } from '../types';

export const defaultGameConfig: GameConfig = {
  player: {
    name: "Asher",
    assetUrl: "https://tutor.mathkraft.org/_next/image?url=%2Fapi%2Fproxy%3Furl%3Dhttps%253A%252F%252Fmk-uploaded-images.s3.us-east-1.amazonaws.com%252Fimages%252F20250310_163604_proxy-removebg-preview.png&w=3840&q=75&dpl=dpl_Bfnd3SNCd8yS7NXTM3p4HThDj8py",
    color: "#2196F3",
  },
  cpu: {
    name: "The Mercada",
    assetUrl: "https://tutor.mathkraft.org/_next/image?url=%2Fapi%2Fproxy%3Furl%3Dhttps%253A%252F%252Fmk-uploaded-images.s3.us-east-1.amazonaws.com%252Fimages%252F20250310_163948_image.png&w=3840&q=75&dpl=dpl_Bfnd3SNCd8yS7NXTM3p4HThDj8py",
    color: "#F44336",
    dialogues: {
      hit: [
        "Your Candor ships are no match for our advanced weaponry!",
        "Another Candor ship falls to the might of the Mercada fleet!",
        "Your primitive vessels crumble before our superior technology!",
        "Watch as your allies disappear into the void of space!",
        "The Mercada empire grows stronger with each ship we destroy!",
        "Your resistance is futile, space adventurer!",
        "Even with your sidekicks, you cannot stop our conquest!",
        "The galaxy will bow before the Mercada fleet!",
        "Dark Hunter's power cannot shield you from our attacks!",
        "Your Candor technology is centuries behind ours!",
        "We've destroyed countless fleets across the galaxy!",
        "Your ships are mere toys compared to our arsenal!",
        "Not even Star Knight's armor can withstand our firepower!"
      ],
      defeat: [
        "Impossible! Our ancient fleet... destroyed by a mere adventurer!",
        "The Mercada will not forget this defeat, Asher!",
        "How dare you challenge our dominion over these star systems!",
        "This is merely a temporary setback in our grand conquest!",
        "Dark Hunter and your other allies won't protect you forever!",
        "The Mercada fleet will return, stronger than ever!",
        "You may have won this battle, but the war for the galaxy continues!",
        "Our ancient powers will not be contained by your interference!",
        "Your victory is meaningless in the grand scheme of our empire!",
        "We underestimated the power of your Candor technology!",
        "This sector may be lost, but our empire spans galaxies!",
        "Rainwing Venom's intelligence served you well this time!",
        "Your alliance with Star Knight proves... troublesome."
      ],
      victory: [
        "The legendary Asher falls before the Mercada fleet!",
        "Your Candor ships now drift as space debris!",
        "Not even Dark Hunter could save you from our might!",
        "The energy sources you seek will power our conquest!",
        "Rainwing Venom and Star Knight have failed to protect you!",
        "The ancient Mercada fleet proves superior once again!",
        "Your quest ends here, space adventurer!",
        "The galaxy will remember the day Asher fell to the Mercada!",
        "Your allies scattered like stardust before our power!",
        "The Candor resistance crumbles with your defeat!",
        "Your search for energy sources was your downfall!",
        "Dark Hunter's strength was insufficient against our fleet!",
        "The stars themselves bow before our victory!"
      ],
      playerHit: [
        "Impossible! How did you find our cloaked vessel?",
        "A lucky shot, nothing more!",
        "Our shields will regenerate, Asher!",
        "You've merely scratched our hull!",
        "Your primitive targeting systems shouldn't be this accurate!",
        "One ship means nothing to our vast armada!",
        "This changes nothing in the grand scheme of our conquest!",
        "Your mathematical prowess is... unexpected.",
        "Our fleet has weathered worse attacks!",
        "A temporary setback in our glorious campaign!",
        "Your calculations won't save you forever!",
        "Enjoy this small victory while you can!"
      ],
      playerMiss: [
        "Your targeting systems fail you, Asher!",
        "Ha! Your calculations are as primitive as your ships!",
        "The Mercada fleet is too advanced for your simple mathematics!",
        "Your education system has failed you, space adventurer!",
        "Even with Star Knight's help, your aim is pathetic!",
        "The void of space swallows your futile attacks!",
        "Perhaps you should reconsider your multiplication tables!",
        "Your mathematical errors will be your downfall!",
        "The Mercada empire laughs at your feeble attempts!",
        "Not even close to our position! Your defeat is inevitable!",
        "Your miscalculations please us greatly!",
        "Dark Hunter's guidance seems to be failing you!"
      ]
    }
  },
  sidekick: {
    name: "Star Knight",
    assetUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    color: "#4CAF50",
    dialogues: {
      hit: [
        "I'll protect our fleet at all costs!",
        "Stand strong, Captain Asher!"
      ],
      defeat: [
        "We'll regroup and fight another day!",
        "This is just a temporary setback!"
      ],
      victory: [
        "Victory for the Candor Alliance!",
        "We've shown the Mercada our true strength!"
      ],
      correctAnswer: [
        "Excellent shot, Captain Asher!",
        "Your multiplication skills are impressive!",
        "The Candor fleet's honor shines through your calculations!",
        "That's how we do it in the Galactic Alliance!",
        "Perfect targeting, just as we practiced!",
        "The Mercada won't stand a chance against your mathematical prowess!",
        "Your education on Candor Prime serves you well!",
        "Rainwing Venom would be proud of your calculations!",
        "Dark Hunter taught you well, Captain!",
        "The energy sources will soon be ours with aim like that!",
        "Keep up the precise calculations and we'll win this battle!",
        "The stars align with your mathematical genius!"
      ],
      incorrectAnswer: [
        "Don't worry, Captain! Recalculate and try again!",
        "Even the best space navigators make errors sometimes!",
        "Remember your training on Candor Prime, you can do this!",
        "The Mercada's jamming signals are affecting our calculations!",
        "Focus, Captain Asher! The fate of the galaxy depends on it!",
        "Let's double-check our multiplication and try again!",
        "Rainwing Venom always says to take a deep breath before recalculating!",
        "The Galactic Alliance believes in you, even when you miss!",
        "Dark Hunter faced similar challenges before becoming a legend!",
        "The energy sources are still within our reach! Try again!",
        "Your determination is what makes you a great captain!",
        "One miscalculation won't define this battle! Let's try again!"
      ]
    }
  },
  backgroundUrl: "https://tutor.mathkraft.org/_next/image?url=%2Fapi%2Fproxy%3Furl%3Dhttps%253A%252F%252Fmk-uploaded-images.s3.us-east-1.amazonaws.com%252Fimages%252F20250310_164434_image.png&w=3840&q=75&dpl=dpl_Bfnd3SNCd8yS7NXTM3p4HThDj8py",
  levels: [
    {
      id: 1,
      name: "Training Grounds",
      description: "Basic multiplication tables from 1-5",
      maxNumber: 25,
      minShips: { player: 5, cpu: 4 },
      boardSize: { rows: 5, cols: 5 }
    },
    {
      id: 2,
      name: "Deep Space",
      description: "Advanced multiplication with numbers 1-7",
      maxNumber: 49,
      minShips: { player: 5, cpu: 4 },
      boardSize: { rows: 5, cols: 10 }
    },
    {
      id: 3,
      name: "Galactic Core",
      description: "Master level multiplication with numbers 1-10",
      maxNumber: 100,
      minShips: { player: 5, cpu: 4 },
      boardSize: { rows: 10, cols: 10 }
    }
  ],
  music: [
    {
      id: "space-adventure",
      name: "Space Adventure",
      url: "/src/components/music1.mp3",
      icon: "🚀"
    },
    {
      id: "battle-theme",
      name: "Battle Theme",
      url: "/src/components/music2.mp3",
      icon: "⚔️"
    },
    {
      id: "cosmic-journey",
      name: "Cosmic Journey",
      url: "/src/components/music3.mp3",
      icon: "🌌"
    }
  ]
};
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
      minShips: { player: 5, cpu: 4 }
    },
    {
      id: 2,
      name: "Deep Space",
      description: "Advanced multiplication with numbers 1-7",
      maxNumber: 49,
      minShips: { player: 5, cpu: 4 }
    },
    {
      id: 3,
      name: "Galactic Core",
      description: "Master level multiplication with numbers 1-10",
      maxNumber: 100,
      minShips: { player: 5, cpu: 4 }
    }
  ]
};
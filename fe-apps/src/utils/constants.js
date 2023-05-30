import discordIcon from "@assets/icons/discord.svg";
import discordIconDimmed from "@assets/icons/discord-dimmed.svg";
import facebookIcon from "@assets/icons/facebook.svg";
import facebookIconDimmed from "@assets/icons/facebook-dimmed.svg";
import twitterIcon from "@assets/icons/twitter.svg";
import twitterIconDimmed from "@assets/icons/twitter-dimmed.svg";
import instagramIcon from "@assets/icons/instagram.svg";
import instagramIconDimmed from "@assets/icons/instagram-dimmed.svg";
import linkedinIcon from "@assets/icons/linkedin.svg";
import linkedinIconDimmed from "@assets/icons/linkedin-dimmed.svg";

const context = JSON.parse(document.getElementById("context").textContent);

const defaultTheme = "dark";

const contactEmail = "accelerocode@gmail.com";

const socialMediaLinks = [
  {
    name: "Discord",
    icon: {
      default: discordIcon,
      dimmed: discordIconDimmed,
    },
    link: "https://discord.gg/HK4bWDpEFw",
  },
  {
    name: "Facebook",
    icon: {
      default: facebookIcon,
      dimmed: facebookIconDimmed,
    },
    link: "https://www.facebook.com/profile.php?id=100092266787965",
  },
  {
    name: "Twitter",
    icon: {
      default: twitterIcon,
      dimmed: twitterIconDimmed,
    },
    link: "",
  },
  {
    name: "Instagram",
    icon: {
      default: instagramIcon,
      dimmed: instagramIconDimmed,
    },
    link: "https://instagram.com/pdfcolab?igshid=ZDdkNTZiNTM=",
  },
  {
    name: "LinkedIn",
    icon: {
      default: linkedinIcon,
      dimmed: linkedinIconDimmed,
    },
    link: "https://www.linkedin.com/company/pdfcolabz",
  },
];

export { context, defaultTheme, contactEmail, socialMediaLinks };

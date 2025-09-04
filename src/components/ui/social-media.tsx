import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

interface SocialMediaProps {
  variant?: "footer" | "contact" | "header";
  className?: string;
}

const SocialMedia = ({ variant = "footer", className = "" }: SocialMediaProps) => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/lunexomedia",
      ariaLabel: "Follow LUNEXO MEDIA on Facebook",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram", 
      icon: Instagram,
      url: "https://instagram.com/lunexomedia",
      ariaLabel: "Follow LUNEXO MEDIA on Instagram",
      color: "hover:text-pink-600"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/lunexomedia",
      ariaLabel: "Connect with LUNEXO MEDIA on LinkedIn",
      color: "hover:text-blue-700"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@lunexomedia",
      ariaLabel: "Subscribe to LUNEXO MEDIA on YouTube",
      color: "hover:text-red-600"
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      url: "https://twitter.com/lunexomedia",
      ariaLabel: "Follow LUNEXO MEDIA on X (Twitter)",
      color: "hover:text-gray-800"
    },
    {
      name: "TikTok",
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
        </svg>
      ),
      url: "https://tiktok.com/@lunexomedia",
      ariaLabel: "Follow LUNEXO MEDIA on TikTok",
      color: "hover:text-black"
    },
    {
      name: "Pinterest",
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.372 0 12 0 17.084 3.163 21.426 7.627 23.174c-.105-.949-.199-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.99-5.373 11.99-12C24 5.372 18.627.001 12.001.001z"/>
        </svg>
      ),
      url: "https://pinterest.com/lunexomedia",
      ariaLabel: "Follow LUNEXO MEDIA on Pinterest",
      color: "hover:text-red-700"
    },
    {
      name: "Snapchat",
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.373 11.99-12C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
      url: "https://snapchat.com/add/lunexomedia",
      ariaLabel: "Add LUNEXO MEDIA on Snapchat",
      color: "hover:text-yellow-500"
    }
  ];

  const getContainerStyles = () => {
    switch (variant) {
      case "header":
        return "flex items-center gap-3";
      case "contact":
        return "text-center";
      default:
        return "";
    }
  };

  const getIconSize = () => {
    switch (variant) {
      case "header":
        return "w-4 h-4";
      case "contact":
        return "w-6 h-6";
      default:
        return "w-5 h-5";
    }
  };

  const baseStyles = variant === "header" 
    ? "text-white/70 hover:text-white" 
    : "text-muted-foreground transition-all duration-300 hover:scale-110 transform";

  return (
    <div className={`${getContainerStyles()} ${className}`}>
      {variant !== "header" && (
        <h3 className={`font-semibold mb-4 ${variant === "contact" ? "text-xl" : ""}`}>
          Follow Us on Social Media
        </h3>
      )}
      <div className={`flex ${variant === "header" ? "gap-2" : "flex-wrap gap-4 sm:gap-6"} ${variant === "contact" ? "justify-center" : ""}`}>
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className={`${baseStyles} ${variant !== "header" ? social.color : ""} ${
                variant === "contact" ? "p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20" : ""
              }`}
              title={`Follow us on ${social.name}`}
            >
              <IconComponent className={getIconSize()} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMedia;
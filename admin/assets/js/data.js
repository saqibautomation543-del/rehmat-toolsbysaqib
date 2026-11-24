/* ============================================================
   Rehmat Tools — default catalogue + settings + shared helpers
   Loaded by BOTH index.html and admin.html.
   The live store lives in localStorage key "rehmat_site_v1".
   Product data (prices, durations, features) mirrors
   posters-shop-data.csv — all 20 rows.
   ============================================================ */

window.DEFAULT_PRODUCTS = [
  {
    "id": "h-chatgpt",
    "slug": "chatgpt",
    "name": "ChatGPT Plus",
    "category": "AI Tools",
    "price": 1599,
    "originalPrice": 2500,
    "validity": "Semi Private (30 Days)",
    "stock": 25,
    "trial": false,
    "features": [
      "Official ChatGPT Plus Plan ($25 Plan)",
      "Semi Private Plan: Rs. 1,599 (30 Days)",
      "Full Private Readymade Plan: Rs. 3,200 (30 Days)",
      "Full Private includes Email, Password, 2FA & Full Access",
      "GPT-4o, Canvas, Codex, DALL-E 3 & Voice Mode"
    ],
    "about": "Official ChatGPT Plus 30-day plan. Choose Semi Private (Rs. 1,599) or Full Private Readymade with Email, Password & 2FA (Rs. 3,200).",
    "img": "assets/img/logos/chatgpt-plus.jpg",
    "oldPrice": 2500,
    "variations": [
      {
        "duration": "Semi Private (30 Days)",
        "price": 1599,
        "oldPrice": 2500,
        "label": "Semi Private (30 Days)",
        "badge": "Rs. 1,599"
      },
      {
        "duration": "Full Private Readymade (30 Days) - Email, Pass & 2FA",
        "price": 3200,
        "oldPrice": 6500,
        "label": "Full Private (Email+2FA)",
        "badge": "Rs. 3,200"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-claude",
    "slug": "claude",
    "name": "Claude Team Pro",
    "category": "AI Tools",
    "price": 4700,
    "originalPrice": null,
    "validity": "1 Month Pro",
    "stock": 20,
    "trial": false,
    "features": [
      "Claude Pro / Team-level premium access",
      "~2x higher usage limits",
      "Advanced AI writing and reasoning",
      "Coding, document analysis and research",
      "Ideal for professional and business use"
    ],
    "about": "Claude Team Pro 1-month premium access with higher usage limits.",
    "img": "assets/img/logos/claude-pro.jpg",
    "oldPrice": 8500,
    "variations": [
      {
        "duration": "1 Month Pro",
        "price": 4700,
        "oldPrice": 8500,
        "label": "1M",
        "badge": "2x Limits"
      },
      {
        "duration": "3 Months Team",
        "price": 12500,
        "oldPrice": 24000,
        "label": "3M",
        "badge": "Coding Maestro"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-veo3",
    "slug": "veo3",
    "name": "Veo 3 – Omni Plus",
    "category": "AI Tools",
    "price": 3500,
    "originalPrice": null,
    "validity": "1 Month (45K Credits)",
    "stock": 20,
    "trial": false,
    "features": [
      "45,000 credits",
      "All available models working",
      "Text-to-Video generation",
      "Image-to-Video generation",
      "Unlimited image generation",
      "Great for YouTube content creators"
    ],
    "about": "Veo 3 Omni Plus with 45K credits — AI video production.",
    "img": "assets/img/logos/veo-3-ultra.jpg",
    "oldPrice": 8500,
    "variations": [
      {
        "duration": "1 Month (45K Credits)",
        "price": 3500,
        "oldPrice": 8500,
        "label": "45K Cr",
        "badge": "Cinematic"
      },
      {
        "duration": "3 Months (120K Credits)",
        "price": 8500,
        "oldPrice": 22000,
        "label": "120K Cr",
        "badge": "Filmmaker"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-supergrok",
    "slug": "supergrok",
    "name": "Super Grok",
    "category": "AI Tools",
    "price": 4500,
    "originalPrice": null,
    "validity": "1 Month Plan",
    "stock": 20,
    "trial": false,
    "features": [
      "Premium Super Grok access ($30 plan equivalent)",
      "Advanced AI models",
      "AI image and video capabilities",
      "Advanced reasoning and research",
      "Higher usage limits than standard"
    ],
    "about": "Super Grok 1-month premium access.",
    "img": "assets/img/logos/grok-3-ai.jpg",
    "oldPrice": 9000,
    "variations": [
      {
        "duration": "1 Month Plan",
        "price": 4500,
        "oldPrice": 9000,
        "label": "1M",
        "badge": "Uncensored"
      },
      {
        "duration": "3 Months VIP",
        "price": 11500,
        "oldPrice": 25000,
        "label": "3M",
        "badge": "Save 25%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-perplexity",
    "slug": "perplexity",
    "name": "Perplexity AI",
    "category": "AI Tools",
    "price": 0,
    "originalPrice": null,
    "validity": "Update Pending",
    "stock": 20,
    "trial": false,
    "features": [
      "Premium AI search and research subscription",
      "Price and duration updating soon"
    ],
    "about": "Perplexity AI premium — details updating soon.",
    "img": "assets/img/logos/perplexity-pro.jpg",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "Update Pending",
        "price": 0,
        "oldPrice": 1500,
        "label": "Update Pending",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-nordvpn",
    "slug": "nordvpn",
    "name": "NordVPN",
    "category": "VPN",
    "price": 650,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "features": [
      "Secure encrypted internet connection",
      "IP address protection",
      "Global VPN server network",
      "Online privacy and security",
      "Regional content access"
    ],
    "about": "NordVPN 3-month private plan.",
    "img": "assets/img/posters/poster-h-nordvpn.webp",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "1 Month",
        "price": 650,
        "oldPrice": 1500,
        "label": "1M",
        "badge": "Popular"
      },
      {
        "duration": "6 Months",
        "price": 1800,
        "oldPrice": 4500,
        "label": "6M",
        "badge": "Save 40%"
      },
      {
        "duration": "12 Months",
        "price": 2800,
        "oldPrice": 7500,
        "label": "12M",
        "badge": "Best Value"
      }
    ],
    "activeVariationIndex": 0
  },
  {
  "id": "h-hmavpn",
  "slug": "hma-vpn",
  "name": "HMA VPN (HideMyAss)",
  "category": "VPN",
  "price": 550,
  "originalPrice": 1200,
  "validity": "1 Month (Private Key)",
  "stock": 25,
  "trial": false,
  "features": [
    "Servers in 190+ Countries (290+ Locations)",
    "Lightning fast 20 Gbps connections",
    "Military-grade AES 256-bit encryption",
    "Works on Windows, Mac, iOS, Android, Linux",
    "Verified No-Logs Policy with kill switch"
  ],
  "about": "HMA VPN gives you access to the largest server network in the world with servers in 190+ countries and ultra-fast speeds.",
  "img": "assets/img/posters/poster-h-hmavpn.webp",
  "oldPrice": 1200,
  "variations": [
    {
      "duration": "1 Month Plan",
      "price": 550,
      "oldPrice": 1200,
      "label": "1M",
      "badge": "1 Month"
    },
    {
      "duration": "6 Months Plan",
      "price": 1600,
      "oldPrice": 3600,
      "label": "6M",
      "badge": "Save 55%"
    },
    {
      "duration": "12 Months (1 Year)",
      "price": 2600,
      "oldPrice": 6500,
      "label": "12M",
      "badge": "Best Value"
    }
  ]
},
  {
    "id": "h-surfshark",
    "slug": "surfshark",
    "name": "Surfshark VPN",
    "category": "VPN",
    "price": 450,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "features": [
      "🔒 Secure & Private Browsing",
      "⚡ Fast Global VPN Servers",
      "🌍 100+ Countries",
      "🛡️ Advanced Online Protection",
      "🚫 Ad & Tracker Blocking",
      "📱 Unlimited Device Connections"
    ],
    "about": "Surfshark VPN 2-month premium access with unlimited devices.",
    "img": "assets/img/logos/surfshark-vpn.jpg",
    "oldPrice": 1200,
    "variations": [
      {
        "duration": "1 Month",
        "price": 450,
        "oldPrice": 1200,
        "label": "1M",
        "badge": "Flexible"
      },
      {
        "duration": "6 Months",
        "price": 1250,
        "oldPrice": 3500,
        "label": "6M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months",
        "price": 2200,
        "oldPrice": 6000,
        "label": "12M",
        "badge": "Save 50%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-gmail",
    "slug": "gmail",
    "name": "Gmail Account",
    "category": "Productivity",
    "price": 250,
    "originalPrice": null,
    "validity": "One-time",
    "stock": 20,
    "trial": false,
    "features": [
      "Account created using customer's name",
      "Customer-selected password",
      "Personalized account setup"
    ],
    "about": "Custom Gmail account, one-time price.",
    "img": "assets/img/posters/poster-h-gmail.webp",
    "oldPrice": 550,
    "variations": [
      {
        "duration": "One-time",
        "price": 250,
        "oldPrice": 550,
        "label": "One-time",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-youtube",
    "slug": "youtube",
    "name": "YouTube Premium",
    "category": "Streaming",
    "price": 1500,
    "originalPrice": null,
    "validity": "3 Months",
    "stock": 20,
    "trial": false,
    "features": [
      "Ad-free viewing",
      "Background playback",
      "Offline downloads",
      "YouTube Music Premium benefits"
    ],
    "about": "YouTube Premium 3-month plan.",
    "img": "assets/img/logos/youtube-premium.jpg",
    "oldPrice": 3300,
    "variations": [
      {
        "duration": "3 Months",
        "price": 1500,
        "oldPrice": 3300,
        "label": "3 Months",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-figma",
    "slug": "figma",
    "name": "Figma Pro – Education",
    "category": "Design",
    "price": 2400,
    "originalPrice": null,
    "validity": "2 Years",
    "stock": 20,
    "trial": false,
    "features": [
      "Professional design workspace",
      "UI/UX design features",
      "Collaboration tools",
      "Pro-level design workflow",
      "Two-year access with warranty"
    ],
    "about": "Figma Pro Education — 2 years access.",
    "img": "assets/img/posters/poster-h-figma.webp",
    "oldPrice": 5280,
    "variations": [
      {
        "duration": "2 Years",
        "price": 2400,
        "oldPrice": 5280,
        "label": "2 Years",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-adobecc",
    "slug": "adobecc",
    "name": "Adobe Creative Cloud Pro",
    "category": "Design",
    "price": 1500,
    "originalPrice": null,
    "validity": "4000 Credits",
    "stock": 20,
    "trial": false,
    "features": [
      "Creative Cloud Pro access",
      "4,000 credits",
      "AI-powered creative features",
      "Image and design generation"
    ],
    "about": "Adobe Creative Cloud Pro with 4,000 credits.",
    "img": "assets/img/posters/poster-h-adobecc.webp",
    "oldPrice": 3300,
    "variations": [
      {
        "duration": "4000 Credits",
        "price": 1500,
        "oldPrice": 3300,
        "label": "4000 Credits",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-elevenlabs",
    "slug": "elevenlabs",
    "name": "ElevenLabs",
    "category": "AI Tools",
    "price": 2500,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "features": [
      "131K credits",
      "AI voice generation",
      "Text-to-Speech",
      "Realistic AI voices",
      "Voiceover and narration"
    ],
    "about": "ElevenLabs with 131K credits — premium AI voiceover.",
    "img": "assets/img/posters/poster-h-elevenlabs.webp",
    "oldPrice": 6500,
    "variations": [
      {
        "duration": "1 Month",
        "price": 2500,
        "oldPrice": 6500,
        "label": "1M",
        "badge": "Voice AI"
      },
      {
        "duration": "3 Months",
        "price": 6000,
        "oldPrice": 15000,
        "label": "3M",
        "badge": "Save 30%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-capcut",
    "slug": "capcut",
    "name": "CapCut Pro",
    "category": "Design",
    "price": 950,
    "originalPrice": null,
    "validity": "1 Month VIP",
    "stock": 20,
    "trial": false,
    "features": [
      "Premium video editing features",
      "Pro effects and transitions",
      "Premium templates and tools",
      "Advanced editing capabilities",
      "For social media creators"
    ],
    "about": "CapCut Pro 1-month premium plan.",
    "img": "assets/img/logos/capcut-pro.jpg",
    "oldPrice": 2800,
    "variations": [
      {
        "duration": "1 Month VIP",
        "price": 950,
        "oldPrice": 2800,
        "label": "1M",
        "badge": "PC + Mobile"
      },
      {
        "duration": "6 Months VIP",
        "price": 3500,
        "oldPrice": 9000,
        "label": "6M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months VIP",
        "price": 5500,
        "oldPrice": 16000,
        "label": "12M",
        "badge": "Save 45%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-gemini",
    "slug": "gemini",
    "name": "Gemini Pro",
    "category": "AI Tools",
    "price": 1200,
    "originalPrice": null,
    "validity": "18 Months",
    "stock": 20,
    "trial": false,
    "features": [
      "Premium Gemini AI access",
      "Advanced AI assistance",
      "Writing, research and productivity",
      "Supported premium features"
    ],
    "about": "Gemini Pro — 18 months access.",
    "img": "assets/img/posters/poster-h-gemini.webp",
    "oldPrice": 2640,
    "variations": [
      {
        "duration": "18 Months",
        "price": 1200,
        "oldPrice": 2640,
        "label": "18 Months",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-muse1b",
    "slug": "muse1b",
    "name": "Muse AI – 1 Billion Tokens",
    "category": "AI Tools",
    "price": 2500,
    "originalPrice": null,
    "validity": "1B Tokens",
    "stock": 20,
    "trial": false,
    "features": [
      "1 Billion AI tokens",
      "AI-powered content generation",
      "Creative and productivity workflows",
      "Token-based AI usage"
    ],
    "about": "Muse AI — 1 billion tokens package.",
    "img": "assets/img/posters/poster-h-muse1b.webp",
    "oldPrice": 5500,
    "variations": [
      {
        "duration": "1B Tokens",
        "price": 2500,
        "oldPrice": 5500,
        "label": "1B Tokens",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-muse30b",
    "slug": "muse30b",
    "name": "Muse AI – 30 Billion Tokens",
    "category": "AI Tools",
    "price": 0,
    "originalPrice": null,
    "validity": "30B Tokens",
    "stock": 20,
    "trial": false,
    "features": [
      "30 Billion tokens",
      "High-volume AI usage",
      "Suitable for larger AI workflows",
      "Price updating soon"
    ],
    "about": "Muse AI — 30 billion tokens package.",
    "img": "assets/img/posters/poster-h-muse30b.webp",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "30B Tokens",
        "price": 0,
        "oldPrice": 1500,
        "label": "30B Tokens",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-heygen600",
    "slug": "heygen600",
    "name": "HeyGen – 600 Credits",
    "category": "AI Tools",
    "price": 3500,
    "originalPrice": null,
    "validity": "1 Month (200 Credits)",
    "stock": 20,
    "trial": false,
    "features": [
      "600 credits",
      "AI video generation",
      "AI avatar creation",
      "Professional video production"
    ],
    "about": "HeyGen — 600 credits package.",
    "img": "assets/img/logos/heygen-creator.jpg",
    "oldPrice": 9000,
    "variations": [
      {
        "duration": "1 Month (200 Credits)",
        "price": 3500,
        "oldPrice": 9000,
        "label": "200 Cr",
        "badge": "Creator"
      },
      {
        "duration": "3 Months (600 Credits)",
        "price": 6500,
        "oldPrice": 18000,
        "label": "600 Cr",
        "badge": "Pro Agency"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-heygen200",
    "slug": "heygen200",
    "name": "HeyGen – 200 Credits + Unlimited Avatar 3",
    "category": "AI Tools",
    "price": 3500,
    "originalPrice": null,
    "validity": "1 Month (200 Credits)",
    "stock": 20,
    "trial": false,
    "features": [
      "200 credits + Unlimited Avatar 3",
      "AI avatar video generation",
      "Professional AI presenter videos",
      "Advanced video creation"
    ],
    "about": "HeyGen — 200 credits with Unlimited Avatar 3.",
    "img": "assets/img/logos/heygen-creator.jpg",
    "oldPrice": 9000,
    "variations": [
      {
        "duration": "1 Month (200 Credits)",
        "price": 3500,
        "oldPrice": 9000,
        "label": "200 Cr",
        "badge": "Creator"
      },
      {
        "duration": "3 Months (600 Credits)",
        "price": 6500,
        "oldPrice": 18000,
        "label": "600 Cr",
        "badge": "Pro Agency"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-spotify1",
    "slug": "spotify1",
    "name": "Spotify Premium – 1 Month",
    "category": "Music",
    "price": 250,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "features": [
      "Ad-free music listening",
      "Offline music downloads",
      "High-quality audio",
      "Unlimited music selection"
    ],
    "about": "Spotify Premium — 1 month.",
    "img": "assets/img/posters/poster-h-spotify1.webp",
    "oldPrice": 700,
    "variations": [
      {
        "duration": "1 Month",
        "price": 250,
        "oldPrice": 700,
        "label": "1M",
        "badge": "Personal"
      },
      {
        "duration": "6 Months",
        "price": 1100,
        "oldPrice": 2500,
        "label": "6M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months",
        "price": 1800,
        "oldPrice": 4500,
        "label": "12M",
        "badge": "Save 40%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-spotify6",
    "slug": "spotify6",
    "name": "Spotify Premium – 6 Months",
    "category": "Music",
    "price": 250,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "features": [
      "Ad-free music listening",
      "Offline music downloads",
      "High-quality audio",
      "Unlimited music selection"
    ],
    "about": "Spotify Premium — 6 months.",
    "img": "assets/img/posters/poster-h-spotify6.webp",
    "oldPrice": 700,
    "variations": [
      {
        "duration": "1 Month",
        "price": 250,
        "oldPrice": 700,
        "label": "1M",
        "badge": "Personal"
      },
      {
        "duration": "6 Months",
        "price": 1100,
        "oldPrice": 2500,
        "label": "6M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months",
        "price": 1800,
        "oldPrice": 4500,
        "label": "12M",
        "badge": "Save 40%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-spotify12",
    "slug": "spotify12",
    "name": "Spotify Premium – 12 Months",
    "category": "Music",
    "price": 250,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "features": [
      "Ad-free music listening",
      "Offline music downloads",
      "High-quality audio",
      "Unlimited music selection"
    ],
    "about": "Spotify Premium — 12 months.",
    "img": "assets/img/posters/poster-h-spotify12.webp",
    "oldPrice": 700,
    "variations": [
      {
        "duration": "1 Month",
        "price": 250,
        "oldPrice": 700,
        "label": "1M",
        "badge": "Personal"
      },
      {
        "duration": "6 Months",
        "price": 1100,
        "oldPrice": 2500,
        "label": "6M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months",
        "price": 1800,
        "oldPrice": 4500,
        "label": "12M",
        "badge": "Save 40%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-leonardo",
    "slug": "leonardo",
    "name": "Leonardo AI",
    "category": "AI Tools",
    "price": 0,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 0,
    "trial": false,
    "features": [
      "Stock End — pricing and availability updating soon"
    ],
    "about": "Leonardo AI — currently out of stock.",
    "img": "assets/img/logos/leonardo-ai.jpg",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "1 Month",
        "price": 0,
        "oldPrice": 1500,
        "label": "1M",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-iptv",
    "slug": "iptv",
    "name": "IPTV",
    "category": "Streaming",
    "price": 600,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 0,
    "trial": false,
    "features": [
      "Stock End — pricing and package duration updating soon"
    ],
    "about": "IPTV — currently out of stock.",
    "img": "assets/img/posters/poster-h-iptv.webp",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "1 Month",
        "price": 600,
        "oldPrice": 1500,
        "label": "1M",
        "badge": "Trial"
      },
      {
        "duration": "6 Months",
        "price": 2400,
        "oldPrice": 5000,
        "label": "6M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months",
        "price": 3800,
        "oldPrice": 8000,
        "label": "12M",
        "badge": "Save 52%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-disney",
    "slug": "disney",
    "name": "Disney+",
    "category": "Streaming",
    "price": 0,
    "originalPrice": null,
    "validity": "1 Month",
    "stock": 0,
    "trial": false,
    "features": [
      "Stock End — pricing and subscription duration updating soon"
    ],
    "about": "Disney+ — currently out of stock.",
    "img": "assets/img/posters/poster-h-disney.webp",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "1 Month",
        "price": 0,
        "oldPrice": 1500,
        "label": "1M",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-msofficeplus",
    "slug": "msofficeplus",
    "name": "MS Office Plus",
    "category": "Productivity",
    "price": 1500,
    "originalPrice": null,
    "validity": "1 Year",
    "stock": 20,
    "trial": false,
    "features": [
      "Microsoft Office Plus subscription",
      "Supported Office applications",
      "Document creation and editing",
      "Productivity for personal and professional use"
    ],
    "about": "MS Office Plus — 1 year subscription.",
    "img": "assets/img/posters/poster-h-msofficeplus.webp",
    "oldPrice": 3300,
    "variations": [
      {
        "duration": "1 Year",
        "price": 1500,
        "oldPrice": 3300,
        "label": "1 Year",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-imagestool",
    "slug": "imagestool",
    "name": "Unlimited Images Tool",
    "category": "AI Tools",
    "price": 2500,
    "originalPrice": null,
    "validity": "Update Pending",
    "stock": 20,
    "trial": false,
    "features": [
      "Unlimited AI image generation",
      "One-click image generation",
      "Easy-to-use interface",
      "For designers and content creators",
      "Fast AI image creation"
    ],
    "about": "Unlimited Images Tool — unlimited AI image generation.",
    "img": "assets/img/posters/poster-h-imagestool.webp",
    "oldPrice": 5500,
    "variations": [
      {
        "duration": "Update Pending",
        "price": 2500,
        "oldPrice": 5500,
        "label": "Update Pending",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "h-voiceover",
    "slug": "voiceover",
    "name": "Unlimited Voiceover Tool",
    "category": "AI Tools",
    "price": 0,
    "originalPrice": null,
    "validity": "Trial Offer",
    "stock": 20,
    "trial": false,
    "features": [
      "Unlimited voiceover generation",
      "AI-powered voice generation",
      "Voiceover trials available",
      "Easy content narration",
      "For YouTube and social media creators"
    ],
    "about": "Unlimited Voiceover Tool — free trial available, request on WhatsApp.",
    "img": "assets/img/posters/poster-h-voiceover.webp",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "Trial Offer",
        "price": 0,
        "oldPrice": 1500,
        "label": "Trial Offer",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-vidiq",
    "slug": "vidiq",
    "name": "VidIQ Monthly Plans",
    "category": "SEO Tools",
    "price": 999,
    "originalPrice": 1499,
    "validity": "30 Days",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "startingAt": true,
    "features": [
      "YouTube keyword research",
      "Video SEO score and optimization",
      "Channel analytics and competitor tracking",
      "30-day plan"
    ],
    "about": "VidIQ monthly plan for YouTube SEO, keyword research and channel analytics.",
    "img": "assets/img/logos/vidiq-boost.jpg",
    "oldPrice": 1499,
    "variations": [
      {
        "duration": "30 Days",
        "price": 999,
        "oldPrice": 1499,
        "label": "30 Days",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-netflix",
    "slug": "netflix",
    "name": "Netflix Private Screen – Monthly",
    "category": "Streaming",
    "price": 350,
    "originalPrice": 525,
    "validity": "1 Month Screen",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Private Netflix screen",
      "4K Ultra HD streaming",
      "1-month plan",
      "Watch on mobile, TV and laptop"
    ],
    "about": "Netflix private screen for 1 month with 4K streaming.",
    "img": "assets/img/logos/netflix-4k.jpg",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "1 Month Screen",
        "price": 350,
        "oldPrice": 1500,
        "label": "1M",
        "badge": "4K UHD"
      },
      {
        "duration": "3 Months Screen",
        "price": 999,
        "oldPrice": 4500,
        "label": "3M",
        "badge": "Popular"
      },
      {
        "duration": "6 Months Screen",
        "price": 1850,
        "oldPrice": 9000,
        "label": "6M",
        "badge": "Save 30%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-antigravity",
    "slug": "google-antigravity",
    "name": "Google Antigravity AI Pro",
    "category": "AI Tools",
    "price": 600,
    "originalPrice": 1200,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "startingAt": true,
    "features": [
      "Agentic AI coding platform",
      "Multi-model AI assistance",
      "Build apps with AI agents",
      "1-month plan"
    ],
    "about": "Google Antigravity AI Pro — agentic AI development platform, 1 month.",
    "img": "assets/img/logos/antigravity-ai.jpg",
    "oldPrice": 1200,
    "variations": [
      {
        "duration": "1 Month",
        "price": 600,
        "oldPrice": 1200,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-drive5tb",
    "slug": "google-drive-5tb",
    "name": "Google Drive 5TB",
    "category": "Design",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month Plan",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "On Your Email",
    "startingAt": true,
    "features": [
      "5TB Google Drive storage",
      "Activated on your email",
      "Store files, photos and videos",
      "1-month plan"
    ],
    "about": "Google Drive 5TB storage on your own email, 1 month.",
    "img": "assets/img/logos/google-drive-5tb.jpg",
    "oldPrice": 1500,
    "variations": [
      {
        "duration": "1 Month Plan",
        "price": 300,
        "oldPrice": 1500,
        "label": "1M",
        "badge": "Cloud"
      },
      {
        "duration": "1 Year Plan",
        "price": 3000,
        "oldPrice": 12000,
        "label": "12M",
        "badge": "Lifetime Safe"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-linkedin",
    "slug": "linkedin",
    "name": "LinkedIn Business Premium",
    "category": "SEO Tools",
    "price": 1200,
    "originalPrice": 1800,
    "validity": "1 Month Business",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "startingAt": true,
    "features": [
      "LinkedIn Premium access",
      "InMail credits",
      "Business insights and leads",
      "1-month plan"
    ],
    "about": "LinkedIn Business Premium for 1 month — sales, hiring and networking tools.",
    "img": "assets/img/logos/linkedin-premium.jpg",
    "oldPrice": 4500,
    "variations": [
      {
        "duration": "1 Month Business",
        "price": 1200,
        "oldPrice": 4500,
        "label": "1M",
        "badge": "InMails"
      },
      {
        "duration": "3 Months Business",
        "price": 2999,
        "oldPrice": 12000,
        "label": "3M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months Business",
        "price": 6500,
        "oldPrice": 28000,
        "label": "12M",
        "badge": "Save 55%"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-higgsfield",
    "slug": "higgsfield",
    "name": "Higgsfield AI",
    "category": "AI Video & Voice",
    "price": 5750,
    "originalPrice": 25000,
    "validity": "1 Month Pro",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Cinematic AI video generation",
      "Advanced motion and camera controls",
      "Image-to-video and text-to-video",
      "1-month plan"
    ],
    "about": "Higgsfield AI 1-month plan — cinematic AI video generation.",
    "img": "assets/img/logos/higgsfield-ai.jpg",
    "oldPrice": 12000,
    "variations": [
      {
        "duration": "1 Month Pro",
        "price": 5750,
        "oldPrice": 12000,
        "label": "Pro 1M",
        "badge": "High-Res"
      },
      {
        "duration": "3 Months Ultimate",
        "price": 14000,
        "oldPrice": 32000,
        "label": "Ult 3M",
        "badge": "Best Rate"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-semrush",
    "slug": "semrush",
    "name": "SEMrush",
    "category": "SEO Tools",
    "price": 400,
    "originalPrice": 350,
    "validity": "1 Month Private",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Keyword research tools",
      "Site audit and position tracking",
      "Competitor analysis",
      "30-day plan"
    ],
    "about": "SEMrush SEO toolkit — keyword research, site audit and competitor analysis.",
    "img": "assets/img/logos/semrush-guru.jpg",
    "oldPrice": 35000,
    "variations": [
      {
        "duration": "1 Month Private",
        "price": 400,
        "oldPrice": 35000,
        "label": "1M",
        "badge": "95% OFF"
      },
      {
        "duration": "3 Months Plan",
        "price": 1000,
        "oldPrice": 95000,
        "label": "3M",
        "badge": "SEO Pro"
      },
      {
        "duration": "6 Months Plan",
        "price": 1800,
        "oldPrice": 180000,
        "label": "6M",
        "badge": "Agency"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-canva",
    "slug": "canva",
    "name": "Canva Pro – 1 Year",
    "category": "Design",
    "price": 149,
    "originalPrice": 224,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "startingAt": true,
    "features": [
      "Canva Pro premium templates",
      "Brand kit and magic resize",
      "Background remover",
      "Multiple package options"
    ],
    "about": "Canva Pro premium design access with 1-year package options.",
    "img": "assets/img/logos/canva-pro.jpg",
    "oldPrice": 800,
    "variations": [
      {
        "duration": "1 Month",
        "price": 149,
        "oldPrice": 800,
        "label": "1M",
        "badge": "Entry"
      },
      {
        "duration": "6 Months",
        "price": 299,
        "oldPrice": 1800,
        "label": "6M",
        "badge": "Popular"
      },
      {
        "duration": "12 Months",
        "price": 499,
        "oldPrice": 3500,
        "label": "12M",
        "badge": "Bestseller"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-sora2",
    "slug": "sora-2",
    "name": "Sora 2 AI Number Verified",
    "category": "AI Video & Voice",
    "price": 950,
    "originalPrice": 1425,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Sora 2 text-to-video",
      "Number-verified account",
      "Realistic AI video clips",
      "1-month plan"
    ],
    "about": "Sora 2 AI video generation, number-verified account, 1 month.",
    "img": "assets/img/logos/sora-2-ai.jpg",
    "oldPrice": 1425,
    "variations": [
      {
        "duration": "1 Month",
        "price": 950,
        "oldPrice": 1425,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-envato",
    "slug": "envato",
    "name": "Envato Elements Unlimited Downloads",
    "category": "Design",
    "price": 500,
    "originalPrice": 750,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "startingAt": true,
    "features": [
      "Unlimited downloads",
      "Templates, graphics and stock assets",
      "Audio, video and fonts included",
      "1-month plan"
    ],
    "about": "Envato Elements unlimited downloads — templates, graphics, audio and video.",
    "img": "assets/img/logos/envato-elements.jpg",
    "oldPrice": 750,
    "variations": [
      {
        "duration": "1 Month",
        "price": 500,
        "oldPrice": 750,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-replit",
    "slug": "replit",
    "name": "Replit Core – 1 Month Plan",
    "category": "AI Tools",
    "price": 3500,
    "originalPrice": 5250,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Cloud IDE access",
      "Replit AI agent",
      "Deploy apps instantly",
      "1-month plan"
    ],
    "about": "Replit Core 1-month plan — cloud coding with AI agent.",
    "img": "assets/img/logos/replit-core.jpg",
    "oldPrice": 5250,
    "variations": [
      {
        "duration": "1 Month",
        "price": 3500,
        "oldPrice": 5250,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-protonvpn",
    "slug": "protonvpn",
    "name": "Proton VPN – Premium Plan",
    "category": "VPN",
    "price": 450,
    "originalPrice": 675,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Premium VPN servers",
      "High-speed streaming",
      "Strict no-logs policy",
      "1-month plan"
    ],
    "about": "Proton VPN premium plan for 1 month — fast, secure and private browsing.",
    "img": "assets/img/logos/proton-vpn.jpg",
    "oldPrice": 675,
    "variations": [
      {
        "duration": "1 Month",
        "price": 450,
        "oldPrice": 675,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-wanumber",
    "slug": "whatsapp-number",
    "name": "WhatsApp Any Country Number",
    "category": "SEO Tools",
    "price": 750,
    "originalPrice": 1125,
    "validity": "One-Time",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "One-Time Setup",
    "features": [
      "Any country WhatsApp number",
      "OTP setup included",
      "One-time payment",
      "For business and verification use"
    ],
    "about": "WhatsApp number of any country with OTP setup, one-time.",
    "img": "assets/img/logos/whatsapp-number.jpg",
    "oldPrice": 1125,
    "variations": [
      {
        "duration": "One-Time",
        "price": 750,
        "oldPrice": 1125,
        "label": "One-Time",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-kling",
    "slug": "kling",
    "name": "Kling AI Standard Plan",
    "category": "AI Video & Voice",
    "price": 2250,
    "originalPrice": 3375,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Realistic AI video generation",
      "Text-to-video and image-to-video",
      "High-quality motion",
      "1-month plan"
    ],
    "about": "Kling AI standard plan — realistic AI video generation, 1 month.",
    "img": "assets/img/logos/kling-ai.jpg",
    "oldPrice": 3375,
    "variations": [
      {
        "duration": "1 Month",
        "price": 2250,
        "oldPrice": 3375,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-skillshare",
    "slug": "skillshare",
    "name": "Skillshare Premium Membership",
    "category": "Design",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited premium classes",
      "Design, business and creative courses",
      "Learn from experts",
      "1-month plan"
    ],
    "about": "Skillshare premium membership — unlimited classes for 1 month.",
    "img": "assets/img/logos/skillshare.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-quillbot",
    "slug": "quillbot",
    "name": "QuillBot Premium Plan",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI paraphraser",
      "Grammar checker",
      "Summarizer and citation tools",
      "1-month plan"
    ],
    "about": "QuillBot premium — AI paraphrasing, grammar and writing tools.",
    "img": "assets/img/logos/quillbot-premium.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-amazonprime",
    "slug": "amazon-prime",
    "name": "Amazon Prime Video 4K UHD",
    "category": "Streaming",
    "price": 350,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "4K UHD streaming",
      "Prime Video movies and series",
      "Watch on any device",
      "1-month plan"
    ],
    "about": "Amazon Prime Video 4K UHD for 1 month.",
    "img": "assets/img/logos/prime-video.jpg",
    "oldPrice": 1200,
    "variations": [
      {
        "duration": "1 Month",
        "price": 350,
        "oldPrice": 1200,
        "label": "1M",
        "badge": "4K UHD"
      },
      {
        "duration": "6 Months",
        "price": 1400,
        "oldPrice": 3500,
        "label": "6M",
        "badge": "Save 45%"
      },
      {
        "duration": "12 Months",
        "price": 2200,
        "oldPrice": 5500,
        "label": "12M",
        "badge": "Best Value"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-grammarly",
    "slug": "grammarly",
    "name": "Grammarly Premium Plan",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Advanced grammar checking",
      "Tone and clarity suggestions",
      "Plagiarism detector",
      "1-month plan"
    ],
    "about": "Grammarly premium — advanced grammar, tone and plagiarism checks.",
    "img": "assets/img/logos/grammarly-pro.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-coursera",
    "slug": "coursera",
    "name": "Coursera Plus Premium Plan",
    "category": "Design",
    "price": 400,
    "originalPrice": 600,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited course access",
      "Certificates from top universities",
      "Professional certificates",
      "1-month plan"
    ],
    "about": "Coursera Plus premium — unlimited courses and certificates, 1 month.",
    "img": "assets/img/logos/coursera-plus.jpg",
    "oldPrice": 600,
    "variations": [
      {
        "duration": "1 Month",
        "price": 400,
        "oldPrice": 600,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-moz",
    "slug": "moz",
    "name": "Moz Pro SEO Tool",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Rank tracking",
      "Keyword explorer",
      "Site crawl and audit",
      "1-month plan"
    ],
    "about": "Moz Pro SEO tool — rank tracking, keyword research and site audits.",
    "img": "assets/img/logos/moz-pro.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-ubersuggest",
    "slug": "ubersuggest",
    "name": "Ubersuggest PRO SEO Tool",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Keyword suggestions",
      "Competitor traffic analysis",
      "Site audit",
      "1-month plan"
    ],
    "about": "Ubersuggest PRO — keyword ideas, traffic analysis and SEO audits.",
    "img": "assets/img/logos/ubersuggest.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-stealthwriter",
    "slug": "stealthwriter",
    "name": "StealthWriter AI Humanizer Pro",
    "category": "AI Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI text humanizer",
      "Bypass AI detectors",
      "Multiple humanization levels",
      "1-month plan"
    ],
    "about": "StealthWriter AI humanizer pro — make AI text sound human.",
    "img": "assets/img/logos/stealthwriter.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-storyblocks",
    "slug": "storyblocks",
    "name": "Storyblocks Unlimited Video & Audio",
    "category": "Design",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited stock video",
      "Royalty-free music and SFX",
      "After Effects templates",
      "1-month plan"
    ],
    "about": "Storyblocks unlimited video and audio downloads, 1 month.",
    "img": "assets/img/logos/storyblocks.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-wordtune",
    "slug": "wordtune",
    "name": "Wordtune Premium AI Writer",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI rewriting",
      "Tone adjustment",
      "Smart suggestions",
      "1-month plan"
    ],
    "about": "Wordtune premium AI writer — rewrite, shorten and improve text.",
    "img": "assets/img/logos/wordtune.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-indexification",
    "slug": "indexification",
    "name": "Indexification Backlink Indexer",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Fast backlink indexing",
      "Bulk URL submission",
      "Indexing reports",
      "1-month plan"
    ],
    "about": "Indexification backlink indexer — get your backlinks indexed fast.",
    "img": "assets/img/logos/indexification.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-kwfinder",
    "slug": "kwfinder",
    "name": "KWFinder by Mangools SEO",
    "category": "SEO Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Keyword difficulty score",
      "SERP analysis",
      "Long-tail keyword ideas",
      "1-month plan"
    ],
    "about": "KWFinder by Mangools — find low-competition keywords, 1 month.",
    "img": "assets/img/logos/kwfinder.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-spyfu",
    "slug": "spyfu",
    "name": "SpyFu SEO & PPC Research",
    "category": "SEO Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Competitor keyword research",
      "PPC ad history",
      "Backlink analysis",
      "1-month plan"
    ],
    "about": "SpyFu SEO and PPC research — spy on competitors' keywords and ads.",
    "img": "assets/img/logos/spyfu.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-vecteezy",
    "slug": "vecteezy",
    "name": "Vecteezy Pro Unlimited",
    "category": "Design",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited vector downloads",
      "Photos and stock video",
      "Pro license included",
      "1-month plan"
    ],
    "about": "Vecteezy Pro unlimited — vectors, photos and videos, 1 month.",
    "img": "assets/img/logos/vecteezy.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-majestic",
    "slug": "majestic",
    "name": "Majestic SEO Pro Plan",
    "category": "SEO Tools",
    "price": 400,
    "originalPrice": 600,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Backlink index",
      "Trust Flow and Citation Flow",
      "Site Explorer",
      "1-month plan"
    ],
    "about": "Majestic SEO pro — backlink intelligence and trust flow metrics.",
    "img": "assets/img/logos/majestic-seo.jpg",
    "oldPrice": 600,
    "variations": [
      {
        "duration": "1 Month",
        "price": 400,
        "oldPrice": 600,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-keywordseverywhere",
    "slug": "keywords-everywhere",
    "name": "Keywords Everywhere SEO Tool",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Keyword volume in search results",
      "Related keywords",
      "Works on Google and YouTube",
      "1-month plan"
    ],
    "about": "Keywords Everywhere — keyword data in your browser, 1 month.",
    "img": "assets/img/logos/keywords-everywhere.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-spinrewriter",
    "slug": "spin-rewriter",
    "name": "Spin Rewriter AI Spinner",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI article rewriting",
      "Bulk article spinning",
      "Plagiarism-free output",
      "1-month plan"
    ],
    "about": "Spin Rewriter AI spinner — rewrite articles with AI, 1 month.",
    "img": "assets/img/logos/spin-rewriter.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-copymatic",
    "slug": "copymatic",
    "name": "Copymatic AI Copywriter",
    "category": "AI Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI ad and blog copy",
      "Long-form writer",
      "SEO content tools",
      "1-month plan"
    ],
    "about": "Copymatic AI copywriter — ads, blogs and product copy in seconds.",
    "img": "assets/img/logos/copymatic.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-youcom",
    "slug": "youcom",
    "name": "You.com – YouPro AI Search",
    "category": "AI Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI search with citations",
      "Access to multiple AI models",
      "AI writing and coding",
      "1-month plan"
    ],
    "about": "You.com YouPro — AI search with multiple models, 1 month.",
    "img": "assets/img/logos/you-ai.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-smodin",
    "slug": "smodin",
    "name": "Smodin AI Writer & Checker",
    "category": "SEO Tools",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI writer and rewriter",
      "Plagiarism checker",
      "Multi-language support",
      "1-month plan"
    ],
    "about": "Smodin AI writer and checker — write, rewrite and check content.",
    "img": "assets/img/logos/smodin.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-wordhero",
    "slug": "wordhero",
    "name": "WordHero AI Content Writer",
    "category": "AI Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI blog writer",
      "Ad and social copy",
      "Long-form content mode",
      "1-month plan"
    ],
    "about": "WordHero AI content writer — blogs, ads and social posts, 1 month.",
    "img": "assets/img/logos/wordhero.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-invideo",
    "slug": "invideo",
    "name": "InVideo Studio AI Video Maker",
    "category": "AI Video & Voice",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI video creation",
      "5000+ templates",
      "Stock media library",
      "1-month plan"
    ],
    "about": "InVideo Studio AI video maker — templates and AI editing, 1 month.",
    "img": "assets/img/logos/invideo-studio.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-wordai",
    "slug": "wordai",
    "name": "WordAi Article Rewriter",
    "category": "SEO Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Human-quality rewriting",
      "Bulk rewrite mode",
      "Sentence restructuring",
      "1-month plan"
    ],
    "about": "WordAi article rewriter — human-quality AI rewriting, 1 month.",
    "img": "assets/img/logos/wordai.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-placeit",
    "slug": "placeit",
    "name": "Placeit by Envato Unlimited",
    "category": "Design",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited mockups",
      "Logo maker",
      "Video templates",
      "1-month plan"
    ],
    "about": "Placeit by Envato unlimited — mockups, logos and videos, 1 month.",
    "img": "assets/img/logos/placeit.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-rewritify",
    "slug": "rewritify",
    "name": "Rewritify AI Humanizer",
    "category": "AI Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI text humanizer",
      "Bypass AI detection",
      "Multiple writing modes",
      "1-month plan"
    ],
    "about": "Rewritify AI humanizer — undetectable human-style AI text.",
    "img": "assets/img/logos/rewritify.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-bypassgpt",
    "slug": "bypassgpt",
    "name": "BypassGPT Undetectable AI",
    "category": "AI Tools",
    "price": 300,
    "originalPrice": 450,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Undetectable AI humanizer",
      "Bypass major AI detectors",
      "Plagiarism-free output",
      "1-month plan"
    ],
    "about": "BypassGPT undetectable AI — humanize AI content, 1 month.",
    "img": "assets/img/logos/bypassgpt.jpg",
    "oldPrice": 450,
    "variations": [
      {
        "duration": "1 Month",
        "price": 300,
        "oldPrice": 450,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-motionarray",
    "slug": "motionarray",
    "name": "Motion Array Unlimited",
    "category": "Design",
    "price": 400,
    "originalPrice": 600,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited video templates",
      "Premiere Pro and After Effects presets",
      "Stock video and music",
      "1-month plan"
    ],
    "about": "Motion Array unlimited — video templates, presets and stock, 1 month.",
    "img": "assets/img/logos/motion-array.jpg",
    "oldPrice": 600,
    "variations": [
      {
        "duration": "1 Month",
        "price": 400,
        "oldPrice": 600,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-udemy",
    "slug": "udemy",
    "name": "Udemy Pro Courses Access",
    "category": "Design",
    "price": 400,
    "originalPrice": 600,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited course access",
      "Certificates of completion",
      "Business and tech courses",
      "1-month plan"
    ],
    "about": "Udemy Pro courses access — unlimited learning, 1 month.",
    "img": "assets/img/logos/udemy-pro.jpg",
    "oldPrice": 600,
    "variations": [
      {
        "duration": "1 Month",
        "price": 400,
        "oldPrice": 600,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-spamzilla",
    "slug": "spamzilla",
    "name": "SpamZilla Expired Domains SEO",
    "category": "SEO Tools",
    "price": 400,
    "originalPrice": 600,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Expired domain finder",
      "Backlink and spam checks",
      "Domain metrics",
      "1-month plan"
    ],
    "about": "SpamZilla expired domains SEO — find valuable expired domains.",
    "img": "assets/img/logos/spamzilla.jpg",
    "oldPrice": 600,
    "variations": [
      {
        "duration": "1 Month",
        "price": 400,
        "oldPrice": 600,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-jasper",
    "slug": "jasper",
    "name": "Jasper AI Pro Copywriter",
    "category": "AI Tools",
    "price": 400,
    "originalPrice": 600,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "AI marketing copy",
      "Brand voice controls",
      "Long-form documents",
      "1-month plan"
    ],
    "about": "Jasper AI pro copywriter — marketing copy with brand voice, 1 month.",
    "img": "assets/img/logos/jasper-ai.jpg",
    "oldPrice": 600,
    "variations": [
      {
        "duration": "1 Month",
        "price": 400,
        "oldPrice": 600,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-flaticon",
    "slug": "flaticon",
    "name": "Flaticon Premium Unlimited",
    "category": "Design",
    "price": 200,
    "originalPrice": 300,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "features": [
      "Unlimited icon downloads",
      "Premium icon packs",
      "SVG and PNG formats",
      "1-month plan"
    ],
    "about": "Flaticon premium unlimited — icons and stickers, 1 month.",
    "img": "assets/img/logos/flaticon.jpg",
    "oldPrice": 300,
    "variations": [
      {
        "duration": "1 Month",
        "price": 200,
        "oldPrice": 300,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  },
  {
    "id": "p-googleaipro",
    "slug": "google-ai-pro",
    "name": "Google AI Pro – Private Plan",
    "category": "AI Tools",
    "price": 999,
    "originalPrice": 1499,
    "validity": "1 Month",
    "stock": 20,
    "trial": false,
    "bestSeller": true,
    "accessType": "Private Account",
    "startingAt": true,
    "features": [
      "Gemini Advanced access",
      "Google Flow AI video",
      "2TB storage options",
      "1-month plan"
    ],
    "about": "Google AI Pro private plan — Gemini Advanced and Google Flow, 1 month.",
    "img": "assets/img/logos/google-one-2tb.jpg",
    "oldPrice": 1499,
    "variations": [
      {
        "duration": "1 Month",
        "price": 999,
        "oldPrice": 1499,
        "label": "1 Month",
        "badge": "Official"
      }
    ],
    "activeVariationIndex": 0
  }
];
/* Per-product display fields (PakTools-style cards): bestSeller badge,
   access type line, warranty line. Defaults filled in below. */
(function () {
  var BEST = { "h-chatgpt": 1, "h-veo3": 1, "h-capcut": 1 };
  var ACCESS = { "h-chatgpt": "Private Account", "h-claude": "Private Account", "h-veo3": "On Your Email", "h-supergrok": "Private Account", "h-gemini": "On Your Email", "h-heygen600": "Private Account", "h-heygen200": "Private Account", "h-youtube": "Private Account", "h-spotify1": "Private Account", "h-spotify6": "Private Account", "h-spotify12": "Private Account", "h-nordvpn": "Private Account", "h-surfshark": "Private Account", "h-gmail": "On Your Email", "h-figma": "Private Account", "h-adobecc": "Private Account", "h-elevenlabs": "Private Account", "h-capcut": "Private Account", "h-muse1b": "Private Account", "h-muse30b": "Private Account", "h-imagestool": "Private Account", "h-voiceover": "Private Account", "h-perplexity": "Private Account" };
  window.DEFAULT_PRODUCTS.forEach(function (p) {
    if (p.bestSeller === undefined) p.bestSeller = !!BEST[p.id];
    if (p.accessType === undefined) p.accessType = ACCESS[p.id] || "";
    if (p.warranty === undefined) p.warranty = "Warranty Included";
  });
})();

/* Course cards shown on the homepage (static catalogue data). */
window.DEFAULT_COURSES = [
  {
    id: "c-youtube", name: "YouTube Automation", category: "YouTube Automation", price: 3000, originalPrice: null, img: "assets/img/posters/poster-youtube.webp", validity: "Lifetime Access",
    features: ["Complete step-by-step course", "Niche selection guidance", "Content automation methods", "Lifetime access"],
    about: "Learn how to build and grow a faceless YouTube channel with automation — from niche selection to uploads."
  },
  {
    id: "c-tiktok", name: "TikTok Automation", category: "TikTok Automation", price: 3000, originalPrice: null, img: "assets/img/posters/poster-tiktok.webp", validity: "Lifetime Access",
    features: ["Complete step-by-step course", "Viral content strategies", "Account growth methods", "Lifetime access"],
    about: "Learn how to grow TikTok accounts with automation — viral formats, posting systems and growth."
  },
  {
    id: "c-facebook", name: "Facebook Automation", category: "Facebook Automation", price: 3000, originalPrice: null, img: "assets/img/posters/poster-facebook.webp", validity: "Lifetime Access",
    features: ["Complete step-by-step course", "Page growth strategies", "Monetization methods", "Lifetime access"],
    about: "Learn how to grow Facebook pages with automation — content systems, growth and monetization."
  },
  {
    id: "c-ecommerce", name: "Ecommerce Course", category: "Ecommerce", price: 3000, originalPrice: null, img: "assets/img/posters/poster-ecommerce.webp", validity: "Lifetime Access",
    features: ["Complete step-by-step course", "Store setup guidance", "Product research methods", "Lifetime access"],
    about: "Learn how to start your own ecommerce store — product research, store setup and first sales."
  }
];

window.DEFAULT_SETTINGS = {
  tickerText: "✨ Instant Response 11am–11pm • Trusted & Verified • Delivery Time is 45 minutes ✨",
  heroKicker: "MEGA DEAL",
  heroTitle: "Buy 2 Get 1 Free on all AI tools",
  heroSubtitle: "Premium AI tools at the lowest prices in Pakistan. Instant delivery on WhatsApp.",
  heroImage: "assets/img/logos/chatgpt-plus.jpg",
  whatsappNumber: "923147505963",
  channelLink: "https://whatsapp.com/channel/0029Vb8T3I877qVRP9472138",
  guidanceTitle: "Abhi tak success nahi hue? Pareshan na hon!",
  guidanceText: "Agar aap kisi prompt, niche ya tool me phase hain to WhatsApp par FREE guidance lein.",
  welcomeTitle: "Welcome to Rehmat Tools by Saqib",
  paymentMethods: [
    { name: "JazzCash", accountTitle: "Naghma Ejaz", number: "", visible: true },
    { name: "Easypaisa", accountTitle: "Naghma Ejaz", number: "", visible: true },
    { name: "Nayapay", accountTitle: "", number: "", visible: true },
    { name: "Binance", accountTitle: "Crypto Trader", number: "814018526", visible: true },
    { name: "UPI", accountTitle: "", number: "", visible: true }
  ],
  coupons: [],
  heroTrustChips: ["⚡ 45 Min Delivery", "🛡️ Warranty Included", "💳 JazzCash / Easypaisa"],
  heroStats: [
    { value: "73", label: "Premium Tools" },
    { value: "45 Min", label: "Fast Delivery" },
    { value: "24/7", label: "WhatsApp Support" },
    { value: "100%", label: "Genuine Access" }
  ],
  featuredDeal: { enabled: true, productId: "h-veo3", title: "🔥 Featured Deal", badge: "Admin Verified Deal", points: ["All models included", "Private & secure account", "Fast delivery on WhatsApp"] },
  trustBar: "27 Verified Tools ✦ 45 Minutes Delivery ✦ Warranty Included ✦ 24/7 WhatsApp Support ✦ Transparent PKR Pricing",
  trustBarEnabled: true,
  popularSearches: ["ChatGPT Plus", "Veo 3", "CapCut Pro", "HeyGen", "Spotify"],
  featureCards: [
    { icon: "⚡", title: "Fast Delivery", text: "Access within 45 minutes on WhatsApp after payment." },
    { icon: "🛡️", title: "Warranty Included", text: "Free replacement cover on every tool." },
    { icon: "💬", title: "Premium Support", text: "Real human support on WhatsApp, 24/7." },
    { icon: "🔄", title: "Always Updated", text: "Latest plans and fresh stock, updated regularly." },
    { icon: "🔒", title: "Private & Secure", text: "Your account details stay private and safe." },
    { icon: "💳", title: "Easy Payments", text: "JazzCash, Easypaisa, Nayapay and Binance accepted." }
  ],
  faqs: [
    { q: "How fast will I get my tool after payment?", a: "Delivery time is 45 minutes. Access details are shared on WhatsApp after payment confirmation." },
    { q: "What is the warranty on tools?", a: "Every tool comes with a warranty. If access stops working within the warranty period, we replace it free." },
    { q: "How do I pay?", a: "JazzCash, Easypaisa, Nayapay or Binance. Payment details are shared on WhatsApp — advance payment is required." },
    { q: "Are the accounts private or shared?", a: "It depends on the tool — each product card shows its access type (Private, Shared or On Your Email)." }
  ],
  ctaTitle: "Ready to start?",
  ctaText: "Get the premium tools you need — without overpaying.",
  footerAbout: "100% trusted and verified AI tools with complete honesty and transparency. Premium tools at the lowest prices in Pakistan — instant delivery on WhatsApp.",
  footerTrust: "24/7 Support • 27 Verified Tools • Warranty Included • 100% Genuine",
  couponWidgetEnabled: true,
  howSteps: [
    { title: "Step 1: Select your product and package", text: "Browse our verified catalog, open any product, and choose your preferred package and duration with transparent PKR pricing." },
    { title: "Step 2: Complete the payment and order process", text: "Transfer the exact PKR amount via JazzCash, Easypaisa, Nayapay or Binance, then share your payment screenshot on WhatsApp." },
    { title: "Step 3: Receive your digital product and support", text: "Once payment is verified, your login details or activation are delivered within 45 minutes via WhatsApp, backed by our warranty." }
  ],
  supportEmail: "",
  refundNotice: "Digital products are final sale once delivered (45 minutes WhatsApp delivery). Every tool includes a warranty — if access stops working within the warranty period, we replace it free.",
  policies: [
    { title: "Refund Policy", text: "Digital products are final sale once delivered. If the access does not work at delivery and we cannot repair or replace it within 1–2 business days, a refund is issued." },
    { title: "Replacement Warranty", text: "Every tool includes a warranty. If access stops working within the warranty period, we replace it free on WhatsApp." },
    { title: "Digital Delivery Policy", text: "Delivery time is 45 minutes. Access details are shared on WhatsApp after payment confirmation." },
    { title: "Account Usage Policy", text: "Each product page shows its access type (Private, Shared or On Your Email). Do not share private account credentials with others." },
    { title: "Privacy Policy", text: "Your contact details are used only to deliver your order and provide support. We never sell or share your information." },
    { title: "Terms & Conditions", text: "Advance payment is required for all orders. Prices and availability may change without notice." }
  ]
};

/* ---------- shared store helpers (used by site.js and admin.js) ---------- */
window.Store = (function () {
  var KEY = "rehmat_site_v6";
  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }
  return {
    KEY: KEY,
    load: function () {
      var fresh = { products: deepCopy(window.DEFAULT_PRODUCTS), settings: deepCopy(window.DEFAULT_SETTINGS), courses: deepCopy(window.DEFAULT_COURSES || []), reviews: [], proofs: [] };
      try {
        var raw = localStorage.getItem(KEY);
        if (!raw) {
          // Check for previous version keys
          raw = localStorage.getItem("rehmat_site_v3") || localStorage.getItem("rehmat_site_v2") || localStorage.getItem("rehmat_site_v1");
        }
        if (raw) {
          var s = JSON.parse(raw);
          if (s && s.settings) {
            for (var k in s.settings) {
              if (k === "heroImage" && s.settings[k] && !s.settings[k].includes("-h-")) {
                s.settings[k] = "assets/img/posters/poster-h-chatgpt.webp";
              }
              fresh.settings[k] = s.settings[k];
            }
          }
          // Only keep stored products if they have the complete catalogue with multi-duration variations
          if (s && s.products && s.products.length >= window.DEFAULT_PRODUCTS.length && s.products[0] && s.products[0].variations) {
            fresh.products = s.products;
          }
          if (s && s.courses && s.courses.length) fresh.courses = s.courses;
          if (s && s.reviews) fresh.reviews = s.reviews;
          if (s && s.proofs) fresh.proofs = s.proofs;
          return fresh;
        }
      } catch (e) { /* corrupted -> fall back to defaults */ }
      return fresh;
    },
    save: function (store) {
      localStorage.setItem(KEY, JSON.stringify(store));
    },
    reset: function () {
      var fresh = { products: deepCopy(window.DEFAULT_PRODUCTS), settings: deepCopy(window.DEFAULT_SETTINGS), courses: deepCopy(window.DEFAULT_COURSES || []), reviews: [], proofs: [] };
      this.save(fresh);
      return fresh;
    }
  };
})();

/* ---------- tiny shared utilities ---------- */
window.RT = {
  esc: function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  },
  wa: function (num, text) {
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
  },
  money: function (n) {
    n = Number(n) || 0;
    return "Rs. " + n.toLocaleString("en-PK");
  }
};

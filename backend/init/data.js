const sampleEvents = [
  {
    title: "Annual Marathon 2024",
    description:
      "Join thousands of runners for the city's most anticipated marathon event. Experience the thrill of running through scenic routes and crossing the finish line.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 50,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Tech Innovation Hackathon",
    description:
      "24-hour coding competition where developers build innovative solutions. Win cash prizes and network with tech leaders!",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 75,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Summer Music Festival 2024",
    description:
      "Three-day outdoor music festival featuring top artists across multiple genres. Enjoy live performances, food vendors, and camping options.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 120,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "International Film Festival",
    description:
      "Celebrate cinema with screenings of award-winning films from around the world. Meet filmmakers and enjoy red carpet premieres.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 35,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Basketball Championship Finals",
    description:
      "Watch the two best teams compete for the championship title. Experience intense playoff action and unforgettable moments.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 150,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Comedy Night Extravaganza",
    description:
      "Laugh out loud with performances by internationally acclaimed comedians. A night of pure entertainment and hilarity.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 45,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Outdoor Adventure Expo",
    description:
      "Explore the latest in outdoor gear and adventure activities. Join workshops and meet experienced adventurers from around the world.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 30,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Business Startup Summit",
    description:
      "Network with entrepreneurs and investors. Attend keynotes from successful founders and pitch your business ideas.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 200,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Winter Ski Championship",
    description:
      "Watch world-class skiers compete in downhill and slalom events. Experience alpine sports at its finest.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 85,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Wildlife Photography Workshop",
    description:
      "Learn wildlife photography from expert photographers. Capture stunning moments in the African savanna.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 250,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Art and Design Conference",
    description:
      "Discover cutting-edge art and design trends. Network with artists, designers, and creative professionals from around the globe.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 120,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Island Music Festival",
    description:
      "Experience tropical vibes with electronic and reggae performances. An exclusive island getaway with world-class entertainment.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 500,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Food & Wine Tasting Festival",
    description:
      "Indulge in culinary delights and fine wines. Sample dishes from Michelin-starred chefs and boutique vineyards.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 95,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Jazz Night Concert",
    description:
      "Enjoy smooth jazz performances by legendary musicians. An elegant evening of world-class music and sophistication.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 65,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Yoga and Wellness Retreat",
    description:
      "Rejuvenate your mind and body in paradise. Daily yoga sessions, meditation, and holistic wellness treatments.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 180,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Hiking and Mountain Trail Adventure",
    description:
      "Guided mountain expeditions for all skill levels. Explore breathtaking trails with experienced mountain guides.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 110,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Fashion Week Runway Show",
    description:
      "Experience haute couture and cutting-edge fashion designs. See collections from renowned designers on the runway.",
    image: {
      filename: "eventimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 150,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Electronic Music Festival",
    description:
      "Dance all night to electronic beats from world-famous DJs. A tropical paradise meets electronic music extravaganza.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 200,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "Historical Walking Tour and Lecture",
    description:
      "Explore medieval castles and hear fascinating historical stories. Guided tours through centuries of heritage.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 40,
    location: "Scottish Highlands",
    country: "United Kingdom",
  },
  {
    title: "Luxury Automotive Expo",
    description:
      "Showcase of supercars and luxury vehicles. Test drive exotic cars and meet automotive enthusiasts from worldwide.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 75,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Rock Concert - Live Band Performance",
    description:
      "Experience electrifying rock music from legendary bands. A night of headbanging, energy, and unforgettable memories.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 85,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Sailing and Water Sports Championship",
    description:
      "Watch competitive sailing races in crystal-clear Mediterranean waters. Spectator boats available for the best views.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 65,
    location: "Mykonos",
    country: "Greece",
  },
  {
    title: "Eco-Tourism and Conservation Summit",
    description:
      "Learn about sustainable travel and environmental conservation. Network with eco-warriors and nature conservationists.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 55,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "Theater Arts Festival",
    description:
      "World-class theatrical performances and productions. Broadway shows meet classic and contemporary drama.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 75,
    location: "Charleston",
    country: "United States",
  },
  {
    title: "Gaming and Esports Tournament",
    description:
      "Competitive gaming championship with prize pool. Watch pro gamers battle in popular titles with millions of viewers.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 95,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Scientific Research Conference",
    description:
      "Leading scientists present groundbreaking research. Attend workshops on latest discoveries in science and technology.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 130,
    location: "New Hampshire",
    country: "United States",
  },
  {
    title: "Luxury Resort Wedding Expo",
    description:
      "Dream wedding showcase with venues, planners, and vendors. Plan your perfect destination wedding in paradise.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 85,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Winter Sports Festival",
    description:
      "All-inclusive winter sports extravaganza. Skiing, snowboarding, ice skating, and more in world-class facilities.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 150,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Surfing Championship Series",
    description:
      "Watch world champion surfers compete in perfect ocean waves. Experience the thrill of professional surfing.",
    image: {
      filename: "eventimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 70,
    location: "Costa Rica",
    country: "Costa Rica",
  },
];

module.exports = { data: sampleEvents };

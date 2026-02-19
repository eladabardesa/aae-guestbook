/**
 * AAE Guestbook · Artworks and contributions
 * Placeholder images (picsum) and sample data for "same artwork, different walkers" story.
 */

(function (global) {
  const ARTWORKS = [
    { id: '1', imageUrl: 'https://picsum.photos/seed/aae1/800/600', title: 'Untitled (horizon)' },
    { id: '2', imageUrl: 'https://picsum.photos/seed/aae2/800/600', title: 'Composition in blue' },
    { id: '3', imageUrl: 'https://picsum.photos/seed/aae3/800/600', title: 'Still life' },
    { id: '4', imageUrl: 'https://picsum.photos/seed/aae4/800/600', title: 'Figure study' },
    { id: '5', imageUrl: 'https://picsum.photos/seed/aae5/800/600', title: 'Landscape' },
    { id: '6', imageUrl: 'https://picsum.photos/seed/aae6/800/600', title: 'Abstract' },
    { id: '7', imageUrl: 'https://picsum.photos/seed/aae7/800/600', title: 'Portrait' },
    { id: '8', imageUrl: 'https://picsum.photos/seed/aae8/800/600', title: 'Installation' },
  ];

  // Contributions: artworkId, author, date (ISO), text, gameType
  // User story: same artwork (e.g. id 1) chosen by someone 2 months ago + you can add yours
  const CONTRIBUTIONS = [
    {
      id: 'c1',
      artworkId: '1',
      author: 'Jordan',
      date: '2024-12-18',
      text: 'I would give this to my mom. She always loved wide skies. This piece makes me think of her quiet strength.',
      gameType: 'An Offering',
    },
    {
      id: 'c2',
      artworkId: '1',
      author: 'Anonymous',
      date: '2025-02-19',
      text: 'I chose this one too — same as Jordan. Reading their words made me feel connected to a stranger from months ago.',
      gameType: 'Dear Artist',
    },
    {
      id: 'c3',
      artworkId: '2',
      author: 'Sam',
      date: '2025-01-10',
      text: 'I’d keep this one and pass the red one on. These three together: "What the room remembers."',
      gameType: 'Curated by…',
    },
    {
      id: 'c4',
      artworkId: '3',
      author: 'Riley',
      date: '2024-12-20',
      text: 'Dear artist — I don’t know why this one stuck. I’m not usually into still life. Thank you.',
      gameType: 'Dear Artist',
    },
    {
      id: 'c5',
      artworkId: '4',
      author: 'Morgan',
      date: '2025-02-01',
      text: 'I’d give it to my sister. She sees people the way this work does.',
      gameType: 'An Offering',
    },
    {
      id: 'c6',
      artworkId: '5',
      author: 'Casey',
      date: '2024-12-15',
      text: 'Keep: this one. Discuss: with my dad. Leave behind: the one that felt like a lecture.',
      gameType: 'Doggy Bag',
    },
  ];

  global.AAE_DATA = {
    artworks: ARTWORKS,
    contributions: CONTRIBUTIONS,
  };
})(typeof window !== 'undefined' ? window : this);

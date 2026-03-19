module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const categories = [
    { id: 1, name: 'Tech', emoji: '💻', color: '#00d4ff', desc: 'AI breakthroughs, gadgets, and the future of tech' },
    { id: 2, name: 'World', emoji: '🌍', color: '#ff6b6b', desc: 'Global events shaping our world today' },
    { id: 3, name: 'Business', emoji: '💼', color: '#ffd700', desc: 'Markets, companies, and the economy' },
    { id: 4, name: 'Sports', emoji: '⚽', color: '#2ecc71', desc: 'Scores, trades, and athletic triumphs' },
    { id: 5, name: 'Science', emoji: '🔬', color: '#9b59b6', desc: 'Discoveries, medicine, and the cosmos' },
    { id: 6, name: 'Entertainment', emoji: '🎬', color: '#e91e63', desc: 'Movies, TV, music, and celebrity news' },
    { id: 7, name: 'Health', emoji: '🏥', color: '#00bfa5', desc: 'Fitness, nutrition, and wellness' },
    { id: 8, name: 'I Feel Lucky', emoji: '🍀', color: '#ffd700', desc: 'Random news from all categories!' },
  ];

  res.json(categories);
};

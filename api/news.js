// Using global fetch (Node 18+ built-in)

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category } = req.query;
  const apiKey = process.env.BRAVE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'BRAVE_API_KEY environment variable not set. Please configure it in Vercel project settings.'
    });
  }

  // Map category IDs to Brave News topics
  const categoryMap = {
    1: 'technology news',
    2: 'world news',
    3: 'business news',
    4: 'sports news',
    5: 'science news',
    6: 'entertainment news',
  };

  const topic = categoryMap[category] || 'technology news';
  const url = `https://api.search.brave.com/res/v1/news/search?q=${encodeURIComponent(topic)}&freshness=pd&count=20`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': apiKey,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Brave API error:', response.status, text);
      return res.status(response.status).json({ error: 'Brave API request failed', details: text });
    }

    const data = await response.json();
    const results = data.results || [];

    // Take up to 15 articles
    const articles = results.slice(0, 15).map((item, i) => {
      const description = item.description || '';
      const teaser = description.substring(0, 120) + (description.length > 120 ? '...' : '');
      const source = item.meta_url?.hostname?.replace(/^www\./, '') || item.source?.name || 'Brave';

      return {
        id: `b${category}${i + 1}`,
        headline: item.title,
        teaser: teaser,
        source: source,
        time: '24h',
        url: item.url,
        summary: `${description}\n\nSource: ${item.url}`,
      };
    });

    res.json(articles);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to fetch news', message: err.message });
  }
};

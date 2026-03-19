const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category } = req.query;

  // Brave Search API key - must be set as Vercel environment variable
  const API_KEY = process.env.BRAVE_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: 'BRAVE_API_KEY environment variable not set. Please configure it in Vercel project settings.'
    });
  }

  // Map category IDs to Brave News topics
  const categoryMap = {
    1: 'technology',
    2: 'world',
    3: 'business',
    4: 'sports',
    5: 'science',
    6: 'entertainment',
  };

  const topic = categoryMap[category] || 'technology';

  const url = `https://api.search.brave.com/res/v1/news/search?q=${encodeURIComponent(topic)}&freshness=pd&count=9`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Brave API error:', response.status, text);
      return res.status(response.status).json({ error: 'Brave API request failed', details: text });
    }

    const data = await response.json();

    // Parse Brave response into our article format
    const articles = (data.results || []).slice(0, 3).map((item, i) => {
      const description = item.description || '';
      return {
        id: `b${category}${i}`,
        headline: item.title,
        teaser: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
        source: item.meta_url?.hostname?.replace(/^www\./, '') || 'Brave',
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

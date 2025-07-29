import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';

const API_BASE_URL = process.env.TICKETS_API_BASE_URL;
const API_KEY = process.env.TICKETS_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', config.sitecoreApiHost);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');
  try {
    const { eventId } = req.query;

    const url = eventId ? `${API_BASE_URL}/api/tickets/${eventId}` : `${API_BASE_URL}/api/tickets`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY || '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ message: 'Failed to fetch from API', details: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: unknown) {
    console.error('API proxy error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

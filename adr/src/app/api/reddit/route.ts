import Error from 'next/error';
import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = 'whtkAPh9M4SL16HJ8V18vQ';
const CLIENT_SECRET = 'DIqtfVsZGr8lSboO1r6SxsAjL5ViWg';
const REDDIT_API = 'https://www.reddit.com/api/v1/access_token';

async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch(REDDIT_API, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Lavi/1.0 (by Wonderful-Low-2091)',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  
  return { success: true, access_token: data.access_token, expires_in: data.expires_in }
}

export async function GET(request: NextRequest) {
  try {
    // Extract subreddit name from query params
    const { searchParams } = new URL(request.url);
    const subreddit = searchParams.get('subreddit') || 'Supplements'; // Default subreddit

    // Get access token
    const accessToken = await getAccessToken();

    // Fetch posts from subreddit
    const redditResponse = await fetch(`https://oauth.reddit.com/r/${subreddit}/new?limit=200`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'LaviBot/1.0 (by Wonderful-Low-2091)',
      },
    });

    const redditData = await redditResponse.json();

    const formattedData = redditData.data.children.map((post: any) => ({
        platform: 'Reddit',
        date: new Date(post.data.created_utc * 1000).toISOString(),
        content: post.data.title,
        engagement: {
          likes: post.data.ups || 0,
          shares: 0, // Reddit does not have a direct share metric
          comments: post.data.num_comments || 0,
        },
        sentiment: 'neutral', // Default sentiment, can be analyzed using NLP
      }));
  
      return NextResponse.json({ success: true, data: formattedData }, { status: 200 });
  
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

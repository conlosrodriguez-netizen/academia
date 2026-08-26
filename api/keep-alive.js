export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      supabase: response.status === 200 ? 'active' : 'error',
    });
  } catch (error) {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Keep-alive ping sent',
    });
  }
}

export default async function handler(req, res) {
  const supabaseUrl = 'https://zguwvsfzidurynylvyyi.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Z3V3c3ZmemlkdXJueW9sdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjQ1NDAsImV4cCI6MjEwMzM0MDU0MH0.cThks-DAfHidjy7_kIHLo2eCWsqxWk__N2JI94LTYEc';

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

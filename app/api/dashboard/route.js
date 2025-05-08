
export async function GET(request) {
    const res = await fetch('https://brand-analysis-8jn8.onrender.com/dashboard');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
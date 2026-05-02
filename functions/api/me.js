export async function onRequestGet(context) {
  const { request, env } = context;
  const email = request.headers.get('Cf-Access-Authenticated-User-Email') || 'localdev@example.com';

  try {
    await env.DB.batch([
      env.DB.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, name TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
    ]);

    // Get user
    let user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    
    // If user doesn't exist, create them
    if (!user) {
      await env.DB.prepare("INSERT INTO users (email) VALUES (?)").bind(email).run();
      user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    }

    return Response.json({ success: true, user });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const email = request.headers.get('Cf-Access-Authenticated-User-Email') || 'localdev@example.com';

  try {
    const body = await request.json();
    
    if (body.name && body.name.trim() !== '') {
      await env.DB.prepare("UPDATE users SET name = ? WHERE email = ?").bind(body.name.trim(), email).run();
    }
    
    const user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    return Response.json({ success: true, user });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

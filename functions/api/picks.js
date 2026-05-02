export async function onRequestGet(context) {
  const { request, env } = context;
  
  const email = request.headers.get('Cf-Access-Authenticated-User-Email') || 'localdev@example.com';

  try {
    // Auto-create tables for local development ease
    await env.DB.batch([
      env.DB.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, name TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"),
      env.DB.prepare("CREATE TABLE IF NOT EXISTS picks (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, match_id TEXT NOT NULL, outcome TEXT, score1 INTEGER, score2 INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, UNIQUE(user_id, match_id))")
    ]);

    let user = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (!user) {
      // The /api/me endpoint usually creates the user first. If they hit /picks first, we create them too.
      await env.DB.prepare("INSERT INTO users (email) VALUES (?)").bind(email).run();
      user = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    }
    
    const userId = user.id;

    const { results } = await env.DB.prepare(
      "SELECT * FROM picks WHERE user_id = ?"
    ).bind(userId).all();
    
    return Response.json({ success: true, picks: results });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const email = request.headers.get('Cf-Access-Authenticated-User-Email') || 'localdev@example.com';
  
  try {
    // Auto-create tables for local development ease
    await env.DB.batch([
      env.DB.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, name TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"),
      env.DB.prepare("CREATE TABLE IF NOT EXISTS picks (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, match_id TEXT NOT NULL, outcome TEXT, score1 INTEGER, score2 INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, UNIQUE(user_id, match_id))")
    ]);

    let user = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (!user) {
      await env.DB.prepare("INSERT INTO users (email) VALUES (?)").bind(email).run();
      user = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    }
    const userId = user.id;

    const body = await request.json();

    const cutoffDate = new Date('2026-06-11T00:00:00-04:00');
    if (new Date() >= cutoffDate) {
      return Response.json({ success: false, error: "Picks are locked." }, { status: 403 });
    }
    
    if (!body.picks || !Array.isArray(body.picks)) {
      return Response.json({ success: false, error: "Invalid picks format" }, { status: 400 });
    }

    // Insert or update picks using upsert logic
    const stmts = body.picks.map(pick => {
      // Clean up empty strings to null for database
      const score1 = pick.score1 === '' ? null : parseInt(pick.score1);
      const score2 = pick.score2 === '' ? null : parseInt(pick.score2);

      return env.DB.prepare(
        `INSERT INTO picks (user_id, match_id, outcome, score1, score2) 
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(user_id, match_id) DO UPDATE SET 
         outcome = excluded.outcome, 
         score1 = excluded.score1, 
         score2 = excluded.score2`
      ).bind(userId, pick.matchId, pick.outcome, score1, score2);
    });

    if (stmts.length > 0) {
      await env.DB.batch(stmts);
    }
    
    return Response.json({ success: true, message: "Picks saved successfully" });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

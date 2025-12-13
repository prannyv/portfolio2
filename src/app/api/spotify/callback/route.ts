// app/api/spotify/callback/route.ts
   
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return Response.json({ error: 'No code provided' }, { status: 400 });
    }
    
    const client_id = process.env.SPOTIFY_CLIENT_ID!;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
    const redirect_uri = 'http://127.0.0.1:3000/api/spotify/callback';
    
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        return Response.json({ error: data.error }, { status: 400 });
      }
      
      // THIS IS THE IMPORTANT PART - DISPLAY THE REFRESH TOKEN
      return new Response(
        `
        <!DOCTYPE html>
        <html>
          <head><title>Spotify Auth Success</title></head>
          <body style="font-family: monospace; padding: 40px;">
            <h1>✅ Authentication Successful!</h1>
            <h2>Copy this refresh token to your .env.local file:</h2>
            <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <code style="font-size: 14px; word-break: break-all;">
                SPOTIFY_REFRESH_TOKEN=${data.refresh_token}
              </code>
            </div>
            <p><strong>Instructions:</strong></p>
            <ol>
              <li>Copy the line above</li>
              <li>Add it to your <code>.env.local</code> file</li>
              <li>Restart your dev server</li>
              <li>You can delete the /spotify-auth page now</li>
            </ol>
            <p style="color: #666; margin-top: 40px;">
              You can close this window now.
            </p>
          </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    } catch (error) {
      return Response.json({ error: 'Failed to get token' }, { status: 500 });
    }
  }
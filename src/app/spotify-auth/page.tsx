// app/spotify-auth/page.tsx
   
export default function SpotifyAuth() {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: client_id!,
      scope: 'user-read-currently-playing user-read-playback-state',
      redirect_uri: 'http://127.0.0.1:3000/api/spotify/callback',
    })}`;
    
    return (
      <div className="p-8">
        <h1 className="text-2xl mb-4">Spotify Authentication</h1>
        <p className="mb-4">Click the button below to authenticate with Spotify</p>
        <a 
          href={authUrl}
          className="bg-green-500 text-white px-6 py-3 rounded-lg inline-block"
        >
          Authenticate with Spotify
        </a>
      </div>
    );
  }
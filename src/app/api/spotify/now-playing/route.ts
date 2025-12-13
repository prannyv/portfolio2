// app/api/spotify/now-playing/route.ts

import { Vibrant } from 'node-vibrant/node';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// In-memory cache for the last valid song data
let cachedSongData: {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  backgroundColor?: string;
} | null = null;

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  });
  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    // No content or error - return cached data if available
    if (response.status === 204 || response.status > 400) {
      if (cachedSongData) {
        return Response.json({ ...cachedSongData, isPlaying: false });
      }
      return Response.json({ isPlaying: false });
    }
    
    const song = await response.json();

    // Check if it's a track (not a podcast/episode)
    if (!song.item || song.item.type !== 'track') {
      // Return cached data if available, otherwise return not playing
      if (cachedSongData) {
        return Response.json({ ...cachedSongData, isPlaying: false });
      }
      return Response.json({ isPlaying: false });
    }

    // Validate required fields exist
    if (!song.item.name || !song.item.artists || !song.item.album || !song.item.album.images || song.item.album.images.length === 0) {
      if (cachedSongData) {
        return Response.json({ ...cachedSongData, isPlaying: false });
      }
      return Response.json({ isPlaying: false });
    }

    const albumImageUrl = song.item.album.images[0].url;
    
    // Extract Muted color from the album art using node-vibrant
    let backgroundColor: string | undefined;
    try {
      const palette = await Vibrant.from(albumImageUrl).getPalette();
      // Get the Muted color (index 4 in the palette)
      const mutedColor = palette.Muted;
      if (mutedColor) {
        backgroundColor = mutedColor.hex;
      } else {
        // Fallback to Vibrant if Muted is not available
        backgroundColor = palette.Vibrant?.hex || cachedSongData?.backgroundColor;
      }
    } catch (error) {
      console.error('Error extracting color from image:', error);
      // If color calculation fails, use cached color or default gradient
      backgroundColor = cachedSongData?.backgroundColor;
    }

    const songData = {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((artist: any) => artist.name).join(', '),
      album: song.item.album.name,
      albumImageUrl: albumImageUrl,
      songUrl: song.item.external_urls.spotify,
      backgroundColor: backgroundColor,
    };

    // Update cache with valid song data
    cachedSongData = songData;

    console.log('🎵 Currently Playing:', {
      title: songData.title,
      artist: songData.artist,
      album: songData.album,
      isPlaying: songData.isPlaying,
      albumImage: songData.albumImageUrl,
      backgroundColor: songData.backgroundColor,
    });
    
    return Response.json(songData);
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    // Return cached data on error if available
    if (cachedSongData) {
      return Response.json({ ...cachedSongData, isPlaying: false });
    }
    return Response.json({ isPlaying: false });
  }
}
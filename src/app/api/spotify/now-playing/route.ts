// app/api/spotify/now-playing/route.ts

import { Vibrant } from 'node-vibrant/node';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
 
// Default song to show when nothing is playing
const DEFAULT_SONG = {
  title: 'Cross Your Mind',
  artist: 'Shelly',
  album: 'Shelly 2',
  albumImageUrl: 'https://i.scdn.co/image/ab67616d000048510686f66ebbda3d1c7a7e5d8e',
  songUrl: 'https://open.spotify.com/track/3a3zDlE4bgI6ZvU00m6o84',
};

// Cache for default song background color (extracted once)
let defaultSongBackgroundColor: string | undefined = undefined;

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

// Helper function to get default song data with background color
async function getDefaultSongData() {
  // Extract background color from default cover if not already cached
  if (defaultSongBackgroundColor === undefined) {
    try {
      const palette = await Vibrant.from(DEFAULT_SONG.albumImageUrl).getPalette();
      const mutedColor = palette.Muted;
      if (mutedColor) {
        defaultSongBackgroundColor = mutedColor.hex;
      } else {
        defaultSongBackgroundColor = palette.Vibrant?.hex;
      }
    } catch (error) {
      console.error('Error extracting color from default song image:', error);
      defaultSongBackgroundColor = undefined;
    }
  }

  return {
    isPlaying: false,
    title: DEFAULT_SONG.title,
    artist: DEFAULT_SONG.artist,
    album: DEFAULT_SONG.album,
    albumImageUrl: DEFAULT_SONG.albumImageUrl,
    songUrl: DEFAULT_SONG.songUrl,
    backgroundColor: defaultSongBackgroundColor,
  };
}

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
    
    // No content or error - return cached data if available, otherwise default song
    if (response.status === 204 || response.status > 400) {
      if (cachedSongData) {
        return Response.json({ ...cachedSongData, isPlaying: false });
      }
      return Response.json(await getDefaultSongData());
    }
    
    const song = await response.json();

    // Check if it's a track (not a podcast/episode)
    if (!song.item || song.item.type !== 'track') {
      // Return cached data if available, otherwise return default song
      if (cachedSongData) {
        return Response.json({ ...cachedSongData, isPlaying: false });
      }
      return Response.json(await getDefaultSongData());
    }

    // Validate required fields exist
    if (!song.item.name || !song.item.artists || !song.item.album || !song.item.album.images || song.item.album.images.length === 0) {
      if (cachedSongData) {
        return Response.json({ ...cachedSongData, isPlaying: false });
      }
      return Response.json(await getDefaultSongData());
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
    // Return cached data on error if available, otherwise default song
    if (cachedSongData) {
      return Response.json({ ...cachedSongData, isPlaying: false });
    }
    return Response.json(await getDefaultSongData());
  }
}
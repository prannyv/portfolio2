import { NextResponse } from 'next/server';

interface LetterboxdFilm {
  title: string;
  year: number;
  poster: string;
  rating: number;
  letterboxdUrl: string;
  watchedDate: string;
}

export async function GET() {
  try {
    const rssUrl = 'https://letterboxd.com/pranavarma/rss/';
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xmlText = await response.text();
    
    // Parse XML to extract film data
    const films: LetterboxdFilm[] = [];
    
    // Match all item elements that are films (not lists)
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch;
    
    while ((itemMatch = itemRegex.exec(xmlText)) !== null) {
      const itemContent = itemMatch[1];
      
      // Skip list items (they have <title> that doesn't contain a rating)
      const titleMatch = itemContent.match(/<title>(.*?)<\/title>/);
      if (!titleMatch) continue;
      
      const titleText = titleMatch[1];
      // Check if it's a film item (contains rating stars) vs a list item
      if (!titleText.includes('★') && !titleText.includes('½')) {
        continue; // Skip list items
      }
      
      // Extract film data
      const filmTitleMatch = itemContent.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/);
      const filmYearMatch = itemContent.match(/<letterboxd:filmYear>(.*?)<\/letterboxd:filmYear>/);
      const ratingMatch = itemContent.match(/<letterboxd:memberRating>(.*?)<\/letterboxd:memberRating>/);
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const watchedDateMatch = itemContent.match(/<letterboxd:watchedDate>(.*?)<\/letterboxd:watchedDate>/);
      
      // Extract poster URL from description CDATA
      const descriptionMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
      let posterUrl = '';
      if (descriptionMatch) {
        const imgMatch = descriptionMatch[1].match(/<img src="(.*?)"/);
        if (imgMatch) {
          posterUrl = imgMatch[1];
        }
      }
      
      if (filmTitleMatch && filmYearMatch && ratingMatch && linkMatch && posterUrl) {
        films.push({
          title: filmTitleMatch[1],
          year: parseInt(filmYearMatch[1]),
          poster: posterUrl,
          rating: parseFloat(ratingMatch[1]),
          letterboxdUrl: linkMatch[1],
          watchedDate: watchedDateMatch ? watchedDateMatch[1] : ''
        });
      }
    }
    
    // Return only the most recent films (limit to 4-6 for the component)
    return NextResponse.json(films.slice(0, 6));
  } catch (error) {
    console.error('Error fetching Letterboxd RSS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Letterboxd data' },
      { status: 500 }
    );
  }
}


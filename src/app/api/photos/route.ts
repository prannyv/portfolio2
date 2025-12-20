import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const photosDir = join(process.cwd(), 'public', 'photos');
    const files = await readdir(photosDir);
    
    // Filter for image files and group by category
    const photosByCategory: Record<string, string[]> = {
      cat1: [],
      cat2: [],
      cat3: [],
      cat4: [],
    };

    files.forEach((file) => {
      // Match pattern: cat1pic1.jpg, cat2pic3.png, etc.
      const match = file.match(/^cat(\d+)pic(\d+)\.(webp)$/i);
      if (match) {
        const categoryNum = match[1];
        const photoNum = match[2];
        const categoryKey = `cat${categoryNum}`;
        
        if (photosByCategory[categoryKey]) {
          photosByCategory[categoryKey].push(`/photos/${file}`);
        }
      }
    });

    // Sort each category's photos by number (cat1pic1, cat1pic2, etc.)
    Object.keys(photosByCategory).forEach((key) => {
      photosByCategory[key].sort((a, b) => {
        const numA = parseInt(a.match(/pic(\d+)/)?.[1] || '0');
        const numB = parseInt(b.match(/pic(\d+)/)?.[1] || '0');
        return numA - numB;
      });
    });

    return NextResponse.json(photosByCategory);
  } catch (error) {
    console.error('Error reading photos directory:', error);
    return NextResponse.json(
      { error: 'Failed to read photos directory' },
      { status: 500 }
    );
  }
}


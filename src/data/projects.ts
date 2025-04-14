// Define the project data structure
export interface Project {
  id: number;
  name: string;
  year: string;
  image: string;
  alt: string;
  thumbnail: string;
}

// Projects data that can be used across components
export const projects: Project[] = [
  {
    id: 1,
    name: 'Prime Residence',
    year: '2024',
    image: '/images/projects/prime-residence.jpg',
    alt: 'Prime Residence 2024',
    thumbnail: '/images/projects/thumbnails/prime-residence.png'
  },
  {
    id: 2,
    name: 'Point Residence',
    year: '2024',
    image: '/images/projects/pm-residence.jpg',
    alt: 'Point Residence',
    thumbnail: '/images/projects/thumbnails/pm-residence.png'
  },
  {
    id: 3,
    name: 'Botanic Residence',
    year: '2024',
    image: '/images/projects/botanic-residence.jpg',
    alt: 'Botanic Residence',
    thumbnail: '/images/projects/thumbnails/botanic-residence.png'
  },
  {
    id: 4,
    name: 'Living Park Residence',
    year: '2023',
    image: '/images/projects/olive-residence.jpg',
    alt: 'Living Park Residence',
    thumbnail: '/images/projects/thumbnails/olive-residence.png'
  }
]; 
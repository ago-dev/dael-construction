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
    name: 'PM Residence',
    year: '2024',
    image: '/images/projects/pm-residence.jpg',
    alt: 'PM Residence 2024',
    thumbnail: '/images/projects/thumbnails/pm-residence.png'
  },
  {
    id: 3,
    name: 'Botanic Residence',
    year: '2024',
    image: '/images/projects/botanic-residence.jpg',
    alt: 'Botanic Residence 2024',
    thumbnail: '/images/projects/thumbnails/botanic-residence.png'
  },
  {
    id: 4,
    name: 'Olive Residence',
    year: '2023',
    image: '/images/projects/olive-residence.jpg',
    alt: 'Olive Residence 2023',
    thumbnail: '/images/projects/thumbnails/olive-residence.png'
  }
]; 
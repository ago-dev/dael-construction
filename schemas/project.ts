export default {
  name: 'project',
  title: 'Projekt',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulli',
      type: 'string',
      description: 'Titulli i projektit. Pas ndryshimit, klikoni "Generate" te fusha Slug për të përditësuar URL-në.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Klikoni "Generate" për të krijuar ose përditësuar URL-në nga titulli.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => 
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[æøåÆØÅëçËÇ]/g, match => {
              const chars: Record<string, string> = {
                'æ': 'ae', 'ø': 'o', 'å': 'a',
                'Æ': 'AE', 'Ø': 'O', 'Å': 'A',
                'ë': 'e', 'ç': 'c',
                'Ë': 'E', 'Ç': 'C'
              };
              return chars[match] || match;
            })
            .replace(/[^\w\-]+/g, '')
            .trim(),
      },
      readOnly: false, // Allow manual updates if needed
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Përshkrimi',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Imazhi Kryesor',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Tekst alternativ',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Përshkrimi i imazhit',
            },
          ],
        },
      ],
    },
    {
      name: 'ndertuar',
      title: 'NDËRTUAR',
      type: 'number',
      description: 'Viti kur është ndërtuar projekti',
      validation: (Rule: any) => Rule.required().min(1900).max(new Date().getFullYear()),
    },
    {
      name: 'hapesira',
      title: 'HAPËSIRA E NDËRTIMIT',
      type: 'string',
      description: 'Hapësira e ndërtimit në metër katror (p.sh. "500m²")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'apartamente',
      title: 'APARTAMENTE',
      type: 'string',
      description: 'Numri i apartamenteve në projekt',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'ndertuar',
      media: 'featuredImage',
      hapesira: 'hapesira',
      apartamente: 'apartamente',
    },
    prepare({ title, year, media, hapesira, apartamente }: any) {
      return {
        title: title,
        subtitle: `${year || 'N/A'} | ${hapesira || 'N/A'} | ${apartamente || 'N/A'} apt`,
        media: media,
      }
    },
  },
} 
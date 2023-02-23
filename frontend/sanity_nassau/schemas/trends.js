export default {
  name: 'trends',
  title: 'Trends',
  description: 'this is the first section in the home page',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [
        Rule.required().min(1).error('you forget to add the title'),
        Rule.max(50).warning('Shorter titles are usually better'),
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => [Rule.required().min(1).error('you forget to add the price')],
    },
  ],
}

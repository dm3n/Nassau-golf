export default {
  name: 'terms_conditions',
  title: 'Terms_Conditions',
  type: 'document',
  fields: [
    {
      name: 'subHeading',
      title: 'Sub_Heading',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'subHeading',
        maxLength: 90,
        hidden: true,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}

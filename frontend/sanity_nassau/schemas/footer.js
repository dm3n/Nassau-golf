export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      description: 'add the Header to in the footer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'list_of_items',
      title: 'Items list',
      description:
        'add items for the list under header please make sure the name of the string like the path if it is a link',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description:
                'were the items link to please make sure you add valid one leave it empty mean this is not link',
            },
            {
              name: 'text',
              title: 'item_name',
              type: 'string',
              description: 'the text that you want the footer link to preview',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}

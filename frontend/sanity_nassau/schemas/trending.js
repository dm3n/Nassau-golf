export default {
  name: 'trending',
  title: 'Trending',
  type: 'document',
  fields: [
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
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => [Rule.required().min(1).error('you forget to add the description')],
    },
    //
    {
      name: 'onSale',
      title: 'On Sale',
      type: 'object',
      fields: [
        {
          name: 'isOnSale',
          title: 'Is on Sale',
          type: 'boolean',
          validation: (Rule) =>
            Rule.required().error('Please specify if the product is on sale or not'),
        },
        {
          name: 'salePrice',
          title: 'Sale Price',
          type: 'number',
          validation: (Rule) => [Rule.min(1).error('Sale price must be at least 1')],
        },
      ],
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      description:
        'please set the sizes available for the product if there is no size leave it empty',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'extra Small', value: 'XS'},
              {title: 'Small', value: 'SM'},
              {title: 'Medium', value: 'M'},
              {title: 'Large', value: 'L'},
              {title: 'Extra Large', value: 'XL'},
              {title: 'Double Extra Large', value: 'XXL'},
            ],
          },
        },
      ],
    },
    {
      name: 'buyGetFree',
      title: 'Buy Something, Get Something Free',
      type: 'object',
      fields: [
        {
          name: 'isGetFree',
          title: 'Is it buy one get one',
          type: 'boolean',
          initialValue: false,
          validation: (Rule) =>
            Rule.required().error('Please specify if the product is BuyOneGetOne or not'),
          default: false,
        },
        {
          name: 'buyQuantity',
          title: 'Buy Quantity',
          description: 'here I need you to specify how much the user need to buy to get item free',
          type: 'number',
        },
        {
          name: 'freeQuantity',
          title: 'Free Quantity',
          type: 'number',
        },
        {
          name: 'freeProduct',
          title: 'Free Product',
          description: 'select the product that will be free',
          type: 'reference',
          to: [{type: 'product'}, {type: 'trending'}],
        },
      ],
    },
  ],
}

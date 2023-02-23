export default {
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              {title: 'Percentage', value: 'percentage'},
              {title: 'Fixed', value: 'fixed'},
            ],
            layout: 'radio',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
}

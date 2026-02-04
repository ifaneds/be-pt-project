import { defineArrayMember, defineField, defineType } from 'sanity'

export const twoColumnType = defineType({
  name: 'twoColumn',
  title: 'Two Column Layout',
  type: 'object',
  fields: [
    defineField({
      name: 'left',
      title: 'Left Column',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        },
        { type: 'videoEmbed' },
      ],
    }),
    defineField({
      name: 'right',
      title: 'Right Column',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        },
        { type: 'videoEmbed' },
      ],
    }),
  ],
  preview: {
    select: {
      leftFirstBlock: 'left.0',
      rightFirstBlock: 'right.0',
    },
    prepare({ leftFirstBlock, rightFirstBlock }) {
      const leftLabel = leftFirstBlock?._type === 'block' ? leftFirstBlock.children?.[0]?.text?.slice(0, 30) : leftFirstBlock?._type
      const rightLabel = rightFirstBlock?._type === 'block' ? rightFirstBlock.children?.[0]?.text?.slice(0, 30) : rightFirstBlock?._type
      return {
        title: 'Two Column',
        subtitle: `${leftLabel || '—'} | ${rightLabel || '—'}`,
      }
    },
  },
})

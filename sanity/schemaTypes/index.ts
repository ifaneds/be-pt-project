import { type SchemaTypeDefinition } from 'sanity'
import { blogType } from './blogType'
import { guideType } from './guideType'
import { storyType } from './storyType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogType, guideType, storyType],
}

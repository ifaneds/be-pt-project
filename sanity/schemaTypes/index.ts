import { type SchemaTypeDefinition } from 'sanity'
import { blogType } from './blogType'
import { guideType } from './guideType'
import { storyType } from './storyType'
import { videoEmbedType } from './videoEmbedType'
import { twoColumnType } from './twoColumnType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [videoEmbedType, twoColumnType, blogType, guideType, storyType],
}

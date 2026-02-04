import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Blog').child(S.documentTypeList('blog').title('Blog')),
      S.listItem().title('Guides').child(S.documentTypeList('guide').title('Guides')),
      S.listItem().title('Stories').child(S.documentTypeList('story').title('Stories')),
    ])

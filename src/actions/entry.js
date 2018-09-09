export const submitNewForm = (entry) => {
  return {
    type: 'SUBMIT_NEW_FORM',
    title: entry.title,
    content: entry.content
  }
}

export const renderSingleEntry = (id) => {
  return {
    type: 'RENDER_SINGLE_ENTRY',
    id
  }
}

export const storeAllEntries = (entries) => {
  return {
    type: 'STORE_ALL_ENTRIES',
    entries
  }
}

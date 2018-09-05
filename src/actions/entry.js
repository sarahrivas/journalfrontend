export const submitNewForm = (entry) => {
  return {
    type: 'SUBMIT_NEW_FORM',
    title: entry.title,
    content: entry.content
  }
}

export const storeAllEntries = (entries) => {
  return {
    type: 'STORE_ALL_ENTRIES',
    entries
  }
}

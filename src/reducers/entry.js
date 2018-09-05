const entry = (state = { entries: []}, action) => {
  switch (action.type) {
    case 'SUBMIT_NEW_FORM':
      return {
        ...state,
        currentEntry: {
          title: action.title,
          content: action.content
        }
      }

    case 'STORE_ALL_ENTRIES':
      return {
        ...state,
        entries: action.entries
      }

    default:
      return state
  }
}

export default entry;

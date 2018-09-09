const entry = (state = { entries: [], currentEntry:{}}, action) => {
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

      case 'RENDER_SINGLE_ENTRY':
        const matchedEntry = state.entries.find(entry => entry.id === action.id)
        return {
          ...state,
          currentEntry: {
            title: matchedEntry.title,
            content: matchedEntry.content
          }
        }
        default:
        return state
      }
  }

export default entry;

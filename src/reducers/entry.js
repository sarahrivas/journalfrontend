const entry = (state = { entries: [], currentEntry:{}}, action) => {
  switch (action.type) {
    case 'SUBMIT_NEW_FORM':
      return {
        ...state,
        currentEntry: {
          title: action.title,
          content: action.content,
          id: action.id
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
            content: matchedEntry.content,
            id: matchedEntry.id
          }
        }

        case 'EDIT_ENTRY':
          const editedEntries = state.entries.map(entry => {
            if(entry.id === action.data.id) {
              return action.data;
            } else {
              return entry;
            }
          });
          return {
            ...state,
            entries : editedEntries,
            currentEntry: action.data
          }

        case 'DELETE_ENTRY':
          const remainingEntries = state.entries.filter((entry) => entry.id !== action.id);
          return {
            ...state,
            entries: remainingEntries
          }

          case 'RESET_ENTRY':
            return {
              ...state,
              currentEntry:{}
            }
        default:
        return state
      }
  }

export default entry;

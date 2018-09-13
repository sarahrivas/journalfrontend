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
          id: matchedEntry.id,
          liked: false
        }
      }

    case 'EDIT_ENTRY':
      return {
        ...state,
        currentEntry: { ...state.currentEntry, ...action.data }
      }

      case 'SAVE_ENTRY':
        const editedEntries = state.entries.map(entry => {
          if(entry.id === state.currentEntry.id) {
            return state.currentEntry;
          } else {
            return entry;
          }
        });
        return {
          ...state,
          entries: editedEntries
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
        case 'LIKED_ENTRY':
          return {
            ...state,
            currentEntry: {
              ...state.currentEntry,
              liked: !state.currentEntry.liked
            }
          }
        default:
        return state
      }
  }

export default entry;

export const submitNewForm = (entry) => {
  return {
    type: 'SUBMIT_NEW_FORM',
    title: entry.title,
    content: entry.content,
    id: entry.id
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

export const deleteEntry = (id) => {
  return {
    type: 'DELETE_ENTRY',
    id
  };
};

export const resetEntry = () => {
  return {
    type: 'RESET_ENTRY'
  };
};

export const editEntry = (data) => {
  return {
    type: 'EDIT_ENTRY',
    data
  };
};

export const saveEntry = () => {
  return {
    type: 'SAVE_ENTRY'
  };
};

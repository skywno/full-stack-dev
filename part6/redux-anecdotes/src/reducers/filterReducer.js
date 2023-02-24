const filterReducer = (state = '', action) => {
  console.log('filter state now: ', state)
  console.log('filter action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const updateFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default filterReducer
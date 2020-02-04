const INITIAL_STATE = [];
export const TICKET_ADD = 'TICKET_ADD';
export const TICKET_DELETE = 'TICKET_DELETE';

export const ticketActions = {
  addTicket: data => ({
    type: TICKET_ADD,
    data
  }),
  deleteTicket: id => ({
    type: TICKET_DELETE,
    data: id
  })
};

export const ticketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKET_ADD:
      if (!action.data || !action.data.id) return state;
      if (state.find(c => c.id === action.data.id)) return state;
      return [...state, action.data];
    case TICKET_DELETE:
      return state.filter(c => c.id !== action.data);
    default:
      return state;
  }
};

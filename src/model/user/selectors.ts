const branch = state => state.auth;

const getRequestState = state => branch(state).request;

const getNameId = state => branch(state).nameId;

const getRole = state => branch(state).role;

const getUser = state => ({
  nameId: getNameId(state),
  role: getRole(state),   
});

export default {
  getRequestState,
  getNameId,
  getRole,
  getUser,
}
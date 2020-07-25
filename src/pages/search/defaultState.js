import immutable from 'immutable';

export default immutable.fromJS({
  recipes: [],
  loading: true,
  initialyFetched: false,
  lastPayload: null,
  paging: {
    page: 1,
    lastPage: false,
  },
  searching: {
    inredients: '',
    text: '',
  },
});

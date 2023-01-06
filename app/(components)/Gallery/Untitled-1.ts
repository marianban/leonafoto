function useState(initialState: string) {
  let state = initialState;
  function setState(newState: string) {
    state = newState;
  }
  return [state, setState];
}

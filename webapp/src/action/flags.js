const setBrief = (brief) => ({
  type: 'brief_header',
  brief
});

const setLeftSide = (active) => ({
  type: 'left_side',
  active
});

export { setBrief, setLeftSide };
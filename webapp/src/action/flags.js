const setBrief = (brief) => ({
  type: 'brief_header',
  brief
});

const setLeftSide = (active) => ({
  type: 'left_side',
  active
});

const setLeftSideMode = (mode) => ({
  type: 'Change_Left_Mode',
  mode
});

export { setBrief, setLeftSide, setLeftSideMode };
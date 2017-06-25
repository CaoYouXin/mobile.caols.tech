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

const setRightSide = (active) => ({
  type: 'right_side',
  active
});

export { setBrief, setLeftSide, setLeftSideMode, setRightSide };
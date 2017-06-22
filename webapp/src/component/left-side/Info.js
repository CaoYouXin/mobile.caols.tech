import React, { Component } from 'react';
import './Info.css';
import { connect } from 'react-redux';
import calcClassName from '../../util/calcClassName';
import { setLeftSide } from '../../action';

class InfoComponent extends Component {
  render() {
    const { active, close } = this.props;
    return (
      <div>
        <div className={calcClassName({
          "info-root": true,
          "info-root-mask": true,
          "active": active
        })} onClick={(e) => close()}></div>
        <div className={calcClassName({
          "info-root": true,
          "info-root-main": true,
          "active": active
        })}></div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    active: state.leftSideActive
  }),
  (dispatch) => ({
    close: () => {
      dispatch(setLeftSide(false));
    }
  })
)(InfoComponent);
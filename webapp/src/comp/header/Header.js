import React, { Component } from 'react'
import './Header.css'
import logo from './logo.svg'
import search from './search.png'
import { connect } from 'react-redux'
import { calcClassName } from '../../util'
import { setLeftSide, makeSearch, getCategories, getPosts } from '../../action'

class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }


    this.toSearch = this.toSearch.bind(this);
    this.inputFocused = this.inputFocused.bind(this)
    this.inputBlur = this.inputBlur.bind(this)
    this.keyUp = this.keyUp.bind(this)
  }

  componentDidMount() {
    this.inputEl.addEventListener('focus', this.inputFocused, false)
    this.inputEl.addEventListener('blur', this.inputBlur, false)
  }

  componentWillUnmount() {
    this.inputEl.removeEventListener('focus', this.inputFocused)
    this.inputEl.removeEventListener('blur', this.inputBlur)
  }

  render() {
    const { brief, logoClicked } = this.props

    return (
      <div>
        <div className={calcClassName({
          'App-header': true,
          'brief': !!brief
        })}>
          <img
            src={logo}
            className='App-logo'
            alt='logo'
            onClick={logoClicked} />
          <br />
          <div className={calcClassName({
            'App-search': true,
            'focused': this.state.focused
          })}>
            <img src={search} alt='search' />
            <input
              ref={(input) => {
                this.inputEl = input
              }}
              onKeyUp={this.keyUp}
              type='search'
              placeholder='搜索' />
          </div>
        </div>
        <div style={{ transition: 'height 1s', height: !!brief ? '66px' : '500px' }}></div>
      </div>
    )
  }

  toSearch() {
    const { search, categories, posts, fetchData } = this.props;

    if (!categories || !posts) {
      fetchData(this.toSearch);
      return;
    }

    search(this.cmd, categories, posts);
  }

  keyUp(e) {
    if (e.keyCode === 13) {
      this.cmd = this.inputEl.value;
      this.toSearch();
    }
  }

  inputFocused() {
    this.setState({ focused: true })
  }

  inputBlur() {
    this.setState({ focused: false })
  }

}

export default connect(
  (state) => ({
    brief: state.briefHeader,
    categories: state.categories,
    posts: state.posts.list
  }),
  (dispatch) => ({
    logoClicked: () => {
      dispatch(setLeftSide(true))
    },
    search: (cmd, categories, posts) => {
      dispatch(makeSearch(cmd, categories, posts));
    },
    fetchData: (cb) => {
      dispatch(getCategories(cb));
      dispatch(getPosts(cb));
    }
  })
)(HeaderComponent)

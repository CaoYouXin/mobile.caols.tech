import React, { Component } from 'react';
import './Category.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBrief, getCategories, getPostsByCategoryId } from '../../action';
import { IframeContent } from '../content/IframeContent';
import { getPage } from '../../store/category/pager';
import { getBreadcrumb } from '../../store/categories';
import { FancyList } from '../fancylist';

const Posts = withRouter(connect(
  (state, ownProps) => ({
    categoryId: ownProps.match.params.categoryId,
    listData: getPage(state.category.posts, state.category.pager),
    actives: state.category.actives,
    pager: state.category.pager
  }),
  (dispatch, ownProps) => ({
    fetchPosts: (cb) => {
      dispatch(getPostsByCategoryId(ownProps.match.params.categoryId, cb));
    },
    more: () => {
      dispatch({
        type: 'Post_by_CategoryName_more'
      });
    },
    go: (go) => {
      dispatch({
        type: 'Post_by_CategoryName_Pager_Go',
        go
      });
    }
  })
)(FancyList));

class CategoryComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      breadcrumbs: []
    };
  }

  componentDidMount() {
    const { setHeader, fetchCategory } = this.props;
    setHeader();
    fetchCategory();
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps;
    const { categories, match, fetchCategory } = this.props;
    const { breadcrumbs } = this.state;

    if (!breadcrumbs.length && !!categories) {
      this.setState({
        breadcrumbs: getBreadcrumb([], categories, match.params.categoryId)
      });
    }

    if (prevMatch.params.categoryId !== match.params.categoryId) {
      fetchCategory();
      this.setState({
        breadcrumbs: []
      });
    }
  }

  render() {
    const { breadcrumbs } = this.state;
    const category = breadcrumbs[breadcrumbs.length - 1];
    const children = !category ? [] : category.ChildCategories || [];
    return (
      <div>
        {
          category && <h1>{category.BlogCategoryName}</h1>
        }
        <p className="breadcrumb">
          <span>/ <Link to="/">&nbsp;首页&nbsp;</Link> </span>
          {
            breadcrumbs && breadcrumbs.map((bc, idx) => {
              if (idx === breadcrumbs.length - 1) {
                return <span key={bc.BlogCategoryId}>/ &nbsp;{bc.BlogCategoryName}&nbsp;</span>
              } else {
                return <span key={bc.BlogCategoryId}>/ <Link to={`/category/${bc.BlogCategoryId}`}>&nbsp;{bc.BlogCategoryName}&nbsp;</Link> </span>
              }
            })
          }
        </p>
        {
          children.length > 0 && <p className="breadcrumb">:
            {
              children.map(bc => <span key={bc.BlogCategoryId}> <Link to={`/category/${bc.BlogCategoryId}`}>&nbsp;{bc.BlogCategoryName}&nbsp;</Link> </span>)
            }
          </p>
        }
        {
          category && <IframeContent url={category.BlogCategoryUrl}></IframeContent>
        }
        <Posts />
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    categories: state.categories
  }),
  (dispatch) => ({
    setHeader: () => {
      dispatch(setBrief(true));
    },
    fetchCategory: () => {
      dispatch(getCategories());
    }
  })
)(CategoryComponent));
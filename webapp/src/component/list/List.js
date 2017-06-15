import React, { Component } from "react";
import "./List.css";
import { connect } from 'react-redux';
import { getPage } from '../../store';
import { get } from '../../action';

class ListComponent extends Component {
    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.select !== this.props.select) {
            this.fetch();
        }
    }

    fetch() {
        const props = this.props;
        props.fetch(get(props.select));
    }

    render() {
        const { prev, next, posts, categories, select, selectCategory, selectPost } = this.props;
        const data = select === 'Category' ? categories : select === 'Post' ? posts : [];
        return (
            <div className="App-list">
                <div className="App-btns two v-mid-box">
                    <div className={select === 'Category' ? "App-btn active" : "App-btn"}
                        onClick={selectCategory}>分类</div>
                    <div className={select === 'Post' ? "App-btn active" : "App-btn"}
                        onClick={selectPost}>Post</div>
                </div>
                <div className="App-btns two v-mid-box">
                    <div className="App-btn" onClick={prev}>Prev</div>
                    <div className="App-btn" onClick={next}>Next</div>
                </div>
                <ul className="test">
                    {data.map((category) => (
                        <li key={category.id} className="test">{category.name}</li>
                    ))}
                </ul>
                <div className="App-btns two v-mid-box">
                    <div className="App-btn" onClick={prev}>Prev</div>
                    <div className="App-btn" onClick={next}>Next</div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        posts: getPage(state.post, state.pager),
        categories: getPage(state.category, state.pager),
        select: state.selectList
    }),
    (dispatch) => ({
        prev: () => {
            dispatch({
                type: 'go',
                go: -1
            })
        },
        next: () => {
            dispatch({
                type: 'go',
                go: 1
            })
        },
        fetch: dispatch,
        selectCategory: () => {
            dispatch({
                type: 'Select_List',
                active: 'Category'
            })
        },
        selectPost: () => {
            dispatch({
                type: 'Select_List',
                active: 'Post'
            })
        }
    })
)(ListComponent);

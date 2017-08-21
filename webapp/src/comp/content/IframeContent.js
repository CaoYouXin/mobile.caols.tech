import React, { Component } from 'react';
import './IframeContent.css';
import { calcClassName } from '../../util';
import { getAPI } from '../../http';

export class IframeContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      height: 0
    };

    this.receiveMessage = this.receiveMessage.bind(this);
  }

  receiveMessage(e) {
    if (e.origin !== getAPI('server')) {
      return;
    }

    let data = JSON.parse(e.data);

    if (this.props.url !== data.path) {
      return;
    }

    this.setState({
      loading: false,
      height: data.height
    });
  }

  componentWillMount() {
    window.addEventListener('message', this.receiveMessage)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage);
  }

  componentWillUpdate(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.setState({
        loading: true,
        height: 0
      });
    }
  }

  render() {
    const { url } = this.props;
    const { loading, height } = this.state;
    return (
      <div>
        <div className={calcClassName({
          "content dimmer": true,
          "loading": loading
        })}>loading...</div>
        <iframe src={getAPI('server') + '/serve' + url} scrolling="no" className="content"
          title={url} style={{ height: height + 'px' }}></iframe>
      </div>
    );
  }

}
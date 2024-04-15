import React, { Component } from 'react';
import { Spin } from 'antd';

class Renderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    if (this.props.url !== null) {
      this.loadImage(this.props.url);
    }
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (url !== prevProps.url && url != null) {
      this.setState({ loaded: false });
      this.loadImage(url);
    }
  }

  loadImage = (url) => {
    let imageData = new Image();
    imageData.onload = () => {
      this.setState({ loaded: true });
    };
    imageData.src = url;
  };

  render() {
    const { url, ...elmProps } = this.props;
    const { loaded } = this.state;
    if (loaded && url != null) {
      return (
        <img
          style={{ width: '100%', marginTop: 20 }}
          src={url}
          alt={url}
          {...elmProps}
        />
      );
    } else {
      return (
        <div className={`${elmProps.prefix}-list-item-icon`}>
          <Spin />
        </div>
      );
    }
  }
}

export default Renderer;

import React, { Component, PropTypes } from 'react';

const styles = {
  base: {
    position: 'absolute',
  },
  x: {
    width: '10px',
    height: '100%',
    top: '0',
    right: '-5px',
    cursor: 'col-resize',
  },
  xinvert: {
    left: '-5px',
  },
  y: {
    width: '100%',
    height: '10px',
    bottom: '-5px',
    cursor: 'row-resize',
  },
  yinvert: {
    top: '-5px',
  },
  xy: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '-10px',
    bottom: '-10px',
    cursor: 'se-resize',
  },
  xyinvertx: {
    left: '-10px',
    cursor: 'sw-resize',
  },
  xyinverty: {
    top: '-10px',
    cursor: 'ne-resize',
  },
  xyinvertboth: {
    left: '-10px',
    top: '-10px',
    cursor: 'nw-resize',
  },
};

export default class Resizer extends Component {
  static propTypes = {
    onResizeStart: PropTypes.func,
    type: PropTypes.oneOf(['x', 'y', 'xy']).isRequired,
    invert: PropTypes.shape({
      x: PropTypes.bool,
      y: PropTypes.bool,
    }).isRequired,
  }

  onTouchStart(event) {
    this.props.onResizeStart(event.touches[0]);
  }

  getStyle() {
    const { invert, type } = this.props;
    const baseStyles = { ...styles.base, ...styles[type] };
    switch (type) {
      case 'x':
        return invert.x ? { ...baseStyles, ...styles.xinvert } : baseStyles;
      case 'y':
        return invert.y ? { ...baseStyles, ...styles.yinvert } : baseStyles;
      case 'xy':
        if (invert.x && invert.y) {
          return { ...baseStyles, ...styles.xyinvertboth };
        } else if (invert.x) {
          return { ...baseStyles, ...styles.xyinvertx };
        } else if (invert.y) {
          return { ...baseStyles, ...styles.xyinverty };
        }
        return baseStyles;
      default:
        return {};
    }
  }

  render() {
    const onTouchStart = this.onTouchStart.bind(this);
    return (
      <div
        style={this.getStyle()}
        onMouseDown={this.props.onResizeStart}
        onTouchStart={onTouchStart}
      />
    );
  }
}

Resizer.defaultProps = { invert: {} };

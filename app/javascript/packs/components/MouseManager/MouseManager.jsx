import React from 'react';
import { inject } from 'mobx-react'

@inject('mouse')
export default class MouseManager extends React.Component {

    _host = null;

    get host() {
        return this._host;
    }

    set host(node) {
        this._host = node;

        if(node !== null && node !== undefined) {
            this.setupMouseMovementListener(node);
        }
    }

    offset(node) {
        if(node === null || node === undefined) {
            return { x: 0, y: 0 };
        }

        let parentOffset = this.offset(node.offsetParent);

        return {
            x: node.offsetLeft + parentOffset.x,
            y: node.offsetTop + parentOffset.y
        };
    }

    setupMouseMovementListener(node) {
        node.addEventListener('mousemove', (e) => {
            let offset = this.offset(node);

            this.props.mouse.setLastPosition(e.clientX - offset.x, e.clientY - offset.y);
        }, false);
    }

    render() {
        return (
          <div ref={ (div) => this.host = div }>
            { this.props.children }
          </div>
        );
    }
}

import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import PropTypes from 'prop-types';

export class Layout extends Component {
  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
Layout.propTypes = {
    children: PropTypes.node.isRequired
};
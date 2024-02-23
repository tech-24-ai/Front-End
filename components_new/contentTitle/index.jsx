import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';


function ContentTitle({ title, path = false }) {
  return (
    <div className="site-title-wrapper">
      <Row>
        <Col>
          <h5 className="site-title">{title}</h5>
        </Col>
        <Col>
          {path && <div className="site-crumbs"> / Backup Software and appliances / On Premise Backup </div>}
        </Col>
      </Row>
    </div>
  );
}

ContentTitle.propTypes = {
  title: PropTypes.string,
  path: PropTypes.bool,
};

ContentTitle.defaultProps = {
  title: ''
};

export default ContentTitle;
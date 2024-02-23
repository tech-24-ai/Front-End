import React from "react";
import { Card, CardBody, CardHeader, Collapse, Button } from "reactstrap";
import PropTypes from "prop-types";
import AngleDown from "../../public/images/downloads/angledown.svg";
import AngleUp from "../../public/images/downloads/angleup.svg";

export class Accordion extends React.Component {
  state = {
    open: this.props.open,
  };

  toggleSection = (index) => () => {
    this.setState(({ open }) => ({
      open: index === open ? undefined : index,
    }));
  };

  render() {
    return React.Children.map(this.props.children, (child, index) => {
      if (child.type !== AccordionItem) return null;
      return React.cloneElement(child, {
        isOpen: child.props.open || this.state.open === index,
        onClick: this.toggleSection(index),
      });
    });
  }
}

Accordion.propTypes = {
  open: PropTypes.number,
};

const AccordionItem = ({ children, isOpen, onClick }) => (
  <div className="evaluation-form downloads-table">
    {React.Children.map(children, (child) => {
      if (child.type === AccordionHeader) {
        return React.cloneElement(child, { onClick, isOpen });
      }

      if (child.type === AccordionBody) {
        return React.cloneElement(child, { isOpen });
      }

      return null;
    })}
  </div>
);

const AccordionHeader = ({ children, onClick, isOpen }) => (
  <h4 onClick={onClick}>
    {children}
    <span>
      {isOpen ? (
        <img src={AngleUp.src} className="angleup" />
      ) : (
        <img src={AngleDown.src} className={`angledown`} />
      )}
    </span>
  </h4>
);

const AccordionBody = ({ children, isOpen }) => (
  <Collapse isOpen={isOpen}>{children}</Collapse>
);

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

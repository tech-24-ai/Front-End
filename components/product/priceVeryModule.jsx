import React from "react";
import { crudService } from "../../_services";

class PriceModule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      min_price: "0",
      max_price: "0",
      report_notes: "",
    };
  }

  componentDidMount() {
    let moduleId;
    if (sessionStorage.getItem("childrenIds")) {
      let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
      childrenIds.forEach((element) => {
        moduleId = element;
      });
    }
    if (moduleId) {
      crudService._get("modules", moduleId).then((result) => {
        if (result.status === 200) {
          this.setState({ min_price: result.data.min_price });
          this.setState({ max_price: result.data.max_price });
          this.setState({ report_notes: result.data.report_notes });
        }
      });
    }
  }

  render() {
    const { min_price, max_price, report_notes } = this.state;
    return (
      <React.Fragment>
        {/* min_price && max_price && <b className="price-range">The price of the products listed below range from US$ {min_price} to US$ {max_price}</b> */}
        {report_notes && <b>{report_notes}</b>}
      </React.Fragment>
    );
  }
}

export default PriceModule;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { crudActions, alertActions } from "../../_actions";
import {
    Collapse,
    Button,
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { Icon } from "react-icons-kit";
import { compose } from "react-icons-kit/ionicons/compose";
import { androidDoneAll } from "react-icons-kit/ionicons/androidDoneAll";
import Tooltip from "react-tooltip-lite";

const UserProfile = (props) => {
    const {
        authentication,
        get_subscription,
        subscription_history,
        purchase_history,
    } = props;

    const [editField, setEditField] = useState("");
    const [currentTab, setCurrentTab] = useState("personalTab");
    const [expandedPanel, setExpandedPanel] = useState("");
    const [data, setData] = useState(authentication.user.data.data);
    const [activeSubscription, setActiveSubscription] = useState(null);
    const [tooltipOpen, setTooltip] = useState(false);

    const toggleTip = (id) => {
        tooltipOpen === id ? setTooltip(false) : setTooltip(id);
    };

    const TabChangeHandler = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleChange = (panel) => (event) => {
        setExpandedPanel(expandedPanel === panel ? "" : panel);
    };
    
    const onChangeHandle = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        props.getAllCrud("get_subscription", "get_subscription");
        props.getAllCrud("subscription_history", "subscription_history");
        // props.getAllCrud("purchase_history", "purchase_history");
    }, []);

    useEffect(() => {
        if (
            get_subscription &&
            get_subscription != undefined &&
            get_subscription != null &&
            get_subscription.length
        ) {
            get_subscription.filter((activeSub) => {
                if (activeSub.is_active === 1 && activeSub.plans != null) {
                    setActiveSubscription(activeSub);
                }
            });
        }
    }, [get_subscription]);

    return (
        <div className="user-profile">
            <div className="card-content" >
                <h4 className="content-title">Account Information</h4>
                <div className="form-content">
                    <span className="content-lable">
                        Full Name
                    </span>
                    <Input type="text"
                        name="name"
                        value={data.name}
                        onChange={onChangeHandle} placeholder="Mike Maynard" className="content-input input-text">
                        {data.name}
                    </Input>
                </div>

                {/* <div className="form-content">
                    <span className="content-lable">
                        Gender
                    </span>
                    <Input placeholder="Male" className="content-input input-text">
                    </Input>
                </div> */}

                {/* <div className="form-content">
                    <span className="content-lable">
                        Date of Birth
                    </span>
                    <Input placeholder="10/10/2010" className="content-input input-text">
                    </Input>
                </div> */}

                <div className="form-content">
                    <span className="content-lable">
                        Email Id
                    </span>
                    <Input value={data.email} type="text"
                        name="email" placeholder="johndoe@gmail.com" className="content-input input-text">
                        {data.email}
                    </Input>
                </div>

                {/* <div className="form-content">
                    <span className="content-lable">
                        Phone Number
                    </span>
                    <Input placeholder="1234 567 890" type="number" className="content-input input-text">
                    </Input>
                </div> */}

                {/* <div className="form-content">
                    <span className="content-lable">
                        Address
                    </span>
                    <Input placeholder="102 Emirate Building, Dubai, United Arab Emirates" className="content-input input-text">
                    </Input>
                </div> */}

                {/* <div className="form-content">
                    <span className="content-lable">
                        Currency
                    </span>
                    <Input placeholder="Dollar" className="content-input input-text">
                    </Input>
                </div> */}
            </div>

            {/* Temporary  */}
            {/* <div className="account-content-btn" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Button
                    className="back-btn"
                    type="button"
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button className="nxt-btn" type="submit" color="secondary">
                    Update Profile
                </Button>
            </div> */}
        </div> 
    );
};

const mapStateToProps = (state) => {
    const {
        authentication,
        get_subscription,
        subscription_history,
        purchase_history,
    } = state;
    return {
        authentication,
        get_subscription,
        subscription_history,
        purchase_history,
    };
};

const actionCreators = {
    getAllCrud: crudActions._getAll,
    downloadInvoice: crudActions._downloadWithPost,
};

export default connect(mapStateToProps, actionCreators)(UserProfile);

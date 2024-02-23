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
import lockIcon from "../../public/new_images/Profile/lockIcon.svg";
import matchIcon from "../../public/new_images/Profile/match-icon.svg";

const LoginCred = (props) => {

    return (
        <div className="login-card" >
            <div className="card-login-content">
                <div className="content-lable">
                    <span>
                        Login details - Change Password
                    </span>
                    <p>Ads that sing to commercials, advertisers are now using a new type of technology called media</p>
                </div>


                <div className="form-content">
                    <span className="content-lable">
                        Current Password
                    </span>
                    <Input className="content-input">
                    </Input>
                    <img style={{ width: "18px", height: "18px", position: "relative", bottom: "30px", left: "90%" }} src={lockIcon.src} />

                </div>
                <div className="form-content">
                    <span className="content-lable">
                        New Password
                    </span>
                    <Input className="content-input">
                    </Input>
                    <img style={{ width: "18px", height: "18px", position: "relative", bottom: "30px", left: "90%" }} src={matchIcon.src} />

                </div>
                <div className="form-content">
                    <span className="content-lable">
                        Confirm New Password
                    </span>
                    <Input className="content-input">
                        <img src={matchIcon.src}/>
                    </Input>
                    <img style={{width: "18px", height: "18px", position: "relative", bottom: "30px", left: "90%" }} src={matchIcon.src} />
                </div>
            </div>
            <div className="content-btn" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Button
                    className="back-btn"
                    type="button"
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button className="nxt-btn" type="submit" color="secondary">
                    Update Password
                </Button>
            </div>
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

export default connect(mapStateToProps, actionCreators)(LoginCred);

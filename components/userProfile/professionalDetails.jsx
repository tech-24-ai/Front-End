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
import ProfileImg from "../../public/new_images/Profile/profile.svg";
import ProfileIcon from "../../public/new_images/Profile/profile-icon.svg";
import ProfessionalIcon from "../../public/new_images/Profile/professional-icon.svg";
import SecurityIcon from "../../public/new_images/Profile/security-icon.svg";
import SelectionIcon from "../../public/new_images/Profile/professional-selection.svg"
import EducationIcon from "../../public/new_images/Profile/education-icon.svg";
import AddIcon from "../../public/new_images/Profile/add.svg";
import EditIcon from "../../public/new_images/Profile/edit.svg";

const ProfessionalDetails = (props) => {

    return (
        <div className="professional-card" >
            <div className="card-professional-content">
                <div className="content-lable">
                    <span>
                        Professional Details
                    </span>
                    <p>Enter your all the Professional or Business Details</p>
                </div>


                <div className="form-content">
                    <span className="content-lable">
                        Title
                    </span>
                    <Input placeholder="Enter Title" className="content-input">
                    </Input>
                </div>
                <div className="form-content">
                    <span className="content-lable">
                        About Me
                    </span>
                    <textarea type="text" placeholder="Enter Description" className="content-input-about">
                    </textarea>
                </div>
            </div>

            <div className="card-professional-location">
                <div className="content-lable">
                </div>
                <div className="form-content">
                    <span className="content-lable">
                        Location (Work)
                    </span>
                    <Input placeholder="Dubai, United Arab Emirates" className="content-input">
                    </Input>
                </div>
            </div>


            <div className="card-professional-rate">
                <div className="content-lable">
                    <span>
                        Your Rate
                    </span>
                </div>

                <div className="form-content">
                    <span className="content-lable">
                        Video Meeting Rate
                    </span>
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <Input className="content-input-division">
                        </Input>
                        <Input className="content-input-division">
                        </Input>
                    </div>

                </div>

                <div className="form-content">
                    <span className="content-lable">
                        Project Work Starts
                    </span>
                    <Input className="content-input">
                    </Input>
                </div>
            </div>

            <div className="card-professional-expertise">
                <div className="form-content">
                    <span className="content-lable">
                        Expertise
                    </span>
                    <Input placeholder="Enter Expertise" className="content-input">
                    </Input>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", position: "relative", top: "28px" }}>
                        <div className="selection-container">
                            <span>Account Based Marketing</span>
                            <img style={{ marginLeft: "10px" }} src={SelectionIcon.src} />
                        </div>
                        <div className="selection-container">
                            <span>Generative AI</span>
                            <img style={{ marginLeft: "10px" }} src={SelectionIcon.src} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-professional-industries">
                <div className="form-content">
                    <span className="content-lable">
                        Industries
                    </span>
                    <Input placeholder="Enter Industries" className="content-input">
                    </Input>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", position: "relative", top: "28px" }}>
                        <div className="selection-container">
                            <span>Marketing & Advertising </span>
                            <img style={{ marginLeft: "10px" }} src={SelectionIcon.src} />
                        </div>

                    </div>
                </div>
            </div>

            <div className="card-professional-languages">
                <div className="form-content">
                    <span className="content-lable">
                        Languanges
                    </span>
                    <Input placeholder="Select Languages " className="content-input">
                    </Input>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", position: "relative", top: "28px" }}>
                        <div className="selection-container">
                            <span>German</span>
                            <img style={{ marginLeft: "10px" }} src={SelectionIcon.src} />
                        </div>
                        <div className="selection-container">
                            <span>English</span>
                            <img style={{ marginLeft: "10px" }} src={SelectionIcon.src} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-work-details">
                <div className="form-content">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <span className="content-lable">
                            Work Details
                        </span>
                        <div className="add-more-btn">
                            <Button>
                                <img style={{ marginRight: "10px" }} src={AddIcon.src} />
                                Add More
                            </Button>
                        </div>
                    </div>
                    <div className="work-details-block" style={{ position: "relative", top: "10px", display: "flex", flexDirection: "column", margin: "10px auto" }}>
                        <div style={{ display: "flex", flexDirection: "row", position: "relative", top: "10px" }}>
                            <img style={{ width: "62px", height: "62px", margin: "12px" }} src={EducationIcon.src} />
                            <div className="content-block">
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                    <p className="education-text">Armitage Company </p>
                                    <p className="award-text1">Owner </p>
                                    <p className="award-text2">Jan 2019 - Present</p>
                                </div>
                                <div className="edit-block">
                                    <Button>
                                        <img src={EditIcon.src} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="details-text">
                            <p>Armitage Communications joined the Napier Group in January 2019, expanding our expertise and client base.  Armitage is a leading agency supplying PR, marketing, video and animation services to FTSE250 and Blue Chip companies in B2B sectors, including engineering, telecommunications, utilities, and construction.</p>
                        </div>
                    </div>
                    <div className="work-details-block" style={{ position: "relative", top: "4px", display: "flex", flexDirection: "column", margin: "10px auto" }}>
                        <div style={{ display: "flex", flexDirection: "row", position: "relative", top: "10px" }}>
                            <img style={{ width: "62px", height: "62px", margin: "12px" }} src={EducationIcon.src} />
                            <div className="content-block">
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                    <p className="education-text">Armitage Company </p>
                                    <p className="award-text1">Owner </p>
                                    <p className="award-text2">Jan 2019 - Present</p>
                                </div>
                                <div className="edit-block">
                                    <Button>
                                        <img src={EditIcon.src} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="details-text">
                            <p>Armitage Communications joined the Napier Group in January 2019, expanding our expertise and client base.  Armitage is a leading agency supplying PR, marketing, video and animation services to FTSE250 and Blue Chip companies in B2B sectors, including engineering, telecommunications, utilities, and construction.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card-professional-education">
                <div className="form-content">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <span className="content-lable">
                            Education
                        </span>
                        <div className="add-more-btn">
                            <Button>
                                <img style={{ marginRight: "10px" }} src={AddIcon.src} />
                                Add More
                            </Button>
                        </div>
                    </div>
                    <div className="education-block">
                        <img style={{ width: "62px", height: "62px", margin: "12px" }} src={EducationIcon.src} />
                        <div className="content-block">
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                <p className="education-text">Kingston University </p>
                                <p className="award-text1">MBA </p>
                                <p className="award-text2">2014</p>
                            </div>
                            <div className="edit-block">
                                <Button>
                                    <img src={EditIcon.src} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="education-block" style={{ position: "relative", top: "40px" }}>
                        <img style={{ width: "62px", height: "62px", margin: "12px" }} src={EducationIcon.src} />
                        <div className="content-block">
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                <p className="education-text">Kingston University </p>
                                <p className="award-text1">MBA </p>
                                <p className="award-text2">2014</p>
                            </div>
                            <div className="edit-block">
                                <Button>
                                    <img src={EditIcon.src} />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card-professional-awards">
                <div className="form-content">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <span className="content-lable">
                            Awards
                        </span>
                        <div className="add-more-btn">
                            <Button>
                                <img style={{ marginRight: "10px" }} src={AddIcon.src} />
                                Add More
                            </Button>
                        </div>
                    </div>
                    <div className="award-block">
                        <img style={{ width: "62px", height: "62px", margin: "12px" }} src={EducationIcon.src} />
                        <div className="content-block">
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                <p className="award-text">Associate Fellow of the Higher Education... </p>
                                <p className="award-text2">2014</p>
                            </div>
                            <div className="edit-block">
                                <Button>
                                    <img src={EditIcon.src} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="award-block" style={{ position: "relative", top: "40px" }}>
                        <img style={{ width: "62px", height: "62px", margin: "12px" }} src={EducationIcon.src} />
                        <div className="content-block">
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                <p className="award-text">Associate Fellow of the Higher Education... </p>
                                <p className="award-text2">2014</p>
                            </div>
                            <div className="edit-block">
                                <Button>
                                    <img src={EditIcon.src} />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="professional-btn" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
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

export default connect(mapStateToProps, actionCreators)(ProfessionalDetails);

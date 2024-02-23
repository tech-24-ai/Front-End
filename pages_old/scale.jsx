import React, { useState } from "react";
import {
  Container,
  FormGroup,
  Input,
  Label,
  Tooltip,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import Link from "next/link";
import ContentTitle from "../components/contentTitle";
import AngleUp from "../public/images/angleup.svg";
import AngleDown from "../public/images/angledown.svg";
import Navigation from "../public/images/datacenter/navigation.svg";
import Component from "../public/images/datacenter/component.svg";
import Pen from "../public/images/datacenter/pen.png";

function DataScale() {
  const [search, setSearch] = useState(false);
  const [verticalClick, setVerticalClick] = useState(false);
  const [priorityClick, setPriorityClick] = useState(false);
  const [searchTwo, setSearchTwo] = useState(false);
  const [located, setLocated] = useState();
  const [vertical, setVertical] = useState();
  const [priority, setPriority] = useState();
  const [priorityTwo, setPriorityTwo] = useState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [navigation, setNavigation] = useState(false);

  const storage = () => setTooltipOpen(!tooltipOpen);
  const locatedClick = () => setNavigation(!navigation);

  const iconClick = () => {
    setSearch(!search);
  };

  const iconClickTwo = () => {
    setSearchTwo(!searchTwo);
  };
  return (
    <section className="datascale-wrapper">
      <Container>
        <ContentTitle path={true} />
        <div className="datascale-block">
          <div className="datascale-progress-wrapper">
            <div className="datascale-progress">
              <Row>
                <Col md={4} className="progress-col">
                  <div className="scale-wrapper scale-progress active">
                    <h5>Scale</h5>
                    <div className="progress-menu">
                      <span className="completed selected">1</span>
                      <span className="active">2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="progress-col">
                  <div className="environment-wrapper scale-progress">
                    <h5>Environment</h5>
                  </div>
                </Col>
                <Col md={4} className="progress-col">
                  <div className="additional-wrapper scale-progress">
                    <h5>Additional Information</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="datascale-content">
            <div className="input-searchbox">
              <h4 className="datascale-title">
                Where are you located?{" "}
                <img src={Navigation.src} className="navigation" id="located" />
                <Tooltip
                  placement="right"
                  className="tooltip-located"
                  isOpen={navigation}
                  autohide={false}
                  target="located"
                  toggle={locatedClick}
                >
                  You can click here to auto locate country
                </Tooltip>
              </h4>
              <div className={`select-searchbox ${search ? "open" : ""}`}>
                <FormGroup>
                  <Input
                    type="text"
                    value={located}
                    placeholder="Select your country"
                    autoComplete="off"
                  />
                  <div className="search-icon" onClick={iconClick}>
                    <img src={AngleUp.src} className="angleup" />
                    <img src={AngleDown.src} className="angledown" />
                  </div>
                </FormGroup>
                <div className="search-list-box">
                  <ul>
                    <li
                      onClick={() => {
                        setLocated("Honduras"), iconClick();
                      }}
                    >
                      Honduras
                    </li>
                    <li
                      onClick={() => {
                        setLocated("Hungary"), iconClick();
                      }}
                    >
                      Hungary
                    </li>
                    <li
                      onClick={() => {
                        setLocated("Iceland"), iconClick();
                      }}
                    >
                      Iceland
                    </li>
                    <li
                      onClick={() => {
                        setLocated("India"), iconClick();
                      }}
                    >
                      India
                    </li>
                    <li
                      onClick={() => {
                        setLocated("Indonesia"), iconClick();
                      }}
                    >
                      Indonesia
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="datascale-content">
            <div className="input-searchbox">
              <div
                className={`select-searchbox ${verticalClick ? "open" : ""}`}
              >
                <FormGroup>
                  <Input
                    type="text"
                    value={vertical}
                    placeholder="Select Technology Vertical"
                    autoComplete="off"
                  />
                  <div
                    className="search-icon"
                    onClick={() => setVerticalClick(!verticalClick)}
                  >
                    <img src={AngleUp.src} className="angleup" />
                    <img src={AngleDown.src} className="angledown" />
                  </div>
                </FormGroup>
                <div className="search-list-box">
                  <ul>
                    <li
                      onClick={() => {
                        setVertical("Automotive"),
                          setVerticalClick(!verticalClick);
                      }}
                    >
                      Automotive
                    </li>
                    <li
                      onClick={() => {
                        setVertical("Banking"),
                          setVerticalClick(!verticalClick);
                      }}
                    >
                      Banking
                    </li>
                    <li
                      onClick={() => {
                        setVertical("Consumer"),
                          setVerticalClick(!verticalClick);
                      }}
                    >
                      Consumer
                    </li>
                    <li
                      onClick={() => {
                        setVertical("Retail"), setVerticalClick(!verticalClick);
                      }}
                    >
                      Retail
                    </li>
                    <li
                      onClick={() => {
                        setVertical("Healthcare"),
                          setVerticalClick(!verticalClick);
                      }}
                    >
                      Healthcare
                    </li>
                    <li
                      onClick={() => {
                        setVertical("Insurance"),
                          setVerticalClick(!verticalClick);
                      }}
                    >
                      Insurance
                    </li>
                    <li
                      onClick={() => {
                        setVertical("Systems Management Software"),
                          setVerticalClick(!verticalClick);
                      }}
                    >
                      Systems Management Software
                    </li>
                    <li
                      onClick={() => {
                        setVertical("IT Automation Tools"),
                          setVerticalClick(!verticalClick);
                      }}
                    >
                      IT Automation Tools
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="select-category-block virtual-machines">
            <h5 className="sub-title">
              Select number of Virtual Machines (VMs) to be protected
            </h5>
            <div className="category-select-btn">
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="selectnumber1" />
                <Label for="selectnumber1" className="category-btn">
                  0 - 50 VMs
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="selectnumber2" />
                <Label for="selectnumber2" className="category-btn">
                  50 - 100 VMs
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="selectnumber3" />
                <Label for="selectnumber3" className="category-btn">
                  100 - 500 VMs
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="selectnumber4" />
                <Label for="selectnumber4" className="category-btn">
                  500 - 1000 VMs
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="selectnumber5" />
                <Label for="selectnumber5" className="category-btn">
                  More than 1000 VMs
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="selectnumber6" />
                <Label for="selectnumber6" className="category-btn">
                  No VMs
                </Label>
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block physical-servers">
            <h5 className="sub-title">
              Select number of physical Servers to be protected
            </h5>
            <div className="category-select-btn">
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="physicalnumber1" />
                <Label for="physicalnumber1" className="category-btn">
                  None
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="physicalnumber2" />
                <Label for="physicalnumber2" className="category-btn">
                  50 - 100
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="physicalnumber3" />
                <Label for="physicalnumber3" className="category-btn">
                  100 - 500
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="physicalnumber4" />
                <Label for="physicalnumber4" className="category-btn">
                  500 - 1000
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="physicalnumber5" />
                <Label for="physicalnumber5" className="category-btn">
                  More than 1000
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="physicalnumber6" />
                <Label for="physicalnumber6" className="category-btn">
                  No Physical Servers
                </Label>
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block total-storage">
            <h5 className="sub-title">
              Total storage to be backed up in TB{" "}
              <span> (consider backup growth for 5 years) </span>
              <img src={Component.src} className="component" id="storage" />
              <Tooltip
                placement="right"
                className="tooltip-block"
                isOpen={tooltipOpen}
                autohide={false}
                target="storage"
                toggle={storage}
              >
                <ul>
                  <li>* TB - Tera Byte</li>
                  <li>* PB - Peta Byte</li>
                  <li>* 1 PB = 1000 TB</li>
                </ul>
              </Tooltip>
            </h5>
            <div className="category-select-btn">
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="storagenumber1" />
                <Label for="storagenumber1" className="category-btn">
                  1 TB - 100 TB
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="storagenumber2" />
                <Label for="storagenumber2" className="category-btn">
                  100 TB - 250 TB
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="storagenumber3" />
                <Label for="storagenumber3" className="category-btn">
                  250 TB - 500 TB
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="storagenumber4" />
                <Label for="storagenumber4" className="category-btn">
                  500 TB - 1 PB
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="storagenumber5" />
                <Label for="storagenumber5" className="category-btn">
                  More than 1 PB
                </Label>
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block hypervisor-type">
            <h5 className="sub-title">
              Select Hypervisor type{" "}
              <span> (multiple selections possible) </span>
            </h5>
            <div className="category-select-btn">
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="hypervisorCheckbox1"
                  label="KVM"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="hypervisorCheckbox2"
                  label="Nutanix AHV"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="hypervisorCheckbox3"
                  label="Microsoft Hyper - V"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="hypervisorCheckbox4"
                  label="Oracle Virtual Machine"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="hypervisorCheckbox5"
                  label="VMWare"
                />
              </div>
              <div className="checkbox-password disable">
                <CustomInput
                  type="checkbox"
                  id="hypervisorCheckbox6"
                  label="Not on the list"
                />
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block VMtype">
            <h5 className="sub-title">
              Select VM OS <span> (multiple selections possible) </span>
            </h5>
            <div className="category-select-btn">
              <div className="checkbox-password disable">
                <CustomInput
                  type="checkbox"
                  id="VMtype1"
                  label="Microsoft Windows Server"
                />
              </div>
              <div className="checkbox-password disable">
                <CustomInput type="checkbox" id="VMtype2" label="Suse Linux" />
              </div>
              <div className="checkbox-password disable">
                <CustomInput
                  type="checkbox"
                  id="VMtype3"
                  label="Redhat Linux"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="VMtype4"
                  label="Not on the list"
                />
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block all-physical">
            <h5 className="sub-title">
              Select all applicable physical server OS{" "}
              <span> (multiple selections possible) </span>
            </h5>
            <div className="category-select-btn">
              <div className="checkbox-password disable">
                <CustomInput
                  type="checkbox"
                  id="allphysical1"
                  label="Red Hat Linux"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="allphysical2"
                  label="Not on list"
                />
              </div>
              <div className="checkbox-password disable">
                <CustomInput
                  type="checkbox"
                  id="allphysical3"
                  label="Suse Linux"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="allphysical4"
                  label="Not applicable"
                />
              </div>
              <div className="checkbox-password disable">
                <CustomInput
                  type="checkbox"
                  id="allphysical5"
                  label="Windows Server"
                />
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block applications">
            <h5 className="sub-title">
              Select all applications that need to be protected{" "}
              <span> (multiple selections possible) </span>
            </h5>
            <div className="category-select-btn">
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="applications1"
                  label="MS Exchange"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="applications2"
                  label="NAS Systems"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="applications3"
                  label="SharePoint"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="applications4"
                  label="SAP HANA"
                  children={<span>(In-memory databases)</span>}
                />
              </div>
              <div className="checkbox-password category-directory">
                <CustomInput
                  type="checkbox"
                  id="applications5"
                  label="Active Directory"
                />
              </div>
              <div className="checkbox-password category-type">
                <CustomInput
                  type="checkbox"
                  id="applications6"
                  label="RDBMS"
                  children={
                    <ul>
                      <li>
                        <CustomInput
                          type="checkbox"
                          id="applications7"
                          label="Oracle"
                        />
                      </li>
                      <li>
                        <CustomInput
                          type="checkbox"
                          id="applications8"
                          label="MSSQL"
                        />
                      </li>
                      <li>
                        <CustomInput
                          type="checkbox"
                          id="applications9"
                          label="MySQL"
                        />
                      </li>
                      <li>
                        <CustomInput
                          type="checkbox"
                          id="applications10"
                          label="DB2"
                        />
                      </li>
                    </ul>
                  }
                />
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block public-cloud">
            <h5 className="sub-title">
              Support backup to public cloud{" "}
              <span>(multiple selections possible) </span>
            </h5>
            <div className="category-select-btn">
              <div className="checkbox-password">
                <CustomInput type="checkbox" id="publiccloud1" label="AWS" />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="publiccloud2"
                  label="Not Required"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="publiccloud3"
                  label="Microsoft"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput type="checkbox" id="publiccloud4" label="Google" />
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block databases">
            <h5 className="sub-title">
              Do you require backup for NoSQL databases
              <span>(multiple selections possible) </span>
            </h5>
            <div className="category-select-btn">
              <div className="checkbox-password">
                <CustomInput type="checkbox" id="databases1" label="MongoDB" />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="databases2"
                  label="Not Required"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="databases3"
                  label="Cassandra"
                />
              </div>
              <div className="checkbox-password">
                <CustomInput
                  type="checkbox"
                  id="databases4"
                  label="PostgreSQl"
                />
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block require-containers">
            <h5 className="sub-title">Do you require backup for containers</h5>
            <div className="category-select-btn">
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="containers1" />
                <Label for="containers1" className="category-btn">
                  Yes
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="containers2" />
                <Label for="containers2" className="category-btn">
                  No
                </Label>
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block require-backup">
            <h5 className="sub-title">Do you require backup to tape?</h5>
            <div className="category-select-btn">
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="backup1" />
                <Label for="backup1" className="category-btn">
                  Yes
                </Label>
              </div>
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="backup2" />
                <Label for="backup2" className="category-btn">
                  No
                </Label>
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">View Report</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block following-os">
            <h5 className="sub-title">
              Do you require backup of any of the following OSs{" "}
              <span> (select multiple and assign priority) </span>
            </h5>
            <div className="category-select-btn">
              <div className="category-checkbox">
                <Input type="checkbox" id="following1" />
                <Label for="following1" className="category-btn">
                  AIX
                </Label>
              </div>
              <div className="following-box">
                <div className="category-checkbox mb-0">
                  <Input type="checkbox" id="following2" />
                  <Label for="following2" className="category-btn">
                    HP - UX
                  </Label>
                </div>
                <div className="input-searchbox">
                  <div
                    className={`select-searchbox ${
                      priorityClick ? "open" : ""
                    }`}
                  >
                    <FormGroup>
                      <Input
                        type="text"
                        value={priority}
                        placeholder="Priority 2"
                        autoComplete="off"
                      />
                      <div
                        className="search-icon"
                        onClick={() => setPriorityClick(!priorityClick)}
                      >
                        <img src={AngleUp.src} className="angleup" />
                        <img src={AngleDown.src} className="angledown" />
                      </div>
                    </FormGroup>
                    <div className="search-list-box">
                      <ul>
                        <li
                          onClick={() => {
                            setPriority("Priority 1"),
                              setPriorityClick(!priorityClick);
                          }}
                        >
                          Priority 1
                        </li>
                        <li
                          onClick={() => {
                            setPriority("Priority 2"),
                              setPriorityClick(!priorityClick);
                          }}
                        >
                          Priority 2
                        </li>
                        <li
                          onClick={() => {
                            setPriority("Priority 3"),
                              setPriorityClick(!priorityClick);
                          }}
                        >
                          Priority 3
                        </li>
                        <li
                          onClick={() => {
                            setPriority("Priority 4"),
                              setPriorityClick(!priorityClick);
                          }}
                        >
                          Priority 4
                        </li>
                        <li
                          onClick={() => {
                            setPriority("Priority 5"),
                              setPriorityClick(!priorityClick);
                          }}
                        >
                          Priority 5
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="following-box">
                <div className="category-checkbox mb-0">
                  <Input type="checkbox" id="following3" />
                  <Label for="following3" className="category-btn">
                    Solaris
                  </Label>
                </div>
                <div className="input-searchbox">
                  <div
                    className={`select-searchbox ${searchTwo ? "open" : ""}`}
                  >
                    <FormGroup>
                      <Input
                        type="text"
                        value={priorityTwo}
                        placeholder="Priority 2"
                        autoComplete="off"
                      />
                      <div className="search-icon" onClick={iconClickTwo}>
                        <img src={AngleUp.src} className="angleup" />
                        <img src={AngleDown.src} className="angledown" />
                      </div>
                    </FormGroup>
                    <div className="search-list-box">
                      <ul>
                        <li
                          onClick={() => {
                            setPriorityTwo("Priority 1"), iconClickTwo();
                          }}
                        >
                          Priority 1
                        </li>
                        <li
                          onClick={() => {
                            setPriorityTwo("Priority 2"), iconClickTwo();
                          }}
                        >
                          Priority 2
                        </li>
                        <li
                          onClick={() => {
                            setPriorityTwo("Priority 3"), iconClickTwo();
                          }}
                        >
                          Priority 3
                        </li>
                        <li
                          onClick={() => {
                            setPriorityTwo("Priority 4"), iconClickTwo();
                          }}
                        >
                          Priority 4
                        </li>
                        <li
                          onClick={() => {
                            setPriorityTwo("Priority 5"), iconClickTwo();
                          }}
                        >
                          Priority 5
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
          </div>
          <div className="select-category-block summary-wrapper">
            <div className="summary-dec-btn">
              <p>
                Based on your inputs we found <span> 134 </span> vendors /
                product match
              </p>
              <div className="site-btn1">
                <Link href="/">
                  <a className="summary-btn">View Report</a>
                </Link>
              </div>
            </div>
            <div className="summary-block">
              <h5 className="summary-title">Summary</h5>
              <div className="summary-content-block">
                <div className="category-checkbox">
                  <Input type="checkbox" id="summary1" />
                  <Label for="summary1" className="custom-control-label">
                    Scale
                  </Label>
                  <Link href="/">
                    <a className="pen-icon">
                      <img src={Pen.src} />
                    </a>
                  </Link>
                  <ul>
                    <li>
                      <span></span>
                      <h6>
                        Where are you located? - <span> India </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Industry Vertical - <span> Retail </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Virtual Machines to be protected :{" "}
                        <span> 500 - 1000 VMs </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Physical servers to be protected :{" "}
                        <span> 100 - 500 </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Total storage to be backed up in TB :{" "}
                        <span> 100 TB - 250 TB </span>{" "}
                      </h6>
                    </li>
                  </ul>
                </div>
                <div className="category-checkbox">
                  <Input type="checkbox" id="summary2" />
                  <Label for="summary2" className="custom-control-label">
                    Environment
                  </Label>
                  <Link href="/">
                    <a className="pen-icon">
                      <img src={Pen.src} />
                    </a>
                  </Link>
                  <ul>
                    <li>
                      <span></span>
                      <h6>
                        Where are you located? - <span> India </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Industry Vertical - <span> Retail </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Virtual Machines to be protected :{" "}
                        <span> 500 - 1000 VMs </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Physical servers to be protected :{" "}
                        <span> 100 - 500 </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Total storage to be backed up in TB :{" "}
                        <span> 100 TB - 250 TB </span>{" "}
                      </h6>
                    </li>
                  </ul>
                </div>
                <div className="category-checkbox">
                  <Input type="checkbox" id="summary3" />
                  <Label for="summary3" className="custom-control-label">
                    Additional Information
                  </Label>
                  <Link href="/">
                    <a className="pen-icon">
                      <img src={Pen.src} />
                    </a>
                  </Link>
                  <ul>
                    <li>
                      <span></span>
                      <h6>
                        Where are you located? - <span> India </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Industry Vertical - <span> Retail </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Virtual Machines to be protected :{" "}
                        <span> 500 - 1000 VMs </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Physical servers to be protected :{" "}
                        <span> 100 - 500 </span>{" "}
                      </h6>
                    </li>
                    <li>
                      <span></span>
                      <h6>
                        Total storage to be backed up in TB :{" "}
                        <span> 100 TB - 250 TB </span>{" "}
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default DataScale;

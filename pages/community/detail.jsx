import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import rightArrow from "../../public/new_images/right-arrow.svg";
import myImageLoader from "../../components/imageLoader";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";

  

const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

import React, { Component } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Container, Input } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Image from "next/image";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { DateIcon, ProfileIcon } from "../../components/icons";
import { Icon } from "react-icons-kit";
import Router from "next/router";
import community from ".";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      fnColor: "",
      isActive: "All",
      isHover: "All",
    };
  }

 
  render() {
    const { isActive, isHover } = this.state;

    console.log("Active:", isActive);
    return (
      <>
        <section className="community-section">
          <PageBanner
            titleNode={
              <div>
                <h4>Community Service</h4>
              </div>
            }
            image={blogsBannerImage}
          />
          <Container className="community-container mt-3 mb-5">
          <div className="upper-content threadlist-content" id="pageLabel" data-grid="container">
        <div className="thread-list-header-label">
                <div className="non-branded-forum">
                    <h1 className="m-heading-3">Windows</h1>
                </div>
        </div>

        <div className="thread-list-categories">
            <div data-grid="col-12">
                <div data-grid="col-12">
                    <div className="forum-filter-container c-group f-wrap-items">
                        <div id="forumFilter">
                            <div className="forumScopeBox c-group f-wrap-items">
                                <label for="forumSelect">Categories :</label>
                                <select id="forumSelect" autocomplete="off">
                                            <option value="windowsclient">Windows Client for IT Pros</option>
                                            <option value="skype">Skype</option>
                                            <option value="officeinsider">Microsoft 365 Insider</option>
                                            <option value="microsoftedge">Microsoft Edge</option>
                                            <option value="msteams">Microsoft Teams</option>
                                            <option value="windowserver">Windows Server</option>
                                            <option value="surface">Surface</option>
                                            <option value="insider">Windows Insider Program</option>
                                            <option value="bing">Bing</option>
                                            <option value="msoffice">Microsoft 365 and Office</option>
                                            <option value="msadvs">Microsoft Advertising</option>
                                            <option value="outlook_com">Outlook</option>
                                            <option value="windows" selected="selected">Windows</option>
                                            <option value="xbanswers">Gaming and Xbox</option>
                                            <option disabled="">-------------------------------------</option>
                                            <option value="feedback">Community Center</option>
                                </select>
                            </div>
                        </div>
                        <div id="MetadataFilters" className="c-group f-wrap-items">
                        <div id="metadataFilterItemLevel-0" className="scopebox metadataFIlterItemLevel0" data-scopefor="windowsversionscope"><label className="filterHeader" for="windowsversionscope">Versions</label><select id="windowsversionscope" className="scopelist" data-level="0" data-shortname="windowsversion" data-metaid="0e5aec0e-adb4-47f3-b6de-2702acbc71d0" fdprocessedid="0ebo6"><option className="scopeitem" data-itemnum="-1" value="">Show all</option><option className="scopeitem" data-itemnum="0" value="windows_11">Windows 11</option><option className="scopeitem" data-itemnum="1" value="windows_10">Windows 10</option><option className="scopeitem" data-itemnum="2" value="windows8_1">Windows 8.1</option><option className="scopeitem" data-itemnum="3" value="windowsrt8_1">Windows RT 8.1</option><option className="scopeitem" data-itemnum="4" value="windows_8">Windows 8</option><option className="scopeitem" data-itemnum="5" value="windows_rt">Windows RT</option><option className="scopeitem" data-itemnum="6" value="windows_7">Windows 7</option><option className="scopeitem" data-itemnum="7" value="windows_vista">Windows Vista</option><option className="scopeitem" data-itemnum="8" value="windows_xp">Windows XP</option><option className="scopeitem" data-itemnum="9" value="windows_other">Other/Unknown</option></select></div><div id="metadataFilterItemLevel-2" className="scopebox metadataFIlterItemLevel2" data-scopefor="windowstopicscope"><label className="filterHeader" for="windowstopicscope">Topics</label><select id="windowstopicscope" className="scopelist" data-level="2" data-shortname="windowstopic" data-metaid="331f9bab-f247-4d52-8b96-ed6271eb4314" fdprocessedid="yraxif"><option className="scopeitem" data-itemnum="-1" value="">Show all</option><option className="scopeitem" data-itemnum="0" value="desktop">Accessibility</option><option className="scopeitem" data-itemnum="1" value="start">Desktop, Start, and personalization</option><option className="scopeitem" data-itemnum="2" value="hardware">Devices and drivers</option><option className="scopeitem" data-itemnum="3" value="ecoms">Email and communications</option><option className="scopeitem" data-itemnum="4" value="files">Files, folders, and storage</option><option className="scopeitem" data-itemnum="5" value="gaming">Gaming</option><option className="scopeitem" data-itemnum="6" value="wintop_language">Input and language</option><option className="scopeitem" data-itemnum="7" value="windows_install">Install, upgrade, and activate</option><option className="scopeitem" data-itemnum="8" value="pictures">Music, photos, and video</option><option className="scopeitem" data-itemnum="9" value="networking">Network and internet</option><option className="scopeitem" data-itemnum="10" value="winapps">Other Windows apps</option><option className="scopeitem" data-itemnum="11" value="performance">Performance and system failures</option><option className="scopeitem" data-itemnum="12" value="windows_programs">Programs</option><option className="scopeitem" data-itemnum="13" value="tms">Search, touch, and mouse</option><option className="scopeitem" data-itemnum="14" value="security">Security and privacy</option><option className="scopeitem" data-itemnum="15" value="update">Windows update, recovery, and backup</option></select></div></div>

                    </div>
                </div>
            </div>
        </div>
        <a className="ask-question-button-forum" data-bi-id="askAQuestionButton" href="https://answers.microsoft.com/en-us/newthread?threadtype=Questions&amp;cancelurl=%2Fen-us%2Fwindows%2Fforum&amp;forum=windows&amp;filter="> Ask a new question <span className="c-glyph glyph-chevron-right button-glyph-thread"></span></a>
    </div>
             
             

          </Container>
        </section>
      </>
    );
  }
}

{/* export default withRouter(connect(mapStateToProps, actionCreators)(community)); */}
export default withRouter(Community);

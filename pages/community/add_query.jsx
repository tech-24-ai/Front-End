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
          {/* <PageBanner
            titleNode={
              <div>
                <h4>Community Service</h4>
              </div>
            }
            image={blogsBannerImage}
          /> */}
          <Container className="community-container mt-3 mb-5">
          <div className="row search-container" 
              style={{
                backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
                height: "150px",
                alignItems: "center",
                flexdirection: "column",
                flexwrap: "nowrap",
               } } >
                 <h2 className="detailtitle text-white mt-5">Community  Community1</h2>
                
                 <div>
             
                 </div>
                
               </div>
          <div data-grid="col-12" className="threadlist-filter-options">
                        <div id="filterByTypeControls "  >
                            <fieldset className="c-radio f-inline">
                                <h3 className="c-subheading-5 mt-3 " id="filterByTypeLabel" style={{font:"800"}}>Add New Query </h3>
                                    

                                    {/* <button id="applyButton"   name="button" className="c-button btn btn-round btn-primary" type="submit" fdprocessedid="vwz0lf">Post New</button> */}
                               
                                <div>
                                   
                                </div>
                            </fieldset>
                        </div>
                        
                    </div> 
                   
                    <div className="row" >
             
                    <div className="col-md-12" >
                    <form>
                        <div className="input-group "  >
                        <Input style={{background:"gainsboro",height:"200px",marginBottom:"30px",border:"1px solid black",}} type="text" placeholder="Add Query" title="Add Query" className="ml-2 searchCommunity form-control" 
                         / >
                           <select className="mb-5 ml-2" style={{width:"100%",height:"50px",background:"gainsboro"}}>
                                <option>Add Tags</option>
                                <option>Tag 1</option>
                                <option>Tag 2</option>
                                <option>Tag 3</option>

                            </select>
                            <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 1</button>
                            <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 2</button>
                            <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 3</button>
                            <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 4</button>
                            <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 5</button>

                        </div>
                        <div className="col-md-12" >
                        <button name="button" style={{float:"left",}} className="mt-5  round-button btn btn-primary btn-sm"  type="submit" fdprocessedid="vwz0lf">Save</button>
                        </div>
                        
                    </form>
                 </div>
                 </div>

          </Container>
        </section>
      </>
    );
  }
}

{/* export default withRouter(connect(mapStateToProps, actionCreators)(community)); */}
export default withRouter(Community);

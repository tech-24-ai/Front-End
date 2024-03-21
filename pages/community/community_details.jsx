import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import rightArrow from "../../public/new_images/right-arrow.svg";
import myImageLoader from "../../components/imageLoader";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import { RightOutlined } from '@ant-design/icons';

const unProtectedRoutes = [
    "/community",
    "/community/[add_query]",

  ];

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
                 <h2 className="detailtitle text-white mt-5">Community <RightOutlined twoToneColor="black" />  Community1</h2>
                
                 <div>
             
                 </div>
                
               </div>
          <div data-grid="col-12" className="threadlist-filter-options">
                        <div id="filterByTypeControls "  >
                            <fieldset className="c-radio f-inline">
                                <h3 className="c-subheading-5 " id="filterByTypeLabel" style={{font:"800"}}>Query Details</h3>
                                    <h4 className="mt-4">Added By</h4>
                                    <span style={{fontSize:"18px"}}>Total Answers : XXX</span>
                                    <span style={{fontSize:"18px"}} className="ml-5">Total Views : YYY</span>
                                    <h4 className="mt-4">Tags</h4>

                                    {/* <button id="applyButton"   name="button" className="c-button btn btn-round btn-primary" type="submit" fdprocessedid="vwz0lf">Post New</button> */}
                               
                                <div>
                                   
                                </div>
                            </fieldset>
                        </div>
                        
                    </div> 
                   
             
                <div className="card mt-4" style={{background:"gainsboro", height:"190px"}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Answer 1 </span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}  >Upvotes : ZZZ</span>
                               {/* <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span> */}
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Comments (will expand to show all comments and new comments) </span>
                              <span className=""
                                  style={{color:"black",fontSize:"20px",marginLeft:"700px",}}  >Given By </span>
                                   
                            </div> 

                    </div>
                </div>
                <div className="card mt-4" style={{background:"gainsboro",height:"190px"}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Answer 1 </span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}  >Upvotes : ZZZ</span>
                               {/* <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span> */}
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Comments (will expand to show all comments and new comments) </span>
                              <span className=""
                                 style={{color:"black",fontSize:"20px",marginLeft:"700px",}}  >Given By </span>

                                   
                            </div> 

                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                      <a href="/community/add_query">
                          <button id="applyButton" style={{marginTop:"40px",}}  name="button" className="btn btn-round btn-primary" type="submit" fdprocessedid="vwz0lf">Add New Answer</button>
                    </a>
                  </div>
                  <div className="col-md-6" style={{marginTop:"40px",}} >
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                          <li className="page-item disabled">
                            <a className="page-link" href="#" tabindex="-1">Previous</a>
                          </li>
                          <li className="page-item" style={{color:"#007bff",}}><a className="page-link" href="#">1</a></li>
                          <li className="page-item"><a className="page-link" href="#">2</a></li>
                          <li className="page-item"><a className="page-link" href="#">3</a></li>
                          <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                          </li>
                        </ul>
                      </nav>
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

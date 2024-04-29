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
import Image from "next/future/image";
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
          <div className="row search-container" 
              style={{
                backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
                height: "350px",
                alignItems: "center",
                flexdirection: "column",
                flexwrap: "nowrap",
               } } >
                 <h2 className="detailtitle text-white ">{`Community > Community1`}</h2>
                
                 <div className="" >
                    <form>
                        <div className="input-group mt-5" style={{marginLeft:"260px",width:"400px",}} >
                        <Input  id="search-input-text" data-testid="search-input-text" role="combobox" aria-haspopup="true" aria-expanded="false" autocomplete="off" aria-label="Search the community" aria-controls="forum-dropdown" type="search" placeholder="Search the community" title="Search the community" className="searchCommunity form-control" 
                         / >
                        {/* <h2 className="text-white totalQueries">Total Queries : 24</h2> */}

                        </div>
                        {/* <h6 className="text-white">New to the Community?
                        <a className="cta text-white link-with-chevron" href="/en-us/page/gettingstarted" title="Learn more" aria-label="Learn more" />Learn more<span class="glyph" aria-hidden="true"></span></h6> */}
                    </form>
                 </div>
                 <div>
             
                 </div>
                
               </div>
          <div data-grid="col-12" className="threadlist-filter-options">
                        <div id="filterByTypeControls "  >
                            <fieldset className="c-radio f-inline">
                                <h3 className="c-subheading-5 " id="filterByTypeLabel" style={{font:"800"}}>Queries</h3>
                               
                                    <button id="applyButton"   name="button" className="c-button btn btn-round btn-primary" type="submit" fdprocessedid="vwz0lf">Post New</button>
                               
                                <div>
                                   
                                </div>
                            </fieldset>
                        </div>

                        {/* <div id="AdvancedFilterBar" >
                            <div id="advancedFilterDateBar" style={{display:"flex",}}>
                                        <div className="dateFilterBox">
                                            <label for="postedAfter" className="filterHeader" title="Select a date to show only questions posted after that date">Posted after:</label>
                                            <div className="date-filter-wrapper">
                                                <Input type="date" id="postedAfter" alt="Select a date to show only questions posted after that date" title="Posted after:" style={{width:"280px",}}/ >
                                            </div>
                                        </div>
                                        <div className="dateFilterBox ml-3">
                                            <label for="postedBefore" className="filterHeader" title="Select a date to show only questions posted before that date">Posted before:</label>
                                            <div className="date-filter-wrapper">
                                                <Input type="date" id="postedBefore" alt="Select a date to show only questions posted before that date" title="Posted before:" style={{width:"280px",}}/>
                                            </div>
                                        </div>
                            </div>
                        </div> */}
                        
                    </div> 
                   
             
                <div className="card mt-4" style={{background:"gainsboro",}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Query 1</span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}  >Total Answers :</span>
                               <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span>
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Tags </span>
                              <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",marginLeft:"1300px",}}  >Posted By </span>
                                   
                            </div> 

                    </div>
                </div>
                <div className="card mt-4" style={{background:"gainsboro",}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Query 1</span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}  >Total Answers :</span>
                               <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span>
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Tags </span>
                              <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",marginLeft:"1300px",}}  >Posted By </span>
                                   
                            </div> 

                    </div>
                </div>
                <div className="card mt-4" style={{background:"gainsboro",}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Query 1</span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}  >Total Answers :</span>
                               <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span>
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Tags </span>
                              <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",marginLeft:"1300px",}}  >Posted By </span>
                                   
                            </div> 

                    </div>
                </div>
                <div className="card mt-4" style={{background:"gainsboro",}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Query 1</span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}  >Total Answers :</span>
                               <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span>
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Tags </span>
                              <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",marginLeft:"1300px",}}  >Posted By </span>
                                   
                            </div> 

                    </div>
                </div>
                <div className="card mt-4" style={{background:"gainsboro",}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Query 1</span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}>Total Answers :</span>
                               <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span>
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Tags </span>
                              <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",marginLeft:"1300px",}}  >Posted By </span>
                                   
                            </div> 

                    </div>
                </div>
                <div className="card mt-4" style={{background:"gainsboro",}}>
                    <div className="card-body">
                            <div class="col-md-12 mb-2">  
                                <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63" 
                                  style={{color:"black"}}  >Query 1</span>
                               
                                </div>
                             </div> 
                             <div class="col-md-12 mt-3">   
                                <span className="ml-5 "
                                  style={{color:"black",fontSize:"20px",marginTop:"50",}}  >Total Answers :</span>
                               <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"400px",}}  >XXX Total Views : YYY </span>
                                    <span className=""
                                  style={{color:"black",fontSize:"20px",marginTop:"30",marginLeft:"360px",}}  >Upvotes : ZZZ </span>
                                   
                            </div>    
                            <div class="col-md-12" style={{marginTop:20,}}>   
                                <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",}}  >Tags </span>
                              <span className="mt-5"
                                  style={{color:"black",fontSize:"20px",marginLeft:"1300px",}}  >Posted By </span>
                                   
                            </div> 

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

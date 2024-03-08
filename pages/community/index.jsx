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

const unProtectedRoutes = [
    "/community",
    "/community/[detail]",

  ];

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
                 <h2 className="welcometitle text-white  mt-5">Welcome to the Tech 24 Community</h2>
                 <h6 className="h6class text-center mb-2  text-white" style={{paddingLeft:570, paddingBottom:190,}}>Get answers from our community of experts.</h6>

                 
                 <div className="">
                    <form>
                        <div className="input-group mt-2" >
                        <Input  id="search-input-text" data-testid="search-input-text" role="combobox" aria-haspopup="true" aria-expanded="false" autocomplete="off" aria-label="Search the community" aria-controls="forum-dropdown" type="search" placeholder="Search the community" title="Search the community" className="searchCommunity form-control" 
                         / >
                        </div>
                        {/* <h6 className="text-white">New to the Community?
                        <a className="cta text-white link-with-chevron" href="/en-us/page/gettingstarted" title="Learn more" aria-label="Learn more" />Learn more<span class="glyph" aria-hidden="true"></span></h6> */}
                    </form>
                 </div>
                 <br/>
                 <div>
             
                 </div>
                
               </div>
               {/* <div className="row banner-container mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="text-center mt-5 mb-3 col-12">
                                <h3>Didn’t find an answer?</h3>
                            </div>
                        </div>
                        <div className="row">
                            <button id="homepage-banner" className="mx-auto btn btn-primary" type="button">Ask a new question</button>
                        </div>
                      
                        </div>
                </div> */}
                     <h2 className="h2 categoryListTitle" id="categoryListTitle"> Browse Products</h2>
               
                <div className="row browseProduct">
                <div className="col-md-2 mt-5">
                
                    <a href="/community/detail">
                      <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/windows.svg" className="productImage"  />
                     <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>
                     </a>
                   
                </div>
                
                <div className="col-md-2 icon mt-5 " >
                    <a href="/">
                        <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/windows.svg" className="productImage" />
                        <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                    </a>   
                </div>

                <div className="col-md-2 icon mt-5 " >
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/windows.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                <div className="col-md-2 icon mt-5 " >
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/msoffice.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                <div className="col-md-2 icon mt-5 " >
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/xbanswers.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                
                </div>

                <div className="row browseProduct">
                
                <div className="col-md-2 mt-5 ">
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/outlook_com.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                <div className="col-md-2 icon mt-5 ">
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/skype.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                <div className="col-md-2 icon  mt-5">
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/surface.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                <div className="col-md-2 icon mt-5">
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/msteams.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                <div className="col-md-2 icon mt-5">
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/insider.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                </div>

                <div className="row browseProduct">
                
                <div className="col-md-2 mt-5" >
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/msoffice.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                <div className="col-md-2 icon mt-5" >
                    <img src="https://answersstaticfilecdnv2.azureedge.net/static/resourceimages/categories/microsoftedge.svg" className="productImage"  />
                    <div className="text-center mt-2 browseProductName">Community 1 Total Queries : X total Answers Y</div>

                </div>
                
                </div>
                <div className="row mt-5">
                    <div className="mr-auto ml-auto col-auto">
                        <button id="toggle-categories-btn" className="btn" type="button" aria-label="View all products" aria-expanded="false" style={{fontSize:"25px",}}>View all products
                        <span className="glyph glyph-chevron-down" aria-hidden=""></span>
                        </button>
                    </div>
                </div>


            
          </Container>
        </section>
      </>
    );
  }
}

export default withRouter(Community);

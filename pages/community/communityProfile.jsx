import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import { crudActions } from "../../_actions";
import { crudService } from "../../_services";
import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import { SearchOutlined } from "@ant-design/icons";
import { RightOutlined } from '@ant-design/icons';
import { ShareAltOutlined } from '@ant-design/icons';
import { UserAddOutlined } from '@ant-design/icons';
import { LikeOutlined } from '@ant-design/icons';
import { Container, Input } from "reactstrap";
import ReactPaginate from "react-paginate-next";
import { TreeSelect } from "antd";
// const unProtectedRoutes = ["/community", "/community/[visitor_community_profile]"];


const Community = ({ router, getCrud}) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [fnColor, setFnColor] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");
  const [communitypostreply, setCommunitypostreply] = useState([]);
  const [communityPostData, setCommunityPotData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();


//   useEffect(() => {
//  const postId = localStorage.getItem("post_id")
//  const urlSlug = localStorage.getItem("url_slug")
//     crudService._getAll(`communitypost/details/${urlSlug}`).then((data) => setCommunityPotData(data.data))
//     crudService._getAll(`communitypostreply?community_post_id=${postId}`).then((data) => setCommunitypostreply(data.data))
//     console.log("datatesting", postId)
//     console.log("datatesting2", urlSlug)

//     return(()=>{
//       localStorage.removeItem("post_id")
//     })
    
   
//     },
    
//     []);
    
    
  return (
    <>
      <section className="community-section">
        <Container className="community-container mt-3 mb-5">
            <div style={styles.searchContainer}>
              <h2 className="" style={styles.title}>
                <span>Community</span>
                <RightOutlined twoToneColor="black" />
                <span>Visitor Profile</span>
              </h2>
            </div>
            <div data-grid="col-8" className="threadlist-filter-options">
              <div id="filterByTypeControls "  >
                <fieldset className="c-radio f-inline">
                  <h3 className="c-subheading-5 " id="filterByTypeLabel" style={{ font: "800" }}>Query Details</h3>
                  <div className=""  style={{ float: "right", fontSize:"30px",}}>
                    <span><ShareAltOutlined /></span> 
                    <span className="ml-3"> <UserAddOutlined /></span> 
                  </div>
                  <h4 className="mt-4">Added By</h4>
                 
                  <span style={{ fontSize: "18px" }}>Total Answers : 2</span>
                  <span style={{ fontSize: "18px" }} className="ml-5">Total Views : 2</span>
                  <h4 className="mt-4">Tags</h4>
                 
            
                </fieldset>
              </div>
            </div>
           
           
            <div className="card mt-4" style={{ background: "gainsboro", minHeight: "190px" }}>
              <div className="card-body">
                    <div className="col-md-12 mb-2">
                      <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                        <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63"
                          style={{ color: "black" }}>Answer : 33 </span>
                      </div>
                    </div>
                    <div className="col-md-12 mt-3">
                      <span className="ml-5 " style={{ color: "black", fontSize: "20px", marginTop: "50", }}>Upvotes : 4</span>
                    </div>
                   <div className="row">
                      <div className="col-md-10" style={{ marginTop: 20, }}>
                        <span className="mt-5" style={{ color: "black", fontSize: "20px", }}>d</span>
                      </div>
                      <div className="col-md-2  mt-5"  >
                      <span style={{ float: "right", fontSize:"30px",}}><LikeOutlined /></span> 
                      {/* <span className="" style={{ float: "right", fontSize:"10px",}}>Given By</span> */}
                    </div>
                   
                  </div>
                </div>
            </div>  
            
          
              <div>
              </div>
              <div className="pagination mt-3" style={{ float: "right", }}>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
        </Container>
    </section>
    </>
  );
  };

  const styles = {
  searchContainer: {
    backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
    height: "150px",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap"
  },
  title: {
    color: "white",
    marginLeft: "70px",
    paddingTop: "50px",

  },

 
};
  
 
const mapStateToProps = (state) => {
  const { details, communitypostreply } = state;
  return {
    details,
    communitypostreply,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};
export default withRouter(connect(mapStateToProps, actionCreators)(Community));
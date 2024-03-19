import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import { crudActions } from "../../_actions";
import { crudService } from "../../_services";
import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import { SearchOutlined } from "@ant-design/icons";
import { RightOutlined } from '@ant-design/icons';
import { Container, Input } from "reactstrap";
import ReactPaginate from "react-paginate-next";

const Community = ({ router, getCrud, details }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [fnColor, setFnColor] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");
  const [communityData, setCommunityData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const { asPath } = router;
    let slug = asPath.slice(1).split("/")[1];
    console.log("Slug:", slug);
    const searchComm = async () => {
        try {
            const data = await crudService._getAll(`communitypost/${slug}`,  { search });
            console.log("data", data);
            setCommunityData(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    setTimeout(() => {
        searchComm();
    }, 300);
}, [search]);
console.log("search", search);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { asPath } = router;
        let slug = asPath.slice(1).split("/")[1];
        console.log("Slug:", slug); // Log slug for debugging
        // const data = await getCrud("details");
        const data = await crudService._getAll("community",`communitypost/${slug}`).then((data)=>setCommunityData(data.data))
        this.props.getCrud("community", "community");
        console.log("Data:", data); // Log fetched data for debugging
        
        console.log("Community data updated:", response.data);
      }
       catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  },
  
  []); 

  return (
    <>
      <section className="community-section">
        <Container className="community-container mt-3 mb-5">
          <div className="row search-container"
            style={{
              backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
              height: "300px",
              alignItems: "center",
              flexdirection: "column",
              flexwrap: "nowrap",
            }} >
            <h2 className="detailtitle text-white mt-5"><span className="mt-2">Community</span> <RightOutlined twoToneColor="black" /> <span className="mt-3">Community 1</span></h2>

            <div className="" >
              <form>
                <div className="input-group mt-5" style={{ marginLeft: "260px", width: "400px", }} >
                  <Input id="search-input-text"  onChange={((e) => setSearch(e.target.value))} data-testid="search-input-text" role="combobox" aria-haspopup="true" aria-expanded="false" autocomplete="off" aria-controls="forum-dropdown" type="search" title="Search the community" className="searchCommunity form-control mb-5"
                  />
                  {/* <button className="btn btn-secondary" style={{ height: "52px", marginTop: "39px", }}><SearchOutlined /></button> */}

                </div>


              </form>
              <div >

              </div>
            </div>
            <div style={{ marginLeft: "425px", marginBottom: "2300px", marginTop: "-100px", fontSize: "25px" }}>
            {/* {communityData.map((item) => ( */}
              <span className="text-white" >Total Queries : {communityData.total_posts}</span>
              {/* ))} */}
            </div>

            <div>

            </div>

          </div>
          <div data-grid="col-12" className="threadlist-filter-options">
            <div id="filterByTypeControls "  >
              <fieldset className="c-radio f-inline">
                <h3 className="c-subheading-5 mt-3" id="filterByTypeLabel" style={{ font: "800" }}>Queries</h3>

                <button id="applyButton" name="button" className="round-button btn btn-primary btn-sm"  type="submit" fdprocessedid="vwz0lf">Post New</button>

              </fieldset>
            </div>


          </div>
          
         
          {communityData.map((item, index) => (
        
            <a href="/community/community_details"> <div className="card mt-4" style={{ background: "gainsboro", }} key={index}>
              <div className="card-body">
                <div class="col-md-12 mb-2">

                  <div data-grid="col-12" className="thread-title single-line-text" aria-live="polite">
                    <span data-bi-id="thread-link" data-bi-index="0" data-bi-linkthreadid="63400f39-b2b7-4b28-88e9-569c183e0d63" href="https://answers.microsoft.com/en-us/windows/forum/all/windows-10-updates-fixes-2023/63400f39-b2b7-4b28-88e9-569c183e0d63"
                      style={{ color: "black" }}  >{item.title}</span>

                  </div>

                </div>
                <div class="col-md-12 mt-3"> 
                <span className="ml-5 "
                    style={{ color: "black", fontSize: "20px", marginTop: "50", }}  >Total Answers : </span>
                {item?.metaTag?.map(meta => (  
                  <span className="ml-5 " key  = {meta.id}
                    style={{ color: "black", fontSize: "20px", marginTop: "50", }}  > {meta.total_post_replies}</span>
                ))}
                  <span className=""
                    style={{ color: "black", fontSize: "20px", marginTop: "30", marginLeft: "400px", }}  > Total Views : 1 </span>
                  <span className=""
                    style={{ color: "black", fontSize: "20px", marginTop: "30", marginLeft: "360px", }}  >Upvotes : 6 </span>

                </div>
                <div class="col-md-12" style={{ marginTop: 20, }}>
                  <span className="mt-5"    style={{ color: "black", fontSize: "20px", }}>Tags :</span>
                {item?.postTags?.map(tag => (     
                  <span className="mt-5" key  = {tag.id}
                    style={{ color: "black", fontSize: "20px", }}  > #{tag.name} , </span>

                    ))}
                   
                  <span className="mt-5" 
                    style={{ color: "black", fontSize: "20px", marginLeft: "900px", }}  >Posted By : {item.name} </span>
                    
                </div>

              </div>
            </div>
            </a>
            ))}
            <div className="pagination d-flex justify-content-between align-items-center" style={{marginTop:"20px"}}>
               <div></div>
                <div className="issuesPagination">
                  <div>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                      <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                      </li>
                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
                  </div>
                </div>
          </div>

        </Container>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { details , community} = state;
  return {
    details,
    community,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));
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
  const [community, setCommunity] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const { asPath } = router;
    let slug = asPath.slice(1).split("/")[1];
    // console.log("Slug:", slug);
    const searchComm = async () => {
      try {
        const data = await crudService._getAll(`communitypost/${slug}`, { search });
        // console.log("data", data);
        setCommunityData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setTimeout(() => {
      searchComm();
    }, 300);
  }, [search]);
  // console.log("search", search);

  useEffect(() => {
    // const fetchData = async () => {
        const { asPath } = router;
        let slug = asPath.slice(1).split("/")[1];
        // console.log("Slug:", slug); // Log slug for debuggin
        // const data = await getCrud("details");
        crudService._getAll(`communitypost/${slug}`).then((data) => setCommunityData(data.data))
        crudService._getAll(`community/details/${slug}`).then((data) => setCommunity(data.data))

        // this.props.getCrud("community", "community");
        // console.log("Data:", data); // Log fetched data for debugging
        // console.log("community-new-data", community);

        // console.log("Community data updated:", response.data);

    // fetchData();
  },

    []);

  return (
    <>
      <section className="community-section">
        <Container className="community-container mt-3 mb-5">
          <div style={styles.searchContainer}>
            <h2 className="" style={styles.title}>
              <span>Community</span>
              <RightOutlined twoToneColor="black" />
              <span>{community.name}</span>
            </h2>

            <form>
              <div style={styles.inputGroup}>
                <Input
                  id="search-input-text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the community"
                  style={styles.input}
                />
              </div>
            </form>
            <div style={styles.totalQueries}>
              <span className="text-white">Total Queries : {community?.__meta__?.total_posts}</span>
            
            </div>
          </div>


          <div className="threadlist-filter-options">
            <div id="filterByTypeControls">
              <fieldset className="c-radio f-inline">
                <h3 className="c-subheading-5 mt-3" id="filterByTypeLabel" style={{ fontWeight: "bold" }}>Queries</h3>
                <button id="applyButton" name="button" className="round-button btn btn-primary btn-sm" type="submit" fdprocessedid="vwz0lf">Post New</button>
              </fieldset>
            </div>
          </div>

          {communityData.map((item, index) => (
            <a href="/community/community_details" key={index}>
              <div className="card mt-4" style={{ backgroundColor: "gainsboro", height: "80%" }}>
                <div className="card-body">
                  <div className="thread-title single-line-text mb-2">
                    <span style={{ color: "black" }}>{item.title}</span>
                  </div>
                  <div className="row total-answers ml-5 mt-4">
                    <div className="col-md-4" style={styles.item}>
                      <span>Total Answers : </span>
                      {communityData?.map((item, index) => (
                        <span key={index}>{item?.__meta__?.total_post_replies}</span>
                      ))}
                    </div>
                    <div className="col-md-4" style={styles.item}>
                      <span>Total Views: 1</span>
                    </div>
                    <div className="col-md-3" style={styles.item}>
                    <span>Upvotes : </span>

                    {communityData?.map((item, index) => (
                      <span>{item?.__meta__?.total_helpful}</span>
                    ))}
                    </div>
                  </div>
                  <div className="row total-answers ml-5 mt-4">
                    <div className="col-md-6" style={styles.item}>
                      <span > Tags : </span>
                      {item?.postTags?.map((tag, index) => (
                        <span key={index} style={styles.value}> #{tag.name} , </span>
                      ))}
                    </div>
                    <div className="col-md-4 " style={{marginLeft:"128px",color:"black"}}>
                      <span>Posted By : {item?.visitor?.name} </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
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
    height: "200px",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap"
  },
  title: {
    color: "white",
    marginLeft: "40px",
    paddingTop: "20px",

  },
  inputGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    width: "60%",
    height: "38px",
    textAlign: "center", display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  totalQueries: {
    marginLeft: "200px",
    fontSize: "20px",
    marginTop: "10px",
  },
  item: {
    display: "inline-block",
    marginRight: "20px", // Adjust as needed
    color: "black",
  },
};


const mapStateToProps = (state) => {
  const { details, community } = state;
  return {
    details,
    community,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));
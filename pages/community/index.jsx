import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Input } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Image from "next/image";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { DateIcon, ProfileIcon } from "../../components/icons";
import { Icon } from "react-icons-kit";
import Router from "next/router";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import { SearchOutlined } from "@ant-design/icons";

const unProtectedRoutes = ["/community", "/community/[detail]"];

const Community = ({ community, getAllCrud }) => {
    const [posts, setPosts] = useState([]);
    const [fnColor, setFnColor] = useState("");
    const [isActive, setIsActive] = useState("All");
    const [isHover, setIsHover] = useState("All");
    const [communityFeature, setCommunityFeature] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const searchPosts = async () => {
            try {
                const data = await crudService._getAll("community",  { search });
                console.log("data", data);
                setCommunityFeature(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        setTimeout(() => {
            searchPosts();
        }, 300);
    }, [search]);
    console.log("search", search);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const data = await crudService._getAll("community", "community");
                console.log("data", data);
                setCommunityFeature(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getAllPosts();
    }, []);

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
                            height: "350px",
                            alignItems: "center",
                            flexdirection: "column",
                            flexwrap: "nowrap",
                        }} >
                        <h2 className="welcometitle text-white  mt-5">Welcome to the Tech 24 Community</h2>
                        <h6 className="h6class text-center mb-2  text-white" style={{ paddingLeft: 570, paddingBottom: 190, }}>Get answers from our community of experts.</h6>


                        <div className="">
                            <form>
                                <div className="input-group mt-2" >
                                    <Input id="search-input-text" onChange={((e) => setSearch(e.target.value))} data-testid="search-input-text" role="combobox" aria-haspopup="true" aria-expanded="false" autocomplete="off" aria-label="Search the community" aria-controls="forum-dropdown" type="search" placeholder="Search the community" title="Search the community" className="searchCommunity form-control"
                                    />
                                    {/* <button className="btn btn-secondary" style={{ height: "52px", marginTop: "39px", }}><SearchOutlined /></button> */}

                                </div>

                            </form>
                        </div>
                        <br />
                        <div>

                        </div>

                    </div>


                    <h2 className="h2 categoryListTitle" id="categoryListTitle"> Browse Products</h2>


                    <div className="row">
                        {communityFeature.map((item) => (
                            <div className="col-md-2 d-flex browseProduct" >

                                <a href={`community/${item.url_slug}`}>

                                    <img src={item.image_url} width={110} alt="" className="productImage" />
                                    <div className="text-center mt-2 browseProductName">{item.name}</div>
                                </a>

                            </div>


                        ))}
                    </div>




                </Container>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    const { community } = state;
    return {
        community,
    };
};

const actionCreators = {
    getAllCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));

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
            <Container className="community-container mt-3 mb-5">
                <div style={styles.searchContainer}>
                    <h2 style={styles.title}>Welcome to the Tech 24 Community</h2>
                    <h6 style={styles.subtitle}>Get answers from our community of experts.</h6>
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
                </div>
                <h2 className="h2 categoryListTitle mb-5" id="categoryListTitle"> Browse Products</h2>
                <div className="row">
                    {communityFeature.map((item) => (
                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-3" style={styles.productCol} key={item.id}>
                            <a href={`community/${item.url_slug}`} className="text-center d-block" style={styles.productLink}>
                                <img src={item.image_url} width={110} alt="" style={styles.image} />
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

// Define styles object
const styles = {
    searchContainer: {
        backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
        height: "350px",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "nowrap"
    },
    title: {
        color: "white",
        textAlign: "center",
        
    },
    subtitle: {
        color: "white",
        textAlign: "center",
    },
    inputGroup: {
        width : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    searchContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Center align content horizontally
        backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
        height: "300px",
        
    },
    input: {
        width: "200%",
        height: "38px",
        textAlign: "center", display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    productCol: {
        marginBottom: "20px"
    },
    productLink: {
        textDecoration: "none"
    },
    image: {
        maxWidth: "100%",
        height: "auto"
    }
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

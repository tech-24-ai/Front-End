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
import React from "react";
import { TreeSelect } from "antd";
const unProtectedRoutes = ["/community", "/community/[detail]"];



const Community = ({ community, getAllCrud }) => {
    const [posts, setPosts] = useState([]);
    const [fnColor, setFnColor] = useState("");
    const [isActive, setIsActive] = useState("All");
    const [isHover, setIsHover] = useState("All");
    const [communityFeature, setCommunityFeature] = useState([]);
    const [search, setSearch] = useState("");
    const [value, setValue] = useState();

    useEffect(() => {
        const searchPosts = async () => {
            try {
                const data = await crudService._getAll("community", { search:value });
                console.log("data", data);
                setCommunityFeature(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        setTimeout(() => {
            searchPosts();
        }, 300);
    }, [value]);
    console.log("search", search);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const data = await crudService._getAll("community");
                console.log("data", data);
                setCommunityFeature(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getAllPosts();
    }, []);

  
    let arrData = []
    communityFeature?.map((item) => {
        const random = Math.random().toString(36).substring(2, 6);
        const data = {
            id: random,
            value: item.name, title: item.name
        }
        arrData.push(data)
    })

    console.log("tree data", arrData)
    const genTreeNode = (parentId, isLeaf = false) => {
        const random = Math.random().toString(36).substring(2, 6);
        return {
            id: random,
            pId: parentId,
            value: random,
            title: isLeaf ? 'Tree Node' : 'Expand to load',
            isLeaf,
        };
    };
    const onLoadData = ({ id }) =>
        new Promise((resolve) => {
            setTimeout(() => {
                // setTreeData(
                //     treeData.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]),
                // );
                resolve(undefined);
            }, 300);
        });
    const onChange = (newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <section className="community-section mt-4">
                <Container className="community-container mt-3 mb-5">
                    <div style={styles.searchContainer}>
                        <h2 style={styles.title}>Welcome to the Tech 24 Community</h2>
                        <h6 style={styles.subtitle}>Get answers from our community of experts.</h6>
                        <div className="mt-4"   style={styles.inputGroup}>
                        <TreeSelect 
                            treeDataSimpleMode
                          
                            defaultValue={value}
                            showSearch={true}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="Search the community"
                            onChange={onChange}
                            loadData={onLoadData}
                            treeData={arrData}
                        />
                      </div> 
                    </div>
                    <h2 className="h2 categoryListTitle mb-5" id="categoryListTitle"> Browse Products</h2>
                    <div className="row justify-content-center">
                        {communityFeature?.map((item) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" style={styles.productCol} key={item.id}>
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
        width: "100%",
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
        width: "60%",
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

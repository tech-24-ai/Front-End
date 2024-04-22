import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Input } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Image from "next/image";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { DateIcon, ProfileIcon } from "../../components/icons";
import { Icon } from "react-icons-kit";
import Router from "next/router";
import community from ".";
import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import rightArrow from "../../public/new_images/right-arrow.svg";
import myImageLoader from "../../components/imageLoader";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import axios from 'axios';
const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

const Community = ({ router }) => {
  const [posts, setPosts] = useState([]);
  const [fnColor, setFnColor] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");

  useEffect(() => {
    // Fetch data or perform any side effect here
    // Example: fetchPosts();
  }, []); // Empty dependency array ensures this effect runs only once on component mount


  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Example options array

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if (!selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    setSelectedOptions(selectedOptions.filter(option => option !== optionToRemove));
  };

  const clearSelectedOptions = () => {
    setSelectedOptions([]); // Clear selected options by setting to an empty array
  };

  const [formData, setFormData, communitypost] = useState({
    // Initialize form data fields
    query: '',
    tag: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response =   await crudService._getAll("communitypost",formData);
       const response = await axios.post('communitypost', formData);
      console.log('Data added successfully:',formData);
      // Optionally, update UI or show success message
    } catch (error) {
      console.error('Error adding data:', error);
      // Optionally, show error message
    }
  };
  

  return (
    <>
      <section className="community-section">
        <Container className="community-container mt-3 mb-5">
        <div className="row search-container" 
            style={{
              backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
              height: "150px",
              alignItems: "center",
              flexdirection: "column",
              flexwrap: "nowrap",
             } } >
               <h2 className="detailtitle text-white mt-5">{`Community >  Community1`}</h2>
              
              
             </div>
        <div data-grid="col-12" className="threadlist-filter-options">
                      <div id="filterByTypeControls "  >
                          <fieldset className="c-radio f-inline">
                              <h3 className="c-subheading-5 mt-3 " id="filterByTypeLabel" style={{font:"800"}}>Add New Query </h3>
                              <div>
                                 
                              </div>
                          </fieldset>
                      </div>
                      
                  </div> 
                 
                  <div className="row" >
           
                  <div className="col-md-12" >
                  <form onSubmit={handleSubmit}>
                      <div className="input-group "  >
                      <Input name="query" value={formData.query} onChange={handleChange} style={{background:"gainsboro",height:"200px",marginBottom:"30px",border:"1px solid black",}} type="text" placeholder="Add Query" title="Add Query" className="ml-2 searchCommunity form-control" 
                       / >
                         {/* <select className="mb-5 ml-2" style={{width:"100%",height:"50px",background:"gainsboro"}}>
                              <option>Add Tags</option>
                              <option>Tag 1</option>
                              <option>Tag 2</option>
                              <option>Tag 3</option>

                          </select> */}
                          {/* <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 1</button>
                          <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 2</button>
                          <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 3</button>
                          <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 4</button>
                          <button name="button" className="mt-2 ml-4 query-button btn  btn-sm"  type="submit" fdprocessedid="vwz0lf">Tag 5</button> */}
                          <select type="select" name="tags"  onChange={handleChange} className="mb-5 ml-2"  style={{width:"100%",height:"50px",background:"gainsboro"}} onChange={handleSelectChange} multiple>
                                  {options.map(option => (
                                    <option key={option} value={formData.tags}>{option}</option>
                                  ))}
                                </select>
                                <div>
                                  {/* <h3>Selected Options:</h3> */}
                                  {selectedOptions.map(option => (
                                    <button className="ml-2 px-3" key={option} onClick={() => handleRemoveOption(option)}>{option}</button>
                                  ))}
                                </div>
                      </div>
                      <div className="col-md-12" >
                      <div>
                        {/* Your input fields or components */}
                        {/* <button onClick={handleSave} disabled={loading}>
                          {loading ? 'Saving...' : 'Save'}
                        </button> */}
                        {/* {error && <div>Error: {error.message}</div>} */}
                      </div>
                      <button name="button" className="mt-2 ml-4 round-button btn btn-primary btn-sm"  type="submit" fdprocessedid="vwz0lf">Save</button>
                      <button  className="mt-2 btn btn-danger" onClick={clearSelectedOptions}>Clear Selection</button>

                </div>
                      
                  </form>
               </div>
               </div>

        </Container>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { communitypost } = state;
  return {
    communitypost,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));


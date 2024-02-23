import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Select from "react-select";
import { crudService } from "../../_services/crud.service";
import { loaderActions } from "../../_actions";
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      moduleId: "",
      moduleSlug: "",
      modules: [],
      childrenIds: [],
      slugs: [],
      subModules1: [],
      subModuleId1: "",
      subModules2: [],
      subModuleId2: "",
      subModules3: [],
      subModuleId3: "",
      subModules4: [],
      subModuleId4: "",
    };
  }

  handleRouteChange = () => {
    //console.log("handleRouteChange", "BindData");
    this.bindData();
  };

  bindData = () => {
    const { module = [] } = this.props.router.query;
    if (sessionStorage.getItem("categoryId")) {
      this.setState({ categoryId: sessionStorage.getItem("categoryId") });
      //console.log("bindData", sessionStorage.getItem("categoryId"));
      this.fetchParentModule(sessionStorage.getItem("categoryId"));
    }

    if (sessionStorage.getItem("moduleId")) {
      this.setState({ moduleId: sessionStorage.getItem("moduleId") });
      this.fetchChildrens(sessionStorage.getItem("moduleId"), "subModules1");
    }

    if (sessionStorage.getItem("slugs")) {
      this.setState({ slugs: JSON.parse(sessionStorage.getItem("slugs")) });
    }

    if (sessionStorage.getItem("childrenIds")) {
      let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
      let index = 2;
      childrenIds.forEach((element, i) => {
        this.setState({ [`subModuleId${i + 1}`]: element });
        this.setState((prevState) => ({
          childrenIds: [...prevState.childrenIds, element],
        }));
        this.fetchChildrens(element, `subModules${index}`);
        index = index + 1;
      });
    }
  };

  componentDidMount() {
    //console.log("componentDidMount", "BindData");
    this.bindData();
    if (this.props && this.props.router) {
      this.props.router.events.on("routeChangeStart", this.handleRouteChange);
    }
  }

  componentWillUnmount() {
    if (this.props && this.props.router) {
      this.props.router.events.off("routeChangeStart", this.handleRouteChange);
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isAnyChanged != this.props.isAnyChanged) {
  //     //this.bindData();
  //   }
  // }

  fetchSlugModule = (slug) => {
    const filterData = {
      seo_url_slug: slug,
      status: true,
      page: "nestedSearchModule",
    };
    crudService._getAll("modules", filterData).then((result) => {
      if (result.data) {
        const { category_id, id } = result.data[0];
        sessionStorage.setItem("categoryId", category_id);
        // sessionStorage.setItem("moduleId", id);
        this.setState({ categoryId: category_id });
        this.setState({ moduleId: id });
        //console.log("bindData", category_id);
        this.fetchParentModule(category_id);
        this.fetchChildrens(id, "subModules1");
      }
    });
  };

  fetchParentModule = (categoryId) => {
    const filterData = {
      category_id: categoryId,
      only_parent: true,
      status: true,
    };
    crudService._getAll("modules", filterData).then((result) => {
      if (result.data) {
        this.setState({ modules: result.data });
      }
    });
  };

  fetchChildrens = (id, name) => {
    const { categoryId } = this.state;
    const filterData = {
      category_id: categoryId,
      parent_id: id,
      status: true,
    };
    crudService._getAll("modules", filterData).then((result) => {
      if (result.data) {
        this.setState({ [name]: result.data });

        let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
        if (childrenIds && childrenIds.length) {
          let lastId = childrenIds[childrenIds.length - 1];
          if (lastId == id) {
            if (result.data.length) {
              this.props.isAllSelected(false);
            } else {
              this.props.isAllSelected(true);
            }
          } else {
            // this.props.isAllSelected(false);
          }
        } else {
          if (result.data.length) {
            this.props.isAllSelected(false);
          } else {
            this.props.isAllSelected(true);
          }
        }
      }
    });
  };
  onModuleChange = (e) => {
    this.setState({ moduleId: e.value });
  };

  onChange = (e, name) => {
    let { childrenIds, slugs } = this.state;
    this.props.showLoader();
    if (name === "moduleId") {
      if (e.moduleSlug) {
        this.props.router.push(
          `${e.categorySlug.replace(/ /g, "_").toLowerCase()}/${e.moduleSlug}`
        );
        slugs[0] = e.categorySlug.replace(/ /g, "_").toLowerCase();
        slugs[1] = e.moduleSlug;
        slugs.splice(2);
      } else {
        this.props.router.push(e.categorySlug.replace(/ /g, "_").toLowerCase());
        slugs[0] = e.categorySlug.replace(/ /g, "_").toLowerCase();
        slugs.splice(1);
      }

      this.setState({ moduleId: e.value });
      this.fetchChildrens(e.value, "subModules1");
      sessionStorage.setItem("moduleId", e.value);
      childrenIds = [];
      this.setState({
        subModules1: [],
        subModuleId1: "",
        subModules2: [],
        subModuleId2: "",
        subModules3: [],
        subModuleId3: "",
        subModules4: [],
        subModuleId4: "",
      });
    }
    if (name === "subModuleId1") {
      childrenIds[0] = e.value;
      slugs[2] = e.moduleSlug;
      this.setState({ subModuleId1: e.value });
      this.fetchChildrens(e.value, "subModules2");
      childrenIds.splice(1);
      slugs.splice(3);
      this.setState({
        subModules2: [],
        subModuleId2: "",
        subModules3: [],
        subModuleId3: "",
        subModules4: [],
        subModuleId4: "",
      });
    }
    if (name === "subModuleId2") {
      childrenIds[1] = e.value;
      slugs[3] = e.moduleSlug;
      this.setState({ subModuleId2: e.value });
      this.fetchChildrens(e.value, "subModules3");
      childrenIds.splice(2);
      slugs.splice(4);
      this.setState({
        subModules3: [],
        subModuleId3: "",
        subModules4: [],
        subModuleId4: "",
      });
    }
    if (name === "subModuleId3") {
      childrenIds[2] = e.value;
      slugs[4] = e.moduleSlug;
      this.setState({ subModuleId3: e.value });
      this.fetchChildrens(e.value, "subModules4");
      childrenIds.splice(3);
      slugs.splice(5);
      this.setState({
        subModules4: [],
        subModuleId4: "",
      });
    }
    if (name === "subModuleId4") {
      childrenIds[3] = e.value;
      slugs[5] = e.moduleSlug;
      this.setState({ subModuleId4: e.value });
      this.fetchChildrens(e.value, "subModules5");
      slugs.splice(6);
    }
    sessionStorage.setItem("childrenIds", JSON.stringify(childrenIds));
    sessionStorage.setItem("slugs", JSON.stringify(slugs));
    this.props.onChange();
  };

  renderSelectUI = (modules, value, name) => {
    let options = [];
    if (modules) {
      modules.forEach((element) => {
        options.push({
          value: element.id,
          label: element.name,
          moduleSlug: element.seo_url_slug,
          categorySlug: element.category,
          meta: {
            title: element.meta_title,
            keywords: element.meta_keywords,
            description: element.meta_description,
          },
        });
      });
    }

    return (
      <React.Fragment>
        <div className="select-box-wrapper">
          <Select
            placeholder="Select an Option"
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            value={options && options.filter((module) => module.value == value)}
            onChange={(e) => this.onChange(e, name)}
          />
        </div>
      </React.Fragment>
    );
  };

  render() {
    const {
      modules,
      moduleId,
      subModules1,
      subModuleId1,
      subModules2,
      subModuleId2,
      subModules3,
      subModuleId3,
      subModules4,
      subModuleId4,
    } = this.state;
    return (
      <React.Fragment>
        {modules &&
          modules.length > 0 &&
          this.renderSelectUI(modules, moduleId, "moduleId")}

        {subModules1 && subModules1.length > 0 && <br />}
        {subModules1 &&
          subModules1.length > 0 &&
          this.renderSelectUI(subModules1, subModuleId1, "subModuleId1")}

        {subModules2 && subModules2.length > 0 && <br />}
        {subModules2 &&
          subModules2.length > 0 &&
          this.renderSelectUI(subModules2, subModuleId2, "subModuleId2")}

        {subModules3 && subModules3.length > 0 && <br />}
        {subModules3 &&
          subModules3.length > 0 &&
          this.renderSelectUI(subModules3, subModuleId3, "subModuleId3")}

        {subModules4 && subModules4.length > 0 && <br />}
        {subModules4 &&
          subModules4.length > 0 &&
          this.renderSelectUI(subModules4, subModuleId4, "subModuleId4")}
      </React.Fragment>
    );
  }
}

const actionCreators = {
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(connect(null, actionCreators)(SearchBox));

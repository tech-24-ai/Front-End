import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { crudService } from "../../_services";

class CustomBreadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumb: [],
    };
  }

  handleRouteChange = () => {
    this.bindBreadcrumb();
  };

  bindBreadcrumb = async () => {
    const categoryId = sessionStorage.getItem("categoryId");
    const { updateNote, setMeta } = this.props;
    updateNote("");
    const moduleId = sessionStorage.getItem("moduleId");
    let breadcrumb = [];
    let slugs = [];
    if (categoryId) {
      await crudService._get("categories", categoryId).then(async (result) => {
        breadcrumb[0] = {
          id: result.data.id,
          title: result.data.name,
        };
        this.setState({ breadcrumb: breadcrumb });
        slugs[0] = result.data.name.replace(/ /g, "_").toLowerCase();
        sessionStorage.setItem("slugs", JSON.stringify(slugs));
      });
    }

    if (moduleId) {
      await crudService._get("modules", moduleId).then(async (result) => {
        breadcrumb[1] = {
          id: result.data.id,
          title: result.data.name,
        };
        this.setState({ breadcrumb: breadcrumb });
        slugs[1] = result.data.seo_url_slug;
        sessionStorage.setItem("slugs", JSON.stringify(slugs));

        let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
        if (childrenIds && childrenIds.length) {
          this.findNotes();
        } else {
          const { updateNote, setMeta } = this.props;
          if (updateNote) {
            await updateNote(result.data.about);
          }
          if (setMeta) {
            setMeta({
              title: result.data.meta_title,
              keywords: result.data.meta_keywords,
              description: result.data.meta_description,
            });
          }
        }
      });
    }

    if (sessionStorage.getItem("childrenIds")) {
      let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
      childrenIds.forEach((element, index) => {
        crudService._get("modules", element).then((result) => {
          // let breadcrumbIndex;
          // if (index == 0) {
          //   breadcrumbIndex = 2;
          // } else if (index == 1) {
          //   breadcrumbIndex = 3;
          // } else if (index == 2) {
          //   breadcrumbIndex = 4;
          // } else if (index == 3) {
          //   breadcrumbIndex = 5;
          // }
          breadcrumb[index + 2] = {
            id: result.data.id,
            title: result.data.name,
          };
          this.setState({ breadcrumb: breadcrumb });
          slugs[index + 2] = result.data.seo_url_slug;
          sessionStorage.setItem("slugs", JSON.stringify(slugs));
        });
      });
    } else {
      let asPath = this.props.router.asPath;
      const baseSlug = asPath.slice(1).split("/")[0];

      const childSlug = asPath
        .slice(1)
        .split("/")
        .slice(moduleId ? 3 : 2);
      childSlug &&
        baseSlug !== "d" &&
        childSlug.forEach((e, index) => {
          const filterData = {
            seo_url_slug: e,
            status: true,
            page: "breadcrumbs",
          };
          crudService._getAll("modules", filterData).then((result) => {
            if (result.data.length) {
              const { id, name, about } = result.data[0];
              breadcrumb[index + 2] = {
                id: id,
                title: name,
              };
              this.setState({ breadcrumb: breadcrumb });
            }
          });
        });
    }
  };

  componentDidMount() {
    this.bindBreadcrumb();
    if (this.props && this.props.router) {
      this.props.router.events.on("routeChangeStart", this.handleRouteChange);
    }
  }

  componentWillUnmount() {
    if (this.props && this.props.router) {
      this.props.router.events.off("routeChangeStart", this.handleRouteChange);
    }
  }

  findNotes() {
    let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
    const { updateNote, setMeta } = this.props;
    if (childrenIds && childrenIds.length) {
      let element = childrenIds.slice(-1)[0];
      try {
        crudService._get("modules", element).then((result) => {
          if (result.data) {
            if (updateNote) {
              updateNote(result.data.about);
            }
            if (setMeta) {
              setMeta({
                title: result.data.meta_title,
                keywords: result.data.meta_keywords,
                description: result.data.meta_description,
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { breadcrumb } = this.state;
    const { router, onChange, isAnyChanged } = this.props;
    if (isAnyChanged) {
      this.bindBreadcrumb();
      //this.findNotes();
      onChange();
    }
    let redirectLink = "/technology";
    let asPath = router.asPath;
    asPath = asPath.slice(1).split("/")[0];

    if (asPath == "d") {
      redirectLink = "/d";
    }
    if (redirectLink == "/d") {
      return (
        <div className="site-title">
          {breadcrumb &&
            breadcrumb.map((value, index) => {
              if (index == 0) {
                return (
                  <div key={index} style={{ display: "inline-block" }}>
                    <h5>{index == 0 ? value.title : ""}</h5>
                  </div>
                );
              }
            })}
        </div>
      );
    } else {
      return (
        <div className="site-title">
          {breadcrumb &&
            breadcrumb.map((value, index) => {
              if (index == 0) {
                return (
                  <div key={index} style={{ display: "inline-block" }}>
                    <h5>
                      <Link href={redirectLink}>
                        <a>{index == 0 ? value.title : ""}</a>
                      </Link>
                    </h5>
                  </div>
                );
              } else {
                return (
                  <div key={index} style={{ display: "inline-block" }}>
                    <h5>
                      <Link href={redirectLink}>
                        <a>
                          <span>{`> ${value.title}`}</span>
                        </a>
                      </Link>
                    </h5>
                  </div>
                );
              }
            })}
        </div>
      );
    }
  }
}

export default withRouter(CustomBreadcrumb);

import React, { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import disrupttt from "../../assets/images/logo/Disrupt.png";
import CustomizerContext from "../../_helper/Customizer";
import { MENUITEMS } from "./Menu";
import "./side.css";

const SidebarMenuItems = ({
  setMainMenu,
  sidebartoogle,
  setNavActive,
  activeClass,
}) => {
  const initialRole = JSON.parse(localStorage.getItem("role"));
  const [role, setRole] = useState(initialRole);
  const { layout, toggleSidebar, toggleIcon } = useContext(CustomizerContext);
  const layout1 = localStorage.getItem("sidebar_layout") || layout;
  const [userData, setuserData] = useState(JSON.parse(localStorage.getItem('userData'))?.id)
  const id = window.location.pathname.split("/").pop();
  const layoutId = id;
  const CurrentPath = window.location.pathname;
  const { t } = useTranslation();
  const toggletNavActive = (item) => {
    let pageBody;
    let iconClass;
    // if (window.innerWidth > 991) {
    //   pageBody = document.querySelector(".page-body");
    //   iconClass = document.querySelector(".close_icon");
    //   if (iconClass) {
    //     pageBody.classList.add("new-icon-class-available");
    //     pageBody.classList.add("icon-class-available");
    //   } else {
    //     // pageBody.classList.remove('icon-class-available');
    //   }

    //   // document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon";
    //   document.querySelector(".page-header").className = "page-header";
    //   document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper";
    //   console.log("toffle", toggleIcon);
    //   if (toggleIcon) {
    //     toggleSidebar(!toggleIcon);
    //   }
    //   // document.querySelector(".bg-overlay1").classList.add("active");
    // }
    // if (window.innerWidth <= 991) {
    //   document.querySelector(".page-header").className = "page-header";
    //   document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper";
    //   // document.querySelector('.mega-menu-container').classList.remove('d-block');
    //   if (item.type === "sub") {
    //     document.querySelector(".page-header").className = "page-header";
    //     document.querySelector(".sidebar-wrapper").className =
    //       "sidebar-wrapper";
    //   }
    // }
    if (!item.active) {
      // console.log("MENUITEMS[role]",MENUITEMS[role])
      // console.log(CurrentPath, item.activeTitle.toLowerCase())
      MENUITEMS[role].map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS[role] });
  };

  return (
    <>
      {role &&
        MENUITEMS[role].map((Item, i) => (
          <Fragment key={i}>
            {/* <li className="sidebar-main-title">
            <div>
              <h6 className="lan-1">{t(Item.menutitle)}</h6>
            </div>
          </li> */}

            {console.log("itemssss", Item)}
            {Item.Items.map((menuItem, i) => (
              // <li className="sidebar-list sidebar-z-indez" key={i}>
              //     {console.log('itemssss', Item)}
              //   {menuItem.type === "sub" ? (
              //     <a
              //       href="javascript"
              //       className={`sidebar-link sidebar-title ${menuItem?.clickFalse ? 'clickFalse' : ''} ${CurrentPath.includes(menuItem.activeTitle.toLowerCase())
              //           ? "active"
              //           : ""
              //         } ${menuItem.active && "active"}`}
              //       onClick={(event) => {
              //         event.preventDefault();
              //         setNavActive(menuItem);
              //         activeClass(menuItem.active);
              //       }}
              //     >
              //       {/* <SvgIcon
              //         className="stroke-icon"
              //         iconId={`stroke-${menuItem.icon}`}
              //       />
              //       <SvgIcon
              //         className="fill-icon"
              //         iconId={`fill-${menuItem.icon}`}
              //       /> */}
              //       {menuItem.icon}
              //       <span>{t(menuItem.title)}</span>
              //       {menuItem.badge ? (
              //         <label className={menuItem.badge}>
              //           {menuItem.badgetxt}
              //         </label>
              //       ) : (
              //         ""
              //       )}
              //       <div className="according-menu">
              //         {menuItem.active ? (
              //           <i className="fa fa-angle-down"></i>
              //         ) : (
              //           <i className="fa fa-angle-right"></i>
              //         )}
              //       </div>
              //     </a>
              //   ) : (
              //     ""
              //   )}

              //   {menuItem.type === "link" ? (
              //     <Link
              //       to={`${menuItem.path}/${role}`}
              //       className={`sidebar-link sidebar-title link-nav ${menuItem?.clickFalse ? 'clickFalse' : ''}  ${CurrentPath.includes(menuItem.activeTitle.toLowerCase())
              //           ? "active"
              //           : ""
              //         }`}
              //       onClick={() => toggletNavActive(menuItem)}
              //     >
              //       {menuItem.icon}
              //       {/* <SvgIcon className="stroke-icon" iconId={`stroke-${menuItem.icon}`} /> */}
              //       {/* <SvgIcon className="fill-icon" iconId={`fill-${menuItem.icon}`} /> */}
              //       <span>{t(menuItem.title)}</span>
              //       {menuItem.badge ? (
              //         <label className={menuItem.badge}>
              //           {menuItem.badgetxt}
              //         </label>
              //       ) : (
              //         ""
              //       )}
              //     </Link>
              //   ) : (
              //     ""
              //   )}

              //   {menuItem.children ? (
              //     <ul
              //       className={`sidebar-submenu `}
              //       style={
              //         layout1 !== "compact-sidebar compact-small"
              //           ? menuItem?.active ||
              //             CurrentPath.includes(menuItem?.activeTitle?.toLowerCase())
              //             ? sidebartoogle
              //               ? { opacity: 1, transition: "opacity 500ms ease-in" }
              //               : { display: "block" }
              //             : { display: "none" }
              //           : { display: "none" }
              //       }
              //     >
              //       {menuItem.children.map((childrenItem, index) => {
              //         return (
              //           <li key={index}>
              //             {childrenItem.type === "sub" ? (
              //               <a
              //                 href="javascript"
              //                 className={`  ${CurrentPath.includes(
              //                   childrenItem?.activeTitle?.toLowerCase()
              //                 )
              //                     ? "active"
              //                     : ""
              //                   }`}
              //                 // className={`${childrenItem.active ? 'active' : ''}`}
              //                 onClick={(event) => {
              //                   event.preventDefault();
              //                   toggletNavActive(childrenItem);
              //                 }}
              //               >
              //                 {t(childrenItem.title)}
              //                 <span className="sub-arrow">
              //                   <i className="fa fa-chevron-right"></i>
              //                 </span>
              //                 <div className="according-menu">
              //                   {childrenItem.active ? (
              //                     <i className="fa fa-angle-down"></i>
              //                   ) : (
              //                     <i className="fa fa-angle-right"></i>
              //                   )}
              //                 </div>
              //               </a>
              //             ) : (
              //               ""
              //             )}

              //             {childrenItem.type === "link" ? (
              //               <Link
              //                 to={childrenItem.path + "/" + layoutId}
              //                 className={`${childrenItem?.clickFalse ? 'clickFalse' : ''} ${CurrentPath.includes(
              //                   childrenItem?.activeTitle?.toLowerCase()
              //                 )
              //                     ? "active"
              //                     : ""
              //                   }`}
              //                 // className={`${childrenItem.active ? 'active' : ''}`} bonusui
              //                 onClick={() => toggletNavActive(childrenItem)}
              //               >
              //                 {t(childrenItem.title)}
              //               </Link>
              //             ) : (
              //               ""
              //             )}

              //             {childrenItem.children ? (
              //               <ul
              //                 className="nav-sub-childmenu submenu-content"
              //                 style={
              //                   CurrentPath.includes(
              //                     childrenItem?.activeTitle?.toLowerCase()
              //                   ) || childrenItem.active
              //                     ? { display: "block" }
              //                     : { display: "none" }
              //                 }
              //               >
              //                 {childrenItem.children.map(
              //                   (childrenSubItem, key) => (
              //                     <li key={key}>
              //                       {childrenSubItem.type === "link" ? (
              //                         <Link
              //                           to={childrenSubItem.path + "/" + layoutId}
              //                           className={`${CurrentPath.includes(
              //                             childrenSubItem?.activeTitle?.toLowerCase()
              //                           )
              //                               ? "active"
              //                               : ""
              //                             }`}
              //                           // className={`${childrenSubItem.active ? 'active' : ''}`}
              //                           onClick={() =>
              //                             toggletNavActive(childrenSubItem)
              //                           }
              //                         >
              //                           {t(childrenSubItem.title)}
              //                         </Link>
              //                       ) : (
              //                         ""
              //                       )}
              //                     </li>
              //                   )
              //                 )}
              //               </ul>
              //             ) : (
              //               ""
              //             )}
              //           </li>
              //         );
              //       })}
              //     </ul>
              //   ) : (
              //     ""
              //   )}
              // </li>

              <>
                {menuItem.path?.split('/').pop() == "summary" && userData !== 129 ? null :
                  <li className="sidebar-list sidebar-z-indez" key={i}>
                    {menuItem.path ===
                      ("/cuba-context/dashboard/all-factories" ||
                        "/dashboard/all-factories") &&
                      role === "it-officer" &&
                      JSON.parse(localStorage.getItem("userData"))?.email !==
                      "umair@thedisruptlabs.com" ? null : (
                      <>
                        {menuItem.type === "sub" ? (
                          <a
                            href="javascript"
                            className={`sidebar-link sidebar-title ${menuItem?.clickFalse ? "clickFalse" : ""
                              } ${CurrentPath.includes(
                                menuItem.activeTitle.toLowerCase()
                              )
                                ? "active"
                                : ""
                              } ${menuItem.active && "active"}`}
                            onClick={(event) => {
                              event.preventDefault();
                              setNavActive(menuItem);
                              activeClass(menuItem.active);
                            }}
                          >
                            {menuItem.icon}
                            <span>{t(menuItem.title)}</span>
                            {menuItem.badge && (
                              <label className={menuItem.badge}>
                                {menuItem.badgetxt}
                              </label>
                            )}
                            <div className="according-menu">
                              {menuItem.active ? (
                                <i className="fa fa-angle-down"></i>
                              ) : (
                                <i className="fa fa-angle-right"></i>
                              )}
                            </div>
                          </a>
                        ) : null}

                        {menuItem.type === "link" ? (
                          <Link
                            to={`${menuItem.path}/${role}`}
                            className={`sidebar-link sidebar-title link-nav ${menuItem?.clickFalse ? 'clickFalse' : ''}  ${CurrentPath.includes(menuItem.activeTitle.toLowerCase())
                              ? "active"
                              : ""
                              }`}
                            onClick={() => {
                              toggletNavActive(menuItem)
                              localStorage.removeItem('filters');
                              localStorage.removeItem('camerafilter1');
                              localStorage.removeItem('dropdownOptions');
                              localStorage.removeItem('pageNo');
                              localStorage.removeItem('camerapage');
                              localStorage.removeItem('aifilters');
                              localStorage.removeItem('leaderfilters');
                              localStorage.removeItem('dashfilters');
                              localStorage.removeItem('alerttrendfilters');
                              localStorage.removeItem('qafilters')
                              localStorage.removeItem('areaAnalysisFilters')

                            }
                            }

                          >
                            {menuItem.icon}
                            {/* <SvgIcon className="stroke-icon" iconId={`stroke-${menuItem.icon}`} /> */}
                            {/* <SvgIcon className="fill-icon" iconId={`fill-${menuItem.icon}`} /> */}
                            <span>{t(menuItem.title)}</span>
                            {menuItem.badge ? (
                              <label className={menuItem.badge}>
                                {menuItem.badgetxt}
                              </label>
                            ) : (
                              ""
                            )}
                          </Link>
                        ) : (
                          ""
                        )}

                        {menuItem.children && (
                          <ul
                            className={`sidebar-submenu`}
                            style={
                              layout1 !== "compact-sidebar compact-small"
                                ? menuItem?.active ||
                                  CurrentPath.includes(
                                    menuItem?.activeTitle?.toLowerCase()
                                  )
                                  ? sidebartoogle
                                    ? {
                                      opacity: 1,
                                      transition: "opacity 500ms ease-in",
                                    }
                                    : { display: "block" }
                                  : { display: "none" }
                                : { display: "none" }
                            }
                          >
                            {menuItem.children.map((childrenItem, index) => (
                              <li key={index}>
                                {childrenItem.type === "sub" ? (
                                  <a
                                    href="javascript"
                                    className={`${CurrentPath.includes(
                                      childrenItem?.activeTitle?.toLowerCase()
                                    )
                                        ? "active"
                                        : ""
                                      }`}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      toggletNavActive(childrenItem);
                                    }}
                                  >
                                    {t(childrenItem.title)}
                                    <span className="sub-arrow">
                                      <i className="fa fa-chevron-right"></i>
                                    </span>
                                    <div className="according-menu">
                                      {childrenItem.active ? (
                                        <i className="fa fa-angle-down"></i>
                                      ) : (
                                        <i className="fa fa-angle-right"></i>
                                      )}
                                    </div>
                                  </a>
                                ) : null}

                                {childrenItem.type === "link" ? (
                                  <Link
                                    to={childrenItem.path + "/" + layoutId}
                                    className={`${childrenItem?.clickFalse ? 'clickFalse' : ''} ${CurrentPath.includes(
                                      childrenItem?.activeTitle?.toLowerCase()
                                    )
                                      ? "active"
                                      : ""
                                      }`}
                                    // className={`${childrenItem.active ? 'active' : ''}`} bonusui
                                    onClick={() => {
                                      toggletNavActive(childrenItem)
                                      localStorage.removeItem('filters');
                                      localStorage.removeItem('camerafilter1');
                                      localStorage.removeItem('dropdownOptions');
                                      localStorage.removeItem('pageNo');
                                      localStorage.removeItem('camerapage');
                                      localStorage.removeItem('aifilters');
                                      localStorage.removeItem('leaderfilters');
                                      localStorage.removeItem('dashfilters');
                                      localStorage.removeItem('alerttrendfilters');
                                      localStorage.removeItem('qafilters')
                                      localStorage.removeItem('areaAnalysisFilters')


                                    }
                                    }
                                  >
                                    {t(childrenItem.title)}
                                  </Link>
                                ) : (
                                  ""
                                )}

                                {childrenItem.children && (
                                  <ul
                                    className="nav-sub-childmenu submenu-content"
                                    style={
                                      CurrentPath.includes(
                                        childrenItem?.activeTitle?.toLowerCase()
                                      ) || childrenItem.active
                                        ? { display: "block" }
                                        : { display: "none" }
                                    }
                                  >
                                    {childrenItem.children.map(
                                      (childrenSubItem, key) => (
                                        <li key={key}>
                                          {childrenSubItem.type === "link" ? (
                                            <Link
                                              to={
                                                childrenSubItem.path +
                                                "/" +
                                                layoutId
                                              }
                                              className={`${CurrentPath.includes(
                                                childrenSubItem?.activeTitle?.toLowerCase()
                                              )
                                                  ? "active"
                                                  : ""
                                                }`}
                                              onClick={() =>
                                                toggletNavActive(childrenSubItem)
                                              }
                                            >
                                              {t(childrenSubItem.title)}
                                            </Link>
                                          ) : null}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </li>
                }
              </>
            ))}

            <div
              className={`${toggleIcon ? "hide-true" : ""} disrupt-logo-hideOn`}
            >
              <img
                style={{ position: "absolute", bottom: "-110px", right: "-60px",width:"400px" }}
                src={disrupttt}
                alt="disrupt-logo"
              />
            </div>
          </Fragment>
        ))}
    </>
  );
};

export default SidebarMenuItems;

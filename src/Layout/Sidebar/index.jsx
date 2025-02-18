import React, { Fragment, useState, useEffect, useContext } from "react";
import CustomContext from "../../_helper/Customizer";
import { MENUITEMS } from "./Menu";
import SidebarIcon from "./SidebarIcon";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SessionTimeOut from '../../popups/sessionTimeout'
import { P } from "../../AbstractElements";

const Sidebar = (props) => {
  // const customizer = useContext(CustomContext);
  // const { toggleIcon } = useContext(CustomContext);
  const initialRole = JSON.parse(localStorage.getItem('role'))
  const [role, setRole] = useState(initialRole)
  // const id = window.location.pathname.split("/").pop();
  // const defaultLayout = Object.keys(customizer.layout);

  // const layout = id ? id : defaultLayout;
  // // eslint-disable-next-line
  // const [mainmenu, setMainMenu] = useState(MENUITEMS);

  // const [width, setWidth] = useState(0);

  // const handleScroll = () => {
  //   if (window.scrollY > 400) {
  //     // if (
  //     //   customizer.settings.sidebar.type.split(' ').pop() ===
  //     //   'material-type' ||
  //     //   customizer.settings.sidebar.type.split(' ').pop() ===
  //     //   'advance-layout'
  //     // )
  //     document.querySelector(".sidebar-main").className = "sidebar-main hovered";
  //   } else {
  //     if (document.getElementById("sidebar-main")) document.querySelector(".sidebar-main").className = "sidebar-main";
  //   }
  // };

  // useEffect(() => {
  //   document.querySelector(".left-arrow").classList.add("d-none");
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   const currentUrl = window.location.pathname;
  //   console.log("currentUrl", currentUrl)
  //   MENUITEMS[role].map((items) => {
  //     items?.Items?.filter((Items) => {
  //       console.log('Items.path', Items.path)
  //       console.log('Items', Items)
  //       if (Items?.path === currentUrl) {const nav = setNavActive(Items); console.log("anv", nav)};
  //       if (!Items?.children) return false;
  //       Items.children.filter((subItems) => {
  //         if (subItems.path === currentUrl) setNavActive(subItems);
  //         if (!subItems.children) return false;
  //         subItems.children.filter((subSubItems) => {
  //           if (subSubItems.path === currentUrl) {
  //             setNavActive(subSubItems);
  //             return true;
  //           } else {
  //             return false;
  //           }
  //         });
  //         return subItems;
  //       });
  //       return Items;
  //     });
  //     return items;
  //   });
  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll();
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [layout]);

  // const handleResize = () => {
  //   setWidth(window.innerWidth - 500);
  // };

  // const activeClass = () => {
  //   document.querySelector('.sidebar-link').classList.add('active');
  //   document.querySelector(".bg-overlay1").classList.add("active");
  // };

  // const setNavActive = (item) => {
  //   console.log("itemmm", item)
  //   MENUITEMS[role].map((menuItems) => {
  //     menuItems.Items.filter((Items) => {
  //       if (Items !== item) {
  //         Items.active = false;
  //         document.querySelector(".bg-overlay1").classList.remove("active");
  //       }
  //       if (Items.children && Items.children.includes(item)) {
  //         Items.active = true;
  //         document.querySelector(".sidebar-links").classList.add("active");
  //         console.log("document.querySelector", document.querySelector(".sidebar-links"))
  //       }
  //       if (Items.children) {
  //         Items.children.filter((submenuItems) => {
  //           if (submenuItems.children && submenuItems.children.includes(item)) {
  //             Items.active = true;
  //             submenuItems.active = true;
  //             return true;
  //           } else {
  //             return false;
  //           }
  //         });
  //       }
  //       return Items;
  //     });
  //     return menuItems;
  //   });
  //   item.active = !item.active;
  //   setMainMenu({ mainmenu: MENUITEMS });
  // };

  // const closeOverlay = () => {
  //   document.querySelector(".bg-overlay1").classList.remove("active");
  //   document.querySelector(".sidebar-links").classList.remove("active");
  // };
  const customizer = useContext(CustomContext);
  const { toggleIcon, toggleSidebar } = useContext(CustomContext);
  const id = window.location.pathname.split("/").pop();
  const defaultLayout = Object.keys(customizer.layout);

  const layout = id ? id : defaultLayout;
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(MENUITEMS);

  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      // if (
      //   customizer.settings.sidebar.type.split(' ').pop() ===
      //   'material-type' ||
      //   customizer.settings.sidebar.type.split(' ').pop() ===
      //   'advance-layout'
      // )
      document.querySelector(".sidebar-main").className = "sidebar-main hovered";
    } else {
      if (document.getElementById("sidebar-main")) document.querySelector(".sidebar-main").className = "sidebar-main";
    }
  };

  useEffect(() => {
    // document.querySelector(".left-arrow").classList.add("d-none");
    // window.addEventListener("resize", handleResize);
    // handleResize();
    const currentUrl = window.location.pathname;
    MENUITEMS[role].map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    // window.addEventListener("scroll", handleScroll);
    // handleScroll();
    // return () => {
    //   // window.removeEventListener("scroll", handleScroll);
    //   window.removeEventListener("resize", handleResize);
    // };
  }, [layout]);



  // const handleResize = () => {
  //   // setWidth(window.innerWidth - 500)
  //   let pageBody;
  //   let iconClass;
  //  console.log('window_innerWidthdadf', window.innerWidth)
  //      pageBody = document.querySelector('.page-body')
  //      iconClass = document.querySelector('.close_icon')
  //     if(window.innerWidth >= 992){if (iconClass) {
  //       console.log('bilaladfadfadf223423')
  //       // toggleSidebar(!toggleIcon)
  //       // document.querySelector(".page-header").className =
  //       // "page-header close_icon";
  //       // document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon";
  //       // pageBody.classList.add('new-icon-class-available');
  //       // pageBody.classList.add('icon-class-available');
  //     }
        
  //     }
  //   else if(!iconClass) {
  //     console.log('bilaladfadfadf')
  //     // document.querySelector(".page-header").className =
  //     // "page-header";
  //     // document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper";
  //     // toggleSidebar(toggleIcon)
        
      
  //   }
  //     // console.log('icon classssss', iconClass)
      
  //     //   document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon";
       
  //     // console.log('toffle', toggleIcon)
  //     // if(!toggleIcon) {
  //     //   toggleSidebar(toggleIcon)
  //     //   document.querySelector(".page-header").className =
  //     //       "page-header close_icon";
  //     //       document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon";
  //     //       pageBody.classList.add('new-icon-class-available');
  //     //   pageBody.classList.add('icon-class-available');
  //     // }else if (!toggleIcon){
  //     //   toggleSidebar(toggleIcon)
      
       
  //     // }
  //     // console.log('toggle Cioss', toggleIcon)
  //     // document.querySelector(".bg-overlay1").classList.add("active");
  
    
  //   // console.log('alittttttta')
  // };
  // const targetNode = document.querySelector('.close_icon'); // Replace '.target-class' with your class

  // if (targetNode) {
  //   const observer = new MutationObserver((mutationsList) => {
  //     for (let mutation of mutationsList) {
  //       if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
  //         if (!mutation.target.classList.contains('close_icon')) {
  //           debugger; // This will trigger when the class is removed
  //           console.log('The class has been removed:', mutation);
  //         }
  //       }
  //     }
  //   });
  
  //   observer.observe(targetNode, { attributes: true });
  // }
  
  const activeClass = () => {
    // document.querySelector('.sidebar-link').classList.add('active');
    document.querySelector(".bg-overlay1").classList.add("active");
  };

  const setNavActive = (item) => {
    MENUITEMS[role].map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) {
          Items.active = false;
          document.querySelector(".bg-overlay1").classList.remove("active");
        }
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
          document.querySelector(".sidebar-links").classList.add("active");
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const closeOverlay = () => {
    document.querySelector(".bg-overlay1").classList.remove("active");
    document.querySelector(".sidebar-links").classList.remove("active");
  };



  return (
    <Fragment>

      <div
        className="bg-overlay1"
      onClick={() => {
        closeOverlay();
      }}
      >
      </div>
      <div className={`sidebar-wrapper ${toggleIcon ? "close_icon" : ""}`} sidebar-layout="stroke-svg">
        <SidebarIcon />
        <SidebarLogo />
        <SidebarMenu setMainMenu={setMainMenu} props={props} setNavActive={setNavActive} activeClass={activeClass} width={width} />
        {/* sidebartoogle={sidebartoogle} */}
        {/* <div style={{height:'100vh'}}>
          <div style={{height:"20vh"}}>

        <SidebarIcon />
        <SidebarLogo />
          </div>
          <div style={{height:"80vh",overflow:'auto' }}>
        <SidebarMenu setMainMenu={setMainMenu} props={props} setNavActive={setNavActive} activeClass={activeClass} width={width} />
          <SidebarLogo />
          </div>

         
        </div> */}

      </div>
    </Fragment>
  );
};

export default Sidebar;

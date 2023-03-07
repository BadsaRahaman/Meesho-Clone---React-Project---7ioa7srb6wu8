import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";
import searchIcon from "../../assets/img/search.png";
import icon from "../../assets/img/meesho.png";
import user from "../../assets/img/user.png";
import cart from "../../assets/img/cart.png";
import mobile from "../../assets/img/mobile.png";
import RenderSubMenu from "../../components/RenderSubMenu";
import { data } from "./navData";
import { useData } from "../../utils/Store";

import {
  Popover,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeCurrentUser } from "../../utils/localStorage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useNavigate } from "react-router-dom";

const index = () => {
  const {
    state: { user, cart },
    dispatch,
  } = useData();

  const logout = () => {
    removeCurrentUser();
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_CART", payload: null });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  const navigator = useNavigate();
  return (
    <>
      {/* <!--meesho icon--> */}
      <header className="header">
        <div className="headerLeft">
          <div className="logoContainer">
            <Link to={routes.home.path}>
              <img src={icon} />
            </Link>
          </div>

          {/* <!--seach box--> */}
          <div className="searchInputContainer">
            <div className="searchIcon">
              <img src={searchIcon} />
            </div>

            {/* <!--seach bar--> */}
            <form action="" id="inputForm">
              <input
                type="text"
                placeholder="Try Saree, Kurti or Search by Product Code"
                className="inputSearch"
              />
            </form>

            <div className="searchRecentModal">
              <h3>Recent Searches</h3>
              <div className="listofRecent"></div>
            </div>
          </div>
        </div>

        <div className="headerRight">
          <div className="downloadContainer">
            <div className="mobileIcon">
              <img src={mobile} />
            </div>
            <p>Download App</p>

            <div className="downloadHoverBtnContainer">
              <h3>Download From</h3>

              <a href="" className="downloadBtn">
                <img src="https://images.meesho.com/images/pow/playstore-icon-big.webp" />
              </a>
              <a href="" className="downloadBtn">
                <img src="https://images.meesho.com/images/pow/appstore-icon-big.webp" />
              </a>
            </div>
          </div>

          <div className="becomeSupplierContainer">
            <p>Become a Supplier</p>
          </div>
          {/* <!--Profile And Cart--> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <IconButton aria-describedby={id} onClick={handleClick}>
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List sx={{ minWidth: "250px" }}>
                {user ? (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigator(routes.register.path);
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          logout();
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigator(routes.login.path);
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigator(routes.register.path);
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <HowToRegIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </List>
            </Popover>

            <IconButton
              onClick={() => navigator(routes.cart.path)}
              className="CartContainer"
            >
              <Badge badgeContent={cart?.length} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </div>
      </header>

      {/* <!--navigation--> */}
      <nav>
        <ul>
          <li onClick={() => navigator(routes.products.path)}>View All</li>
          <li>
            Women Ethnic
            <div className="subMenu">
              <div id="womenEthic" className="submenuList">
                <RenderSubMenu data={data.WomenEthnic} />
              </div>
            </div>
          </li>
          <li>
            Women Western
            <div className="subMenu">
              <div id="womenWestern" className="submenuList">
                <RenderSubMenu data={data.WomenWestern} />
              </div>
            </div>
          </li>
          <li>
            Men
            <div className="subMenu">
              <div id="men" className="submenuList">
                <RenderSubMenu data={data.Men} />
              </div>
            </div>
          </li>
          <li>
            Kids
            <div className="subMenu">
              <div id="kids" className="submenuList">
                <RenderSubMenu data={data.Kids} />
              </div>
            </div>
          </li>
          <li>
            Home & Kitchen
            <div className="subMenu">
              <div id="HomeAndKitchen" className="submenuList">
                <RenderSubMenu data={data.HomeAndKitchen} />
              </div>
            </div>
          </li>
          <li>
            Beauty & Health
            <div className="subMenu">
              <div id="beautyAndHealth" className="submenuList">
                <RenderSubMenu data={data.BeautyHealth} />
              </div>
            </div>
          </li>
          <li>
            Jewellery & Accessories
            <div className="subMenu">
              <div id="JewelleryAndAccessories" className="submenuList">
                <RenderSubMenu data={data.JewelleryAccessories} />
              </div>
            </div>
          </li>
          <li>
            Bags & Footwear
            <div className="subMenu">
              <div id="BagsFootWarId" className="submenuList">
                <RenderSubMenu data={data.BagsFootwear} />
              </div>
            </div>
          </li>
          <li>
            Electronics
            <div className="subMenu">
              <div id="ElectronicsId" className="submenuList">
                <RenderSubMenu data={data.Electronics} />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default index;

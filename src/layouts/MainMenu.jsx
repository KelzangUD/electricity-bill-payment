import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Logo from "../assets/logo.ico";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { MenuItems } from "../constants/sideMenu";

export default function MainMenu() {
  const navigation = useNavigate();
  const [openStates, setOpenStates] = useState([]);
  const handleNestedItemClick = (index) => {
    setOpenStates((prevOpenStates) => {
      const isAlreadyOpen = prevOpenStates[index];
      const newOpenStates = prevOpenStates.map(() => false);
      newOpenStates[index] = !isAlreadyOpen;
      return newOpenStates;
    });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mb: 0.3,
          }}
        >
          <Grid size={4} alignItems="center">
            <Button
              type="button"
              variant="text"
              color="primary"
              size="large"
              fullWidth
            >
              <img
                src={Logo}
                alt="Logo"
                style={{
                  width: "90%",
                  height: "auto",
                }}
              />
            </Button>
          </Grid>
          <Grid
            size={8}
            alignContent="center"
            sx={{
              lineHeight: 0.2,
            }}
          >
            <Typography variant="subtitle2">TashiCell</Typography>
            <Typography variant="caption" color="textSecondary">
              Electricity Bill Payment
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          maxHeight: "100vh",
          overflowY: "auto",
          marginTop: "-8px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {MenuItems?.map((item, index) => (
          <React.Fragment key={index}>
            {item?.nestedItems !== undefined ? (
              item?.nestedItems?.length > 0 && (
                <ListItemButton
                  onClick={() => {
                    if (item?.nestedItems?.length > 0) {
                      handleNestedItemClick(index);
                    } else {
                      navigation(item?.route);
                    }
                  }}
                  sx={{
                    borderLeft: "3px solid transparent",
                    transition: "color 0.3s ease, border-left-color 0.3s ease",
                    ":hover": {
                      borderLeft: "3px solid #1976d2",
                      color: "#1976d2",
                    },
                  }}
                >
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  <ListItemIcon
                    sx={{
                      color: "inherit", // <- inherit from ListItemButton
                      minWidth: 40, // keep default spacing if needed
                    }}
                  >
                    {React.isValidElement(item.icon)
                      ? React.cloneElement(item.icon, {
                          sx: { color: "inherit" },
                        })
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">{item?.module}</Typography>
                  </ListItemText>
                  {item.nestedItems &&
                    (openStates[index] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              )
            ) : (
              <ListItemButton
                onClick={() => {
                  navigation(item?.route);
                  handleNestedItemClick(item?.itemNumber);
                }}
                sx={{
                  borderLeft: "3px solid transparent",
                  transition: "color 0.3s ease, border-left-color 0.3s ease",
                  ":hover": {
                    borderLeft: "3px solid #1976d2",
                    color: "#1976d2",
                  },
                }}
              >
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemIcon
                  sx={{
                    color: "inherit", // <- inherit from ListItemButton
                    minWidth: 40, // keep default spacing if needed
                  }}
                >
                  {React.isValidElement(item.icon)
                    ? React.cloneElement(item.icon, {
                        sx: { color: "inherit" },
                      })
                    : item.icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">{item?.module}</Typography>
                </ListItemText>
                {item.nestedItems &&
                  (openStates[index] ? (
                    <ExpandLess fontSize="small" />
                  ) : (
                    <ExpandMore fontSize="small" />
                  ))}
              </ListItemButton>
            )}
            {item?.nestedItems && (
              <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.nestedItems.map((nestedItem, nestedIndex) => (
                    <ListItemButton
                      key={nestedIndex}
                      onClick={() => navigation(nestedItem?.route)}
                      sx={{
                        borderLeft: "3px solid transparent",
                        transition: "color 0.3s ease, border-left-color 0.3s ease",
                        ":hover": {
                          borderLeft: "3px solid #1976d2",
                          color: "#1976d2",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "inherit",
                          minWidth: 40,
                          marginLeft: 1,
                        }}
                      >
                        <KeyboardArrowRightIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body2">
                          {nestedItem?.page}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );
}

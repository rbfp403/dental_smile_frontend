import { Tab } from "@mui/material";

export const CustomTab = ({ ...props }) => {
  return (
    <Tab
      wrapped
      sx={{
        // width: "100px",
        minHeight: "40px !important",
        padding: "5px 10px",
        textTransform: "none",
        // minWidth: "0px",
        // fontWeight: "bold",
        fontSize: "15px",
        // marginRight: "2px",
        // border: "2px solid",
        // borderColor: "primary.main",
        borderRadius: "20px",
        color: "primary.main",
        "&.Mui-selected": {
          // color: "black",

          backgroundColor: "rgba(156, 39, 176, 0.1)",
        },
      }}
      // icon={<ContactPage />}
      {...props}
    />
  );
};

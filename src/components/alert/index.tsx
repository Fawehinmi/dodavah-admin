import React from "react";
import Alert from "@mui/material/Alert";

interface IProps {
  severity: "error" | "warning" | "info" | "success";
}

const ApAlert = () => {
  return (
    <>
      <Alert severity="error">This is an error alert — check it out!</Alert>
    </>
  );
};

export default ApAlert;

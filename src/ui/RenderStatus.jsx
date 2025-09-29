import { memo } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoIcon from "@mui/icons-material/Info";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DoneIcon from "@mui/icons-material/Done";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: "left",
  alignItems: "center",
  "& .icon": {
    color: "inherit",
  },
  "&.Active,": {
    color: (theme.vars || theme).palette.info.dark,
    border: "none",
    backgroundColor: "#BBFBFF",
  },
  "&.Received, &.Success, &.Approved, &.Closed, &.Paid": {
    color: (theme.vars || theme).palette.success.dark,
    border: "none",
    backgroundColor: "#B6EADA",
  },
  "&.Submitted": {
    color: (theme.vars || theme).palette.primary.dark,
    border: `1px solid ${(theme.vars || theme).palette.primary.main}`,
  },
  "&.PartiallyFilled, &.In-Progress, &.In-Transit, &.UnPaid": {
    color: (theme.vars || theme).palette.warning.dark,
    border: "none",
  },
  "&.Rejected, &.Failed, &.Inactive, &.In-Active &.Transaction Failed": {
    color: (theme.vars || theme).palette.error.dark,
    border: "none",
    backgroundColor: "#F7CAC9",
  },
}));

const Status = memo((props) => {
  const { status } = props;

  let icon = null;
  if (status === "Rejected") {
    icon = <ReportProblemIcon className="icon" />;
  } else if (status === "Open" || status === "UnPaid") {
    icon = <InfoIcon className="icon" />;
  } else if (status === "Active") {
    icon = <AvTimerIcon className="icon" />;
  } else if (status === "Received") {
    icon = <CallReceivedIcon className="icon" />;
  } else if (status === "Submitted") {
    icon = <ArrowUpwardIcon className="icon" />;
  } else if (status === "Not Shipped") {
    icon = <NotInterestedIcon className="icon" />;
  } else if (
    status === "Approved" ||
    status === "Success" ||
    status === "Closed" ||
    status === "Paid"
  ) {
    icon = <DoneIcon className="icon" />;
  } else if (status === "Inactive") {
    icon = <UnpublishedIcon className="icon" />;
  } else if (status === "Transaction Failed") {
    icon = <CloseIcon className="icon" />;
  }

  let label = status;
  if (status === "PartiallyFilled") {
    label = "Partially Filled";
  }
  if (status === "Inactive") {
    label = "In Active";
  }
  if (status === "In_Active") {
    label = "In Active";
  }
  if (status === "In-Active") {
    label = "In Active";
  }
  if (status === "UnPaid") {
    label = "Un Paid";
  }
  if (status === "Transaction Failed") {
    label = "Failed";
  }
  return (
    <StyledChip
      className={status}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
      sx={{
        fontWeight: "bold",
        py: 0.5,
        px: 1,
      }}
    />
  );
});

const RenderStatus = (params) => {
  if (params?.status == null) {
    return "";
  }

  return <Status status={params?.status} />;
};

export default RenderStatus;

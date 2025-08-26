import { Box, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataTable, Loader } from "../ui/index";
import { NewUser } from "../components/index";
import { UsersColumns } from "../constants/columns";
import useUsersLogic from "../hooks/useUsersLogic";

const Users = () => {
  const { users, isLoading, addNew, setAddNew, fetchUsers, fetchDetails } =
    useUsersLogic();
  return (
    <>
      <Box
        sx={{
          paddingX: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              size="small"
              endIcon={<AddIcon />}
              onClick={() => setAddNew(true)}
            >
              New User
            </Button>
          </Grid>
          <Grid size={12}>
            <DataTable
              columns={UsersColumns(fetchDetails)}
              rows={users}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
      {addNew && (
        <NewUser open={addNew} setOpen={setAddNew} fetchUsers={fetchUsers} />
      )}
      {isLoading && <Loader open={isLoading} />}
    </>
  );
};

export default Users;

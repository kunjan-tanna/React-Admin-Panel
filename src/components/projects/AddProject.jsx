import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { fetchAllUsers } from "../../features/users/userAction";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addProject,
  fetchProject,
  updateGetProject,
} from "../../features/projects/projectActions";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../../Routes/Routes";
import data from "../../data.json";

const AddProject = () => {
  const { users, loading, error } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [managerList, setManagerList] = useState(data?.manager || []);
  const [staffList, setStaffList] = useState(data?.staff || []);
  const [statusList, setstatusList] = useState(data?.status || []);
  const { getProject } = useSelector((state) => state.projects);
  const { projectId } = useParams();

  console.log("GETPRO", getProject);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    customer: Yup.string().required("Customer is required"),
    referenceNo: Yup.string().required("Reference Number is required"),
    projectName: Yup.string().required("Project Name is required"),
    projectNo: Yup.string().required("Project Number is required"),
    dueDate: Yup.date().required("Due Date is required").nullable(),
    contact: Yup.string()
      .required("Contact is required")
      .matches(
        /^\d{1,10}$/,
        "Contact must be a valid number and cannot exceed 10 digits"
      ),
    projectStatus: Yup.string().required("Project Status is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    areaLocation: Yup.string().required("Area Location is required"),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };
  const validate = () => {
    const validationErrors = {};

    try {
      validationSchema.validateSync(formData, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
    }
    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    const formattedFormData = {
      ...formData,
      dueDate: formData.dueDate
        ? Math.floor(new Date(formData.dueDate).getTime() / 1000)
        : null,
    };

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form Data:", formattedFormData, projectId);
      if (projectId) {
        dispatch(updateGetProject(projectId, formattedFormData));
      } else {
        dispatch(addProject(formattedFormData));
      }
      navigate(routes.PROJECTS);
      setErrors({});
    }
  };

  useEffect(() => {
    console.log(projectId);
    if (projectId) {
      dispatch(fetchProject(projectId));
    }
    dispatch(fetchAllUsers());
  }, [dispatch, projectId]);
  useEffect(() => {
    console.log("getProject", getProject);
    if (getProject) {
      setFormData({
        ...formData,
        customer: getProject.customer || "",
        referenceNo: getProject.referenceNo || "",
        projectName: getProject.projectName || "",
        projectNo: getProject.projectNo || "",
        dueDate: getProject.dueDate
          ? new Date(getProject.dueDate * 1000).toISOString().split("T")[0]
          : "",
        contact: getProject.contact || "",
        projectStatus: getProject.projectStatus || "",
        email: getProject.email || "",
        address: getProject.address || "",
        areaLocation: getProject.areaLocation || "",
        manager: getProject.manager || "",
        staff: getProject.staff || "",
      });
    }
  }, [getProject]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {projectId ? "Edit" : "Add"} Project
      </Typography>
      <Container
        sx={{
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: 8,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        maxWidth="md"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Customer</InputLabel>
              <Select
                name="customer"
                value={formData.customer || ""}
                onChange={handleInputChange}
                label="Customer"
                error={!!errors.customer}
              >
                <MenuItem value="">
                  <em>Select customer</em>
                </MenuItem>
                {!loading &&
                  users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
              </Select>
              {errors.customer && (
                <Typography color="error">{errors.customer}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Reference Number"
              name="referenceNo"
              value={formData.referenceNo || ""}
              onChange={handleInputChange}
              error={!!errors.referenceNo}
              helperText={errors.referenceNo}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Project Name"
              name="projectName"
              value={formData.projectName || ""}
              onChange={handleInputChange}
              error={!!errors.projectName}
              helperText={errors.projectName}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Project Number"
              name="projectNo"
              value={formData.projectNo || ""}
              onChange={handleInputChange}
              error={!!errors.projectNo}
              helperText={errors.projectNo}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Area Location"
              name="areaLocation"
              value={formData.areaLocation || ""}
              onChange={handleInputChange}
              error={!!errors.areaLocation}
              helperText={errors.areaLocation}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Due Date"
              type="date"
              name="dueDate"
              value={formData.dueDate || ""}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dueDate}
              helperText={errors.dueDate}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact"
              name="contact"
              type="text"
              value={formData.contact || ""}
              onChange={handleInputChange}
              error={!!errors.contact}
              helperText={errors.contact}
              inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Manager</InputLabel>
              <Select
                name="manager"
                value={formData.manager || ""}
                onChange={handleInputChange}
                label="Manager"
              >
                <MenuItem value="">
                  <em>Select project manager</em>
                </MenuItem>
                {managerList?.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Staff</InputLabel>
              <Select
                name="staff"
                value={formData.staff || ""}
                onChange={handleInputChange}
                label="Staff"
              >
                <MenuItem value="">
                  <em>Select project staff</em>
                </MenuItem>
                {staffList?.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                name="projectStatus"
                value={formData.projectStatus || ""}
                onChange={handleInputChange}
                label="Status"
                error={!!errors.projectStatus}
              >
                <MenuItem value="">
                  <em>Select project status</em>
                </MenuItem>
                {statusList?.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.projectStatus && (
                <Typography color="error">{errors.projectStatus}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={2} mt={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              {projectId ? "Edit" : "Add"} Project
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(routes.PROJECTS)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddProject;

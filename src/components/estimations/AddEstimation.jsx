import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  IconButton,
  Button,
  Box,
  Paper,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import routes from "../../Routes/Routes";

const AddEstimation = () => {
  const [sections, setSections] = useState([{ id: 1, items: [{ id: 1 }] }]);
  const [sectionId, setSectionId] = useState(1);
  const [itemId, setItemId] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const [totalMargin, setTotalMargin] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const navigate = useNavigate();

  const handleAddSection = () => {
    const newSectionId = sectionId + 1;
    setSectionId(newSectionId);
    const newSection = {
      id: newSectionId,
      items: [{ id: itemId + 1 }],
      amount: 0,
    };
    setItemId(itemId + 1);
    setSections([...sections, newSection]);
  };
  useEffect(() => {
    let subTotalSum = 0;
    let totalMarginSum = 0;

    Object.values(formData).forEach((section) => {
      Object.values(section).forEach((item) => {
        const price = parseFloat(item.price || 0);
        const quantity = parseFloat(item.quantity || 0);
        const margin = parseFloat(item.margin || 0);

        const total = (price + (price * margin) / 100) * quantity;
        subTotalSum += total;

        totalMarginSum += ((price * margin) / 100) * quantity;
      });
    });

    setSubTotal(subTotalSum);
    setTotalMargin(totalMarginSum);
    setTotalAmount(subTotalSum + totalMarginSum);
  }, [formData]);

  const handleRemoveSection = (sectionIndex) => {
    const newSections = sections.filter((_, index) => index !== sectionIndex);
    setSections(newSections);
  };

  const handleAddItem = (sectionIndex) => {
    const newSections = [...sections];
    const newItemId = itemId + 1;
    setItemId(newItemId);
    newSections[sectionIndex].items.push({ id: newItemId });
    setSections(newSections);
  };

  const handleRemoveItem = (sectionIndex, itemIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter(
      (_, index) => index !== itemIndex
    );
    setSections(newSections);
  };

  const handleSubmit = () => {
    console.log("FINAL", formData);
    if (Object.values(formData).length > 0) {
      setDialogData(formData);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    navigate(routes.ESTIMATIONS);
    setOpenDialog(false);
  };

  const handleFormChange = (sectionId, itemId, field, value) => {
    setFormData((prev) => {
      const newFormData = { ...prev };

      if (!newFormData[sectionId]) {
        newFormData[sectionId] = {};
      }

      if (!newFormData[sectionId][itemId]) {
        newFormData[sectionId][itemId] = {};
      }

      newFormData[sectionId][itemId][field] = value;

      const price = parseFloat(newFormData[sectionId][itemId].price || 0);
      const margin = parseFloat(newFormData[sectionId][itemId].margin || 0);
      const quantity = parseFloat(newFormData[sectionId][itemId].quantity || 0);
      const total = (price + (price * margin) / 100) * quantity;

      newFormData[sectionId][itemId].total = total.toFixed(2);

      newFormData[sectionId].amount = calculateSectionAmount(
        newFormData[sectionId]
      );
      console.log(
        "newFormData[sectionId].amount",
        newFormData[sectionId].amount
      );

      return newFormData;
    });
  };
  const calculateSectionAmount = (sectionData) => {
    if (!sectionData) return 0;

    let sectionAmount = 0;
    console.log(Object.values(sectionData));

    Object.values(sectionData).forEach((item) => {
      sectionAmount += parseFloat(item.total || 0);
    });
    return sectionAmount.toFixed(2);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add New Estimate
      </Typography>
      {sections.map((section, sectionIndex) => (
        <Paper key={section.id} elevation={3} sx={{ p: 2, mb: 3 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={handleAddSection}
                  color="primary"
                  size="small"
                >
                  <Add />
                </IconButton>
                <TextField
                  label="Sample Section"
                  variant="outlined"
                  sx={{ ml: 2, flex: 1 }}
                  value={`Section ${section.id}`}
                />
              </Box>
            </Grid>

            <Grid item xs={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                  type="number"
                  disabled
                  value={formData[section.id]?.amount || 0}
                />
              </FormControl>
            </Grid>

            <Grid item xs={1}>
              {sections.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveSection(sectionIndex)}
                  color="secondary"
                >
                  <Remove />
                </IconButton>
              )}
            </Grid>
          </Grid>

          {section.items.map((item, itemIndex) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={item.id}
              sx={{ mt: 2 }}
            >
              <Grid item xs={1.5}>
                <TextField
                  label="Item Name"
                  fullWidth
                  onChange={(e) =>
                    handleFormChange(
                      section.id,
                      item.id,
                      "itemName",
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Item Description"
                  fullWidth
                  onChange={(e) =>
                    handleFormChange(
                      section.id,
                      item.id,
                      "itemDescription",
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  label="Unit"
                  fullWidth
                  onChange={(e) =>
                    handleFormChange(
                      section.id,
                      item.id,
                      "unit",
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  label="Quantity"
                  type="number"
                  fullWidth
                  onChange={(e) =>
                    handleFormChange(
                      section.id,
                      item.id,
                      "quantity",
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  onChange={(e) =>
                    handleFormChange(
                      section.id,
                      item.id,
                      "price",
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-margin">
                    Margin
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-margin"
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    label="Margin"
                    type="number"
                    onChange={(e) =>
                      handleFormChange(
                        section.id,
                        item.id,
                        "margin",
                        e.target.value
                      )
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Total"
                  type="number"
                  fullWidth
                  disabled
                  value={formData[section.id]?.[item.id]?.total || 0}
                />
              </Grid>

              <Grid item xs={1}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => handleAddItem(sectionIndex)}
                    color="primary"
                  >
                    <Add />
                  </IconButton>
                  {section.items.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveItem(sectionIndex, itemIndex)}
                      color="secondary"
                    >
                      <Remove />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
          ))}
        </Paper>
      ))}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item xs={2} md={2}>
            <Typography variant="subtitle1">Sub Total</Typography>
          </Grid>
          <Grid item xs={1} md={2}>
            <Typography variant="subtitle1" align="right">
              $ {subTotal.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1">Total Margin</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" align="right">
              $ {totalMargin.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" fontWeight="bold">
              Total Amount
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" fontWeight="bold" align="right">
              $ {totalAmount.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(routes.ESTIMATIONS)}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Submitted Form Data</DialogTitle>
        <DialogContent>
          <p>
            Note: i tried to make it format for data storing in mock API but
            doesn't match so as frontend level part is done{" "}
          </p>
          <pre>{JSON.stringify(dialogData, null, 2)}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddEstimation;

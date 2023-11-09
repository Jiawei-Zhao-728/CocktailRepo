import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import SearchResults from "./SearchResult";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

// Define the propTypes outside of the component for cleaner code
const propTypes = {
  TextFieldVariant: PropTypes.string.isRequired,
  ButtonVariant: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

function TextFieldButton({ TextFieldVariant, ButtonVariant, size }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  // Define the label based on the search type
  const searchLabel = "Your Cocktail of choice";

  const [openDialog, setOpenDialog] = useState(false);
  const [openNoResultsDialog, setOpenNoResultsDialog] = useState(false);

  const handleResultClick = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  const handleCloseDialog = () => {
    setSelectedCocktail(null);
  };

  const fetchApi = async (query) => {
    const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    try {
      const response = await fetch(`${baseURL}${query.toLowerCase()}`);
      const data = await response.json();
      console.log(data);
      if (data.drinks) {
        setResults(data.drinks);
      } else {
        setOpenNoResultsDialog(true);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSubmit = () => {
    if (searchQuery.trim() === "") {
      // Open the Snackbar when the input is empty
      setOpenDialog(true);
    } else {
      console.log(searchQuery);
      fetchApi(searchQuery);
    }
  };

  return (
    <div>
      <div>
        <Box m={1} p={1}>
          <TextField
            fullWidth
            id="outlined-basic"
            label={searchLabel}
            variant={TextFieldVariant}
            size={size}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Box m={1} p={1}>
          <Button
            fullWidth
            variant={ButtonVariant}
            color="primary"
            size={size}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
        <SearchResults results={results} onResultClick={handleResultClick} />
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Search Input Needed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter a search term before submitting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openNoResultsDialog}
        onClose={() => setOpenNoResultsDialog(false)}
        aria-labelledby="no-results-dialog-title"
        aria-describedby="no-results-dialog-description"
      >
        <DialogTitle id="no-results-dialog-title">
          {"No Cocktail Found"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="no-results-dialog-description">
            No cocktail with such a name is found. Please try a different name.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNoResultsDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Detailed Cocktail Dialog */}
      <Dialog
        open={selectedCocktail != null}
        onClose={handleCloseDialog}
        aria-labelledby="cocktail-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="cocktail-dialog-title">
          {selectedCocktail?.strDrink}
        </DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <Avatar
              src={selectedCocktail?.strDrinkThumb}
              alt={selectedCocktail?.strDrink}
              sx={{ width: 150, height: 150, margin: "auto" }}
            />
          </Box>
          <DialogContentText id="cocktail-dialog-description">
            {selectedCocktail?.strInstructions}
          </DialogContentText>
          <List>
            {selectedCocktail &&
              Object.keys(selectedCocktail).map((key) => {
                if (key.startsWith("strIngredient") && selectedCocktail[key]) {
                  const measureKey = `strMeasure${key.slice(13)}`; // Construct the corresponding measure key
                  return (
                    <ListItem key={key}>
                      <ListItemText
                        primary={selectedCocktail[key]}
                        secondary={selectedCocktail[measureKey] || "To taste"}
                      />
                    </ListItem>
                  );
                }
                return null;
              })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
TextFieldButton.propTypes = propTypes;

export default TextFieldButton;

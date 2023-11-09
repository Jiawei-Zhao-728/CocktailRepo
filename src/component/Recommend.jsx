import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Martini from "../assets/Martini.jpg";
import Negroni from "../assets/Negroni.jpg";
import OldFashioned from "../assets/OldFashioned.jpg";
import Mojoto from "../assets/Mojito.jpg";
import MoscowMule from "../assets/MoscowMule.jpg";
import Mahattan from "../assets/Manhattan.jpg";
import Cosmopolitan from "../assets/Cosmopolitan.jpg";
import Margarita from "../assets/Margarita.jpg";
// Dialog:
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const images = [
  {
    url: Martini,
    title: "Martini",
    width: "40%",
  },
  {
    url: Negroni,
    title: "Negroni",
    width: "60%",
  },
  {
    url: OldFashioned,
    title: "Old Fashioned",
    width: "30%",
  },
  {
    url: Mojoto,
    title: "Mojito",
    width: "30%",
  },
  {
    url: MoscowMule,
    title: "Moscow Mule",
    width: "40%",
  },
  {
    url: Mahattan,
    title: "Manhattan",
    width: "40%",
  },
  {
    url: Cosmopolitan,
    title: "Cosmopolitan",
    width: "30%",
  },
  {
    url: Margarita,
    title: "Margarita",
    width: "30%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 150,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBases() {
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [selectedCocktail, setSelectedCocktail] = useState({}); // State to hold the selected cocktail details

  // Function to handle clicking an image button
  const handleOpenDialog = async (title) => {
    // Use the title to fetch the cocktail details. Make sure to handle spaces and special characters.
    const detailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      title
    )}`;

    try {
      const response = await fetch(detailsUrl);
      const data = await response.json();
      if (data.drinks) {
        // Assume that the first drink is the one we want
        // console.log(data.drinks[0]);
        setSelectedCocktail(data.drinks[0]);
        setOpen(true);
      } else {
        // Handle the case where no details were found
        console.error("No details found for this cocktail");
      }
    } catch (error) {
      console.error("Failed to fetch cocktail details:", error);
    }
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <h5 className="align_center">🍹 Some Popular Cocktails 🍹</h5>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          minWidth: 300,
          width: "100%",
          my: 2,
          mx: 0.5,
        }}
      >
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}
            onClick={() => handleOpenDialog(image.title)} // Add the onClick handler here
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>

      {/* Dialog for displaying selected cocktail details */}
      <Dialog open={open} onClose={handleCloseDialog}>
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
    </>
  );
}

import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton"; // Import ListItemButton
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const SearchResultsList = ({ results, onResultClick }) => {
  return (
    <StyledPaper elevation={1}>
      <List>
        {results.map((result, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => onResultClick(result)}>
              <ListItemAvatar>
                <Avatar src={result.strDrinkThumb} alt={result.strDrink} />
              </ListItemAvatar>
              <ListItemText
                primary={result.strDrink}
                secondary={result.strCategory}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  onResultClick: PropTypes.func,
};

export default SearchResultsList;

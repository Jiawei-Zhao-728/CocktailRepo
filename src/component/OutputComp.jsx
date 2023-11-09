import PropTypes from "prop-types";

OutputComp.propTypes = {
  DrinkCOntent: PropTypes.any.isRequired,
};

function OutputComp({ DrinkCOntent }) {
  console.log(DrinkCOntent);

  return <h5> Nothing </h5>;
}

export default OutputComp;

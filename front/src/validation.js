const Validation = (input) => {
  let errors = {};
  const platformsRegex = /^[a-zA-Z0-9]+(?:,\s*[a-zA-Z0-9]+)*$/;

  if (!input.name) {
    errors.name = "Please enter a name";
  } else if (input.name.length >= 40) {
    errors.name = "Name should be less than 40 characters";
  }

  if (!input.description) {
    errors.description = "Please enter a description";
  }

  if (!input.platforms) {
    errors.platforms = "Please specify at least one platform";
  } else if (!platformsRegex.test(input.platforms)) {
    errors.platforms = "Each platform must be separated by a comma";
  }

  if (!input.genres.length) {
    errors.genres = "Please select at least one genre";
  }

  if (!input.released) {
    errors.released = "Please enter a release date";
  }

  if (!input.rating) {
    errors.rating = "Please enter a rating";
  } else {
    const numericRating = parseFloat(input.rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      errors.rating = "Rating must be a number between 1 and 5";
    }
  }
  return errors;
};

export default Validation;

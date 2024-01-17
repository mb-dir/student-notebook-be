const isValidDateFormat = (dateString: string): boolean => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return isoRegex.test(dateString);
};

export default isValidDateFormat;
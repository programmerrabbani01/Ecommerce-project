// export const findPublicId = (url) => {
//   return url.split("/")[url.split("/").length - 1].split(".")[0];
// };

export const findPublicId = (url) => {
  // Split the URL by '/' to get segments, and then split the last segment by '.' to get the public ID.
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];
  const publicId = lastSegment.split(".")[0];

  return publicId;
};

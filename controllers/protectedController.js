export const getProtectedRoute = (req, res) => {
  const user = req.user;
  res.json({ message: "You have access to this protected route", user });
};

export const getProfileRoute = (req, res) => {
  const user = req.user;
  res.json({ message: "This is the user profile page", user });
};


const authConfig = {
  secret: String(process.env.SECRET),
  expires: "1d",
};

export default authConfig;

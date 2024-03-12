export const modifiyUserLocalStorage = (newData) => {
  const localUser = localStorage.getItem("user");
  const userData = JSON.parse(localUser);
  console.log({ userData, newData });
  const user = {
    organization_admin: {
      ...userData?.organization_admin,
      ...newData,
    },
  };
  localStorage.setItem("user", JSON.stringify(user));
};

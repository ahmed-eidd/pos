export modifiyUserLocalhost = (newData) => {
  const user = user ? JSON.parse(user) : {};
  const organization_admin = {
    ...user?.organization_admin,
    ...newData,
  }
  localStorage.set('user', organization_admin)
}

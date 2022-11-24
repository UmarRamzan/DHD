const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };
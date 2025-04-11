exports.validateSignup = (data) => {
    const { name, email, password, address } = data;
    if (!name || !email || !password || !address) return false;
    return true;
  };
  
  exports.validateLogin = (data) => {
    const { email, password } = data;
    if (!email || !password) return false;
    return true;
  };
  
  exports.validateStore = (data) => {
    const { name, email, address, owner_id } = data;
    if (!name || !email || !address || !owner_id) return false;
    return true;
  };
  
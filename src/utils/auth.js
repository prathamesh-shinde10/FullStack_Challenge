export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('authToken');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  
  export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  };
  
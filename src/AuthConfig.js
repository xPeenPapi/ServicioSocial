const msalConfig = {
  auth: {
    clientId: "e25b0066-6716-4cd3-ac08-2f73bec8ae64",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:5173" // Debe coincidir con Azure
  }
};

// En AuthConfig.js
export const loginRequest = {
  scopes: ["User.Read"],
  prompt: "select_account" // Obliga a seleccionar cuenta cada vez
};
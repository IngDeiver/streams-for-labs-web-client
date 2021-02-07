import * as msal from "@azure/msal-browser";

// Oauth2 cofig
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLEINT_ID,
    authority:process.env.REACT_APP_AZURE_AUTHORITY,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const scopes = ["user.read"];

// MSA instance for managament sesion
export const msalInstance = new msal.PublicClientApplication(msalConfig);

// If homeAccountId is null not exist a sesión
export const getHomeAccountId = () => {
  const accounts = msalInstance.getAllAccounts()
  if(accounts.length > 0) return accounts[0].homeAccountId;
  return null
};

// Get current account
export const getAccountByHomeAccountId = () => {
  return msalInstance.getAccountByHomeId(getHomeAccountId());
};

 // Logout
 export const logout = async () => {
  const currentAccount = await getAccountByHomeAccountId();
  msalInstance.logout({ account: currentAccount })
};

  // Verify and refresh acces token when expired
export const checkToken = async () => {
    const currentAccount = getAccountByHomeAccountId();
    const silentRequest = {
      scopes,
      account: currentAccount,
      forceRefresh: false,
    };

    const request = {
      scopes,
      loginHint: currentAccount.username, // For v1 endpoints, use upn from idToken claims
    };

    const tokenResponse = await msalInstance
      .acquireTokenSilent(silentRequest)
      .catch(async (error) => {
        if (error instanceof msalInstance.InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return await msalInstance
            .acquireTokenPopup(request)
            .catch((error) => {
              console.log(error);
            });
        }
      });

    console.log(tokenResponse);
  };


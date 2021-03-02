import * as msal from "@azure/msal-browser";
import { verifyAdminToken } from './jwt'

// Oauth cofig
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
const ADMIN_SESION_KEY = "admin_sesion"

export const scopes = ["user.read"];

// MSA instance for managament sesion with azure
export const msalInstance = new msal.PublicClientApplication(msalConfig);

/*If homeAccountId is null not exist a sesión of azure
  if not exist a sesion in local storage for admin, not exist admin sesion
  if not there are any sesion, not there is a user authenticated
  Return the role (user or admin) with the token (for will use in Athorization header) of user authenticated
*/
export const getLocalSesion =  () => {
 return new Promise(async (resolve, reject) => {
   // managem role
   let sesion = {
    role:"USER",
    token:""
  }

  // get sesion for azure
  const accounts = msalInstance.getAllAccounts()
  if(accounts.length > 0) {
    const { idToken } = await checkAzureToken()
    sesion.token = idToken
    return resolve(sesion)
  }

  // get local sesion for admin
  const adminSesion = await getAdminSesion();
  if(!adminSesion) return resolve(null)

  //then verify admin sesion
  const admin_token = adminSesion["acces_token"]

  verifyAdminToken(admin_token)
  .then(ok => {
    sesion.token = admin_token
    sesion.role ="ADMIN"
    return resolve(sesion) 
  })
  .catch(err => {
    console.log(err.message)
    return reject(null)
  })
 })
};

// Get current object account with azure
export const getAccountByHomeAccountId = async () => {
  const accounts = msalInstance.getAllAccounts()
  const homeIde = accounts[0].homeAccountId;
  return msalInstance.getAccountByHomeId(homeIde);
};

 // Logout
 export const logout = async () => {
  const isAdminSesion = await localStorage.getItem(ADMIN_SESION_KEY)
  
  if(isAdminSesion){
    await removeAdminSesion()
    window.location.replace("/login");
    return
  }

  const currentAccount = await getAccountByHomeAccountId();
  msalInstance.logout({ account: currentAccount })
};

  // Verify and refresh acces token when expired
export const checkAzureToken = async () => {
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

    return  msalInstance
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
  };
  
  export const setAdminSesion = (token) => {
    return localStorage.setItem(ADMIN_SESION_KEY, JSON.stringify(token))
  }

  const  getAdminSesion = async  () => {
    const sesion = await localStorage.getItem(ADMIN_SESION_KEY)
    if(!sesion) return null
    return JSON.parse(sesion)
  }

  const removeAdminSesion = () => {
    return localStorage.removeItem(ADMIN_SESION_KEY)
  }




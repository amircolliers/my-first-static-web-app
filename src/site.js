// The base API Management URI
const baseUri = "https://apim-hellow-world-amir.developer.azure-api.net";

// The Microsoft Entra ID application registration client ID
const clientId = "177d5f04-eee5-4021-9f67-3271821beb67";

// The Microsoft Entra ID tenant ID
const tenantId = "b0240f2b-6ac3-4bcb-b517-505c44fb8c43";

// The scope for the access token request to call the Microsoft Graph API
// If a refresh token is also required for the application, add "offline_access" to the scope
// e.g. const scope = "https://graph.microsoft.com/.default offline_access"
const scope = "https://graph.microsoft.com/.default"

// Redirects the user to the login endpoint with the appropriate parameters to begin the authentication flow
const login = () => {
    window.location.href =
        `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?response_type=code&redirect_uri=${baseUri}/auth/callback&client_id=${clientId}&scope=${scope}`;
};

// Logs the user out of the application by redirecting to the logout endpoint of Microsoft Entra ID which will in turn call the logout endpoint of the application to remove the cookie
// This allows the user to be logged out of Microsoft Entra ID and the single-page application itself by deleting the cookie
// If you do not want to log the user out of Microsoft Entra ID, you can remove the redirect to the logout endpoint of Microsoft Entra ID and just call the logout endpoint of the application
const logout = () => {
    window.location.href = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${baseUri}/auth/logout`;
};

// Calls the graph endpoint and displays the result
const callApi = async () => {
    // Display loading message
    document.getElementById("result").innerText = "Loading...";

    // Call the Graph API endpoint
    await fetch(`${baseUri}/graph/me`, {
        credentials: "include",
    })
        .then(async (response) => {
            if (response.status === 401) {
                document.getElementById("result").innerText = "User is not authenticated.";
            } else {
                document.getElementById("result").innerText = JSON.stringify(await response.json(), null, 4);
            }
        })
        .catch((error) => {
            document.getElementById("result").innerText = error;
        });
};

// Exports the functions to be used in the HTML
export { login, logout, callApi };
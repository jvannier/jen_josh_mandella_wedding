import { API_URL } from "./dataStructures/consts";


function assembleQueryParams(user, queryParams) {
    if (user !== -1) {  // Happens when logging in originally
        queryParams.push(
            ["userID", user.userID],
            ["token", user.token],
        );
    }
    return queryParams.map(
        param => `${param[0]}=${param[1]}`
    ).join("&");
}


async function get(user, path, queryParams=[]) {
    queryParams = assembleQueryParams(user, queryParams);
    return await fetch(`${API_URL}${path}?${queryParams}`);
};


async function put(user, path, queryParams=[]) {
    queryParams = assembleQueryParams(user, queryParams);
    return await fetch(
        `${API_URL}${path}?${queryParams}`,
        {method: 'PUT'}
    );
}


export { get, put };
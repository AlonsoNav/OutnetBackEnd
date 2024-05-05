const ROOT_URL = 'http://127.0.0.1:5000';

export async function postController(payload, endpoint) {
    const requestOptions = {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    };

    try {
        let response = await fetch(`${ROOT_URL}/${endpoint}`, requestOptions);
        return await response;
    } catch (error) {
        console.log(error)
    }
}

export async function postNoJSONController(payload, endpoint) {
    const requestOptions = {
        method: 'POST',
        mode: "cors",
        body: payload
    };

    try {
        let response = await fetch(`${ROOT_URL}/${endpoint}`, requestOptions);
        return await response;
    } catch (error) {
        console.log(error)
    }
}

export async function getController(endpoint) {
    const requestOptions = {
        method: 'GET',
        mode: "cors",
        headers: { 'Content-Type': 'application/json'},
    };

    try {
        let response = await fetch(`${ROOT_URL}/${endpoint}`, requestOptions);
        return await response;
    } catch (error) {
        console.log(error)
    }
}
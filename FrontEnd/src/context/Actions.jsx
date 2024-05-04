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
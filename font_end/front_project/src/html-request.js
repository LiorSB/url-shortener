export const getTinyUrl = async () => {
    try {
        const url = `http://localhost:8000/tiny`;
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson,"responseJson");
        // setTinyUrlObj(responseJson["name"])
    }catch (err){
        console.log(err)
    }
}
export const postCreateTinyUrl = async (originalUrl,setTinyUrlObj) => {
    console.log("postCreateTinyUrl")
    try {
        const url = `http://localhost:8000/create-tiny-url`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                srcUrl: originalUrl,
            })
        });
        const responseJson = await response.json();
        console.log(responseJson,"responseJson");
        setTinyUrlObj(responseJson)
    }catch (err){
        console.log(err)
    }
}
export const postRedirectBySendTinyUrl = async (tinyUrl,setTinyUrlObj) => {
    console.log("postRedirectBySendTinyUrl")
    try {
        const url = `http://localhost:8000/get-original-url`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tinyUrl: tinyUrl,
            })
        });
        const responseJson = await response.json();
        console.log(responseJson,"responseJson");
        setTinyUrlObj(responseJson)
    }catch (err){
        console.log(err)
    }
}

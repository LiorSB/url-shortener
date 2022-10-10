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
    console.log("start postCreateTinyUrl")
    try {
        const url = `http://127.0.0.1:5000/shorten`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: originalUrl,
            })
        });
        const responseJson = await response.json();
        console.log(responseJson,"responseJson");
        setTinyUrlObj(responseJson)
    }catch (err){
        console.log(err)
    }
}

export const postSignUp = async (name,email,setUser) => {
    console.log("start postSignUp")
    try {
        const url = `http://127.0.0.1:5000/sign_up`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email:email
            })
        });
        const responseJson = await response.json();
        console.log(responseJson,"responseJson");
        setUser(responseJson)
    }catch (err){
        console.log(err)
    }
}

export const postLogin = async (email,setUser) => {
    console.log("start post log_in")
    try {
        const url = `http://127.0.0.1:5000/log_in`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:email
            })
        });
        const responseJson = await response.json();
        console.log(responseJson,"responseJson");
        setUser(responseJson)
    }catch (err){
        console.log(err)
    }
}


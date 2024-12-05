const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeelogs`;

const index = async () => {
    try{
        const res = await fetch(BASE_URL, {
            hears : {Authorization: `Bearer ${locoalStorage.getItem('token')}`}
        })
        return res.json();
    }catch (error) {
        console.log(error)
    }
};



export {
    index,

}
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeelogs`;

const index = async () => {
    try{
        const res = await fetch(BASE_URL, {
            headers : {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json();
    }catch (error) {
        console.log(error)
    }
};

const show = async (coffeelogId) => {
    try{
        const res = await fetch(`${BASE_URL}/${coffeelogId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
    } catch (error) {
        console.log(error)
    }
}

const create = async (coffeelogFormData) => {
    try{
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coffeelogFormData),
        });
        return res.json();
    }catch (error) {
        console.log(error)
    }
}
const createNote = async (coffeelogId, noteFormData) => {
    try{
        const res = await fetch(`${BASE_URL}/${coffeelogId}/notes`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
const deleteCoffeelog = async (coffeelogId) => {
    try{
        const res = await fetch(`${BASE_URL}/${coffeelogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        });
        return res.json();
    }catch (error){
        console.log(error);
    }
};

const updateCoffeelog = async (coffeelogId, coffeelogFormData) =>  {
    try{
        const res = await fetch(`${BASE_URL}/${coffeelogId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coffeelogFormData),

        })
        return res.json();

    } catch (error) {
        console.log(error);
    }
} 


export {
    index,
    show,
    create,
    createNote,
    deleteCoffeelog,
    updateCoffeelog

}
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeelogs`;

const index = async (category = '') => {
    try{
        let url = BASE_URL;
        if (category) {
            url = `${BASE_URL}/${category}`;
           }
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if(!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to fetch Coffee logs. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    }catch (error) {
        console.log('Error fetching coffee logs:', error);
        throw error;
    }
};

const show = async (coffeelogId) => {
    try{
        const res = await fetch(`${BASE_URL}/${coffeelogId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        if (!res.ok) {
            throw new Error (`Failed to fetch coffee log. Status ${res.status}`);
        }
        const data = await res.json
        return data;
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
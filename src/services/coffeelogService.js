const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeelogs`;

const index = async () => {
    try{
        const res = await fetch(BASE_URL, {
            headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        return res.json();
    }catch (error) {
        console.log(error)
    }
}




const show = async (coffeelogId) => {
    try {
        const res = await fetch(`${BASE_URL}/${coffeelogId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log('Error fetching coffee log:', error);
        throw error;
    }
};

const create = async (coffeelogFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coffeelogFormData),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to create coffee log. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (error) {
        console.log('Error creating coffee log:', error);
        throw error;
    }
};

const createNote = async (coffeelogId, noteFormData) => {
    try {
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
        throw error;
    }
};

const deleteCoffeelog = async (coffeelogId) => {
    try {
        const res = await fetch(`${BASE_URL}/${coffeelogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to delete coffee log. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (error) {
        console.log('Error deleting coffee log:', error);
        throw error;
    }
};

const updateCoffeelog = async (coffeelogId, coffeelogFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${coffeelogId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coffeelogFormData),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to update coffee log. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (error) {
        console.log('Error updating coffee log:', error);
        throw error;
    }
};

export {
    index,
    show,
    create,
    createNote,
    deleteCoffeelog,
    updateCoffeelog
};

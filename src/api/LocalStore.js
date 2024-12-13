export const getItem = (key) => {
    const data =  localStorage.getItem(key);
    if (typeof data === "string") {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    } else {
        return null;
    }
}

export const saveItem = (key, value) => {
    const currentItem = getItem(key);
    if (!currentItem) {
        localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
    } else {
        if (typeof currentItem !== typeof value) {
            alert("Type mismatch");
        } else if (typeof currentItem === "object") {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}
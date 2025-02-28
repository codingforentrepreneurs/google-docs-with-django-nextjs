const fetcher = async (url) => {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        const error = new Error(res.status === 401 ? "Login required or permission is not allowed" : "An error occurred");
        error.status = res.status;
        throw error;
    }
    return res.json();
};

export default fetcher;
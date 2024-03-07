export const getUsers = async (user) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts/${user['account_id']}/teams/${user['team_id']}/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }
        const r = await res.json();
        return r;
    } catch (error) {
        console.log('Something went wrong here while fetching the users');
        console.log(error);
    }
};

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

        const users = r.map(transformUser);

        return users;

    } catch (error) {
        console.log('Something went wrong here while fetching the users');
        console.log(error);
    }
};



function transformUser(user) {
    const { 
        email: email,
        id: id,
        account_id: accountId, 
        first_name: firstName,
        last_name: lastName,
        status: status,
        respondent_role_id: respondentRoleId, 
        is_visible_rp: isVisibleRp, 
    } = user;

    return {
        email,
        id,
        accountId,
        firstName,
        lastName,
        status,
        respondentRoleId,
        isVisibleRp,
    };
}


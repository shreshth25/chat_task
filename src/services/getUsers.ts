export const getUsers = async () => {

    try {
        const res = await fetch('https://dev-api.attuned.ai/v2/accounts/1036/teams/100876/members', {
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
        
        console.log('Response:');
        console.log(r);

        return r;
    } catch (error) {
        const response = [
            {
                'email': 'allen.clark+221025@attuned.ai',
                'id': 27446,
                'account_id': 1036,
                'first_name': 'Super',
                'last_name': 'Man',
                'status': 'Active',
                'respondent_role_id': 3,
                'is_visible_rp': null,
            },
            {
                'email': 'allen.clark+20221025.1@attuned.ai',
                'id': 27447,
                'account_id': 1036,
                'first_name': 'Tester',
                'last_name': 'One',
                'status': 'Active',
                'respondent_role_id': 3,
                'is_visible_rp': null,
            },
            {
                'email': 'allen.clark+20221025.3@attuned.ai',
                'id': 27449,
                'account_id': 1036,
                'first_name': 'Tester',
                'last_name': 'Threee',
                'status': 'Active',
                'respondent_role_id': 3,
                'is_visible_rp': null,
            },
            {
                'email': 'allen.clark+venu_riktamtech@attuned.ai',
                'id': 27496,
                'account_id': 1036,
                'first_name': 'Venu',
                'last_name': 'Riktamtech',
                'status': 'Active',
                'respondent_role_id': 3,
                'is_visible_rp': null,
            },
            {
                'email': 'allen.clark+shreshth_riktamtech@attuned.ai',
                'id': 27497,
                'account_id': 1036,
                'first_name': 'Shreshth',
                'last_name': 'Riktamtech',
                'status': 'Active',
                'respondent_role_id': 3,
                'is_visible_rp': null,
            },
        ];
        return response;
    }


    const response = [
        {
            'email': 'allen.clark+221025@attuned.ai',
            'id': 27446,
            'account_id': 1036,
            'first_name': 'Super',
            'last_name': 'Man',
            'status': 'Active',
            'respondent_role_id': 3,
            'is_visible_rp': null,
        },
        {
            'email': 'allen.clark+20221025.1@attuned.ai',
            'id': 27447,
            'account_id': 1036,
            'first_name': 'Tester',
            'last_name': 'One',
            'status': 'Active',
            'respondent_role_id': 3,
            'is_visible_rp': null,
        },
        {
            'email': 'allen.clark+20221025.3@attuned.ai',
            'id': 27449,
            'account_id': 1036,
            'first_name': 'Tester',
            'last_name': 'Threee',
            'status': 'Active',
            'respondent_role_id': 3,
            'is_visible_rp': null,
        },
        {
            'email': 'allen.clark+venu_riktamtech@attuned.ai',
            'id': 27496,
            'account_id': 1036,
            'first_name': 'Venu',
            'last_name': 'Riktamtech',
            'status': 'Active',
            'respondent_role_id': 3,
            'is_visible_rp': null,
        },
        {
            'email': 'allen.clark+shreshth_riktamtech@attuned.ai',
            'id': 27497,
            'account_id': 1036,
            'first_name': 'Shreshth',
            'last_name': 'Riktamtech',
            'status': 'Active',
            'respondent_role_id': 3,
            'is_visible_rp': null,
        },
    ];
    return response;
};

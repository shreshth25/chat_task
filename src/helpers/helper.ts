export const getAbbreviation = (firstName: string, lastName: string)=>{
    if(firstName && lastName) return firstName[0] + lastName[0];
    else if (firstName) return firstName[0];
    else if (lastName) return lastName[0];
    else return '';
};  


export const getMessage = (inputText, messages, taskDescriptionTxt, tipDescriptionTxt) =>
{
    const requestMessage = {
        'action': 'sendmessage',
        'input_message': inputText,
        'chat_history': messages,
        'manager_top_3': [
            'ALTRUISM',
            'AUTONOMY',
            'COMPETITION',
        ],
        'member_top_3': [
            'ALTRUISM',
            'AUTONOMY',
            'INNOVATION',
        ],
        'language': 'English',
        'streaming': true,
        'task_description_txt': taskDescriptionTxt,
        'tip_description_txt': tipDescriptionTxt,
    };
    return requestMessage;
};
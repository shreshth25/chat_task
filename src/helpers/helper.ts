export const get_abbreviation = (first_name: string, last_name: string)=>{
    if(first_name && last_name) return first_name[0] + last_name[0];
    else if (first_name) return first_name[0];
    else if (last_name) return last_name[0];
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
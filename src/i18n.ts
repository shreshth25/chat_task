import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    'tasks' : 'Tasks',
                    'new task assignment': 'New Task Assignment',
                    'assigning task for': 'Assigning task for:',
                    'start by explaining the task you want to assign': 'Start by explaining the task you want to assign',
                    'send': 'Send',
                    'yes': 'yes',
                    'what task do you want to accomplish?': 'What task do you want to accomplish?',
                    'search member to assign task': 'Search member to assign task',
                    'clear': 'Clear',
                    'task you want to assign': 'Task you want to assign',
                    'start new task': 'Start New Task',
                    'all conversations': 'All Conversations',
                },
            },
            ja: {
                translation: {
                    'tasks' : 'タスク',
                    'new task assignment': '新しいタスクの割り当て',
                    'assigning task for': 'タスクの割り当て',
                    'start by explaining the task you want to assign': '割り当てたいタスクについて説明することから始めます',
                    'send': '送信',
                    'yes': 'はい',
                    'what task do you want to accomplish?': 'どのようなタスクを達成したいですか?',
                    'search member to assign task': 'タスクを割り当てるメンバーを検索する',
                    'clear':'クリア',
                    'task you want to assign': '割り当てたいタスク',
                    'start new task': '新しいタスクの開始',
                    'all conversations': 'すべての会話',
                },
            },
        },
    });

export default i18n;
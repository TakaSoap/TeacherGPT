import { defineStore } from 'pinia';

export interface FirstMessage {
    objective: string;
    level: string;
}

export interface Message {
    question: string;
    answer: string;
}

/**
 * The store for question answering.
 */
export const useSparkStore = defineStore('spark', () => {
    
    const firstMessage: Ref<FirstMessage> = ref({
        objective: '',
        level: ''
    });

    const question = ref('');
    const answer = ref('');

    const firstAnswer = ref('');

    const conversation: Ref<Message[]> = ref([]);

    const isWaiting: Ref<boolean> = ref(false);
    const isFirstMessageSent: Ref<boolean> = ref(false);

    function setAnswer(newAnswer: string) {
        answer.value = newAnswer;
    }

    function resetConversation() {
        firstMessage.value = {
            objective: '',
            level: ''
        };
        question.value = '';
        answer.value = '';
        firstAnswer.value = '';
        conversation.value = [];
        isWaiting.value = false;
        isFirstMessageSent.value = false;
    }

    function addMessage(newAnswer: string): void {
        let newMessage: Message = {
            question: question.value,
            answer: newAnswer
        };

        conversation.value.push(newMessage);
    }

    return {
        firstMessage,
        question,
        answer,
        firstAnswer,
        conversation,
        setAnswer,
        resetConversation,
        addMessage,
        isWaiting,
        isFirstMessageSent
    };
});

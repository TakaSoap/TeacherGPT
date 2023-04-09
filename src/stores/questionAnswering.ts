import { defineStore } from 'pinia';

export interface Question {
    content: string;
    audience: string;
}

/**
 * The same as the prompts defined in the backend.
 */
export interface Answer {
    blocked: boolean;
    content: string;
    suggestedFollowupMessages: string[];
}

/**
 * Messages of chat model from OpenAI.
 */
export interface Message{
    question: Question;
    answer: Answer;
}

/**
 * The store for question answering.
 */
export const useQuestionAnsweringStore = defineStore('questionAnswering', () => {
    
    /**
     * Current question in the input component.
     */
    const question: Ref<Question> = ref({
        content: '',
        audience: 'default'
    });

    /**
     * Latest answer from the API.
     */
    const answer: Ref<Answer> = ref({
        blocked: false,
        content: '',
        suggestedFollowupMessages: []
    });

    const conversation: Ref<Message[]> = ref([]);

    const isWaiting: Ref<boolean> = ref(false);

    function setAnswer(newAnswer: Answer) {
        answer.value = newAnswer;
    }

    function resetConversation() {
        question.value = {
            content: '',
            audience: ''
        };
        answer.value = {
            blocked: false,
            content: '',
            suggestedFollowupMessages: []
        };
        conversation.value = [];
        isWaiting.value = false;
    }
    
    /**
     * Add a followup message to the followupMessages array.
     * @param newMessage The message received from OpenAI Chat API
     * @returns {void}
     */
    function addMessage(newMessage: Message): void {
        conversation.value.push(newMessage);
    }

    return {
        question,
        answer,
        conversation,
        setAnswer,
        resetConversation,
        addMessage,
        isWaiting
    };
});
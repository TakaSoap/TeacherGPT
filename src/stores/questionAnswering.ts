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

export interface Message {
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
            audience: 'default'
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
     * @param newAnswer The message received from OpenAI Chat API
     * @returns {void}
     */
    function addMessage(newAnswer: Answer): void {
        let newMessage: Message = {
            question: {
                content: question.value.content,
                audience: question.value.audience
            },
            answer: newAnswer
        };

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

import { defineStore } from 'pinia';

export interface Essay {
    topic: string;
    title: string;
    content: string;
}

/**
 * The same as the prompts defined in the backend.
 */
export interface EssayFeedback {
    content: {
        score: number;
        comment: string;
    };
    expression: {
        score: number;
        comment: string;
    };
    feature: {
        score: number;
        comment: string;
    };
    overallComment: string;
    suggestedFollowupMessages: string[];
}

/**
 * The same as the prompts defined in the backend.
 * @property {string} question The question asked by user.
 * @property {string} answer The answer to the question asked by user.
 * @property {string[]} suggestedFollowupMessages The suggested followup messages from OpenAI Chat API.
 */
export interface FollowupAnswer {
    question: string;
    answer: string;
    suggestedFollowupMessages: string[];
}

/**
 * Messages of chat model from OpenAI.
 */
export interface Message{
    role: string;
    content: string;
}

/**
 * The submission status of the essay
 */
enum SubmissionStatus {
    NotSubmitted = 'NotSubmitted',
    Submitting = 'Submitting',
    Submitted = 'Submitted'
}

/**
 * The store for gaokao essay.
 */
export const useGaokaoEssayStore = defineStore('gaokaoEssay', () => {
    const essay: Ref<Essay> = ref({
        topic: '',
        title: '',
        content: ''
    });

    const essayFeedback: Ref<EssayFeedback> = ref({
        content: {
            score: 0,
            comment: ''
        },
        expression: {
            score: 0,
            comment: ''
        },
        feature: {
            score: 0,
            comment: ''
        },
        overallComment: '',
        suggestedFollowupMessages: []
    });

    // followupMessages includes both user's messages and responses from the chat model.
    const followupMessages: Ref<Message[]> = ref([]);

    // followupAnswers only includes the answers to the questions asked by user.
    const followupAnswers: Ref<FollowupAnswer[]> = ref([]);

    const submissionStatus: Ref<SubmissionStatus> = ref(SubmissionStatus.NotSubmitted);

    function setEssayFeedback(feedback: EssayFeedback) {
        essayFeedback.value = feedback;
    }

    function resetEssay() {
        essay.value = {
            topic: '',
            title: '',
            content: ''
        };
        essayFeedback.value = {
            content: {
                score: 0,
                comment: ''
            },
            expression: {
                score: 0,
                comment: ''
            },
            feature: {
                score: 0,
                comment: ''
            },
            overallComment: '',
            suggestedFollowupMessages: []
        };
        submissionStatus.value = SubmissionStatus.NotSubmitted;
    }
    
    /**
     * Add a followup message to the followupMessages array.
     * @param newMessage The message received from OpenAI Chat API
     * @returns {void}
     */
    function addFollowupMessage(newMessage: Message): void {
        followupMessages.value.push(newMessage);
    }

    /**
     * Add a followup answer to the followupAnswers array.
     * @param receivedAnswer The answer to the question asked by user. The structure is defined in the backend.
     * @param question The question asked by user.
     * @returns {void}
     */
    function addFollowupAnswer(receivedAnswer: {
        answer: string;
        suggestedFollowupMessages: string[];
    }, question: string): void {
        const newAnswer: FollowupAnswer = {
            question,
            answer: receivedAnswer.answer,
            suggestedFollowupMessages: receivedAnswer.suggestedFollowupMessages
        }
        followupAnswers.value.push(newAnswer);
    }

    /**
     * Set the submission status of the essay.
     * @returns {void}
     */
    function setNotSubmitted(): void {
        submissionStatus.value = SubmissionStatus.NotSubmitted;
    }

    /**
     * Set the submission status of the essay.
     * @returns {void}
     */
    function setSubmitting(): void {
        submissionStatus.value = SubmissionStatus.Submitting;
    }

    /**
     * Set the submission status of the essay.
     * @returns {void}
     */
    function setSubmitted(): void {
        submissionStatus.value = SubmissionStatus.Submitted;
    }

    /**
     * Computed length of topic, without spaces.
     * @returns {number}
     */
    const topicLength = computed(() => {
        return essay.value.topic.replace(/\s/g, '').length;
    });

    /**
     * Computed length of title, without spaces.
     */
    const titleLength = computed(() => {
        return essay.value.title.replace(/\s/g, '').length;
    });

    /**
     * Computed length of essay, without spaces.
     * @returns {number}
     */
    const essayLength = computed(() => {
        return essay.value.content.replace(/\s/g, '').length;
    });

    const totalScore = computed(() => {
        let score = essayFeedback.value.content.score + essayFeedback.value.expression.score + essayFeedback.value.feature.score;
        return score;
    });

    return {
        essay,
        essayFeedback,
        followupMessages,
        followupAnswers,
        setEssayFeedback,
        resetEssay,
        setNotSubmitted,
        setSubmitting,
        setSubmitted,
        addFollowupMessage,
        addFollowupAnswer,
        submissionStatus,
        essayLength,
        topicLength,
        titleLength,
        totalScore
    };
});

// TODO: Add history support

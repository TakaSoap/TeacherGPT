import axios from 'axios';
import { Essay as GaokaoEssay, Message as GaokaoMessage } from '@/stores/gaokaoEssay';
import { Essay as IELTSEssay, Message as IELTSMessage } from '@/stores/ieltsEssay';
import { useQuestionAnsweringStore, Answer, Message as QAMessage } from '@/stores/questionAnswering';

interface GPTMessage {
    role: string;
    content: string;
}

const axiosInstance = axios.create({ baseURL: 'http://localhost:3001/v1' });

const maxAttempts = 1;
let attempts = 0;

export default function useAPI() {
    const essayFirstMessage = async (data: object) => {
        const response = await axiosInstance.post('/essay', data);
        return response;
    };

    const essayFollowupMessage = async (data: object) => {
        const response = await axiosInstance.post('/essay/follow-up', data);
        return response;
    };

    const gaokaoEssayFirstMessage = async (data: object) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/gaokao-essay', data);
                if (response.status === 200) {
                    return response;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }
            attempts++;
        }
        // If we reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const gaokaoEssayFollowupMessage = async (conversation: GaokaoMessage[], essay: GaokaoEssay, newMessage: GaokaoMessage) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/gaokao-essay/follow-up', {
                    conversation,
                    essay,
                    newMessage
                });

                if (response.status === 200) {
                    return response;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }

            attempts++;
        }

        // If we reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const ieltsEssayFirstMessage = async (data: object) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/ielts-essay', data);
                if (response.status === 200) {
                    return response;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }
            attempts++;
        }
        // If we reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const ieltsEssayFollowupMessage = async (conversation: IELTSMessage[], essay: IELTSEssay, newMessage: IELTSMessage) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/ielts-essay/follow-up', {
                    conversation,
                    essay,
                    newMessage
                });

                if (response.status === 200) {
                    return response;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }

            attempts++;
        }

        // If we reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const qaMessage = async (conversation: GPTMessage[], newQuestion: string, audience: string) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/qa', {
                    conversation,
                    newQuestion,
                    audience,
                });

                if (response.status === 200) {
                    return response;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }

            attempts++;
        }

        // If we reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    return { essayFirstMessage, essayFollowupMessage, gaokaoEssayFirstMessage, gaokaoEssayFollowupMessage, ieltsEssayFirstMessage, ieltsEssayFollowupMessage, qaMessage };
}

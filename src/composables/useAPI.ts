import axios from 'axios';
import { useGaokaoEssayStore, Essay, EssayFeedback, Message } from '@/stores/gaokaoEssay';

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
        throw new Error('Request failed after 3 attempts.');
    };

    const gaokaoEssayFollowupMessage = async (conversation: Message[], essay: Essay, newMessage: Message) => {
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
        throw new Error('Request failed after 3 attempts.');
    };

    return { essayFirstMessage, essayFollowupMessage, gaokaoEssayFirstMessage, gaokaoEssayFollowupMessage };
}

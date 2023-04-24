import axios, { AxiosResponse } from 'axios';
import { Message as EssayMessage } from '@/stores/essay';
import { Essay as GaokaoEssay, Message as GaokaoMessage } from '@/stores/gaokaoEssay';
import { Essay as IELTSEssay, Message as IELTSMessage } from '@/stores/ieltsEssay';
import { FirstMessage as SparkFirstMessage, Message as SparkMessage } from '../stores/spark';
import { StudentInfo } from '../stores/evaluation';

interface ChatMessage {
    role: string;
    content: string;
}

const axiosInstance = axios.create({ baseURL: 'http://localhost:3001/v1' });

const maxAttempts = 1;
let attempts = 0;

export default function useAPI() {
    const essayFirstMessage = async (data: object) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/essay', data);
                if (response.status === 200) {
                    return response;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }
            attempts++;
        }
        // If reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const essayFollowupMessage = async (conversation: EssayMessage[], essay: string, newMessage: EssayMessage) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/essay/follow-up', {
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

        // If reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
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
        // If reach this point, all attempts have failed.
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

        // If reach this point, all attempts have failed.
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
        // If reach this point, all attempts have failed.
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

        // If reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const qaMessage = async (conversation: ChatMessage[], newQuestion: string, audience: string) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/qa', {
                    conversation,
                    newQuestion,
                    audience
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

        // If reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const sparkFirstMessage = async (objective: string, level: string) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/spark', {
                    objective,
                    level
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

        // If reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const sparkFollowupMessage = async (conversation: ChatMessage[], message: string, objective: string, level: string, firstAnswer: string) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await axiosInstance.post('/spark/follow-up', {
                    conversation,
                    message,
                    objective,
                    level,
                    firstAnswer
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

        // If reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    const evaluationMessage = async (studentInfo: StudentInfo, isRhymingPoem: boolean) => {
        attempts = 0;
        while (attempts < maxAttempts) {
            try {
                let response: AxiosResponse | null = null;
                if (isRhymingPoem) {
                    response = await axiosInstance.post('/evaluation/rhyming', {
                        studentInfo
                    });
                } else {
                    response = await axiosInstance.post('/evaluation', {
                        studentInfo
                    });
                }

                if (response?.status === 200) {
                    return response;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }

            attempts++;
        }

        // If reach this point, all attempts have failed.
        throw new Error('Request failed after maxAttempts.');
    };

    return {
        essayFirstMessage,
        essayFollowupMessage,
        gaokaoEssayFirstMessage,
        gaokaoEssayFollowupMessage,
        ieltsEssayFirstMessage,
        ieltsEssayFollowupMessage,
        qaMessage,
        sparkFirstMessage,
        sparkFollowupMessage,
        evaluationMessage
    };
}

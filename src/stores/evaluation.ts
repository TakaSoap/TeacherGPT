import { defineStore } from 'pinia';

export interface StudentInfo {
    name: string;
    gender: string | null;
    grade: string | null;
    performance: {
        academic: number | null;
        discipline: number | null;
        engagement: number | null;
        homework: number | null;
        innovativeSpirit: number | null;
        moralHabit: number | null;
        participation: number | null;
        peerRelationship: number | null;
        potential: number | null;
    };
    subjects: {
        strong: string[];
        weak: string[];
    };
    additionalInfo: string;
}

export interface Message {
    studentInfo: StudentInfo;
    evaluation: string;
}

function createEmptyStudentInfo(): StudentInfo {
    return {
        name: '',
        gender: null,
        grade: null,
        performance: {
            academic: null,
            discipline: null,
            engagement: null,
            homework: null,
            innovativeSpirit: null,
            moralHabit: null,
            participation: null,
            peerRelationship: null,
            potential: null
        },
        subjects: {
            strong: [],
            weak: []
        },
        additionalInfo: ''
    };
}

export const useEvaluationStore = defineStore('evaluation', () => {
    const studentInfo: Ref<StudentInfo> = ref(createEmptyStudentInfo());

    const evaluations: Ref<Message[]> = ref([]);

    const isWaiting: Ref<boolean> = ref(false);

    function addEvaluation(newEvaluation: string) {
        evaluations.value.push({
            studentInfo: studentInfo.value,
            evaluation: newEvaluation
        });
    }

    function resetEvaluation() {
        studentInfo.value = createEmptyStudentInfo();
    }

    function resetAll() {
        resetEvaluation();
        evaluations.value = [];
    }

    return {
        studentInfo,
        evaluations,
        isWaiting,
        addEvaluation,
        resetEvaluation,
        resetAll
    };
});

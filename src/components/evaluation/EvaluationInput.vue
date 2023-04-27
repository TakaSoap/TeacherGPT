<template>
    <div>
        <n-card size="medium" style="max-width: 50rem">
            <template #header>
                <n-h2 style="margin: 0">
                    <n-text type="primary"> 学生信息 </n-text>
                </n-h2>
                <n-text depth="3" style="font-size: 1rem" italic>所有信息均为选填，TeacherGPT 将智能生成评语</n-text>
            </template>
            <template #header-extra>
                <n-space>隐藏信息<n-switch v-model:value="isInfoHidden" /></n-space>
            </template>
            <n-collapse-transition :show="!isInfoHidden">
                <n-form :show-feedback="false">
                    <n-space>
                        <n-form-item path="name" label="姓名">
                            <n-input v-model:value="evaluationStore.studentInfo.name" placeholder="在此输入学生姓名" :disabled="isInputsDisabled" />
                        </n-form-item>

                        <n-form-item path="gender" label="性别">
                            <n-select
                                style="min-width: 6rem"
                                :disabled="isInputsDisabled"
                                v-model:value="evaluationStore.studentInfo.gender"
                                :options="[
                                    {
                                        label: '男',
                                        value: 'male'
                                    },
                                    {
                                        label: '女',
                                        value: 'female'
                                    }
                                ]"
                            />
                        </n-form-item>

                        <n-form-item path="grade" label="年级">
                            <n-cascader
                                style="min-width: 8rem"
                                expand-trigger="hover"
                                check-strategy="child"
                                :disabled="isInputsDisabled"
                                v-model:value="evaluationStore.studentInfo.grade"
                                :options="[
                                    {
                                        label: '小学',
                                        value: '小学',
                                        children: [
                                            {
                                                label: '一年级',
                                                value: '小学一年级'
                                            },
                                            {
                                                label: '二年级',
                                                value: '小学二年级'
                                            },
                                            {
                                                label: '三年级',
                                                value: '小学三年级'
                                            },
                                            {
                                                label: '四年级',
                                                value: '小学四年级'
                                            },
                                            {
                                                label: '五年级',
                                                value: '小学五年级'
                                            },
                                            {
                                                label: '六年级',
                                                value: '小学六年级'
                                            }
                                        ]
                                    },
                                    {
                                        label: '初中',
                                        value: '初中',
                                        children: [
                                            {
                                                label: '一年级',
                                                value: '初中一年级'
                                            },
                                            {
                                                label: '二年级',
                                                value: '初中二年级'
                                            },
                                            {
                                                label: '三年级',
                                                value: '初中三年级'
                                            }
                                        ]
                                    },
                                    {
                                        label: '高中',
                                        value: '高中',
                                        children: [
                                            {
                                                label: '一年级',
                                                value: '高中一年级'
                                            },
                                            {
                                                label: '二年级',
                                                value: '高中二年级'
                                            },
                                            {
                                                label: '三年级',
                                                value: '高中三年级'
                                            }
                                        ]
                                    }
                                ]"
                            />
                        </n-form-item>
                    </n-space>
                    <div style="padding: 1rem 0">
                        <n-text style="font-size: 1.2rem">学生表现</n-text>
                        <n-text depth="3" style="font-size: 1rem" italic>（若不提及可留空）</n-text>
                    </div>
                    <n-grid cols="3">
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>总体成绩</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.academic"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'academic')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>作业表现</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.homework"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'homework')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                        
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>班级工作</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.participation"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'participation')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>课堂参与</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.engagement"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'engagement')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>纪律表现</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.discipline"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'discipline')"
                                />
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>品德习惯</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.moralHabit"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'moralHabit')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>同学关系</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.peerRelationship"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'peerRelationship')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>创新精神</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.innovativeSpirit"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'innovativeSpirit')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical size="small">
                                <n-text>未来期望</n-text>
                                <n-rate
                                    :value="evaluationStore.studentInfo.performance.potential"
                                    :disabled="isInputsDisabled"
                                    @update:value="(value: number) => setPerformanceValue(value, 'potential')"
                                    clearable
                                />
                            </n-space>
                        </n-gi>
                    </n-grid>

                    <n-form-item style="padding-left: 0.125rem; padding-top: 1rem" label="输入科目表现" label-placement="left">
                        <n-switch v-model:value="showSubjectsPerformance" />
                    </n-form-item>

                    <n-collapse-transition :show="showSubjectsPerformance">
                        <n-grid :cols="2" :x-gap="32">
                            <n-gi>
                                <n-form-item path="strong" label="优势科目">
                                    <n-select
                                        style="min-width: 8rem"
                                        v-model:value="evaluationStore.studentInfo.subjects.strong"
                                        multiple
                                        :options="unselectedSubjects"
                                        :disabled="isInputsDisabled"
                                        clearable
                                        @update:value="handleUpdateSubject"
                                    >
                                        <template #action>
                                            <n-input-group>
                                                <n-input
                                                    v-model:value="customSubject"
                                                    :status="customInputStatus"
                                                    placeholder="在此输入自定义科目"
                                                    :disabled="isInputsDisabled"
                                                    @keyup.enter="handleAddCustomSubjectEnter('strong')"
                                                />
                                                <n-button @click="handleAddCustomSubject('strong')">
                                                    <template #icon>
                                                        <n-icon>
                                                            <AddOutline />
                                                        </n-icon>
                                                    </template>
                                                    添加
                                                </n-button>
                                            </n-input-group>
                                        </template>
                                    </n-select>
                                </n-form-item>
                            </n-gi>
                            <n-gi>
                                <n-form-item path="weak" label="后进科目">
                                    <n-select
                                        style="min-width: 8rem"
                                        v-model:value="evaluationStore.studentInfo.subjects.weak"
                                        multiple
                                        :options="unselectedSubjects"
                                        :disabled="isInputsDisabled"
                                        clearable
                                        @update:value="handleUpdateSubject"
                                    >
                                        <template #action>
                                            <n-input-group>
                                                <n-input
                                                    v-model:value="customSubject"
                                                    :status="customInputStatus"
                                                    placeholder="在此输入自定义科目"
                                                    :disabled="isInputsDisabled"
                                                    @keyup.enter="handleAddCustomSubjectEnter('weak')"
                                                />
                                                <n-button @click="handleAddCustomSubject('weak')">
                                                    <template #icon>
                                                        <n-icon>
                                                            <AddOutline />
                                                        </n-icon>
                                                    </template>
                                                    添加
                                                </n-button>
                                            </n-input-group>
                                        </template>
                                    </n-select>
                                </n-form-item>
                            </n-gi>
                        </n-grid>
                    </n-collapse-transition>

                    <n-form-item path="essay" label="其余学生表现">
                        <n-input
                            :autosize="{
                                minRows: 2,
                                maxRows: 10
                            }"
                            v-model:value="evaluationStore.studentInfo.additionalInfo"
                            type="textarea"
                            placeholder="在此输入相关补充信息"
                            :disabled="isInputsDisabled"
                        />
                    </n-form-item>

                    <n-form-item style="padding-left: 0.125rem; padding-top: 0" label="生成顺口溜" label-placement="left">
                        <n-switch v-model:value="isRhymingPoem" />
                    </n-form-item>
                </n-form>
            </n-collapse-transition>

            <n-space>
                <n-button @click="submitInfo" type="primary">
                    <template #icon>
                        <n-icon>
                            <PaperPlaneOutline />
                        </n-icon>
                    </template>
                    生成评语
                </n-button>
                <n-button @click="resetForm" secondary type="error" :disabled="isInputsDisabled">
                    <template #icon>
                        <n-icon>
                            <TrashBinOutline />
                        </n-icon>
                    </template>
                    清空当前信息
                </n-button>
                <n-button @click="resetAll" secondary type="error" :disabled="isInputsDisabled">
                    <template #icon>
                        <n-icon>
                            <RefreshOutline />
                        </n-icon>
                    </template>
                    清空所有评语
                </n-button>
            </n-space>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PaperPlaneOutline, RefreshOutline, TrashBinOutline, AddOutline } from '@vicons/ionicons5';
import { useMessage } from 'naive-ui';
import { useEvaluationStore } from '@/stores/evaluation';

const test = ref(0);

const message = useMessage();
const evaluationStore = useEvaluationStore();

const api = useAPI();

const isInputsDisabled = ref(false);
const isInfoHidden = ref(false);
const showSubjectsPerformance = ref(false);

const isRhymingPoem = ref(false);

interface SubjectOption {
    label: string;
    value: string;
}

const subjectOptions: SubjectOption[] = [
    {
        label: '语文',
        value: '语文'
    },
    {
        label: '数学',
        value: '数学'
    },
    {
        label: '英语',
        value: '英语'
    },
    {
        label: '科学',
        value: '科学'
    },
    {
        label: '道德与法治',
        value: '道德与法治'
    },
    {
        label: '信息技术',
        value: '信息技术'
    },
    {
        label: '物理',
        value: '物理'
    },
    {
        label: '化学',
        value: '化学'
    },
    {
        label: '生物',
        value: '生物'
    },
    {
        label: '政治',
        value: '政治'
    },
    {
        label: '历史',
        value: '历史'
    },
    {
        label: '地理',
        value: '地理'
    },
    {
        label: '美术',
        value: '美术'
    },
    {
        label: '音乐',
        value: '音乐'
    }
];

const selectedSubjects = ref<SubjectOption[]>([]);
const unselectedSubjects = ref<SubjectOption[]>(subjectOptions);

const customSubject = ref('');
const customInputStatus = ref<'error' | 'success' | 'info' | 'warning' | undefined>(undefined);

function handleUpdateSubject() {
    selectedSubjects.value = subjectOptions.filter((option) => {
        return evaluationStore.studentInfo.subjects.strong.includes(option.value) || evaluationStore.studentInfo.subjects.weak.includes(option.value);
    });
    unselectedSubjects.value = subjectOptions.filter((option) => {
        return (
            !evaluationStore.studentInfo.subjects.strong.includes(option.value) && !evaluationStore.studentInfo.subjects.weak.includes(option.value)
        );
    });
}

function handleAddCustomSubject(aspect: string) {
    if (customSubject.value === '') {
        message.warning('自定义科目不能为空');
        customInputStatus.value = 'error';
        return;
    }

    if (subjectOptions.some((option) => option.value === customSubject.value)) {
        message.warning('自定义科目不能与已有科目重复');
        customInputStatus.value = 'error';
        return;
    }

    subjectOptions.push({
        label: customSubject.value,
        value: customSubject.value
    });

    if (aspect === 'strong') {
        evaluationStore.studentInfo.subjects.strong.push(customSubject.value);
    } else {
        evaluationStore.studentInfo.subjects.weak.push(customSubject.value);
    }
    customSubject.value = '';
    handleUpdateSubject();
}

function handleAddCustomSubjectEnter(aspect: string) {
    handleAddCustomSubject(aspect);
}

function setPerformanceValue(value: number, aspect: string) {
    type PerformanceAspect = 'academic' | 'homework' | 'potential' | 'participation' | 'engagement' | 'discipline' | 'moralHabit' | 'peerRelationship' | 'innovativeSpirit';

    const aspects: PerformanceAspect[] = ['academic', 'homework', 'potential', 'participation', 'engagement', 'discipline', 'moralHabit', 'peerRelationship', 'innovativeSpirit'];

    if (aspects.includes(aspect as PerformanceAspect)) {
        evaluationStore.studentInfo.performance[aspect as PerformanceAspect] = value;
    } else {
        console.error('Unknown aspect:', aspect);
    }
}

function resetForm() {
    evaluationStore.resetEvaluation();
}

function resetAll() {
    evaluationStore.resetAll();
}

function submitInfo() {
    isInputsDisabled.value = true;
    evaluationStore.isWaiting = true;

    api.evaluationMessage(evaluationStore.studentInfo, isRhymingPoem.value)
        .then((response) => {
            evaluationStore.addEvaluation(response.data);
        })
        .catch((error) => {
            message.error('服务器错误\n', error);
        })
        .finally(() => {
            isInputsDisabled.value = false;
            evaluationStore.isWaiting = false;
        });
}
</script>

<style scoped>
.n-form-item {
    padding-bottom: 1rem;
}

.multiline-text {
    white-space: pre-wrap;
}
</style>

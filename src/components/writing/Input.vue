<template>
    <div>
        <n-card size="medium" style="max-width: 800px">
            <n-h2>
                <n-text type="primary"> TODO: 年级科目选择 </n-text>
            </n-h2>
            <n-form :show-label="false">
                <n-form-item path="requirements" style="padding-bottom: 1rem" :show-feedback="false">
                    <n-input :status="postStatus" v-model:value="newPost.content" type="textarea" placeholder="在此输入作文题目 / 要求" />
                </n-form-item>
                <n-form-item path="content" style="padding-bottom: 1rem" :show-feedback="false">
                    <n-input :status="postStatus" v-model:value="newPost.content" type="textarea" placeholder="在此输入作文" />
                </n-form-item>

                <n-button @click="onPostSubmit" type="primary">
                    <template #icon>
                        <n-icon>
                            <PaperPlaneOutline />
                        </n-icon>
                    </template>
                    开始批改
                </n-button>
            </n-form>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { PaperPlaneOutline, CloudUploadOutline } from '@vicons/ionicons5';
import { UploadFileInfo, useMessage } from 'naive-ui';
import axios from 'axios';
import { Ref } from 'vue';

const emit = defineEmits<{
    (e: 'newPost', value: string): void;
}>();

const message = useMessage();

let header: Object = {};

const postUpload = ref<any>(null);

interface NewPost {
    content: string;
    fileInfo: {
        fileName: string;
        filePath: string;
        fileType: string;
    }[];
}

const newPost = ref<NewPost>({
    content: '',
    fileInfo: []
});

const postStatus = ref('');

const fileList = ref<UploadFileInfo[]>([]);

function onUploaded(result: { file: UploadFileInfo; event: ProgressEvent }) {
    const response = (result.event.currentTarget as XMLHttpRequest).response;

    let file: UploadFileInfo = result.file;

    file.url = JSON.parse(response).filePath;

    return file;
}

function handleChange(options: { fileList: UploadFileInfo[] }) {
    fileList.value = options.fileList;
}

function onPostSubmit() {
    //validate form
    if (newPost.value.content.length === 0) {
        message.error('请输入内容');
        postStatus.value = 'error';
        return;
    }

    postStatus.value = '';

    fileList.value.forEach((file) => {
        newPost.value.fileInfo.push({
            fileName: file.name,
            filePath: file.url!,
            fileType: file.type!
        });
    });

    const result = axios.post('https://epms-api.takasoap.xyz/api/Post', newPost.value, {
        headers: {
            Authorization: `Bearer ${user.value!.token}`
        }
    });

    result.then((response) => {
        console.log(response);
        if (response.status == 201) {
            emit('newPost', newPost.value.content);

            newPost.value = {
                content: '',
                fileInfo: []
            };

            fileList.value = [];
            postUpload.value?.clear();

            message.success('发布成功');
        }
    });
}
</script>

<style scoped></style>

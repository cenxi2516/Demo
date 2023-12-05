import {computed, onMounted, onUnmounted, ref} from 'vue'
import {filter} from '@/util/storageTodo'
import getHashValue from '@/util/getHashValue'

const activeStatus = ['all', 'active', 'completed'];

const useFilterTodoList = (todoListRef) => {
    const hashRef = ref(getHashValue());

    const watchHash = () => {
        let hash = getHashValue();
        hash = activeStatus.includes(hash) ? hash: 'all';

        hashRef.value = location.hash = hash;
    };

    const currentTodoListRef = computed(() => filter(todoListRef.value, hashRef.value));
    const remianTodoRef = computed(() => filter(todoListRef.value, 'active'));
    const completedTodoRef = computed(() => filter(todoListRef.value, 'completed'));

    onMounted(() => window.addEventListener('hashchange', watchHash));
    onUnmounted(() => window.removeEventListener('hashchange', watchHash));

    return {
        hashRef,
        currentTodoListRef,
        remianTodoRef,
        completedTodoRef
    }
};

export default useFilterTodoList;
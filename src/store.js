import Vue from "vue";

const store = Vue.observable({userId: null, activities: [], goals: []})

async function fetchActivities() {
    let url = `/api/users/${store.userId}/activities`;
    store.activities = (await Vue.prototype.$axios.get(url)).data
    store.activities.map(a => a.started = a.started.split("T")[0])
}

async function fetchGoals() {
    let url = `/api/users/${store.userId}/goals`;
    store.goals = (await Vue.prototype.$axios.get(url)).data
    store.goals.map(g => g.percent = ((g.current * 100) / g.target).toFixed(0))
}

export default {
    async loadStore(id) {
        store.userId = id
        await fetchActivities()
        await fetchGoals()
    },
    getActivities() {
        return store.activities
    },
    getGoals() {
        return store.goals
    },
    async reloadActivities() {
        await fetchActivities()
    },
    async reloadGoals() {
        await fetchGoals()
    }
}
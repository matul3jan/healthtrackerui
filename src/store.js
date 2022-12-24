import Vue from "vue";

const store = Vue.observable({activities: [], goals: []})

async function fetchActivities() {
    let url = `/api/users/${Vue.prototype.$session.get('user').id}/activities`;
    store.activities = (await Vue.prototype.$axios.get(url)).data
    store.activities.map(a => a.started = a.started.split("T")[0])
}

async function fetchGoals() {
    let url = `/api/users/${Vue.prototype.$session.get('user').id}/goals`;
    store.goals = (await Vue.prototype.$axios.get(url)).data
    store.goals.map(g => g.percent = ((g.current * 100) / g.target).toFixed(0))
}

export default {
    startSession(user) {
        Vue.prototype.$session.start()
        Vue.prototype.$session.set('user', user)
        Vue.prototype.$session.set('auth', 'Basic ' + btoa(user.email + ":" + user.password))
    },
    async loadStore() {
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
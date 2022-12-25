import Vue from "vue"
import axios from 'axios'

const store = Vue.observable({stats: {}, activities: [], goals: []})

export default {
    commonActions: {
        setAxiosDefaults() {
            axios.defaults.headers.common['Authorization'] = getSession().get('auth')
        },
        startSession(user) {
            getSession().start()
            getSession().set('auth', 'Basic ' + btoa(user.email + ":" + user.password))
            getSession().set('user', user)
        },
        checkSession() {
            return getSession().exists()
        },
        destroySession() {
            getSession().destroy()
        },
        async loadStore() {
            await fetchActivities()
            await fetchGoals()
            await fetchStats()
        }
    },
    userActions: {
        getUser() {
            return getSession().get('user')
        },
        getStats() {
            return store.stats
        },
        async updateUser(user) {
            await axios.patch('api/users/' + getSession().get('user').id, user)
            getSession().set('user', user)
            await fetchStats()
        }
    },
    activityActions: {
        getActivities() {
            return store.activities
        },
        async addActivity(activity) {
            activity.userId = getSession().get('user').id
            const response = await axios.post("api/activities", activity)
            store.activities.push(response.data)
        },
        async deleteActivity(activity) {
            await axios.delete("api/activities/" + activity.id)
            store.activities.splice(store.activities.indexOf(activity), 1)
            store.goals = store.goals.filter(g => g.activityId !== activity.id)
        },
        async updateActivity(oldA, newA) {
            newA.userId = getSession().get('user').id
            await axios.patch("api/activities/" + oldA.id, newA)
            const index = store.activities.indexOf(oldA)
            store.activities[index].description = newA.description
            store.activities[index].duration = newA.duration
            store.activities[index].started = newA.started
            store.activities[index].calories = newA.calories
        }
    },
    goalActions: {
        getGoals() {
            return store.goals
        },
        async addGoal(goal) {
            goal.userId = getSession().get('user').id
            const response = await axios.post("api/goals", goal)
            store.goals.push(response.data)
        },
        async deleteGoal(goal) {
            await axios.delete("api/goals/" + goal.id)
            store.goals.splice(store.goals.indexOf(goal), 1)
        },
        async updateGoal(oldG, newG) {
            newG.userId = getSession().get('user').id
            await axios.patch("api/goals/" + oldG.id, newG)
            const index = store.goals.indexOf(oldG)
            store.goals[index].target = newG.target
            store.goals[index].current = newG.current
            store.goals[index].unit = newG.unit
        }
    }
}

const getSession = () => Vue.prototype.$session

async function fetchActivities() {
    const url = `/api/users/${getSession().get('user').id}/activities`
    store.activities = (await axios.get(url)).data
    store.activities.map(a => a.started = a.started.split("T")[0])
}

async function fetchGoals() {
    const url = `/api/users/${getSession().get('user').id}/goals`
    store.goals = (await axios.get(url)).data
    store.goals.map(g => g.percent = ((g.current * 100) / g.target).toFixed(0))
}

async function fetchStats() {
    const user = getSession().get('user')
    const url = `api/users/${user.id}/stats`
    store.stats = (await axios.get(url)).data
    store.stats.height = user.height
    store.stats.weight = user.weight
}
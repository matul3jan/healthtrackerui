<template>
  <Bar :data="getChartData()" :options="chartOptions"/>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'CalorieChart',
  components: {Bar},
  data: () => ({
    chartOptions: {
      scales: {
        x: {
          grid: {
            display: false,
          }
        },
        y: {
          grid: {
            display: false,
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Daily calories burned",
          font: {
            size: 15
          }
        },
        legend: {
          display: false
        }
      },
      animation: {
        duration: 3000
      }
    }
  }),
  methods: {
    getChartData() {
      let map = new Map()
      const activities = this.$actions.activityActions.getActivities().slice() // do not modify original activities

      activities.forEach(a => {
        const date = new Date(a.started).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"})
        if (map.has(date)) {
          map.set(date, map.get(date) + a.calories)
        } else {
          map.set(date, a.calories)
        }
      })

      map = new Map([...map.entries()].sort()) // sort map by date

      return {
        labels: [...map.keys()],
        datasets: [{
          label: 'Calories',
          backgroundColor: '#f87979',
          barThickness: 30,
          data: [...map.values()]
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
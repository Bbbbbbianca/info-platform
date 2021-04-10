<template>
  <view class="taro-example" />
</template>

<script>
  export default {
    name: "Index",
    data() {
      const date = new Date()
      const years = []
      const months = []
      const days = []
      for (let i = 1990; i <= date.getFullYear(); i++) {
        years.push(i)
      }
      for (let i = 1; i <= 12; i++) {
        months.push(i)
      }
      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }
      return {
      timeSel: '12:01',
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2,
        value: [3, 1, 1]
      }
    },

    methods: {
      onTimeChange: function(e) {
        this.timeSel = e.detail.value
      },
      onChange: function(e) {
        const val = e.detail.value
        console.log(val)
        this.year = this.years[val[0]]
        this.month = this.months[val[1]]
        this.day = this.days[val[2]]
      }
    }
  }
</script>
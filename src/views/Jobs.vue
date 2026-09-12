<template>
  <div>
    <div class="header">
      <button class="back-btn" @click="$router.push('/')">←</button>
      <div>
        <h1>招聘求职</h1>
        <div class="subtitle">最新招聘信息汇总</div>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-scroll">
        <button
          class="filter-btn"
          :class="{ active: !selectedType }"
          @click="selectedType = ''"
        >全部</button>
        <button
          v-for="t in jobTypes"
          :key="t"
          class="filter-btn"
          :class="{ active: selectedType === t }"
          @click="selectedType = t"
        >{{ t }}</button>
      </div>
    </div>

    <div class="stats">
      共 {{ filtered.length }} 条招聘信息
    </div>

    <div class="list">
      <div v-if="filtered.length === 0" class="empty-state">
        <div class="icon">🔍</div>
        <p>该类型暂无招聘信息</p>
      </div>

      <router-link
        v-for="job in filtered"
        :key="job.id"
        :to="`/jobs/${job.id}`"
        class="card"
      >
        <div class="card-title">{{ job.title }}</div>
        <div class="card-meta">
          <span class="tag tag-type">{{ job.job_type }}</span>
          <span v-if="job.region" class="tag tag-region">📍 {{ job.region }}</span>
        </div>
        <div class="card-footer">
          <span class="date">{{ job.publish_date }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const jobs = ref([])
const selectedType = ref('')

const jobTypes = computed(() => {
  const map = {}
  jobs.value.forEach(j => {
    const t = j.job_type
    map[t] = (map[t] || 0) + 1
  })
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([t, c]) => `${t}(${c})`)
})

const filtered = computed(() => {
  let list = jobs.value
  if (selectedType.value) {
    const type = selectedType.value.replace(/\(\d+\)$/, '')
    list = list.filter(j => j.job_type === type)
  }
  const search = route.query.search
  if (search) {
    const kw = search.toLowerCase()
    list = list.filter(j =>
      (j.title || '').toLowerCase().includes(kw) ||
      (j.region || '').toLowerCase().includes(kw) ||
      (j.description || '').toLowerCase().includes(kw)
    )
  }
  return list
})

onMounted(async () => {
  const res = await fetch('./data.json')
  jobs.value = await res.json()
  if (route.query.search) {
    document.querySelector('.filter-bar')?.scrollIntoView()
  }
})
</script>

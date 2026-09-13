<template>
  <div>
    <div class="header">
      <button class="back-btn" @click="$router.push('/')">←</button>
      <div>
        <h1>同城活动</h1>
        <div class="subtitle">认识新朋友</div>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-scroll">
        <button class="filter-btn" :class="{ active: !selectedRegion }" @click="selectedRegion = ''">全部</button>
        <button v-for="r in regions" :key="r" class="filter-btn" :class="{ active: selectedRegion === r }" @click="selectedRegion = r">{{ r }}</button>
      </div>
    </div>

    <div class="stats">共 {{ filtered.length }} 个活动</div>

    <div class="list">
      <div v-if="filtered.length === 0" class="empty-state">
        <div class="icon">🔍</div>
        <p>暂无活动</p>
      </div>

      <div v-for="item in filtered" :key="item.id" class="card event-card">
        <div class="card-title">{{ item.title }}</div>
        <div class="card-meta">
          <span class="tag tag-region">📍 {{ item.region }}</span>
          <span class="tag tag-type">👥 {{ item.current_participants }}/{{ item.max_participants }}</span>
        </div>
        <div class="event-info">
          <div>📅 {{ item.date }} {{ item.time }}</div>
          <div>📍 {{ item.location }}</div>
        </div>
        <div class="card-desc">{{ item.description }}</div>
        <div class="contact-row">
          <span>组织者 Mia</span>
          <span class="wechat">微信: {{ item.wechat }}</span>
        </div>
      </div>
    </div>

    <div class="bottom-nav">
      <router-link to="/" class="nav-item"><span class="nav-icon">🏠</span><span>首页</span></router-link>
      <router-link to="/profile" class="nav-item"><span class="nav-icon">👤</span><span>我的</span></router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const items = ref([])
const selectedRegion = ref('')

const regions = computed(() => {
  const set = new Set(items.value.map(i => i.region))
  return [...set]
})

const filtered = computed(() => {
  if (!selectedRegion.value) return items.value
  return items.value.filter(i => i.region === selectedRegion.value)
})

onMounted(async () => {
  const res = await fetch('./events.json')
  items.value = await res.json()
})
</script>

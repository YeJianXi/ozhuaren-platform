<template>
  <div class="landing">
    <div class="header">
      <h1>华人信息平台</h1>
      <div class="subtitle">澳洲华人生活助手</div>
    </div>

    <div class="search-bar">
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="🔍 搜索招聘、二手、租房..."
        @keyup.enter="doSearch"
      />
    </div>

    <div class="city-bar">
      <button
        v-for="c in cities"
        :key="c"
        class="city-btn"
        :class="{ active: currentCity === c }"
        @click="currentCity = c"
      >{{ c }}</button>
    </div>

    <div class="announcement" v-if="announcement">
      <span class="announce-icon">📢</span>
      <div class="announce-scroll">
        <span class="announce-text">{{ announcement }}</span>
      </div>
    </div>

    <div class="grid-nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        class="grid-item"
        @click="$router.push(item.path)"
      >
        <div class="grid-icon">{{ item.icon }}</div>
        <div class="grid-label">{{ item.label }}</div>
      </div>
    </div>

    <div class="section" v-if="hotJobs.length">
      <div class="section-header">
        <h2>🔥 热门招聘</h2>
        <router-link to="/jobs" class="more-link">查看更多 →</router-link>
      </div>
      <div class="info-list">
        <router-link
          v-for="job in hotJobs"
          :key="job.id"
          :to="`/jobs/${job.id}`"
          class="info-item"
        >
          <span class="info-title">{{ job.title }}</span>
          <span class="info-tag" v-if="job.region">📍 {{ job.region }}</span>
        </router-link>
      </div>
    </div>

    <div class="section placeholder-section" v-if="currentCity === '全部' || currentCity === '悉尼'">
      <div class="section-header">
        <h2>🛒 最新二手</h2>
        <router-link to="/trade" class="more-link">查看更多 →</router-link>
      </div>
      <div class="info-list">
        <div class="info-item coming-soon">
          <span class="info-title">即将上线，敬请期待...</span>
        </div>
      </div>
    </div>

    <div class="section placeholder-section">
      <div class="section-header">
        <h2>🏠 最新租房</h2>
        <router-link to="/rental" class="more-link">查看更多 →</router-link>
      </div>
      <div class="info-list">
        <div class="info-item coming-soon">
          <span class="info-title">即将上线，敬请期待...</span>
        </div>
      </div>
    </div>

    <div class="bottom-nav">
      <router-link to="/" class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>首页</span>
      </router-link>
      <div class="nav-item disabled">
        <span class="nav-icon">👤</span>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cities = ['全部', '悉尼', '墨尔本', '布里斯班', '阿德莱德', '珀斯']
const currentCity = ref('全部')
const searchKeyword = ref('')
const announcement = '欢迎使用华人信息平台，汇聚澳洲最新招聘信息'
const jobs = ref([])

const navItems = [
  { icon: '👷', label: '招聘求职', path: '/jobs' },
  { icon: '🛒', label: '二手交易', path: '/trade' },
  { icon: '🏠', label: '租房信息', path: '/rental' },
  { icon: '🔧', label: '生活服务', path: '/services' },
  { icon: '🎉', label: '同城活动', path: '/events' },
]

const hotJobs = computed(() => {
  let list = jobs.value
  if (currentCity.value !== '全部') {
    list = list.filter(j => j.region === currentCity.value)
  }
  return list.slice(0, 5)
})

const doSearch = () => {
  if (!searchKeyword.value.trim()) return
  window.location.hash = `#/jobs?search=${encodeURIComponent(searchKeyword.value)}`
}

onMounted(async () => {
  try {
    const res = await fetch('./data.json')
    jobs.value = await res.json()
  } catch (e) {
    console.error('Failed to load data:', e)
  }
})
</script>

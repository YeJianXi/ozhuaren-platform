<template>
  <div>
    <div class="header">
      <button class="back-btn" @click="$router.push('/')">←</button>
      <div>
        <h1>生活服务</h1>
        <div class="subtitle">澳洲华人生活帮手</div>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-scroll">
        <button class="filter-btn" :class="{ active: !selectedType }" @click="selectedType = ''">全部</button>
        <button v-for="t in types" :key="t" class="filter-btn" :class="{ active: selectedType === t }" @click="selectedType = t">{{ t }}</button>
      </div>
    </div>

    <div class="stats">共 {{ filtered.length }} 项服务</div>

    <div class="list">
      <div v-if="filtered.length === 0" class="empty-state">
        <div class="icon">🔍</div>
        <p>暂无服务</p>
      </div>

      <div v-for="item in filtered" :key="item.id" class="card service-card">
        <div class="card-title">{{ item.title }}</div>
        <div class="card-meta">
          <span class="tag tag-type">{{ item.type }}</span>
          <span class="tag tag-region">📍 {{ item.region }}</span>
          <span class="tag tag-price">{{ item.price }}</span>
        </div>
        <div class="card-desc">{{ item.description }}</div>
        <div class="contact-row">
          <span>联系 Mia</span>
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
const selectedType = ref('')

const types = computed(() => {
  const set = new Set(items.value.map(i => i.type))
  return [...set]
})

const filtered = computed(() => {
  if (!selectedType.value) return items.value
  return items.value.filter(i => i.type === selectedType.value)
})

onMounted(async () => {
  const res = await fetch('./services.json')
  items.value = await res.json()
})
</script>

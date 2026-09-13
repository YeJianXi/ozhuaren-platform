<template>
  <div>
    <div class="header">
      <button class="back-btn" @click="$router.push('/')">←</button>
      <div>
        <h1>二手交易</h1>
        <div class="subtitle">澳洲华人二手好物</div>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-scroll">
        <button class="filter-btn" :class="{ active: !selectedCategory }" @click="selectedCategory = ''">全部</button>
        <button v-for="c in categories" :key="c" class="filter-btn" :class="{ active: selectedCategory === c }" @click="selectedCategory = c">{{ c }}</button>
      </div>
    </div>

    <div class="stats">共 {{ filtered.length }} 件商品</div>

    <div class="list">
      <div v-if="filtered.length === 0" class="empty-state">
        <div class="icon">🔍</div>
        <p>暂无商品</p>
      </div>

      <router-link v-for="item in filtered" :key="item.id" :to="`/trade/${item.id}`" class="card trade-card">
        <div class="card-with-image">
          <img v-if="item.images && item.images[0]" :src="item.images[0]" class="card-thumb" />
          <div class="card-content">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-meta">
              <span class="tag tag-type">{{ item.category }}</span>
              <span class="tag tag-region">📍 {{ item.region }}</span>
            </div>
            <div class="price-row">
              <span class="price">{{ item.price }}</span>
              <span class="date">{{ item.publish_date }}</span>
            </div>
          </div>
        </div>
      </router-link>
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
const selectedCategory = ref('')

const categories = computed(() => {
  const set = new Set(items.value.map(i => i.category))
  return [...set]
})

const filtered = computed(() => {
  if (!selectedCategory.value) return items.value
  return items.value.filter(i => i.category === selectedCategory.value)
})

onMounted(async () => {
  const res = await fetch('./trade.json')
  items.value = await res.json()
})
</script>

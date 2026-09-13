<template>
  <div>
    <div class="header">
      <button class="back-btn" @click="$router.push('/')">←</button>
      <div>
        <h1>汽车交易</h1>
        <div class="subtitle">澳洲华人二手车</div>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-scroll">
        <button class="filter-btn" :class="{ active: !selectedBrand }" @click="selectedBrand = ''">全部</button>
        <button v-for="b in brands" :key="b" class="filter-btn" :class="{ active: selectedBrand === b }" @click="selectedBrand = b">{{ b }}</button>
      </div>
    </div>

    <div class="stats">共 {{ filtered.length }} 辆车</div>

    <div class="list">
      <div v-if="filtered.length === 0" class="empty-state">
        <div class="icon">🔍</div>
        <p>暂无车辆</p>
      </div>

      <router-link v-for="item in filtered" :key="item.id" :to="`/cars/${item.id}`" class="card trade-card">
        <div class="card-with-image">
          <img v-if="item.images && item.images[0]" :src="item.images[0]" class="card-thumb" />
          <div class="card-content">
            <div class="car-title">{{ item.title }}</div>
            <div class="car-specs">
              <span class="spec">📅 {{ item.year }}</span>
              <span class="spec">⚙️ {{ item.transmission }}</span>
              <span class="spec">⛽ {{ item.fuel }}</span>
              <span class="spec">🛣️ {{ item.mileage }}</span>
            </div>
            <div class="price-row">
              <span class="price">{{ item.price }}</span>
              <span class="tag tag-region">📍 {{ item.region }}</span>
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
const selectedBrand = ref('')

const brands = computed(() => {
  const set = new Set(items.value.map(i => i.brand))
  return [...set]
})

const filtered = computed(() => {
  if (!selectedBrand.value) return items.value
  return items.value.filter(i => i.brand === selectedBrand.value)
})

onMounted(async () => {
  const res = await fetch('./cars.json')
  items.value = await res.json()
})
</script>

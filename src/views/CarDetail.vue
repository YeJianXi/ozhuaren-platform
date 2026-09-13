<template>
  <div>
    <div class="header">
      <button class="back-btn" @click="$router.back()">←</button>
      <div><h1>车辆详情</h1></div>
    </div>

    <div v-if="item" class="detail-content">
      <div class="detail-card">
        <div class="detail-title">{{ item.title }}</div>
        <div class="price-highlight">{{ item.price }}</div>
        <div class="car-specs-row">
          <span class="spec-item">📅 {{ item.year }}</span>
          <span class="spec-item">⚙️ {{ item.transmission }}</span>
          <span class="spec-item">⛽ {{ item.fuel }}</span>
        </div>
        <div class="car-specs-row">
          <span class="spec-item">🛣️ {{ item.mileage }}</span>
          <span class="tag tag-region">📍 {{ item.region }} {{ item.location }}</span>
        </div>
        <div class="card-footer"><span class="date">📅 {{ item.publish_date }}</span></div>
      </div>

      <div class="detail-card">
        <h3>车辆描述</h3>
        <div class="field-value description">{{ item.description }}</div>
      </div>

      <div class="detail-card contact-card">
        <h3>联系我</h3>
        <div class="field-row"><div class="field-label">联系人</div><div class="field-value">Mia</div></div>
        <div class="field-row"><div class="field-label">微信</div><div class="field-value highlight">qfh16888888888</div></div>
      </div>
    </div>

    <div v-else class="empty-state"><div class="icon">📭</div><p>未找到该车辆</p></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const item = ref(null)

onMounted(async () => {
  const res = await fetch('./cars.json')
  const data = await res.json()
  item.value = data.find(i => i.id === route.params.id)
})
</script>

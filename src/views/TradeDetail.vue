<template>
  <div>
    <div class="header">
      <button class="back-btn" @click="$router.back()">←</button>
      <div><h1>商品详情</h1></div>
    </div>

    <div v-if="item" class="detail-content">
      <div class="detail-card" v-if="item.images && item.images.length">
        <div class="gallery">
          <img :src="item.images[currentImage]" class="gallery-img" @click="nextImage" />
          <div class="gallery-dots" v-if="item.images.length > 1">
            <span v-for="(img, i) in item.images" :key="i" class="dot" :class="{ active: i === currentImage }" @click.stop="currentImage = i"></span>
          </div>
          <div class="gallery-counter">{{ currentImage + 1 }}/{{ item.images.length }}</div>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-title">{{ item.title }}</div>
        <div class="price-highlight">{{ item.price }}</div>
        <div class="card-meta" style="margin-top: 8px;">
          <span class="tag tag-type">{{ item.category }}</span>
          <span class="tag tag-region">📍 {{ item.region }} {{ item.location }}</span>
        </div>
        <div class="card-footer"><span class="date">📅 {{ item.publish_date }}</span></div>
      </div>

      <div class="detail-card">
        <h3>商品描述</h3>
        <div class="field-value description">{{ item.description }}</div>
      </div>

      <div class="detail-card contact-card">
        <h3>联系我</h3>
        <div class="field-row"><div class="field-label">联系人</div><div class="field-value">Mia</div></div>
        <div class="field-row"><div class="field-label">微信</div><div class="field-value highlight">qfh16888888888</div></div>
      </div>
    </div>

    <div v-else class="empty-state"><div class="icon">📭</div><p>未找到该商品</p></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const item = ref(null)
const currentImage = ref(0)

const nextImage = () => {
  if (!item.value?.images?.length) return
  currentImage.value = (currentImage.value + 1) % item.value.images.length
}

onMounted(async () => {
  const res = await fetch('./trade.json')
  const data = await res.json()
  item.value = data.find(i => i.id === route.params.id)
})
</script>

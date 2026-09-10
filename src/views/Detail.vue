<template>
  <div class="detail-page">
    <div class="detail-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1>招聘详情</h1>
    </div>

    <div v-if="job" class="detail-content">
      <div class="detail-card">
        <div class="detail-title">{{ job.title }}</div>
        <div class="card-meta" style="margin-top: 8px;">
          <span v-if="job.region" class="tag tag-region">📍 {{ job.region }}</span>
          <span v-for="tag in job.tags" :key="tag" class="tag tag-category">{{ tag }}</span>
        </div>
        <div class="card-footer">
          <span class="date">📅 {{ job.publish_date }}</span>
        </div>
      </div>

      <div class="detail-card">
        <h3>职位详情</h3>
        <div class="field-value description">{{ job.description || '暂无详细描述' }}</div>
      </div>

      <div class="detail-card contact-card">
        <h3>联系我</h3>
        <div class="field-row">
          <div class="field-label">联系人</div>
          <div class="field-value">Mia</div>
        </div>
        <div class="field-row">
          <div class="field-label">微信</div>
          <div class="field-value highlight">qfh16888888888</div>
        </div>
        <div class="field-row" v-if="job.phone">
          <div class="field-label">原始电话</div>
          <div class="field-value">{{ job.phone }}</div>
        </div>
        <div class="field-row" v-if="job.other_contact">
          <div class="field-label">其他联系</div>
          <div class="field-value">{{ job.other_contact }}</div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="icon">📭</div>
      <p>未找到该招聘信息</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const job = ref(null)

onMounted(async () => {
  const res = await fetch('./data.json')
  const data = await res.json()
  job.value = data.find(j => String(j.id) === String(route.params.id))
})
</script>

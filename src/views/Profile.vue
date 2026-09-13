<template>
  <div>
    <div class="header">
      <h1>我的</h1>
    </div>

    <div class="profile-section">
      <div class="avatar">👤</div>
      <div class="user-info">
        <div class="user-name">微信用户</div>
        <div class="user-id">微信号：qfh16888888888</div>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-item" @click="showTip('客服微信：qfh16888888888')">
        <span class="menu-icon">📞</span>
        <span class="menu-text">联系客服</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="showTip('功能开发中，敬请期待')">
        <span class="menu-icon">📋</span>
        <span class="menu-text">我的收藏</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="showTip('功能开发中，敬请期待')">
        <span class="menu-icon">📝</span>
        <span class="menu-text">我的发布</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-item" @click="showTip('华人信息平台 v1.0')">
        <span class="menu-icon">ℹ️</span>
        <span class="menu-text">关于我们</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="showTip('意见反馈请微信联系 Mia')">
        <span class="menu-icon">💬</span>
        <span class="menu-text">意见反馈</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-item disabled">
        <span class="menu-icon">📢</span>
        <span class="menu-text">发布信息</span>
        <span class="menu-tag">审核中</span>
      </div>
    </div>

    <div v-if="showToast" class="toast" @click="showToast = false">{{ toastMsg }}</div>

    <div class="bottom-nav">
      <router-link to="/" class="nav-item"><span class="nav-icon">🏠</span><span>首页</span></router-link>
      <router-link to="/profile" class="nav-item active"><span class="nav-icon">👤</span><span>我的</span></router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showToast = ref(false)
const toastMsg = ref('')

const showTip = (msg) => {
  toastMsg.value = msg
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}
</script>

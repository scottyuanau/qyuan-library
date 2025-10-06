<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  label: { type: String, required: true },
  color: { type: String, default: 'primary' },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v),
  },
  disabled: { type: Boolean, default: false },
  style: {
    type: String,
    default: 'filled',
    validator: (v) => ['filled', 'outlined'].includes(v),
  },
})

// Emits
const emit = defineEmits(['click'])

// Map size prop to Bootstrap classes
const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'btn-sm'
    case 'large':
      return 'btn-lg'
    default:
      return ''
  }
})

// Compute the full class string
const buttonClasses = computed(() => {
  const base =
    props.style === 'outlined' ? `btn btn-outline-${props.color}` : `btn btn-${props.color}`
  return [base, sizeClass.value].join(' ')
})

// Handle click and emit event
function handleClick(event) {
  if (!props.disabled) emit('click', event)
}
</script>

<style scoped>
button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>

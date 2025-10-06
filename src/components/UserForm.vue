<template>
  <div class="container mt-5">
    <div class="col-md-8 offset-md-2">
      <h1 class="text-center">User Information Form</h1>

      <form @submit.prevent="submitForm">
        <!-- Username / Password -->
        <div class="row mb-3">
          <div class="col-sm-6 col-md-6">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
              v-model="formData.username"
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <div class="col-sm-6 col-md-6">
            <label for="gender" class="form-label">Gender</label>
            <select
              class="form-select"
              id="gender"
              v-model="formData.gender"
              @blur="() => validateGender(true)"
              @change="() => validateGender(false)"
            >
              <option disabled value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
          </div>

          <!-- Password -->
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
        </div>

        <!-- Checkbox -->
        <div class="row mb-3">
          <div class="col-md-6 col-sm-6">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="isAustralian"
                @blur="() => validateResident(true)"
                @change="() => validateResident(false)"
                v-model="formData.isAustralian"
              />
              <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
            </div>
          </div>
        </div>

        <!-- Reason -->
        <div class="row mb-3">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea
            class="form-control"
            id="reason"
            rows="3"
            v-model="formData.reason"
            @blur="() => validateReason(true)"
            @input="() => validateReason(false)"
          ></textarea>
          <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          <div v-if="friendMessage" class="text-success">{{ friendMessage }}</div>
        </div>

        <!-- Actions -->
        <div class="row mb-3">
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </div>

        <!-- Suburb -->
        <div class="mb-3">
          <label for="reason" class="form-label">Suburb</label>
          <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
        </div>
      </form>
    </div>

    <!-- Display submitted items in a PrimeVue DataTable -->
    <div class="row mt-5" v-if="submittedCards.length">
      <DataTable :value="submittedCards" dataKey="username" responsiveLayout="scroll">
        <Column field="username" header="Username" />
        <Column field="password" header="Password" />
        <Column header="Australia Resident">
          <template #body="{ data }">{{ data.isAustralian ? 'Yes' : 'No' }}</template>
        </Column>
        <Column field="gender" header="Gender" />
        <Column field="reason" header="Reason" />
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton',
})

const submittedCards = ref([])
const friendMessage = ref(null)

const submitForm = () => {
  // Re-run validation before submitting
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  // Prevent submission if there are validation errors
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedCards.value.push({
      ...formData.value,
    })

    // reset form and errors
    clearInputs()
  }
}

const clearInputs = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null,
  }
}

const clearForm = () => {
  clearInputs()
  submittedCards.value = []
}

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resisdent: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Username must be at least 3 characters long.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUpperCase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowerCase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateResident = () => {
  if (!formData.value.isAustralian) {
    errors.value.resident = 'You must be an Australian resident.'
  } else {
    errors.value.resident = false
  }
}

const validateGender = (blur = false) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur = false) => {
  const reason = formData.value.reason.trim()
  const min = 10
  const includesFriend = /\bfriend\b/i.test(reason)

  if (reason.length < min) {
    if (blur) errors.value.reason = `Reason must be at least ${min} characters long.`
    friendMessage.value = null
  } else {
    errors.value.reason = null
    // If "friend" is mentioned, show green message
    if (includesFriend) {
      friendMessage.value = 'Great to have a friend'
    } else {
      friendMessage.value = null
    }
  }
}

const validateConfirmPassword = (blur = false) => {
  if (formData.value.confirmPassword !== formData.value.password) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>

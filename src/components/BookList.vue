<script>
import { onMounted, ref } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/index.js'

export default {
  setup(){
    const books = ref([])
    const fetchBooks = async () => {
      try {
        if (!db) {
          console.warn('Firestore has not been initialised. Skipping book fetch.')
          return
        }

        const q = query(collection(db, 'books'), where('isbn','>',1000))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach(doc => {
          booksArray.push({id: doc.id, ...doc.data()})
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }

    }
    onMounted(() => {
      fetchBooks()
    })
    return {
      books
    }
  }
}
</script>

<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key = "book.id">
        {{book.name}} - ISBN: {{book.isbn}}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>

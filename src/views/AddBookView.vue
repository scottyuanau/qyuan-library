<script>
import { onMounted, ref } from 'vue'
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/index.js'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const books = ref([])
    const editingBookId = ref(null)
    const isSubmitting = ref(false)

    const resetForm = () => {
      isbn.value = ''
      name.value = ''
      editingBookId.value = null
      isSubmitting.value = false
    }

    const fetchBooks = async () => {
      try {
        if (!db) {
          console.error('Firestore has not been initialised. Check your Firebase config.')
          alert('Unable to connect to the database. Please try again later.')
          return
        }

        const snapshot = await getDocs(collection(db, 'books'))
        books.value = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))
      } catch (error) {
        console.error('Error fetching books', error)
        alert('Unable to fetch books. Please try again later.')
      }
    }

    const saveBook = async () => {
      if (isSubmitting.value) {
        return
      }

      isSubmitting.value = true
      try {
        const isbnNumber = Number(isbn.value)
        if (Number.isNaN(isbnNumber)) {
          alert('ISBN number must be a number')
          isSubmitting.value = false
          return
        }

        if (!db) {
          console.error('Firestore has not been initialised. Check your Firebase config.')
          alert('Unable to connect to the database. Please try again later.')
          isSubmitting.value = false
          return
        }

        if (editingBookId.value) {
          await updateDoc(doc(db, 'books', editingBookId.value), {
            isbn: isbnNumber,
            name: name.value,
          })
          alert('Book updated successfully!')
        } else {
          await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value,
          })
          alert('Book added successfully!')
        }

        await fetchBooks()
        resetForm()
      } catch (error) {
        console.error('Error saving book', error)
        alert('Unable to save book. Please try again later.')
        isSubmitting.value = false
      }
    }

    const startEditing = (book) => {
      isbn.value = book.isbn.toString()
      name.value = book.name
      editingBookId.value = book.id
    }

    const cancelEditing = () => {
      resetForm()
    }

    const deleteBook = async (bookId) => {
      try {
        if (!db) {
          console.error('Firestore has not been initialised. Check your Firebase config.')
          alert('Unable to connect to the database. Please try again later.')
          return
        }

        await deleteDoc(doc(db, 'books', bookId))
        alert('Book deleted successfully!')
        if (editingBookId.value === bookId) {
          resetForm()
        }
        await fetchBooks()
      } catch (error) {
        console.error('Error deleting book', error)
        alert('Unable to delete book. Please try again later.')
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      isbn,
      name,
      books,
      editingBookId,
      saveBook,
      startEditing,
      deleteBook,
      cancelEditing,
    }
  },
}
</script>

<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="saveBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">{{ editingBookId ? 'Update Book' : 'Add Book' }}</button>
      <button v-if="editingBookId" type="button" @click="cancelEditing">Cancel</button>
    </form>
    <section v-if="books.length">
      <h2>Existing Books</h2>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.isbn }}</td>
            <td>{{ book.name }}</td>
            <td>
              <button type="button" @click="startEditing(book)">Edit</button>
              <button type="button" @click="deleteBook(book.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <p v-else>No books found.</p>
  </div>
</template>

<style scoped></style>

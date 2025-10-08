 
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions/v2/options");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

setGlobalOptions({
  region: "australia-southeast1",
  maxInstances: 10,
});

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      res.status(200).json({ count: snapshot.size });
    } catch (error) {
      console.error("Error counting books:", error);
      res.status(500).send("Error counting books");
    }
  });
});

exports.getAllBookAPI = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({ books });
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).send("Error fetching books");
    }
  });
});
// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

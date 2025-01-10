import express from "express";
import FormData from "form-data";
import dotenv from "dotenv";
import url from "url";
import axios from "axios";
dotenv.config();
import auth_keys from "./client_secret2.json" assert { type: "json" };
const app = express();

//Authorization process
app.get("/", async function Authorization(req, res) {
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `scope=https://www.googleapis.com/auth/photoslibrary&` +
    `access_type=offline&` +
    `include_granted_scopes=true&` +
    `response_type=code&` +
    `state=${process.env.STATE}&` +
    `redirect_uri=${auth_keys.web.redirect_uris[0]}&` +
    `client_id=${auth_keys.web.client_id}`;
  res.redirect(url);
});

//Token generation and photo upload process
app.get("/oauth2callback", async function AuthCode(req, res) {
  let q = url.parse(req.url, true).query;
  if (q.state !== process.env.STATE) {
    res.end("State is not matching");
  } else {
    const token = await axios.post("https://oauth2.googleapis.com/token", {
      code: q.code,
      client_id: auth_keys.web.client_id,
      client_secret: auth_keys.web.client_secret,
      redirect_uri: auth_keys.web.redirect_uris[0],
      grant_type: "authorization_code",
    });

    const accessToken = token.data.access_token;
    // Telegram bot token
    const botToken = process.env.BOT_ID;
    // Telegram channel ID
    const chatId = process.env.CHAT_ID;

    // Function to fetch media items from Google Photos
    async function fetchMediaItems() {
      try {
        const response = await axios.get(
          "https://photoslibrary.googleapis.com/v1/mediaItems",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data.mediaItems || [];
      } catch (error) {
        console.error("Error fetching media items:", error);
        return [];
      }
    }

    // Function to upload photo to Telegram
    async function uploadPhotoToTelegram(photoUrl) {
      try {
        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("photo", photoUrl);

        const response = await axios.post(
          `https://api.telegram.org/bot${botToken}/sendPhoto`,
          formData,
          { headers: formData.getHeaders() }
        );

        console.log("Photo uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }

    // Function to fetch and upload photos to Telegram
    async function fetchAndUploadPhotos() {
        const mediaItems = await fetchMediaItems();
        
        for (const item of mediaItems) {
          const photoUrl = item.baseUrl;
          await uploadPhotoToTelegram(photoUrl);
        }
        
      }

    // Start the first execution immediately
    fetchAndUploadPhotos();

    res.end("Photos are being uploaded to Telegram");
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

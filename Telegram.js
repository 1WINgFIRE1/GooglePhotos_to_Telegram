import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config();
// Your Telegram bot token
const botToken = process.env.BOT_ID;
// Your Telegram channel ID (can be a negative ID if it's a private group or channel)
const chatId = process.env.CHAT_ID; 
// Function to upload the photo to Telegram channel
async function uploadPhotoToTelegram(photoUrl) {
  try {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', photoUrl); // You can directly use the URL of the image

    // Send the photo via Telegram Bot API
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      formData,
      { headers: formData.getHeaders(),timeout: 10000 }
    );
    
    console.log('Photo uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading photo:', error);
  }
}

// Example: Upload the photo to your Telegram channel
const photoUrl = 'https://lh3.googleusercontent.com/lr/AAJ1LKdbrlzrr14JGxLO7OjPFjknxyKUVCfOPEE4Gq9UgDAV8nAzOHvEgJjOTeuRifPcHb0Iyp9SQjvpZdkfz8e6OXAAyh-iI7L_OEdZnsfMQfK_UacaYBpYK3zeUnNgzmAo14_7HrW1LgfK3NQZG0TmTQYUxKW0gde4vBMxdk_B5NUBHDyt18jTlu5RxsCXalPF1SVDTn661p6TuEs5yz3Nw7cz5Pa0TcrYTjudmOg32nm2UbOKW4pspPFlmKT6sA0WUkzeO641A905BwvX9Z7C7spdQbD855ANsuE9R-y7G40IAo8p-d-YPrPg8JHmki_lXauxD-L_BkzeGj7i3MbjQb6JLxKfvHFANhaeOe8a-Ljcl7C_q6GdDkY-Cf6YE5EFysO_BJm0sOd7UDvQbUDWS9Cn9gitPlEWLka0dCiAaBOpCKQB5w9QvtambDfYZuU9a0gocEoIXcg7H9fapGhYlKKo7eUFk5cs3006k_tT7tqBoXfGgb8mO2n4IvQ2hIdH1aF0K85M22JDCEGljOdm7T5X681RHwf1awNtNS7hmX-zftRra_1wByLxFcchph7FpoBPrcf_95shio9NaI6Q31OSzNb9yM1NvM9ivoyH3omsXAGYN1K3A5FH3IbJIxPo7oYZ7F6_ZrOGFrAesuSjsm5R02NpXyo7bb4ZKOUq8cbIp6w9ICGDPS7vF08FAluemHAK0rt08wCLMTL62zJIErZHUKSB_phvqQu5H1FpyD9MEBiOfyDuG99qmbJhkAUd8TLilC0vepHT9uHQHWPcsElC5w7wz4VWKzlbq0pb1CtAIuV3yS9nH92XtAfaG6NyYHuMXHg3m8qOvw4-D9STWjo7WFzgG-OnKHLElMcYseTVAAvj5qSrihcnj6wtRxC1IIn1795mQWFEv-wbrtPTXLlF9BSCUuRSSkRkzeGHrIkbeORimuFg0HHcCTVDcR1RY9tcob9Gd5lzvzt5NoRGeQE76y_43w';  // Photo URL from Google Photos
// const photoUrl = "https://images.unsplash.com/photo-1736355895984-a07a970ead7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
uploadPhotoToTelegram(photoUrl);

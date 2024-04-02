import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";

// Asenkron thunk aksiyonları
export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    // API'den dil verilerini al.
    const res = await axios.request(languageOptions);

    // Aksiyonun payload'ını belirle
    return res.data.data.languages;
  }
);

// API'ın çeviri uç noktasına istek at
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (action_params) => {
    // Aksiyonu dispatch ederken gönderilen parameterlere eriş
    const { sourceLang, targetLang, text } = action_params;

    // Gönderilecek parametreleri belirle
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    // AXios istek ayarlarını belirle
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "PLEASE ENTER HERE YOUR API",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };

    // İstek at
    const res = await axios.request(options);
    console.log(res.data);

    return res.data.data.translatedText;
  }
);

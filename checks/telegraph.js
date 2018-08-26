const pingUtil = require('../pingUtil.js');
const axios = require('axios')

const baseUrl = 'https://telegra.ph/'
const apiUrl = 'https://api.telegra.ph/'

exports.ping = async () => {

}

const tests = [

  // API: fetch page
  async () => {
    let result = {
      title: 'API - fetch an article\'s content',
      ok: false,
      response_time: Date.now(),
      error: ''
    }

    let response = null;
    try {
      // Use sample page from api docs
      response = await axios.get(apiUrl +'getPage/Sample-Page-12-15?return_content=true');
    } catch (axiosError) {
      result.error = "Unable to GET answer from API"
      return result;
    }

    if (response.status >= 400) {
      result.error = "HTTP Status is an error."
    }

    let data = null;
    try {
      data = JSON.parse(response.data);
    } catch (jsonParsingError){
      result.error = "Unable to JSON-parse GET response"
      return result;
    }

    if (!data.ok) {
      result.error = "API returned ok=false"
      return result;
    }
    
    result.ok = true;
    result.response_time = Date.now() - result.response_time;
    return result;
  },

  // API: upload photo


  // API: retrieve photo
]

exports.test = async () => {
  return [tests[0]];
}
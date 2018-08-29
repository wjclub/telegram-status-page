const pingUtil = require('../pingUtil.js');
const axios = require('axios');

const domain = 'telegra.ph';
const apiUrl = 'https://api.telegra.ph/';
const timeout = 5*1000;

exports.ping = async () => {
  return pingUtil.tcpPing({
    address: domain,
    port: 443,
    timeout: timeout
  });
}

const tests = [

  // API: fetch page
  async () => {
    
    let result = {
      title: 'API - fetch an article\'s content',
      ok: false,
      response_time: 0,
      error: '',
      date: Date.now()
    }

    let response = null;
    try {
      // Use sample page from api docs
      const startTime = process.hrtime()
        response = await axios.get(apiUrl +'getPage/Sample-Page-12-15?return_content=true', {
          timeout: timeout * 1000
        });
      result.response_time = process.hrtime(startTime)[1] / 1000000;
    } catch (axiosError) {
      result.error = "Unable to GET answer from API"
      return result;
    }

    if (response.status >= 400) {
      result.error = "HTTP Status is an error."
    }

    let data = null;
    try {
      data = response.data;
    } catch (jsonParsingError){
      result.error = "Unable to JSON-parse GET response"
      return result;
    }

    if (!data.ok) {
      result.error = "API returned ok=false"
      return result;
    }
    
    result.ok = true;
    return result;
  }
]

exports.test = async () => {
  return [await tests[0]()];
}
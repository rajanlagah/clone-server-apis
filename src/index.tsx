import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string,
  axios: any
}
const updateMockApis = true

export const ExampleComponent = ({ text, axios  }: Props) => {
  let data:any = [
    {
        "url": "https://reqres.in/api/users",
        "data": "{\"name\":\"morpheus\",\"job\":\"leader\"}",
        "response": {
            "data": {
                "name": "morpheus",
                "job": "leader",
                "id": "673",
                "createdAt": "2022-04-24T07:25:08.275Z"
            },
            "status": 201,
            "statusText": "",
            "headers": {
                "content-length": "84",
                "content-type": "application/json; charset=utf-8"
            },
            "config": {
                "transitional": {
                    "silentJSONParsing": true,
                    "forcedJSONParsing": true,
                    "clarifyTimeoutError": false
                },
                "transformRequest": [
                    null
                ],
                "transformResponse": [
                    null
                ],
                "timeout": 0,
                "xsrfCookieName": "XSRF-TOKEN",
                "xsrfHeaderName": "X-XSRF-TOKEN",
                "maxContentLength": -1,
                "maxBodyLength": -1,
                "headers": {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                "method": "post",
                "url": "https://reqres.in/api/users",
                "data": "{\"name\":\"morpheus\",\"job\":\"leader\"}"
            },
            "request": {}
        }
    }
]

  if(axios && updateMockApis){
    axios.interceptors.request.use(function (request:any) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return Promise.resolve(data[0].response) // For mock response
      return request;
    }, function (error:any) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // return Promise.resolve(data[0].response)
      return Promise.reject(error);
    });
  }


  if(axios && updateMockApis){
    axios.interceptors.response.use(function (response:any) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      console.log("WILL CHANGE HERE 22",axios.interceptors)
      data.push({
        url:response.config.url,
        data:response.config.data,
        response
      })
      console.log(data)

      // return Promise.resolve(data[0].response)
      return response;
    }, function (error:any) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
     
      return Promise.resolve(data[0].response) // When you need mock response
      return Promise.reject(error); // When you need real response
    });
  }

  console.log('heree')
  // window.addEventListener('fetch', () => console.log('fetching'))
  const { fetch: origFetch } = window
  window.fetch = async (...args): Promise<Response | any> => {
    console.log('fetch called with args:')
    const response = await origFetch(...args)

    /* work with the cloned response in a separate promise
     chain -- could use the same chain with `await`. */
    response
      .clone()
      .json()
      .then((body) => console.log('intercepted response:', body))
      .catch((err) => console.error(err))

    /* the original response can be resolved unmodified: */
    // return response;

    /* or mock the response: */
    return {
      ok: true,
      status: 200,
      json: async () => ({
        userId: 1,
        id: 1,
        title: 'Mocked!!',
        completed: false
      })
    }
  }
  return <div className={styles.test}>Example Component: {text}</div>
}

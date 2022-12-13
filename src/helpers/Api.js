export class API {
  constructor(baseUrl) {
    this.baseUrl = `${baseUrl}`
  }

  // signIn(data) {
  //   fetch(`${this.baseUrl}signin`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   // .then((responseFromBack) => responseFromBack.json())
  //   //   .then((info) => {
  //   //     localStorage.setItem('userToken', info.token)
  //   //   })
  // }

  async signIn(data) {
    fetch(`${this.baseUrl}signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    // .then((responseFromBack) => responseFromBack.json())
    //   .then((info) => {
    //     localStorage.setItem('userToken', info.token)
    //   })
  }

  async signUp(data) {
    try {
      const response = await fetch(`${this.baseUrl}signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.status !== 200) {
        throw new Error()
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      throw new Error(error)
    }
  }

  async getAllProducts() {
    try {
      const response = await fetch(`${this.baseUrl}products`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },

      })

      return response.json()
    } catch (error) {
      throw new Error(error)
    }
  }
}
export const api = new API('https://api.react-learning.ru/')

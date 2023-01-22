import axios from 'axios'

export class API {
  constructor(baseUrl) {
    this.baseUrl = `${baseUrl}`
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  async signIn(data) {
    return (fetch(`${this.baseUrl}signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }))
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

  /* Рабочая версия Api без использования TanStack
Query
  async getAllProducts() {
    try {
      const response = await fetch(`${this.baseUrl}products`, {
        headers: {
          authorization: `Bearerr ${localStorage.getItem('userToken')}`,
        },

      })

      return response.json()
    } catch (error) {
      throw new Error(error)
    }
  }
  */

  // getAllProducts = () => {
  //   const tokenInLS = localStorage.getItem('userToken')
  //   return fetch(`${this.baseUrl}products`, {
  //     headers: {
  //       authorization: `Bearer ${tokenInLS}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         return res.json().then((data) => {
  //           throw new Error(data.message)
  //         })
  //       }
  //       return res.json()
  //     })
  //     .then((data) => data)
  // }

  async getAllProducts(search) {
    try {
      const token = localStorage.getItem('userToken')
      if (search === '') {
        const res = await fetch(`${this.baseUrl}products`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        return res.json()
      }
      const res = await fetch(`${this.baseUrl}products/search?query=${search}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  getProductByIDs = (ids) => {
    const tokenInLS = localStorage.getItem('userToken')
    if (!ids.length) return []
    return axios.all(ids.map((id) => axios.get(`${this.baseUrl}products/${id}`, { headers: { ...this.headers, authorization: `Bearer ${tokenInLS}` } })))
  }
}
export const api = new API('https://api.react-learning.ru/')

import axios from 'axios'

export class API {
  constructor(baseUrl) {
    this.baseUrl = `${baseUrl}`
    this.token = localStorage.getItem('userToken')

    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  async getUser() {
    try {
      const res = await fetch(`${this.baseUrl}v2/sm-8/users/me`, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  async deleteProduct(id) {
    try {
      const res = await fetch(`${this.baseUrl}/products/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      })
      if (res.status !== 200) {
        const answer = await res.json()
        console.log(answer.err.statusCode, answer.message)
        return answer
      }
      return res.json()
    } catch (Error) {
      throw new Error(Error)
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
      const res = await fetch(`${this.baseUrl}signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (res.status !== 200) {
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
      if (search === '') {
        const res = await fetch(`${this.baseUrl}products`, {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        })
        return res.json()
      }
      const res = await fetch(`${this.baseUrl}products/search?query=${search}`, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  async addProds(data) {
    try {
      const res = await fetch(`${this.baseUrl}products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(data),
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  async getProductById(id) {
    try {
      const res = await fetch(`${this.baseUrl}products/${id}`, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  async getReviews(id) {
    try {
      const res = await fetch(`${this.baseUrl}products/review/${id}`, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  getProductByIDs = (data) => {
    if (!data.length) return []
    return axios.all(data.map((id) => axios.get(
      `${this.baseUrl}products/${id}`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.token}`,
        },
      },
    )))
  }
}
export const api = new API('https://api.react-learning.ru/')

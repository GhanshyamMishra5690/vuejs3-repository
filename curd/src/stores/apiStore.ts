import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { User, FormData, APIResponse } from '@/types/index'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useApiStore = defineStore('ApiStore', {
  state: () => ({
    usersData: [] as User[],
    editUser: {} as User
  }),

  actions: {
    async fetchUserData(limit: number) {
      return new Promise<User[]>(async (resolve, reject) => {
        // Expect an array of users
        try {
          const { data } = await axios.get<User[]>(
            `https://api.escuelajs.co/api/v1/users?limit=${limit}`
          )

          this.usersData = data // Set the response to usersData array
          console.log('Fetched Users:', data)
          resolve(data)
        } catch (error) {
          console.error('Failed to fetch user data:', error)
          reject(error)
        }
      })
    },
    async createUser(form: Record<string, any>) {
      return new Promise<FormData>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<FormData>(`/users`, form)

          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getUser(id: number) {
      return new Promise<User>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<User>(`/users/${id}`)
          this.editUser = data
          console.log('edit ', data)
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async updateUser(id: number, form: Record<string, any>) {
      return new Promise<User>(async (resolve, reject) => {
        try {
          const { data } = await axios.put<User>(`/users/${id}`, form)
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async deleteUser(id: number) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.delete(`/users/${id}`)
          if (data === true) {
            resolve(true)
          } else {
            reject('Failed to delete user.')
          }
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})

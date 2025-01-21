import Mock from 'better-mock/dist/mock.mp'

const modules = import.meta.glob<{ default: MockBody[] }>('./**/*.mock.ts', {
  eager: true
})
const baseUrl = import.meta.env.VITE_APP_URL as string

Mock.setup({ timeout: '1000' })

const mockData: MockBody[] = Object.values(modules).flatMap(
  (module) => module.default
)

for (const item of mockData) {
  Mock.mock(new RegExp(baseUrl + item.url), item.method, item.response)
}

export default Mock
